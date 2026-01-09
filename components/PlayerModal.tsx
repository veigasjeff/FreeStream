
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Movie } from '../types';

// Define the YT Player type for TypeScript to avoid errors
declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface PlayerModalProps {
    movie: Movie | null;
    onClose: () => void;
}

// Helper to reliably extract YouTube video ID from various URL formats or just an ID string
const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    }
    // Handle case where playUrl is just the ID
    if (url.length === 11 && !url.includes('/')) {
        return url;
    }
    return null;
};

type Stream = {
    name: string;
    url: string;
    type: 'youtube' | 'iframe';
}

const PlayerModal: React.FC<PlayerModalProps> = ({ movie, onClose }) => {
    // Memoize streams to prevent re-calculation on re-renders
    const streams = useMemo(() => {
        if (!movie) return [];
        const availableStreams: Stream[] = [];
        if (movie.playUrl && movie.playUrl.trim() !== '') availableStreams.push({ name: 'YouTube Trailer', url: movie.playUrl, type: 'youtube' });
        if (movie.streamUrl && movie.streamUrl.trim() !== '') availableStreams.push({ name: 'Server 1 (HD)', url: movie.streamUrl, type: 'iframe' });
        if (movie.stream2Url && movie.stream2Url.trim() !== '') availableStreams.push({ name: 'Server 2', url: movie.stream2Url, type: 'iframe' });
        if (movie.stream3Url && movie.stream3Url.trim() !== '') availableStreams.push({ name: 'Server 3', url: movie.stream3Url, type: 'iframe' });
        if (movie.stream4Url && movie.stream4Url.trim() !== '') availableStreams.push({ name: 'Server 4 (Hindi Dubbed)', url: movie.stream4Url, type: 'iframe' });
        return availableStreams;
    }, [movie]);
    
    const [activeStream, setActiveStream] = useState<Stream | null>(null);
    
    const playerRef = useRef<any>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    // Effect to handle the creation and destruction of the YouTube player instance
    useEffect(() => {
        // This effect ensures that if the streams change (e.g., new movie loaded), the active stream is reset to the first available one.
        if (streams.length > 0) {
            setActiveStream(streams[0]);
        } else {
            setActiveStream(null);
        }
    }, [movie, streams]);

    useEffect(() => {
        const destroyPlayer = () => {
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                try {
                    playerRef.current.destroy();
                } catch (error) {
                    console.error("Error destroying YouTube player:", error);
                }
                playerRef.current = null;
            }
        };

        if (activeStream?.type !== 'youtube') {
            destroyPlayer();
            return;
        }

        const videoId = getYouTubeId(activeStream.url);
        if (!videoId || !playerContainerRef.current) return;

        const createPlayer = () => {
            destroyPlayer(); 
            playerRef.current = new window.YT.Player(playerContainerRef.current.id, {
                videoId: videoId,
                width: '100%',
                height: '100%',
                playerVars: {
                    autoplay: 1,
                    controls: 1,
                    rel: 0,
                    loop: 1,
                    modestbranding: 1,
                    playsinline: 1,
                    playlist: videoId
                },
            });
        };

        if (window.YT && window.YT.Player) {
            createPlayer();
        } else {
            // If API script hasn't loaded, wait for the global callback
            const previousCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (previousCallback) previousCallback();
                createPlayer();
            };
        }

        return () => {
            destroyPlayer();
        };

    }, [activeStream]);

    if (!movie) return null;

    return (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-2 sm:p-4 animate-fade-in">
            <div 
                className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
                    <h3 className="font-bold text-base sm:text-lg text-white truncate pr-4">Now Playing: {movie.title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                    {/* CRITICAL FIX: Add a key to the player container. This forces a complete re-mount of the player (iframe or YT) on stream change, ensuring a clean state. */}
                    <div className="aspect-video bg-black w-full" key={activeStream?.url}>
                        {activeStream?.type === 'youtube' ? (
                            <div id="youtube-player-container" ref={playerContainerRef} className="w-full h-full"></div>
                        ) : activeStream?.type === 'iframe' ? (
                             <iframe
                                src={activeStream.url}
                                title="Movie Player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">Select a server to play.</div>
                        )}
                    </div>

                    {streams.length > 0 && (
                         <div className="p-3 sm:p-4 bg-gray-900/50 border-t border-gray-800">
                             <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Available Servers</h4>
                             <div className="flex flex-wrap gap-3">
                                {streams.map((stream) => (
                                    <button
                                        key={stream.name}
                                        onClick={() => setActiveStream(stream)}
                                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-1 ${
                                            activeStream?.url === stream.url
                                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        <i className={`fa-solid ${stream.type === 'youtube' ? 'fa-brands fa-youtube' : 'fa-server'}`}></i>
                                        <span>{stream.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;
    