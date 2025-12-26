// // Global variables
// let moviesData = [];
// let filteredMovies = [];
// let favorites = JSON.parse(localStorage.getItem('moviestream_favorites') || '[]');
// let currentGenre = 'All';
// let youtubePlayer = null;

// // DOM Elements
// const moviesGrid = document.getElementById('moviesGrid');
// const genreButtons = document.getElementById('genreButtons');
// const heroSearch = document.getElementById('heroSearch');
// const heroSearchBtn = document.getElementById('heroSearchBtn');
// const movieDetailModal = document.getElementById('movieDetailModal');
// const closeModal = document.getElementById('closeModal');
// const movieDetailContent = document.getElementById('movieDetailContent');

// // Load movies from data.json
// async function loadMovies() {
//     try {
//         moviesGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading movies...</div>';

//         const response = await fetch('data.json');
//         if (!response.ok) {
//             throw new Error('Failed to load movies');
//         }

//         const data = await response.json();
//         moviesData = data.movies || [];

//         // Initialize genres from data
//         initGenres();

//         // Display all movies initially
//         displayMovies(moviesData);
        
//         // Generate dynamic movie schema
//         generateMovieSchema(moviesData);

//     } catch (error) {
//         console.error('Error loading movies:', error);
//         moviesGrid.innerHTML = `
//             <div class="loading" style="grid-column: 1/-1">
//                 <i class="fas fa-exclamation-triangle"></i>
//                 <p>Failed to load movies. Please refresh the page.</p>
//                 <button onclick="loadMovies()" style="margin-top: 15px; padding: 10px 20px; background: #e50914; color: white; border: none; border-radius: 5px; cursor: pointer;">
//                     Retry
//                 </button>
//             </div>
//         `;
//     }
// }

// // Generate dynamic movie schema for all movies
// function generateMovieSchema(movies) {
//     if (!movies || movies.length === 0) return;
    
//     const movieSchema = {
//         "@context": "https://schema.org",
//         "@type": "ItemList",
//         "itemListElement": movies.map((movie, index) => ({
//             "@type": "ListItem",
//             "position": index + 1,
//             "item": {
//                 "@type": "Movie",
//                 "@id": `https://freestreaming.vercel.app/movie-detail.html?id=${movie.id}`,
//                 "url": `https://freestreaming.vercel.app/movie-detail.html?id=${movie.id}`,
//                 "name": movie.title,
//                 "image": movie.poster.replace('../public/', 'https://freestreaming.vercel.app/'),
//                 "description": movie.description,
//                 "genre": movie.genre,
//                 "contentRating": "PG-13",
//                 "datePublished": "2025",
//                 "aggregateRating": {
//                     "@type": "AggregateRating",
//                     "ratingValue": movie.ratingCount > 0 ? (movie.ratingTotal / movie.ratingCount).toFixed(1) : "0.0",
//                     "ratingCount": movie.ratingCount || 0,
//                     "bestRating": "5",
//                     "worstRating": "0"
//                 },
//                 "duration": "PT2H",
//                 "director": {
//                     "@type": "Person",
//                     "name": Array.isArray(movie.director) ? movie.director[0] : movie.director
//                 },
//                 "actor": Array.isArray(movie.cast) ? movie.cast.map(actor => ({
//                     "@type": "Person",
//                     "name": actor
//                 })) : [{ "@type": "Person", "name": "Various Actors" }],
//                 "trailer": {
//                     "@type": "VideoObject",
//                     "name": `${movie.title} Trailer`,
//                     "description": movie.description,
//                     "thumbnailUrl": movie.poster.replace('../public/', 'https://freestreaming.vercel.app/'),
//                     "uploadDate": "2025-01-01",
//                     "contentUrl": `https://www.youtube.com/watch?v=${movie.playUrl || ''}`
//                 }
//             }
//         }))
//     };

//     // Add the schema to the page
//     const script = document.createElement('script');
//     script.type = 'application/ld+json';
//     script.textContent = JSON.stringify(movieSchema);
//     document.head.appendChild(script);
    
