const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const serverParam = urlParams.get('server') || '1';

let moviesData = [];
let currentMovie = null;
let favorites = JSON.parse(localStorage.getItem('movieStreamFavorites') || '[]');
let hlsPlayer = null;
let dashPlayer = null;
let currentServer = serverParam;
let isPlaying = false;
let isMuted = false;
let isFullscreen = false;
let adBlocked = false;
let videoError = false;
let buffering = false;
let volume = 0.5;
let controlsTimeout = null;
let isIframeMode = false;

const mainContent = document.getElementById('mainContent');
const backBtn = document.getElementById('backBtn');
const themeToggle = document.getElementById('themeToggle');

let isDarkMode = localStorage.getItem('movieStreamTheme') !== 'light';

function initTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('movieStreamTheme', isDarkMode ? 'dark' : 'light');
    initTheme();
}

async function init() {
    initTheme();
    
    await loadMovies();
    
    if (movieId) {
        loadMovieDetails(movieId);
    } else {
        showError('No movie specified');
    }
    
    setupEventListeners();
    setTimeout(checkAdBlocker, 500);
}

function checkAdBlocker() {
    const ad = document.createElement('div');
    ad.className = 'adsbox ad-banner ad-container';
    ad.style.cssText = 'position:absolute;left:-9999px;height:1px;width:1px;';
    document.body.appendChild(ad);
    
    setTimeout(() => {
        if (ad.offsetHeight === 0 || window.getComputedStyle(ad).display === 'none') {
            adBlocked = true;
            showAdBlockWarning();
        }
        document.body.removeChild(ad);
    }, 150);
}

