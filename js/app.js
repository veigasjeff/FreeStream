// Main Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('App loaded');
    
    (function(s){s.dataset.zone='10297164',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));

    (function(s){s.dataset.zone='10333131',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));

    Initialize
    loadData();
    setupEventListeners();
    setupMobileMenu();
});


   // Load Google Analytics
    (function() {
        var gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-RTHH33WQWQ';
        document.head.appendChild(gaScript);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RTHH33WQWQ');
    })();
    
    // Load Clicky Analytics
    // (function() {
    //     var clickyScript = document.createElement('script');
    //     clickyScript.async = true;
    //     clickyScript.setAttribute('data-id', '101498160');
    //     clickyScript.src = '//static.getclicky.com/js';
    //     document.head.appendChild(clickyScript);
    // })();

// ===== GLOBAL VARIABLES =====
let moviesData = [];
let filteredMovies = [];
let currentView = 'grid';
let currentCategory = 'all';
let visibleMovies = 9;
let isLoading = false;

// YouTube API Variables
let youtubePlayer = null;
let youtubeAPILoaded = false;


// ===== DOM ELEMENTS =====
const featuredMoviesEl = document.getElementById('featuredMovies');
const categoriesGridEl = document.getElementById('categoriesGrid');
const moviesGridEl = document.getElementById('moviesGrid');
const languagesGridEl = document.getElementById('languagesGrid');
const liveChannelsEl = document.getElementById('liveChannels');
const searchInput = document.getElementById('searchInput');
const heroSearchInput = document.getElementById('heroSearch');
const searchBtn = document.getElementById('searchBtn');
const heroSearchBtn = document.getElementById('heroSearchBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const movieModal = document.getElementById('movieModal');
const playerModal = document.getElementById('playerModal');
const ageModal = document.getElementById('ageModal');
const backToTopBtn = document.getElementById('backToTop');
const loadingOverlay = document.getElementById('loadingOverlay');
const closeModalBtns = document.querySelectorAll('.close-modal');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const faqQuestions = document.querySelectorAll('.faq-question');
const ageConfirmBtn = document.getElementById('ageConfirm');
const ageDenyBtn = document.getElementById('ageDeny');

// ===== YOUTUBE API FUNCTIONS (EXACT FROM GENERATE-MOVIES.JS) =====
function loadYouTubeAPI() {
    if (youtubeAPILoaded) return;
    
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    youtubeAPILoaded = true;
}

window.onYouTubeIframeAPIReady = function() {
    console.log('YouTube API ready');
};

function initYouTubePlayer(videoId, containerId = 'videoContainer') {
    if (youtubePlayer) {
        youtubePlayer.destroy();
    }
    
    youtubePlayer = new YT.Player(containerId, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'mute': 1,
            'playsinline': 1,
            'rel': 0,
            'loop': 1,
            'modestbranding': 1,
            'controls': 1,
            'showinfo': 0,
            'playlist': videoId
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    
    return youtubePlayer;
}

function onPlayerReady(event) {
    console.log('YouTube player ready');
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    console.log('Player state changed:', event.data);
}

function stopYouTubePlayer() {
    if (youtubePlayer) {
        try {
            youtubePlayer.stopVideo();
            youtubePlayer.destroy();
        } catch (e) {
            console.log('Error stopping YouTube player:', e);
        }
        youtubePlayer = null;
    }
}

function stopIframeVideos() {
    const videoContainer = document.getElementById('videoContainer');
    const iframe = videoContainer.querySelector('iframe');
    if (iframe) {
        const currentSrc = iframe.src;
        iframe.dataset.src = currentSrc;
        iframe.src = '';
        
        try {
            iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        } catch (e) {
            // Ignore errors
        }
    }
}

function stopAllVideos() {
    stopYouTubePlayer();
    stopIframeVideos();
}

// ===== INITIALIZATION =====
async function init() {
    showLoading();
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        moviesData = data.movies;
        filteredMovies = [...moviesData];
        
        // Populate all sections
        populateFeaturedMovies();
        populateCategories(data.genres);
        populateMovies();
        populateLanguages(data.language);
        populateLiveChannels();
        
        hideLoading();
        
        // Check age verification
        checkAgeVerification();
        
        // Load YouTube API
        loadYouTubeAPI();
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load movies. Please try again later.');
        hideLoading();
    }
}

// ===== POPULATE SECTIONS =====
function populateFeaturedMovies() {
    const featured = moviesData.slice(0, 6);
    featuredMoviesEl.innerHTML = featured.map(movie => {
        const rating = movie.ratingCount > 0 ? 
            (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
        const hasYouTube = movie.playUrl && movie.playUrl.trim() !== '';
        
        return `
            <div class="featured-card" data-id="${movie.id}">
                <div class="featured-badge">🔥 Trending</div>
                <img src="${movie.poster}" alt="${movie.title}" 
                     onerror="this.src='https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
                <div class="featured-content">
                    <h3>${movie.title}</h3>
                    <p>${movie.description.substring(0, 100)}...</p>
                    <div class="featured-rating">
                        <span class="stars">${'⭐'.repeat(Math.floor(rating))}</span>
                        <span>${rating}</span>
                    </div>
                    <button class="watch-btn" onclick="playMovie('${movie.id}')">
                        <i class="fas fa-play"></i> ${hasYouTube ? 'Watch Trailer' : 'Watch Now'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function populateCategories(genres) {
    categoriesGridEl.innerHTML = genres.map(genre => {
        const count = moviesData.filter(m => m.genre === genre).length;
        const icons = {
            'Action': 'fa-gun',
            'Comedy': 'fa-face-laugh',
            'Drama': 'fa-masks-theater',
            'Horror': 'fa-ghost',
            'Sci-Fi': 'fa-rocket',
            'Romance': 'fa-heart',
            'Thriller': 'fa-user-secret',
            'Adult': 'fa-eye-slash',
            'Adventure': 'fa-mountain-sun',
            'Fantasy': 'fa-dragon',
            'Crime': 'fa-handcuffs',
            'War': 'fa-shield-halved',
            'Biography': 'fa-user-pen',
            'History': 'fa-landmark',
            'Family': 'fa-users',
            'Mystery': 'fa-magnifying-glass'
        };
        
        return `
            <div class="category-card" data-category="${genre.toLowerCase()}" onclick="filterByCategory('${genre.toLowerCase()}')">
                <i class="fas ${icons[genre] || 'fa-film'}"></i>
                <h3>${genre}</h3>
                <span>${count} Movies</span>
            </div>
        `;
    }).join('');
}

function populateMovies() {
    const moviesToShow = filteredMovies.slice(0, visibleMovies);
    const viewClass = currentView === 'list' ? 'list-view' : '';
    
    moviesGridEl.innerHTML = moviesToShow.map(movie => {
        const rating = movie.ratingCount > 0 ? 
            (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
        const hasYouTube = movie.playUrl && movie.playUrl.trim() !== '';
        
        return `
            <div class="movie-card ${viewClass}" data-id="${movie.id}">
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}"
                         onerror="this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'">
                    <div class="movie-badge">${movie.language}</div>
                    ${hasYouTube ? `` : ''}
                </div>
                <div class="movie-content">
                    <h3>${movie.title}</h3>
                    <div class="movie-meta">
                        <div class="movie-rating">
                            ${'★'.repeat(Math.floor(rating))}
                            <span>${rating}</span>
                        </div>
                        <div class="movie-views">
                            <i class="fas fa-eye"></i> ${movie.views.toLocaleString()}
                        </div>
                    </div>
                    <div class="movie-genre">${movie.genre}</div>
                    <p class="movie-description">${movie.description.substring(0, 100)}...</p>
                    <div class="movie-actions">
                        <button class="watch-btn" onclick="playMovie('${movie.id}')">
                            <i class="fas fa-play"></i> Watch Now
                        </button>
                        <button class="details-btn" onclick="showMovieDetails('${movie.id}')">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Show/hide load more button
    loadMoreBtn.style.display = filteredMovies.length > visibleMovies ? 'flex' : 'none';
}

function populateLanguages(languages) {
    languagesGridEl.innerHTML = languages.map(language => {
        const count = moviesData.filter(m => m.language === language).length;
        const flags = {
            'English': '',
            'Hindi': '',
            'Telugu': '',
            'Tamil': '',
            'Korean': '',
            'Marathi': '',
            'Tagalog': '',
            'Kannada': '',
            'Malayalam': '',
            'Punjabi': '',
            'Gujarati': '',
            'Bengali': ''            
        };
        
        return `
            <div class="language-card" data-language="${language.toLowerCase()}" onclick="filterByLanguage('${language.toLowerCase()}')">
                <h3>${flags[language] || '🌐'} ${language}</h3>
                <span>${count} Movies</span>
            </div>
        `;
    }).join('');
}

function populateLiveChannels() {
    // First 6 channels visible initially
    const initialChannels = liveChannelsData.slice(0, 6);
    
    liveChannelsEl.innerHTML = initialChannels.map(channel => `
        <div class="live-channel">
            <div class="channel-header">
                <img src="${channel.logo}" alt="${channel.name}" 
                     onerror="this.src='https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
                <div class="live-badge">
                    <i class="fas fa-circle"></i> LIVE
                </div>
            </div>
            <div class="channel-content">
                <h3>${channel.name}</h3>
                <div class="channel-category">${channel.category}</div>
                <div class="channel-viewers">
                    <i class="fas fa-users"></i> ${channel.viewers} watching
                </div>
                <button class="watch-live-btn" onclick="playLiveChannel('${channel.id}')">
                    <i class="fas fa-play"></i> Watch Live
                </button>
            </div>
        </div>
    `).join('');
    
    // Add Load More button for Live TV if needed
    if (liveChannelsData.length > 6) {
        const loadMoreLiveBtn = document.createElement('div');
        loadMoreLiveBtn.className = 'load-more';
        loadMoreLiveBtn.innerHTML = `
            <button id="loadMoreLiveBtn" class="load-more-btn">
                <i class="fas fa-tv"></i> Load More Channels
            </button>
        `;
        liveChannelsEl.after(loadMoreLiveBtn);
        
        document.getElementById('loadMoreLiveBtn').addEventListener('click', loadMoreLiveChannels);
    }
}

let visibleLiveChannels = 6;
function loadMoreLiveChannels() {
    const moreChannels = liveChannelsData.slice(visibleLiveChannels, visibleLiveChannels + 6);
    
    if (moreChannels.length > 0) {
        moreChannels.forEach(channel => {
            const channelHTML = `
                <div class="live-channel">
                    <div class="channel-header">
                        <img src="${channel.logo}" alt="${channel.name}" 
                             onerror="this.src='https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
                        <div class="live-badge">
                            <i class="fas fa-circle"></i> LIVE
                        </div>
                    </div>
                    <div class="channel-content">
                        <h3>${channel.name}</h3>
                        <div class="channel-category">${channel.category}</div>
                        <div class="channel-viewers">
                            <i class="fas fa-users"></i> ${channel.viewers} watching
                        </div>
                        <button class="watch-live-btn" onclick="playLiveChannel('${channel.id}')">
                            <i class="fas fa-play"></i> Watch Live
                        </button>
                    </div>
                </div>
            `;
            liveChannelsEl.insertAdjacentHTML('beforeend', channelHTML);
        });
        
        visibleLiveChannels += 6;
        
        // Hide button if all channels loaded
        if (visibleLiveChannels >= liveChannelsData.length) {
            document.getElementById('loadMoreLiveBtn').style.display = 'none';
        }
    }
}

// ===== MOVIE FUNCTIONS =====
function showMovieDetails(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;
    
    const rating = movie.ratingCount > 0 ? 
        (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
    
    const modalContent = document.getElementById('movieModalContent');
    modalContent.innerHTML = `
        <div class="movie-details-header">
            <div class="movie-details-poster">
                <img src="${movie.poster}" alt="${movie.title}"
                     onerror="this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
            </div>
            <div class="movie-details-info">
                <h2>${movie.title}</h2>
                <div class="movie-details-meta">
                    <span class="meta-badge genre">${movie.genre}</span>
                    <span class="meta-badge language">${movie.language}</span>
                    <span class="meta-badge year">${new Date(movie.date).getFullYear()}</span>
                </div>
                <div class="movie-details-rating">
                    <div class="rating-stars">${'★'.repeat(5)}</div>
                    <div class="rating-value">${rating}/10</div>
                </div>
                <div class="movie-details-content">
                    <h3>Description</h3>
                    <p>${movie.content || movie.description}</p>
                </div>
                <div class="cast-crew">
                    <div class="cast-member">
                        <h4>Director</h4>
                        <p>${movie.director?.join(', ') || 'Not specified'}</p>
                    </div>
                    <div class="cast-member">
                        <h4>Cast</h4>
                        <p>${movie.cast?.slice(0, 3).join(', ') || 'Not specified'}</p>
                    </div>
                </div>
                <div class="movie-details-actions">
                    <button class="btn-primary" onclick="playMovie('${movie.id}')">
                        <i class="fas fa-play"></i> Watch Movie
                    </button>
                    ${movie.downloadUrl ? `
                    <a href="${movie.downloadUrl}" class="btn-secondary" target="_blank">
                        <i class="fas fa-download"></i> Download
                    </a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    movieModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== STREAMING FUNCTIONS (EXACT FROM GENERATE-MOVIES.JS) =====
function loadYouTubeStream(videoId) {
    stopAllVideos();
    
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '<div id="youtubePlayerContainer"></div>';
    
    // Load YouTube API and initialize player
    loadYouTubeAPI();
    
    if (window.YT && window.YT.Player) {
        initYouTubePlayer(videoId, 'youtubePlayerContainer');
    } else {
        // Fallback if API doesn't load
        const checkReady = setInterval(() => {
            if (window.YT && window.YT.Player) {
                clearInterval(checkReady);
                initYouTubePlayer(videoId, 'youtubePlayerContainer');
            }
        }, 100);
    }
}

function loadIframeStream(url) {
    stopAllVideos();
    
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `
        <iframe src="${url}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
    `;
}

function loadM3U8Stream(url) {
    stopAllVideos();
    
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `
        <video id="m3u8Player" controls autoplay style="width:100%;height:100%;">
            <source src="${url}" type="application/x-mpegURL">
            Your browser does not support the video tag.
        </video>
    `;
    
    // Initialize HLS.js for M3U8 streams if needed
    if (url.includes('.m3u8')) {
        if (Hls.isSupported()) {
            const video = document.getElementById('m3u8Player');
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }
    }
}

function extractYouTubeId(url) {
    if (!url) return '';
    
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        return match[2];
    }
    
    // If it's already just the ID
    if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
        return url;
    }
    
    return null;
}

function playMovie(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;
    
    const playerTitle = document.getElementById('playerTitle');
    const videoContainer = document.getElementById('videoContainer');
    const playerServers = document.getElementById('playerServers');
    
    playerTitle.textContent = `Now Playing: ${movie.title}`;
    
    // Get all available streams (EXACT FROM GENERATE-MOVIES.JS)
    const streams = [
        { name: 'YouTube Trailer', url: movie.playUrl, type: 'youtube' },
        { name: 'Server 1 (HD)', url: movie.streamUrl, type: 'iframe' },
        { name: 'Server 2', url: movie.stream2Url, type: 'iframe' },
        { name: 'Server 3', url: movie.stream3Url, type: 'iframe' },
        { name: 'Server 4 (Hindi Dubbed)', url: movie.stream4Url, type: 'iframe' }
    ].filter(stream => stream.url && stream.url.trim() !== '');
    
    // Auto-play YouTube trailer if available, otherwise first server
    const hasYouTube = movie.playUrl && movie.playUrl.trim() !== '';
    
    if (hasYouTube) {
        const youtubeId = extractYouTubeId(movie.playUrl);
        if (youtubeId) {
            loadYouTubeStream(youtubeId);
        } else {
            loadIframeStream(movie.playUrl);
        }
    } else if (movie.streamUrl && movie.streamUrl.trim() !== '') {
        loadIframeStream(movie.streamUrl);
    }
    
    // Create server options
    playerServers.innerHTML = `
        <h4>Available Servers</h4>
        <div class="server-buttons">
            ${streams.map((server, index) => `
                <button class="server-btn ${(hasYouTube && index === 0) || (!hasYouTube && index === 0) ? 'active' : ''}" 
                        onclick="switchServer('${server.url}', '${server.type}', this)">
                    <i class="fas fa-server"></i> ${server.name}
                </button>
            `).join('')}
        </div>
    `;
    
    playerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function playLiveChannel(channelId) {
    const channel = liveChannelsData.find(c => c.id === channelId);
    if (!channel) return;
    
    const playerTitle = document.getElementById('playerTitle');
    const videoContainer = document.getElementById('videoContainer');
    const playerServers = document.getElementById('playerServers');
    
    playerTitle.textContent = `Live: ${channel.name}`;
    
    // Check if it's M3U8 stream
    if (channel.streamUrl.includes('.m3u8')) {
        loadM3U8Stream(channel.streamUrl);
    } else {
        // Fallback to iframe
        loadIframeStream(channel.streamUrl);
    }
    
    playerServers.innerHTML = `
        <h4>Live Streaming</h4>
        <p>Enjoy live ${channel.name} broadcast</p>
        <div class="server-buttons">
            <button class="server-btn active">
                <i class="fas fa-satellite-dish"></i> Live Stream
            </button>
            <button class="server-btn" onclick="loadIframeStream('${channel.streamUrl}')">
                <i class="fas fa-wifi"></i> Alternative Stream
            </button>
        </div>
    `;
    
    playerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function switchServer(url, type, button) {
    // Update active button
    document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    if (type === 'youtube') {
        const youtubeId = extractYouTubeId(url);
        if (youtubeId) {
            loadYouTubeStream(youtubeId);
        } else {
            loadIframeStream(url);
        }
    } else {
        loadIframeStream(url);
    }
}

// ===== FILTER FUNCTIONS =====
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase() || heroSearchInput.value.toLowerCase();
    const category = currentCategory;
    
    filteredMovies = moviesData.filter(movie => {
        const matchesSearch = !searchTerm || 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.description.toLowerCase().includes(searchTerm) ||
            (movie.keywords && movie.keywords.toLowerCase().includes(searchTerm));
        
        const matchesCategory = category === 'all' || 
            movie.genre.toLowerCase() === category ||
            movie.language.toLowerCase() === category;
        
        return matchesSearch && matchesCategory;
    });
    
    visibleMovies = 9;
    populateMovies();
}

function filterByCategory(category) {
    currentCategory = category;
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    if (category === 'all') {
        filteredMovies = [...moviesData];
    } else {
        filteredMovies = moviesData.filter(movie => 
            movie.genre.toLowerCase() === category
        );
    }
    
    visibleMovies = 9;
    populateMovies();
    window.scrollTo({ top: moviesGridEl.offsetTop - 100, behavior: 'smooth' });
}

function filterByLanguage(language) {
    currentCategory = language;
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    filteredMovies = moviesData.filter(movie => 
        movie.language.toLowerCase() === language
    );
    
    visibleMovies = 9;
    populateMovies();
    window.scrollTo({ top: moviesGridEl.offsetTop - 100, behavior: 'smooth' });
}

// ===== UI FUNCTIONS =====
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    document.querySelector('.main-content').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

function checkAgeVerification() {
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) {
        setTimeout(() => {
            ageModal.classList.add('active');
        }, 1000);
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', init);

// Search functionality
searchBtn.addEventListener('click', filterMovies);
heroSearchBtn.addEventListener('click', filterMovies);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') filterMovies();
});
heroSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') filterMovies();
});

// Load more movies
loadMoreBtn.addEventListener('click', () => {
    visibleMovies += 9;
    populateMovies();
});

// Category filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterByCategory(btn.dataset.filter);
    });
});

// View toggle
viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        moviesGridEl.classList.toggle('list-view', currentView === 'list');
    });
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close modals
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        movieModal.classList.remove('active');
        playerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Stop all videos (EXACT FROM GENERATE-MOVIES.JS)
        stopAllVideos();
    });
});

// Age verification
ageConfirmBtn.addEventListener('click', () => {
    localStorage.setItem('ageVerified', 'true');
    ageModal.classList.remove('active');
});

ageDenyBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
});

// FAQ toggle
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Back to top
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target === movieModal) {
        movieModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === playerModal) {
        playerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopAllVideos();
    }
    if (e.target === ageModal) {
        ageModal.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        movieModal.classList.remove('active');
        playerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopAllVideos();
    }
    
    // Space to play first movie
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (moviesData.length > 0) {
            playMovie(moviesData[0].id);
        }
    }
});

// Auto-open player if URL has #watch
if (window.location.hash === '#watch' && moviesData.length > 0) {
    setTimeout(() => playMovie(moviesData[0].id), 1000);
}

// Add HLS.js for M3U8 support
const hlsScript = document.createElement('script');
hlsScript.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
document.head.appendChild(hlsScript);

console.log('🎬 FreeStream app.js loaded successfully!');