//     // Also add VideoObject schema for streaming
//     const videoSchema = {
//         "@context": "https://schema.org",
//         "@type": "VideoObject",
//         "name": "Free Movie Streaming Collection",
//         "description": "Collection of free movies available for streaming online",
//         "thumbnailUrl": "https://freestreaming.vercel.app/og-image.jpg",
//         "uploadDate": new Date().toISOString(),
//         "contentUrl": "https://freestreaming.vercel.app",
//         "embedUrl": "https://freestreaming.vercel.app",
//         "potentialAction": {
//             "@type": "WatchAction",
//             "target": "https://freestreaming.vercel.app"
//         }
//     };
    
//     const script2 = document.createElement('script');
//     script2.type = 'application/ld+json';
//     script2.textContent = JSON.stringify(videoSchema);
//     document.head.appendChild(script2);
    
//     // Log schema to console for Google
//     console.log('Movie Schema:', JSON.stringify(movieSchema, null, 2));
//     console.log('Video Schema:', JSON.stringify(videoSchema, null, 2));
// }

// // Initialize genre buttons
// function initGenres() {
//     const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Comedy', 'Horror', 'Romance', 'Thriller', 'Adult' ,'Adventure', 'Fantasy', 'Family', 'Mystery', 'Biography', 'History',  'War', 'TvSeries', 'News', 'Sports', 'TvSeries', 'TvShow' ];

//     genreButtons.innerHTML = '';

//     genres.forEach(genre => {
//         const button = document.createElement('button');
//         button.className = `genre-btn ${genre === 'All' ? 'active' : ''}`;
//         button.textContent = genre;
//         button.dataset.genre = genre;

//         button.addEventListener('click', () => {
//             // Remove active class from all buttons
//             document.querySelectorAll('.genre-btn').forEach(btn => {
//                 btn.classList.remove('active');
//             });

//             // Add active class to clicked button
//             button.classList.add('active');

//             // Filter movies by genre
//             filterMoviesByGenre(genre);
//         });

//         genreButtons.appendChild(button);
//     });
// }

// // Display movies in grid
// function displayMovies(movies) {
//     if (movies.length === 0) {
//         moviesGrid.innerHTML = '<div class="loading" style="grid-column: 1/-1">No movies found. Try a different search.</div>';
//         return;
//     }

//     moviesGrid.innerHTML = '';

//     movies.forEach(movie => {
//         const rating = movie.ratingCount > 0 ?
//             (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
//         const isFavorite = favorites.includes(movie.id);

//         const movieCard = document.createElement('div');
//         movieCard.className = 'movie-card';
//         movieCard.innerHTML = `
// <img 
//     src="${movie.poster}" 
//     alt="${movie.title}" 
//     class="movie-poster"
//     onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';"
//     style="filter: brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg);"
// >
// <div class="movie-info">
//     <div class="movie-title">${movie.title}</div>
//     <div class="movie-genre">${movie.genre}</div>
//     <div class="movie-rating">
//         <i class="fas fa-star"></i> ${rating} (${movie.ratingCount || 0})
//     </div>
// </div>
// `;

//         movieCard.addEventListener('click', () => {
//             showMovieDetail(movie);
//         });

//         moviesGrid.appendChild(movieCard);
//     });
// }

// // Filter movies by genre
// function filterMoviesByGenre(genre) {
//     currentGenre = genre;

//     if (genre === 'All') {
//         filteredMovies = [...moviesData];
//     } else {
//         filteredMovies = moviesData.filter(movie => movie.genre === genre);
//     }

//     // Apply search filter if exists
//     const searchTerm = heroSearch.value.trim().toLowerCase();
//     if (searchTerm) {
//         filteredMovies = filteredMovies.filter(movie =>
//             movie.title.toLowerCase().includes(searchTerm) ||
//             movie.genre.toLowerCase().includes(searchTerm)
//         );
//     }

//     displayMovies(filteredMovies);
// }

// // Search movies
// function searchMovies() {
//     const searchTerm = heroSearch.value.trim().toLowerCase();

//     if (currentGenre === 'All') {
//         filteredMovies = moviesData;
//     } else {
//         filteredMovies = moviesData.filter(movie => movie.genre === currentGenre);
//     }

//     if (searchTerm) {
//         filteredMovies = filteredMovies.filter(movie =>
//             movie.title.toLowerCase().includes(searchTerm) ||
//             movie.genre.toLowerCase().includes(searchTerm) ||
//             movie.description.toLowerCase().includes(searchTerm)
//         );
//     }

//     displayMovies(filteredMovies);
// }

// // Load YouTube Player
// function loadYouTubePlayer(videoId) {
//     if (!videoId) return;