function showAdBlockWarning() {
    const warning = document.createElement('div');
    warning.className = 'adblock-warning';
    warning.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Ad Blocker Detected</h3>
        <p>Please disable your ad blocker to continue streaming.</p>
        <p style="font-size: 0.9rem; margin-top: 1rem; color: #ccc;">Some streams may not work properly with ad blockers enabled.</p>
    `;
    document.querySelector('.video-player-area')?.appendChild(warning);
}

async function loadMovies() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to load movies');
        const data = await response.json();
        moviesData = data.movies || [];
    } catch (error) {
        console.error('Error loading movies:', error);
        showError('Failed to load movie data');
    }
}

function loadMovieDetails(id) {
    currentMovie = moviesData.find(movie => movie.id === id);
    
    if (!currentMovie) {
        showError('Movie not found');
        return;
    }
    
    displayMovieDetails(currentMovie);
}

function displayMovieDetails(movie) {
    const rating = movie.ratingCount > 0 ? 
        (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
    const isFavorite = favorites.includes(movie.id);
    const hasStream2 = movie.stream2Url && movie.stream2Url !== 'xxxx-xxxxxx-xxxxxx-xxxxxx';
    const hasStream3 = movie.stream3Url && movie.stream3Url !== 'xxxx-xxxxxx-xxxxxx-xxxxxx';
    const hasStream4 = movie.stream4Url && movie.stream4Url !== 'xxxx-xxxxxx-xxxxxx-xxxxxx';
    
    document.title = `${movie.title} - Watch Online Free | HD Quality | MovieStream`;
    
    const relatedMovies = moviesData
        .filter(m => m.id !== movie.id && m.genre === movie.genre)
        .slice(0, 6);
    
    mainContent.innerHTML = `
        <div class="breadcrumb">
            <a href="index.html">Home</a> &gt; 
            <a href="index.html?genre=${encodeURIComponent(movie.genre)}">${movie.genre}</a> &gt; 
            <span>${movie.title}</span>
        </div>
        
        <div class="movie-detail-container">
            <div class="movie-header">
                <img src="${movie.poster}" 
                     alt="${movie.title} - Movie Poster" 
                     class="movie-poster"
                     onerror="this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'">
                <div class="movie-overlay">
                    <h1 class="movie-title">${movie.title}</h1>
                    <div class="movie-meta">
                        <span class="movie-genre">${movie.genre}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${rating}/5 (${movie.ratingCount || 0} votes)
                        </span>
                        <span class="movie-views">
                            <i class="fas fa-eye"></i> ${movie.views || 0} views
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="movie-body">
                <div class="movie-actions">
                    <a href="${movie.downloadUrl || '#'}" target="_blank" class="action-btn download-btn">
                        <i class="fas fa-download"></i> Download
                    </a>
                    <button class="action-btn favorite-btn ${isFavorite ? 'active' : ''}" id="favoriteBtn">
                        <i class="fas fa-heart"></i> ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
                
                <div class="movie-section">
                    <h2>Stream Movie</h2>
                    
                    <div class="server-selection" id="serverSelection"></div>
                    
                    <div class="player-container" id="playerContainer">
                        <div class="player-header">
                            <div class="player-title">${movie.title} - Server ${currentServer}</div>
                        </div>
                        
                        <div class="video-player-area" id="videoPlayerArea">
                            <video id="videoPlayer" class="video-filter" playsinline></video>
                            <iframe id="iframePlayer" allowfullscreen></iframe>
                            
                            ${isIframeUrl(movie.streamUrl) ? `
                            <div class="vpn-note" id="vpnNote">
                                <i class="fas fa-shield-alt"></i>
                                <span>VPN recommended for better streaming</span>
                            </div>
                            ` : ''}
                            
                            <!-- Video Player Controls (Only for video, hidden for iframe) -->
                            <div class="player-controls" id="playerControls">
                                <div class="control-group">
                                    <button class="control-btn play-btn" id="playPauseBtn">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button class="control-btn" id="rewindBtn">
                                        <i class="fas fa-backward"></i>
                                    </button>
                                    <button class="control-btn" id="forwardBtn">
                                        <i class="fas fa-forward"></i>
                                    </button>
                                    <div class="volume-control">
                                        <button class="control-btn" id="muteBtn">
                                            <i class="fas fa-volume-up"></i>
                                        </button>
                                        <input type="range" class="volume-slider" id="volumeSlider" min="0" max="1" step="0.1" value="0.5">
                                    </div>
                                    <div class="time-display" id="timeDisplay">00:00 / 00:00</div>
                                </div>
                                <div class="control-group">
                                    <button class="control-btn" id="fullscreenBtn">
                                        <i class="fas fa-expand"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Progress bar for video -->
                            <div class="progress-bar" id="progressBar">
                                <div class="progress-fill" id="progressFill"></div>
                            </div>
                            
                            <!-- Only the iframe fullscreen button -->
                            <button class="iframe-fullscreen-btn" id="iframeFullscreenBtn">
                                <i class="fas fa-expand"></i>
                            </button>
                            
                            <div class="loading-overlay" id="loadingOverlay">
                                <div class="loading-spinner"></div>
                                <div>Loading stream...</div>
                            </div>
                            
                            <div class="buffering-indicator" id="bufferingIndicator">
                                <div class="loading-spinner" style="width: 20px; height: 20px; border-width: 3px;"></div>
                                <span>Buffering...</span>
                            </div>
                            
                            <div class="error-message" id="errorMessage" style="display: none;"></div>
                            
                            <div class="fullscreen-exit-hint">
                                Press ESC to exit fullscreen
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="movie-section">
                    <h2>Director</h2>
                    <p class="movie-director">${Array.isArray(movie.director) ? movie.director.join(', ') : movie.director}</p>
                    <h2>Cast</h2>
                    <p class="movie-cast">${Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast}</p>
                    <h2>Synopsis</h2>
                    <p class="movie-description">${movie.content}</p>
                    <h2>KeyWord</h2>
                     <p class="movie-cast">${Array.isArray(movie.keywords) ? movie.keywords.join(', ') : movie.keywords}</p>
                </div>
                
                <div class="rating-section">
                    <div class="rating-title">Rate this Movie</div>
                    <div class="current-rating">
                        <div class="rating-value">${rating}/5</div>
                        <div class="rating-count">Based on ${movie.ratingCount || 0} ratings</div>
                    </div>
                    
                    <div class="star-rating" id="starRating">
                        <input type="radio" id="star5" name="rating" value="5">
                        <label for="star5" title="5 stars">★</label>
                        <input type="radio" id="star4" name="rating" value="4">
                        <label for="star4" title="4 stars">★</label>
                        <input type="radio" id="star3" name="rating" value="3">
                        <label for="star3" title="3 stars">★</label>
                        <input type="radio" id="star2" name="rating" value="2">
                        <label for="star2" title="2 stars">★</label>
                        <input type="radio" id="star1" name="rating" value="1">
                        <label for="star1" title="1 star">★</label>
                    </div>
                    <div class="rating-message" id="ratingMessage"></div>
                </div>
                
                <div class="info-grid">
                    <div class="info-card">
                        <h3>Genre</h3>
                        <p>${movie.genre}</p>
                    </div>
                    <div class="info-card">
                        <h3>Quality</h3>
                        <p>HD 1080p</p>
                    </div>
                    <div class="info-card">
                        <h3>Available Servers</h3>
                        <p>${1 + (hasStream2 ? 1 : 0) + (hasStream3 ? 1 : 0) + (hasStream4 ? 1 : 0)}</p>
                    </div>
                    <div class="info-card">
                        <h3>Download Available</h3>
                        <p>${movie.downloadUrl ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
        
        ${relatedMovies.length > 0 ? `
        <div class="related-movies">
            <h2>More ${movie.genre} Movies</h2>
            <div class="movies-grid">
                ${relatedMovies.map(relatedMovie => `
                    <div class="related-movie-card" data-id="${relatedMovie.id}">
                        <img src="${relatedMovie.poster}" 
                             alt="${relatedMovie.title}" 
                             class="related-poster"
                             onerror="this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'">
                        <div class="related-info">
                            <div class="related-title">${relatedMovie.title}</div>
                            <div class="related-genre">${relatedMovie.genre}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;
    
    setupServerSelection(movie);
    
    setTimeout(() => {
        loadStream(currentServer);
    }, 100);
    
    setupMovieDetailEvents(movie);
}

function getStreamType(url) {
    if (!url || url === 'xxxx-xxxxxx-xxxxxx-xxxxxx') return 'invalid';
    
    const urlLower = url.toLowerCase();
    
    if (urlLower.match(/\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv|m4v|3gp)(\?|$)/i)) {
        return 'direct_video';
    }
    
    if (urlLower.match(/\.(m3u8)(\?|$)/i) || 
        urlLower.includes('/hls/') || 
        urlLower.includes('/master.m3u8') ||
        urlLower.includes('/playlist.m3u8')) {
        return 'hls';
    }
    
    if (urlLower.match(/\.(mpd)(\?|$)/i) || 
        urlLower.includes('/dash/') ||
        urlLower.includes('.mpd?')) {
        return 'dash';
    }
    
    if (urlLower.startsWith('rtmp://') || 
        urlLower.startsWith('rtmps://')) {
        return 'rtmp';
    }
    
    const streamingSites = [
        'embed', 'player.', 'iframe', 'stream.',
        'vidsrc.', 'daddyhd.', 'short.icu',
        '2embed.', 'vidcloud.', 'vidsrc.pro',
        'vidsrc.to', 'vidsrc.net', 'vidsrc.stream',
        'multiembed.', 'embedsito.', 'playerones.',
        'smashystream.', 'vidplay.', 'databasegdriveplayer.',
        'streamtape.com', 'mixdrop.co', 'dropload.io',
        'upstream.to', 'filemoon.sx', 'voe.sx',
        'streamwish.to', 'mega.nz', 'googleapis.com',
        'cloudflare.com', 'akamaized.net'
    ];
    
    for (const site of streamingSites) {
        if (urlLower.includes(site)) {
            return 'iframe';
        }
    }
    
    const embedPaths = ['/embed/', '/v/', '/e/', '/player/', '/stream/', '/play/', '/watch/'];
    for (const path of embedPaths) {
        if (urlLower.includes(path)) {
            return 'iframe';
        }
    }
    
    return 'iframe';
}

function isIframeUrl(url) {
    const streamType = getStreamType(url);
    return streamType === 'iframe';
}

function setupServerSelection(movie) {
    const serverSelection = document.getElementById('serverSelection');
    const servers = [
        { id: '1', name: 'Server 1', url: movie.streamUrl },
        { id: '2', name: 'Server 2', url: movie.stream2Url },
        { id: '3', name: 'Server 3', url: movie.stream3Url },
        { id: '4', name: 'Server 4', url: movie.stream4Url }
    ];
    
    serverSelection.innerHTML = '';
    
    servers.forEach(server => {
        if (server.url && server.url !== 'xxxx-xxxxxx-xxxxxx-xxxxxx') {
            const streamType = getStreamType(server.url);
            let buttonText = server.name;
            
            switch(streamType) {
                case 'hls':
                    buttonText += '';
                    break;
                case 'direct_video':
                    buttonText += ' ';
                    break;
                case 'iframe':
                    buttonText += ' ';
                    break;
            }
            
            const button = document.createElement('button');
            button.className = `server-btn server${server.id} ${server.id === currentServer ? 'active' : ''}`;
            button.textContent = buttonText;
            button.dataset.server = server.id;
            button.dataset.url = server.url;
            button.dataset.type = streamType;
            
            button.addEventListener('click', () => {
                currentServer = server.id;
                loadStream(server.id);
            });
            
            serverSelection.appendChild(button);
        }
    });
}

function loadStream(serverNumber) {
    if (!currentMovie) return;
    
    let streamUrl = '';
    switch(serverNumber) {
        case '1': streamUrl = currentMovie.streamUrl; break;
        case '2': streamUrl = currentMovie.stream2Url; break;
        case '3': streamUrl = currentMovie.stream3Url; break;
        case '4': streamUrl = currentMovie.stream4Url; break;
    }
    
    if (!streamUrl || streamUrl === 'xxxx-xxxxxx-xxxxxx-xxxxxx') {
        showError('Stream not available on this server. Please try another server.');
        return;
    }
    
    console.log(`Loading stream from server ${serverNumber}`);
    console.log(`Stream type: ${getStreamType(streamUrl)}`);
    
    document.querySelectorAll('.server-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.server === serverNumber) {
            btn.classList.add('active');
        }
    });
    
    document.getElementById('loadingOverlay').style.display = 'flex';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('bufferingIndicator').classList.remove('active');
    videoError = false;
    
    if (hlsPlayer) {
        hlsPlayer.destroy();
        hlsPlayer = null;
    }
    
    if (dashPlayer) {
        dashPlayer.destroy();
        dashPlayer = null;
    }
    
    const videoPlayer = document.getElementById('videoPlayer');
    const iframePlayer = document.getElementById('iframePlayer');
    const videoPlayerArea = document.getElementById('videoPlayerArea');
    const playerControls = document.getElementById('playerControls');
    const progressBar = document.getElementById('progressBar');
    const iframeFullscreenBtn = document.getElementById('iframeFullscreenBtn');
    
    videoPlayer.style.display = 'none';
    iframePlayer.style.display = 'none';
    
    videoPlayer.pause();
    videoPlayer.src = '';
    videoPlayer.load();
    
    iframePlayer.src = '';
    
    const playerTitle = document.querySelector('.player-title');
    
    if (playerTitle) {
        playerTitle.textContent = `${currentMovie.title} - Server ${serverNumber}`;
    }
    
    const streamType = getStreamType(streamUrl);
    
    isIframeMode = streamType === 'iframe';
    
    if (isIframeMode) {
        // Hide video controls, show only iframe fullscreen button
        playerControls.style.display = 'none';
        progressBar.style.display = 'none';
        iframeFullscreenBtn.style.display = 'flex';
        videoPlayerArea.classList.add('iframe-mode');
    } else {
        // Show video controls, hide iframe fullscreen button
        playerControls.style.display = 'flex';
        progressBar.style.display = 'block';
        iframeFullscreenBtn.style.display = 'none';
        videoPlayerArea.classList.remove('iframe-mode');
    }
    
    switch(streamType) {
        case 'direct_video':
            loadDirectVideo(streamUrl, videoPlayer);
            break;
            
        case 'hls':
            loadHlsStream(streamUrl, videoPlayer);
            break;
            
        case 'dash':
            loadDashStream(streamUrl, videoPlayer);
            break;
            
        case 'iframe':
        default:
            loadIframeEmbed(streamUrl, iframePlayer);
            break;
    }
}

