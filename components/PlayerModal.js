import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import hls.js for HLS streaming support
const Hls = typeof window !== 'undefined' ? require('hls.js') : null;

export default function PlayerModal({ isOpen, onClose, movie }) {
  const [activeServer, setActiveServer] = useState(0);
  const [playerError, setPlayerError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playerType, setPlayerType] = useState(null);
  
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const containerRef = useRef(null);
  const modalRef = useRef(null);

  const getStreams = () => {
    if (!movie) return [];
    
    const streams = [
      { name: 'YouTube Trailer', url: movie.playUrl },
      { name: 'Server 1 (HD)', url: movie.streamUrl },
      { name: 'Server 2', url: movie.stream2Url },
      { name: 'Server 3', url: movie.stream3Url },
      { name: 'Server 4 (Hindi Dubbed)', url: movie.stream4Url },
      { name: 'Server 5 (HLS)', url: movie.hlsUrl }
    ].filter(stream => stream.url && stream.url.trim() !== '');
    
    return streams;
  };

  const detectStreamType = (url) => {
    if (!url) return 'unknown';
    
    const urlLower = url.toLowerCase();
    
    // Check for YouTube URLs or YouTube video IDs
    if (urlLower.includes('youtube.com') || 
        urlLower.includes('youtu.be') || 
        /^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return 'youtube';
    }
    
    // Check for HLS streams
    if (urlLower.includes('.m3u8') || urlLower.includes('hls')) {
      return 'hls';
    }
    
    // Check for direct video files
    if (urlLower.match(/\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv)$/)) {
      return 'video';
    }
    
    // Check for iframe embed URLs
    if (urlLower.includes('embed') || urlLower.includes('iframe')) {
      return 'iframe';
    }
    
    // Default to iframe for streaming services
    if (urlLower.includes('stream') || urlLower.includes('watch')) {
      return 'iframe';
    }
    
    return 'iframe';
  };

  const extractYouTubeId = (url) => {
    // If it's already a YouTube ID (like "mGF1Cl5wryI"), return it directly
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return url;
    }
    
    // If it's a YouTube URL, extract the ID
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const loadYouTubePlayer = (videoId) => {
    if (!videoId) {
      setPlayerError('Invalid YouTube URL or ID');
      return;
    }

    // Clear container first
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Create container for YouTube player
    const playerContainer = document.createElement('div');
    playerContainer.id = 'youtube-player-container';
    playerContainer.style.width = '100%';
    playerContainer.style.height = '100%';
    
    if (containerRef.current) {
      containerRef.current.appendChild(playerContainer);
    }

    // Load YouTube API if not loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        createYouTubePlayer(videoId, playerContainer);
      };
    } else {
      createYouTubePlayer(videoId, playerContainer);
    }
  };

  const createYouTubePlayer = (videoId, container) => {
    if (youtubePlayerRef.current) {
      try {
        youtubePlayerRef.current.destroy();
      } catch (e) {
        console.log('Error destroying previous YouTube player:', e);
      }
    }

    youtubePlayerRef.current = new window.YT.Player(container, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        'autoplay': 1,
        'mute': 0,
        'playsinline': 1,
        'rel': 0,
        'controls': 1,
        'modestbranding': 1,
        'showinfo': 0,
        'origin': window.location.origin,
        'loop': 1,
        'playlist': videoId // Required for looping a single video
      },
      events: {
        'onReady': (event) => {
          setIsLoading(false);
          event.target.playVideo();
        },
        'onStateChange': (event) => {
          // Auto-replay when video ends
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        },
        'onError': (event) => {
          setPlayerError('YouTube player error: ' + event.data);
        }
      }
    });
  };

  const loadHlsPlayer = (url) => {
    if (!Hls || !videoRef.current) {
      setPlayerError('HLS.js not available');
      return;
    }

    // Destroy existing HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    const hls = new Hls({
      enableWorker: false, // Changed to false to fix permissions error
      lowLatencyMode: true,
      backBufferLength: 90,
      manifestLoadingTimeOut: 10000,
      manifestLoadingMaxRetry: 3,
      levelLoadingTimeOut: 10000,
      levelLoadingMaxRetry: 3,
      fragLoadingTimeOut: 10000,
      fragLoadingMaxRetry: 3
    });

    hlsRef.current = hls;

    hls.loadSource(url);
    hls.attachMedia(videoRef.current);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setIsLoading(false);
      videoRef.current.play().catch(e => {
        console.log('Autoplay prevented:', e);
        setPlayerError('Click play button to start video');
      });
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            setPlayerError('HLS playback error');
            hls.destroy();
            break;
        }
      }
    });
  };

  const loadVideoPlayer = (url) => {
    if (!videoRef.current) return;

    videoRef.current.src = url;
    videoRef.current.load();

    videoRef.current.onloadeddata = () => {
      setIsLoading(false);
      videoRef.current.play().catch(e => {
        console.log('Autoplay prevented:', e);
        setPlayerError('Click play button to start video');
      });
    };

    videoRef.current.onerror = () => {
      setPlayerError('Failed to load video');
    };
  };

  const loadIframePlayer = (url) => {
    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = 'var(--radius-sm)';
    
    iframe.onload = () => {
      setIsLoading(false);
    };
    
    iframe.onerror = () => {
      setPlayerError('Failed to load iframe content');
    };
    
    if (containerRef.current) {
      containerRef.current.appendChild(iframe);
    }
  };

  const loadServer = (index) => {
    const streams = getStreams();
    if (index >= streams.length) return;
    
    setIsLoading(true);
    setPlayerError(null);
    setActiveServer(index);
    
    const server = streams[index];
    const type = detectStreamType(server.url);
    setPlayerType(type);
    
    // Clean up previous player
    cleanupPlayer();
    
    // Clear container for new player
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    setTimeout(() => {
      switch (type) {
        case 'youtube':
          const youtubeId = extractYouTubeId(server.url);
          if (youtubeId) {
            loadYouTubePlayer(youtubeId);
          } else {
            loadIframePlayer(server.url);
          }
          break;
          
        case 'hls':
          const hlsVideoElement = document.createElement('video');
          hlsVideoElement.id = 'hls-video';
          hlsVideoElement.controls = true;
          hlsVideoElement.loop = true;
          hlsVideoElement.style.width = '100%';
          hlsVideoElement.style.height = '100%';
          hlsVideoElement.setAttribute('playsinline', '');
          hlsVideoElement.setAttribute('webkit-playsinline', '');
          
          containerRef.current.appendChild(hlsVideoElement);
          videoRef.current = hlsVideoElement;
          loadHlsPlayer(server.url);
          break;
          
        case 'video':
          const directVideoElement = document.createElement('video');
          directVideoElement.id = 'direct-video';
          directVideoElement.controls = true;
          directVideoElement.loop = true;
          directVideoElement.style.width = '100%';
          directVideoElement.style.height = '100%';
          directVideoElement.setAttribute('playsinline', '');
          directVideoElement.setAttribute('webkit-playsinline', '');
          
          const source = document.createElement('source');
          source.src = server.url;
          source.type = 'video/mp4';
          
          directVideoElement.appendChild(source);
          directVideoElement.innerHTML += 'Your browser does not support HTML5 video';
          
          containerRef.current.appendChild(directVideoElement);
          videoRef.current = directVideoElement;
          loadVideoPlayer(server.url);
          break;
          
        case 'iframe':
          loadIframePlayer(server.url);
          break;
          
        default:
          setPlayerError('Unsupported stream type');
          break;
      }
    }, 100);
  };

  const cleanupPlayer = () => {
    // Stop HLS player
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    
    // Stop YouTube player
    if (youtubePlayerRef.current) {
      try {
        youtubePlayerRef.current.stopVideo();
        youtubePlayerRef.current.destroy();
      } catch (e) {
        console.log('Error destroying YouTube player:', e);
      }
      youtubePlayerRef.current = null;
    }
    
    // Stop video element
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.load();
      videoRef.current = null;
    }
    
    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  };

  const handleClose = () => {
    cleanupPlayer();
    onClose();
  };

  useEffect(() => {
    if (isOpen && movie) {
      document.body.style.overflow = 'hidden';
      const streams = getStreams();
      if (streams.length > 0) {
        loadServer(0);
      }
      
      // Cleanup on unmount
      return () => {
        cleanupPlayer();
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, movie]);

  const streams = getStreams();

  if (!isOpen || !movie) return null;

  return (
    <div className="modal active" ref={modalRef}>
      <div className="modal-content player-modal">
        <span className="close-modal" onClick={handleClose}>&times;</span>
        <div className="modal-body">
          <div className="player-header">
            <h3 id="playerTitle">
              <i className="fas fa-play"></i> Now Playing: {movie.title}
            </h3>
            <div className="player-quality">
              <span className="quality-badge">HD</span>
              <span className="quality-badge">1080p</span>
            </div>
          </div>
          
          <div className="video-container-wrapper">
            <div 
              className="video-container" 
              ref={containerRef}
              id="videoContainer"
            >
              {/* Player will be inserted here dynamically */}
            </div>
            
            {isLoading && (
              <div className="player-loading">
                <div className="loading-spinner">
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
                <p>Loading player...</p>
              </div>
            )}
            
            {playerError && (
              <div className="player-error">
                <i className="fas fa-exclamation-triangle"></i>
                <p>{playerError}</p>
                <button 
                  className="retry-btn"
                  onClick={() => loadServer(activeServer)}
                >
                  <i className="fas fa-redo"></i> Retry
                </button>
              </div>
            )}
          </div>
          
          {streams.length > 0 && (
            <div className="player-servers" id="playerServers">
              <h4>
                <i className="fas fa-server"></i> Available Servers
              </h4>
              <div className="server-buttons">
                {streams.map((server, index) => {
                  const type = detectStreamType(server.url);
                  return (
                    <button
                      key={index}
                      className={`server-btn ${activeServer === index ? 'active' : ''}`}
                      onClick={() => loadServer(index)}
                      title={`${server.name} (${type.toUpperCase()})`}
                    >
                      <i className={`fas ${
                        type === 'youtube' ? 'fa-youtube' :
                        type === 'hls' ? 'fa-broadcast-tower' :
                        type === 'video' ? 'fa-file-video' :
                        'fa-film'
                      }`}></i>
                      {server.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="player-controls">
            <div className="control-group">
              <button className="control-btn" onClick={() => {
                if (videoRef.current) {
                  videoRef.current.requestFullscreen();
                } else if (containerRef.current) {
                  const iframe = containerRef.current.querySelector('iframe');
                  if (iframe) iframe.requestFullscreen();
                  const youtubeContainer = document.getElementById('youtube-player-container');
                  if (youtubeContainer) youtubeContainer.requestFullscreen();
                }
              }}>
                <i className="fas fa-expand"></i> Fullscreen
              </button>
              <button className="control-btn" onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                }
                if (youtubePlayerRef.current) {
                  if (youtubePlayerRef.current.isMuted()) {
                    youtubePlayerRef.current.unMute();
                  } else {
                    youtubePlayerRef.current.mute();
                  }
                }
              }}>
                <i className="fas fa-volume-up"></i> Mute/Unmute
              </button>
            </div>
            <div className="player-help">
              <i className="fas fa-info-circle"></i>
              <small>Video will loop automatically. If video doesn't play, try another server.</small>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 2000;
          overflow-y: auto;
          padding: 1rem;
          align-items: center;
          justify-content: center;
        }
        
        .modal.active {
          display: flex;
        }
        
        .modal-content {
          background: var(--dark-light);
          border-radius: var(--radius);
          max-width: 1200px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideIn 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          pointer-events: auto;
        }
        
        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          background: var(--input-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--light);
          cursor: pointer;
          z-index: 10;
          transition: var(--transition);
          font-size: 1.5rem;
          border: none;
        }
        
        .close-modal:hover {
          background: var(--primary);
          color: #ffffff;
          transform: rotate(90deg);
        }
        
        .modal-body {
          padding: clamp(1rem, 3vw, 2rem);
        }
        
        .player-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .player-header h3 {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          margin: 0;
          color: var(--light);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .player-quality {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .quality-badge {
          padding: 0.3rem 0.8rem;
          background: rgba(0, 180, 216, 0.2);
          color: var(--accent);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .type-badge {
          background: rgba(229, 9, 20, 0.2);
          color: var(--primary);
        }
        
        .video-container-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          background: #000;
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        
        .video-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }
        
        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #000;
          filter: brightness(1.15) contrast(1.25) saturate(1.22) hue-rotate(2deg);
        }
        
        .video-container iframe {
          width: 100%;
          height: 100%;
          border: none;
          filter: brightness(1.15) contrast(1.25) saturate(1.22) hue-rotate(2deg);
        }
        
        #youtube-player-container {
          width: 100%;
          height: 100%;
          filter: brightness(1.12) contrast(1.22) saturate(1.20) hue-rotate(5deg);
;
        }
        
        .player-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          z-index: 2;
        }
        
        .loading-spinner {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        
        .player-error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          background: rgba(229, 9, 20, 0.1);
          padding: 2rem;
          border-radius: var(--radius);
          border: 1px solid var(--primary);
          z-index: 3;
          width: 80%;
        }
        
        .player-error i {
          font-size: 2rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        
        .player-error p {
          margin: 1rem 0;
          color: var(--light);
        }
        
        .retry-btn {
          padding: 0.5rem 1.5rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .retry-btn:hover {
          background: var(--primary-dark);
        }
        
        .player-servers {
          background: var(--input-bg);
          border-radius: var(--radius-sm);
          padding: clamp(1rem, 2vw, 1.5rem);
          margin-bottom: 1rem;
        }
        
        .player-servers h4 {
          margin-bottom: 1rem;
          color: var(--light);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .server-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .server-btn {
          padding: 0.7rem 1.2rem;
          background: var(--input-bg);
          color: var(--light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .server-btn:hover {
          background: var(--input-bg);
          border-color: var(--primary);
        }
        
        .server-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
        }
        
        .player-controls {
          background: var(--input-bg);
          border-radius: var(--radius-sm);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .control-group {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .control-btn {
          padding: 0.5rem 1rem;
          background: var(--dark-light);
          color: var(--light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .control-btn:hover {
          background: var(--border-color);
        }
        
        .player-help {
          color: var(--gray);
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          max-width: 300px;
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .modal-content {
            margin: 1rem;
            max-height: 80vh;
          }
          
          .player-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .server-buttons {
            flex-direction: column;
          }
          
          .server-btn {
            width: 100%;
            justify-content: center;
          }
          
          .player-controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .control-group {
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .modal {
            padding: 0.5rem;
          }
          
          .video-container-wrapper {
            padding-bottom: 75%;
          }
        }
      `}</style>
    </div>
  );
}