//     // Clean video ID
//     const cleanVideoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 11);

//     if (!cleanVideoId) {
//         console.error('Invalid videoId after cleaning:', videoId);
//         return;
//     }

//     // Load the IFrame Player API code asynchronously
//     if (!window.YT) {
//         const tag = document.createElement('script');
//         tag.src = "https://www.youtube.com/iframe_api";
//         const firstScriptTag = document.getElementsByTagName('script')[0];
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     }

//     // Initialize player when API is ready
//     window.onYouTubeIframeAPIReady = function () {
//         if (youtubePlayer) {
//             youtubePlayer.destroy();
//         }

//         youtubePlayer = new YT.Player('youtubePlayer', {
//             height: '100%',
//             width: '100%',
//             filter: 'url(#ultraSharp) brightness(1.25) contrast(1.15) saturate(1.5) hue-rotate(5deg)',
//             videoId: cleanVideoId,
//             playerVars: {
//                 'autoplay': 1,
//                 'controls': 1,
//                 'rel': 0,
//                 'showinfo': 0,
//                 'modestbranding': 1,
//                 'playsinline': 1
//             },
//             events: {
//                 'onReady': function (event) {
//                     console.log('YouTube Player Ready');
//                 },
//                 'onError': function (event) {
//                     console.error('YouTube Player Error:', event.data);
//                 }
//             }
//         });
//     };

//     // If API is already loaded, initialize immediately
//     if (window.YT && window.YT.Player) {
//         window.onYouTubeIframeAPIReady();
//     }
// }

// // Show movie detail
// function showMovieDetail(movie) {
//     const rating = movie.ratingCount > 0 ?
//         (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
//     const isFavorite = favorites.includes(movie.id);

//     movieDetailContent.innerHTML = `
//         <div class="movie-detail-header">
//             <img src="${movie.poster}" alt="${movie.title}" class="movie-detail-poster" onerror="this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
//             <div class="movie-detail-overlay">
//                 <h1 class="movie-detail-title">${movie.title}</h1>
//                 <div class="movie-detail-meta">
//                     <span class="movie-detail-genre">${movie.genre}</span>
//                     <span style="color: gold;">
//                         <i class="fas fa-star"></i> ${rating}/5 (${movie.ratingCount || 0} ratings)
//                     </span>
//                     <span style="color: #ccc;">
//                         <i class="fas fa-eye"></i> ${movie.views || 0} views
//                     </span>
//                 </div>
//             </div>
//         </div>
        
//         <div class="movie-detail-body">
//             <div class="movie-actions">
//                 <a href="movie-detail.html?id=${movie.id}" class="action-btn play-btn">
//                     <i class="fas fa-play"></i> Watch Now
//                 </a>
              
//                 <button class="action-btn favorite-btn ${isFavorite ? 'active' : ''}" id="favoriteBtn" data-movie-id="${movie.id}">
//                     <i class="fas fa-heart"></i> ${isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
//                 </button>
//             </div>
            
//             <h3 style="margin-bottom: 15px; color: var(--text-color);">Description</h3>
//             <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">${movie.description}</p>
            
//             <h3 style="margin-bottom: 15px; color: var(--text-color);">Watch Trailer</h3>
//             <div class="youtube-player-container">
//                 <div id="youtubePlayer"></div>
//             </div>
            
//             <h3 style="margin-bottom: 15px; color: var(--text-color);">Streaming Links</h3>
//             <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
//                 ${movie.streamUrl && movie.streamUrl !== 'xxxx-xxxxxx-xxxxxx-xxxxxx' ?
//                 `<a href="movie-detail.html?id=${movie.id}&server=1" class="action-btn" style="background: #3498db;">
//                             <i class="fas fa-play"></i> Server 1
//                         </a>` : ''}
//                 ${movie.stream2Url && movie.stream2Url !== 'xxxx-xxxxxx-xxxxxx-xxxxxx' ?
//                 `<a href="movie-detail.html?id=${movie.id}&server=2" class="action-btn" style="background: #9b59b6;">
//                             <i class="fas fa-language"></i> Server 2
//                         </a>` : ''}
//                 ${movie.stream3Url && movie.stream3Url !== 'xxxx-xxxxxx-xxxxxx-xxxxxx' ?
//                 `<a href="movie-detail.html?id=${movie.id}&server=3" class="action-btn" style="background: #f39c12;">
//                             <i class="fas fa-globe"></i> Server 3
//                         </a>` : ''}
//                 ${movie.stream4Url && movie.stream4Url !== 'xxxx-xxxxxx-xxxxxx-xxxxxx' ?
//                 `<a href="movie-detail.html?id=${movie.id}&server=4" class="action-btn" style="background: #2ecc71;">
//                             <i class="fas fa-server"></i> Server 4
//                         </a>` : ''}
//             </div>
//         </div>
//     `;