function loadDirectVideo(url, videoPlayer) {
    videoPlayer.style.display = 'block';
    
    videoPlayer.src = url;
    videoPlayer.type = getVideoMimeType(url);
    
    videoPlayer.addEventListener('loadeddata', () => {
        console.log('Direct video loaded');
        document.getElementById('loadingOverlay').style.display = 'none';
        videoPlayer.volume = volume;
        videoPlayer.muted = isMuted;
        
        videoPlayer.play().catch(e => {
            console.log('Autoplay prevented:', e);
            videoPlayer.muted = true;
            videoPlayer.play();
            isPlaying = true;
            updatePlayPauseButton();
        });
    });
    
    videoPlayer.onerror = (e) => {
        console.error('Direct video error:', e);
        showError('Failed to load video. The file may be corrupted or unavailable.');
    };
    
    initVideoPlayerControls();
}

function loadHlsStream(url, videoPlayer) {
    videoPlayer.style.display = 'block';
    
    if (Hls.isSupported()) {
        hlsPlayer = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            debug: false,
            autoStartLoad: true,
            startLevel: -1,
            capLevelToPlayerSize: true,
            maxBufferSize: 60 * 1000 * 1000,
            maxBufferHole: 0.5
        });
        
        hlsPlayer.loadSource(url);
        hlsPlayer.attachMedia(videoPlayer);
        
        hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('HLS manifest parsed');
            document.getElementById('loadingOverlay').style.display = 'none';
            videoPlayer.volume = volume;
            videoPlayer.muted = isMuted;
            
            videoPlayer.play().catch(e => {
                console.log('Autoplay prevented:', e);
                videoPlayer.muted = true;
                videoPlayer.play();
                isPlaying = true;
                updatePlayPauseButton();
            });
        });
        
        hlsPlayer.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS.js error:', data);
            
            if (data.fatal) {
                switch(data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.log('Network error, trying to recover');
                        hlsPlayer.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log('Media error, trying to recover');
                        hlsPlayer.recoverMediaError();
                        break;
                    default:
                        console.log('Fatal HLS error, destroying instance');
                        hlsPlayer.destroy();
                        showError('HLS stream error. Please try another server.');
                        break;
                }
            }
        });
    } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        videoPlayer.src = url;
        videoPlayer.addEventListener('loadedmetadata', () => {
            console.log('Native HLS loaded');
            document.getElementById('loadingOverlay').style.display = 'none';
            videoPlayer.volume = volume;
            videoPlayer.muted = isMuted;
            
            videoPlayer.play().catch(e => {
                console.log('Autoplay prevented:', e);
                videoPlayer.muted = true;
                videoPlayer.play();
                isPlaying = true;
                updatePlayPauseButton();
            });
        });
        
        videoPlayer.onerror = (e) => {
            console.error('Native HLS error:', e);
            showError('Failed to load HLS stream. The server may be down.');
        };
    } else {
        showError('Your browser does not support HLS streaming. Please try a modern browser like Chrome, Firefox, or Safari.');
        return;
    }
    
    initVideoPlayerControls();
}