//     movieDetailModal.style.display = 'block';
//     document.body.style.overflow = 'hidden';

//     // Add event listener for favorite button
//     const favoriteBtn = document.getElementById('favoriteBtn');
//     if (favoriteBtn) {
//         favoriteBtn.addEventListener('click', function() {
//             toggleFavorite(this.dataset.movieId);
//         });
//     }

//     // Load YouTube player
//     setTimeout(() => {
//         loadYouTubePlayer(movie.playUrl);
//     }, 100);
// }

// // Toggle favorite
// function toggleFavorite(movieId) {
//     const index = favorites.indexOf(movieId);

//     if (index === -1) {
//         favorites.push(movieId);
//     } else {
//         favorites.splice(index, 1);
//     }

//     localStorage.setItem('moviestream_favorites', JSON.stringify(favorites));

//     // Reload movie detail to update button
//     const currentMovie = moviesData.find(m => m.id === movieId);
//     if (currentMovie) {
//         showMovieDetail(currentMovie);
//     }
// }

// // Close modal
// function closeMovieModal() {
//     movieDetailModal.style.display = 'none';
//     document.body.style.overflow = 'auto';

//     // Destroy YouTube player
//     if (youtubePlayer && youtubePlayer.destroy) {
//         youtubePlayer.destroy();
//         youtubePlayer = null;
//     }
// }

// // Initialize everything
// function init() {
//     loadMovies();

//     // Event listeners
//     heroSearchBtn.addEventListener('click', searchMovies);

//     heroSearch.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             searchMovies();
//         }
//     });

//     // Close modal when clicking outside
//     window.addEventListener('click', (e) => {
//         if (e.target === movieDetailModal) {
//             closeMovieModal();
//         }
//     });

//     // Close modal with Escape key
//     document.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape' && movieDetailModal.style.display === 'block') {
//             closeMovieModal();
//         }
//     });
// }

// // Start the app
// document.addEventListener('DOMContentLoaded', init);

// // Add event listener for close button AFTER DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     const closeModalBtn = document.getElementById('closeModal');
//     if (closeModalBtn) {
//         closeModalBtn.addEventListener('click', closeMovieModal);
//     }
// });























// Free Streaming - Main JavaScript
// COMPLETE PRODUCTION CODE - NO PLACEHOLDERS

// ===========================================
// CONFIGURATION
// ===========================================
const CONFIG = {
    BASE_URL: 'https://freestreaming.vercel.app',
    SITE_NAME: 'Free Streaming'
};

// ===========================================
// GLOBAL VARIABLES
// ===========================================
let moviesData = [];
let filteredMovies = [];
let favorites = JSON.parse(localStorage.getItem('freestreaming_favorites') || '[]');
let currentGenre = 'All';

// ===========================================
// DOM ELEMENTS
// ===========================================
const moviesGrid = document.getElementById('moviesGrid');
const genreButtons = document.getElementById('genreButtons');
const heroSearch = document.getElementById('heroSearch');
const heroSearchBtn = document.getElementById('heroSearchBtn');

// ===========================================
// URL GENERATION FUNCTIONS
// ===========================================
function generateMovieUrl(movie) {
    if (!movie || !movie.id) return 'index.html';
    
    // Clean the movie ID
    const cleanId = movie.id
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/^-+|-+$/g, '')
        .trim();
    
    // Generate clean slug from title
    const titleSlug = movie.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .slice(0, 50);
    
    // Return URL - ALL movies go to movie-detail.html with ID
    return `movie-detail.html?id=${cleanId}`;
}

// ===========================================
// LOAD MOVIES
// ===========================================
async function loadMovies() {
    try {
        moviesGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading movies...</div>';
        
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to load movies`);
        
        const data = await response.json();
        moviesData = data.movies || [];
        
        console.log(`Loaded ${moviesData.length} movies`);
        
        // Initialize
        initGenres();
        displayMovies(moviesData);
        generateMovieSchema(moviesData);
        
    } catch (error) {
        console.error('Error loading movies:', error);
        moviesGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load movies. Please refresh the page.</p>
                <button onclick="location.reload()" class="retry-btn">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
    }
}

// ===========================================
// INITIALIZE GENRES
// ===========================================
function initGenres() {
    const genres = [
        'All', 'Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 
        'Romance', 'Thriller', 'Adult', 'Adventure', 'Fantasy', 
        'Crime', 'News', 'Sports', 'TvShow', 'Family', 
        'Mystery', 'Biography', 'History', 'War'
    ];

    genreButtons.innerHTML = '';

    genres.forEach(genre => {
        const button = document.createElement('button');
        button.className = `genre-btn ${genre === 'All' ? 'active' : ''}`;
        button.textContent = genre;
        button.dataset.genre = genre;
        button.setAttribute('aria-label', `Filter by ${genre}`);

        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.genre-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter movies by genre
            filterMoviesByGenre(genre);
        });

        genreButtons.appendChild(button);
    });
}

// ===========================================
// DISPLAY MOVIES IN GRID
// ===========================================
function displayMovies(movies) {
    if (!movies || movies.length === 0) {
        moviesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-film"></i>
                <h3>No movies found</h3>
                <p>Try a different search or filter</p>
            </div>
        `;
        return;
    }

    moviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const rating = movie.ratingCount > 0 ? 
            (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
        
        const views = movie.views || 0;
        const movieUrl = generateMovieUrl(movie);
        const isFavorite = favorites.includes(movie.id);

        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.dataset.id = movie.id;
        movieCard.dataset.genre = movie.genre;
        
        movieCard.innerHTML = `
            <div class="movie-card-inner">
                <a href="${movieUrl}" class="movie-link" title="Watch ${movie.title} Online Free">
                    <div class="movie-poster-container">
                        <img 
                            src="${movie.poster}" 
                            alt="${movie.title} - ${movie.genre} Movie - Watch Online Free in HD"
                            class="movie-poster"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';"
                        >
                        <div class="movie-overlay">
                            <div class="play-button">
                                <i class="fas fa-play"></i>
                            </div>
                            ${movie.genre === 'Sports' || movie.genre === 'News' ? 
                            '<span class="live-badge">LIVE</span>' : 
                            ''}
                        </div>
                    </div>
                    
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        
                        <div class="movie-meta">
                            <span class="movie-genre">${movie.genre}</span>
                            <div class="movie-stats">
                                <span class="movie-rating">
                                    <i class="fas fa-star"></i> ${rating}
                                </span>
                                <span class="movie-views">
                                    <i class="fas fa-eye"></i> ${views.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        
                        <p class="movie-description">${movie.description.substring(0, 80)}${movie.description.length > 80 ? '...' : ''}</p>
                        
                        <button class="favorite-icon ${isFavorite ? 'active' : ''}" 
                                data-movie-id="${movie.id}"
                                aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </a>
            </div>
        `;

        moviesGrid.appendChild(movieCard);
    });

    // Add favorite button event listeners
    document.querySelectorAll('.favorite-icon').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const movieId = this.dataset.movieId;
            toggleFavorite(movieId, this);
        });
    });
}

// ===========================================
// FILTER MOVIES BY GENRE
// ===========================================
function filterMoviesByGenre(genre) {
    currentGenre = genre;
    
    if (genre === 'All') {
        filteredMovies = [...moviesData];
    } else {
        filteredMovies = moviesData.filter(movie => movie.genre === genre);
    }
    
    // Apply search filter if exists
    const searchTerm = heroSearch.value.trim().toLowerCase();
    if (searchTerm) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.description.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm) ||
            (movie.keywords && movie.keywords.toLowerCase().includes(searchTerm))
        );
    }
    
    displayMovies(filteredMovies);
}

// ===========================================
// SEARCH MOVIES
// ===========================================
function searchMovies() {
    const searchTerm = heroSearch.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        // If no search term, show current genre
        filterMoviesByGenre(currentGenre);
        return;
    }
    
    // Start with current genre filter
    if (currentGenre === 'All') {
        filteredMovies = moviesData;
    } else {
        filteredMovies = moviesData.filter(movie => movie.genre === currentGenre);
    }
    
    // Apply search
    filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.description.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm) ||
        (movie.keywords && movie.keywords.toLowerCase().includes(searchTerm))
    );
    
    displayMovies(filteredMovies);
}