function loadDashStream(url, videoPlayer) {
    videoPlayer.style.display = 'block';
    
    if (typeof dashjs !== 'undefined') {
        dashPlayer = dashjs.MediaPlayer().create();
        dashPlayer.initialize(videoPlayer, url, true);
        
        dashPlayer.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
            console.log('DASH stream initialized');
            document.getElementById('loadingOverlay').style.display = 'none';
            videoPlayer.volume = volume;
            videoPlayer.muted = isMuted;
            
            videoPlayer.play().catch(e => {
                console.log('Autoplay prevented:', e);
                videoPlayer.muted = true;
                videoPlayer.play();
                isPlaying = true;
                updatePlayPauseButton();
            });
        });
        
        dashPlayer.on(dashjs.MediaPlayer.events.ERROR, (e) => {
            console.error('DASH.js error:', e);
            showError('Failed to load DASH stream. Please try another server.');
        });
    } else {
        showError('DASH streaming requires dash.js library. Loading as direct video...');
        loadDirectVideo(url, videoPlayer);
    }
    
    initVideoPlayerControls();
}

function loadIframeEmbed(url, iframePlayer) {
    iframePlayer.style.display = 'block';
    
    let embedUrl = url;
    
    if (!embedUrl.includes('?')) {
        embedUrl += '?';
    } else {
        embedUrl += '&';
    }
    
    embedUrl += 'autoplay=1&mute=0';
    
    iframePlayer.setAttribute('src', embedUrl);
    iframePlayer.setAttribute('allowfullscreen', 'true');
    iframePlayer.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope');
    iframePlayer.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    iframePlayer.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation allow-popups allow-forms');
    
    const loadTimeout = setTimeout(() => {
        if (document.getElementById('loadingOverlay').style.display !== 'none') {
            showError('Stream loading timeout. The site might be blocking embedding or is slow to respond.');
        }
    }, 20000);
    
    iframePlayer.onload = () => {
        clearTimeout(loadTimeout);
        console.log('Iframe loaded successfully');
        document.getElementById('loadingOverlay').style.display = 'none';
        
        try {
            iframePlayer.contentWindow.focus();
        } catch (e) {}
        
        setupIframeFullscreenButton();
    };
    
    iframePlayer.onerror = () => {
        clearTimeout(loadTimeout);
        console.error('Iframe failed to load');
        
        let hostname = 'the streaming site';
        try {
            const urlObj = new URL(url);
            hostname = urlObj.hostname;
        } catch (e) {}
        
        showError(`Failed to load stream from ${hostname}.<br><br>
        Possible solutions:<br>
        1. Try another server<br>
        2. Disable ad blocker for this site<br>
        3. Use a VPN if the content is geo-blocked<br>
        4. The stream might be temporarily unavailable`);
    };
}