// ===========================================
// FAVORITES MANAGEMENT
// ===========================================
function toggleFavorite(movieId, button) {
    const index = favorites.indexOf(movieId);
    
    if (index === -1) {
        // Add to favorites
        favorites.push(movieId);
        button.classList.add('active');
        button.setAttribute('aria-label', 'Remove from favorites');
        showNotification('Added to favorites');
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
        button.classList.remove('active');
        button.setAttribute('aria-label', 'Add to favorites');
        showNotification('Removed from favorites');
    }
    
    // Save to localStorage
    localStorage.setItem('freestreaming_favorites', JSON.stringify(favorites));
}

// ===========================================
// SCHEMA MARKUP GENERATION
// ===========================================
function generateMovieSchema(movies) {
    if (!movies || movies.length === 0) return;
    
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [],
        "name": "Free Streaming - Movie Collection",
        "description": "Watch thousands of movies, TV shows, live sports and news channels online for free",
        "url": CONFIG.BASE_URL,
        "numberOfItems": movies.length
    };
    
    movies.forEach((movie, index) => {
        const movieUrl = `${CONFIG.BASE_URL}/${generateMovieUrl(movie)}`;
        const rating = movie.ratingCount > 0 ? 
            (movie.ratingTotal / movie.ratingCount).toFixed(1) : "0.0";
        
        let itemType = "Movie";
        if (movie.genre === 'Sports' || movie.genre === 'News') {
            itemType = "BroadcastService";
        } else if (movie.genre === 'TvShow') {
            itemType = "TVSeries";
        }
        
        schemaData.itemListElement.push({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": itemType,
                "@id": movieUrl,
                "url": movieUrl,
                "name": movie.title,
                "image": movie.poster.startsWith('http') ? movie.poster : `${CONFIG.BASE_URL}/${movie.poster}`,
                "description": movie.description,
                "genre": movie.genre,
                "contentRating": movie.genre === 'Adult' ? "R" : "PG-13",
                "datePublished": "2025",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": rating,
                    "ratingCount": movie.ratingCount || 0,
                    "bestRating": "5",
                    "worstRating": "0"
                },
                "potentialAction": {
                    "@type": "WatchAction",
                    "target": movieUrl
                }
            }
        });
    });
    
    // Remove existing schema
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
        existingSchema.remove();
    }
    
    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===========================================
// EVENT LISTENERS
// ===========================================
function initEventListeners() {
    // Search functionality
    heroSearchBtn.addEventListener('click', searchMovies);
    
    heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchMovies();
        }
    });
    
    // Real-time search (optional)
    heroSearch.addEventListener('input', (e) => {
        if (e.target.value.trim() === '') {
            filterMoviesByGenre(currentGenre);
        }
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains('light-theme')) {
        // Switch to dark
        body.classList.remove('light-theme');
        localStorage.setItem('freestreaming_theme', 'dark');
        updateThemeIcon('dark');
    } else {
        // Switch to light
        body.classList.add('light-theme');
        localStorage.setItem('freestreaming_theme', 'light');
        updateThemeIcon('light');
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    
    if (theme === 'light') {
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'inline-block';
        themeToggle.setAttribute('title', 'Switch to Dark Mode');
    } else {
        if (moonIcon) moonIcon.style.display = 'inline-block';
        if (sunIcon) sunIcon.style.display = 'none';
        themeToggle.setAttribute('title', 'Switch to Light Mode');
    }
}

// ===========================================
// INITIALIZE APPLICATION
// ===========================================
function init() {
    console.log('Free Streaming - Initializing...');
    
    // Load initial data
    loadMovies();
    
    // Set up event listeners
    initEventListeners();
    
    // Restore theme
    const savedTheme = localStorage.getItem('freestreaming_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeIcon('light');
    } else {
        updateThemeIcon('dark');
    }
    
    console.log('Application initialized');
}

// ===========================================
// START APPLICATION
// ===========================================
document.addEventListener('DOMContentLoaded', init);

// Export for debugging
if (typeof window !== 'undefined') {
    window.app = {
        loadMovies,
        searchMovies,
        filterMoviesByGenre,
        generateMovieUrl,
        toggleFavorite
    };
}