function setupIframeFullscreenButton() {
    const iframeFullscreenBtn = document.getElementById('iframeFullscreenBtn');
    const playerContainer = document.getElementById('playerContainer');
    
    if (iframeFullscreenBtn) {
        iframeFullscreenBtn.onclick = function() {
            toggleFullscreen();
        };
    }
}

function getVideoMimeType(url) {
    const extension = url.split('.').pop().split('?')[0].toLowerCase();
    
    switch(extension) {
        case 'mp4':
            return 'video/mp4';
        case 'webm':
            return 'video/webm';
        case 'ogg':
            return 'video/ogg';
        case 'avi':
            return 'video/x-msvideo';
        case 'mov':
            return 'video/quicktime';
        case 'wmv':
            return 'video/x-ms-wmv';
        case 'flv':
            return 'video/x-flv';
        case 'mkv':
            return 'video/x-matroska';
        case 'm4v':
            return 'video/x-m4v';
        case '3gp':
            return 'video/3gpp';
        default:
            return 'video/mp4';
    }
}

function initVideoPlayerControls() {
    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const timeDisplay = document.getElementById('timeDisplay');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressFill = document.getElementById('progressFill');
    const progressBar = document.getElementById('progressBar');
    const bufferingIndicator = document.getElementById('bufferingIndicator');
    const videoPlayerArea = document.getElementById('videoPlayerArea');
    const playerContainer = document.getElementById('playerContainer');

    videoPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });
    
    videoPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
    
    videoPlayer.addEventListener('volumechange', () => {
        updateMuteButton();
        volumeSlider.value = videoPlayer.volume;
    });
    
    videoPlayer.addEventListener('timeupdate', updateTimeDisplay);
    videoPlayer.addEventListener('loadedmetadata', updateTimeDisplay);
    
    videoPlayer.addEventListener('waiting', () => {
        bufferingIndicator.classList.add('active');
        buffering = true;
    });
    
    videoPlayer.addEventListener('playing', () => {
        bufferingIndicator.classList.remove('active');
        buffering = false;
    });
    
    videoPlayer.addEventListener('timeupdate', () => {
        if (videoPlayer.duration) {
            const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
            progressFill.style.width = `${progress}%`;
        }
    });
    
    progressBar.addEventListener('click', (e) => {
        if (!videoPlayer.duration) return;
        const rect = e.target.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoPlayer.currentTime = pos * videoPlayer.duration;
    });
    
    videoPlayer.volume = volumeSlider.value;
    videoPlayer.muted = isMuted;
    volume = videoPlayer.volume;
    updateMuteButton();
    
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            videoPlayer.pause();
        } else {
            videoPlayer.play().catch(e => {
                console.log('Play failed:', e);
                videoPlayer.muted = true;
                videoPlayer.play();
            });
        }
    });
    
    rewindBtn.addEventListener('click', () => {
        videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 10);
    });
    
    forwardBtn.addEventListener('click', () => {
        videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 10);
    });
    
    muteBtn.addEventListener('click', () => {
        videoPlayer.muted = !videoPlayer.muted;
        isMuted = videoPlayer.muted;
        updateMuteButton();
    });
    
    volumeSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        videoPlayer.volume = value;
        videoPlayer.muted = value === 0;
        isMuted = videoPlayer.muted;
        volume = value;
        updateMuteButton();
    });
    
    fullscreenBtn.onclick = function() {
        toggleFullscreen();
    };
    
    videoPlayerArea.addEventListener('mousemove', showPlayerControls);
    videoPlayerArea.addEventListener('mouseleave', hidePlayerControls);
    
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT') return;
        
        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                if (!isIframeMode) {
                    if (isPlaying) {
                        videoPlayer.pause();
                    } else {
                        videoPlayer.play();
                    }
                }
                break;
            case 'm':
                e.preventDefault();
                if (!isIframeMode) {
                    videoPlayer.muted = !videoPlayer.muted;
                    isMuted = videoPlayer.muted;
                    updateMuteButton();
                }
                break;
            case 'f':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'Escape':
                if (isFullscreen) {
                    exitFullscreen();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (!isIframeMode) {
                    videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 10);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (!isIframeMode) {
                    videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + 10);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isIframeMode) {
                    videoPlayer.volume = Math.min(1, videoPlayer.volume + 0.1);
                    volumeSlider.value = videoPlayer.volume;
                    updateMuteButton();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isIframeMode) {
                    videoPlayer.volume = Math.max(0, videoPlayer.volume - 0.1);
                    volumeSlider.value = videoPlayer.volume;
                    updateMuteButton();
                }
                break;
        }
    });
    
    function updatePlayPauseButton() {
        const icon = playPauseBtn.querySelector('i');
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    
    function updateMuteButton() {
        const icon = muteBtn.querySelector('i');
        if (videoPlayer.muted || videoPlayer.volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (videoPlayer.volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }
    
    function updateTimeDisplay() {
        const currentTime = formatTime(videoPlayer.currentTime);
        const duration = formatTime(videoPlayer.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    }
    
    function showPlayerControls() {
        const playerControls = document.getElementById('playerControls');
        playerControls.style.opacity = '1';
        
        if (controlsTimeout) clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (isPlaying && !isIframeMode) {
                playerControls.style.opacity = '0.3';
            }
        }, 3000);
    }
    
    function hidePlayerControls() {
        const playerControls = document.getElementById('playerControls');
        if (isPlaying && !isIframeMode) {
            playerControls.style.opacity = '0.3';
        }
    }
    
    updateFullscreenButton();
}

function toggleFullscreen() {
    const playerContainer = document.getElementById('playerContainer');
    const iframePlayer = document.getElementById('iframePlayer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && !document.msFullscreenElement) {
        
        if (playerContainer.requestFullscreen) {
            playerContainer.requestFullscreen();
        } else if (playerContainer.webkitRequestFullscreen) {
            playerContainer.webkitRequestFullscreen();
        } else if (playerContainer.mozRequestFullScreen) {
            playerContainer.mozRequestFullScreen();
        } else if (playerContainer.msRequestFullscreen) {
            playerContainer.msRequestFullscreen();
        }
        
        if (isIframeMode) {
            iframePlayer.classList.add('fullscreen-iframe');
        } else {
            videoPlayer.classList.add('fullscreen-video');
        }
        
        isFullscreen = true;
        updateFullscreenButton();
        
        setTimeout(() => {
            if (isIframeMode) {
                try {
                    iframePlayer.contentWindow.focus();
                } catch (e) {}
            }
        }, 100);
    } else {
        exitFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    const iframePlayer = document.getElementById('iframePlayer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (iframePlayer) {
        iframePlayer.classList.remove('fullscreen-iframe');
    }
    
    if (videoPlayer) {
        videoPlayer.classList.remove('fullscreen-video');
    }
    
    isFullscreen = false;
    updateFullscreenButton();
}

function updateFullscreenButton() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const iframeFullscreenBtn = document.getElementById('iframeFullscreenBtn');
    
    if (fullscreenBtn) {
        const icon = fullscreenBtn.querySelector('i');
        if (icon) {
            icon.className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
        }
    }
    
    if (iframeFullscreenBtn) {
        const icon = iframeFullscreenBtn.querySelector('i');
        if (icon) {
            icon.className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
        }
    }
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showError(message) {
    document.getElementById('loadingOverlay').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'block';
    document.getElementById('errorMessage').innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e50914; margin-bottom: 1rem;"></i>
        <h3>${message}</h3>
        <p>Please try another server or check your internet connection.</p>
        <button class="back-btn" style="margin-top: 1rem;" onclick="location.reload()">
            <i class="fas fa-redo"></i> Retry
        </button>
        <button class="back-btn" style="margin-top: 1rem; margin-left: 10px;" onclick="tryNextServer()">
            <i class="fas fa-server"></i> Try Next Server
        </button>
    `;
    videoError = true;
}

function tryNextServer() {
    const currentServerNum = parseInt(currentServer);
    const nextServer = currentServerNum < 4 ? currentServerNum + 1 : 1;
    currentServer = nextServer.toString();
    loadStream(currentServer);
}

function setupMovieDetailEvents(movie) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const starRating = document.getElementById('starRating');
    const ratingMessage = document.getElementById('ratingMessage');
    
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            const index = favorites.indexOf(movie.id);
            
            if (index === -1) {
                favorites.push(movie.id);
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
                favoriteBtn.classList.add('active');
            } else {
                favorites.splice(index, 1);
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
                favoriteBtn.classList.remove('active');
            }
            
            localStorage.setItem('movieStreamFavorites', JSON.stringify(favorites));
        });
    }
    
    if (starRating) {
        starRating.addEventListener('click', (e) => {
            if (e.target.type === 'radio') {
                const ratingValue = parseInt(e.target.value);
                
                ratingMessage.textContent = `Thank you for your ${ratingValue} star rating!`;
                ratingMessage.style.color = 'var(--success-color)';
                
                saveRating(movie.id, ratingValue);
            }
        });
    }
    
    document.querySelectorAll('.related-movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.dataset.id;
            window.location.href = `movie-detail.html?id=${movieId}`;
        });
    });
    
    window.addEventListener('beforeunload', () => {
        if (hlsPlayer) {
            hlsPlayer.destroy();
        }
        if (dashPlayer) {
            dashPlayer.destroy();
        }
        const videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.src = '';
        }
        const iframePlayer = document.getElementById('iframePlayer');
        if (iframePlayer) {
            iframePlayer.src = '';
        }
    });
}

function saveRating(movieId, rating) {
    const ratings = JSON.parse(localStorage.getItem('movieStreamRatings') || '{}');
    ratings[movieId] = rating;
    localStorage.setItem('movieStreamRatings', JSON.stringify(ratings));
}

function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    document.addEventListener('fullscreenchange', () => {
        isFullscreen = !!document.fullscreenElement;
        updateFullscreenButton();
        
        if (!isFullscreen) {
            const iframePlayer = document.getElementById('iframePlayer');
            const videoPlayer = document.getElementById('videoPlayer');
            
            if (iframePlayer) {
                iframePlayer.classList.remove('fullscreen-iframe');
            }
            
            if (videoPlayer) {
                videoPlayer.classList.remove('fullscreen-video');
            }
        }
    });
    
    document.addEventListener('webkitfullscreenchange', () => {
        isFullscreen = !!document.webkitFullscreenElement;
        updateFullscreenButton();
    });
    
    document.addEventListener('mozfullscreenchange', () => {
        isFullscreen = !!document.mozFullScreenElement;
        updateFullscreenButton();
    });
    
    document.addEventListener('msfullscreenchange', () => {
        isFullscreen = !!document.msFullscreenElement;
        updateFullscreenButton();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isFullscreen) {
            exitFullscreen();
        }
    });
}

// Load required libraries
if (!window.dashjs) {
    const dashScript = document.createElement('script');
    dashScript.src = 'https://cdn.dashjs.org/latest/dash.all.min.js';
    dashScript.onload = () => console.log('dash.js loaded');
    document.head.appendChild(dashScript);
}

if (!window.Hls) {
    const hlsScript = document.createElement('script');
    hlsScript.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    hlsScript.onload = () => console.log('Hls.js loaded');
    document.head.appendChild(hlsScript);
}

document.addEventListener('DOMContentLoaded', init);