// Main Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('App loaded');
    
    // Load analytics scripts
    (function(s){s.dataset.zone='10297164',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));

    (function(s){s.dataset.zone='10333131',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
    
    // Initialize
    loadData();
    setupEventListeners();
    
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
    (function() {
        var clickyScript = document.createElement('script');
        clickyScript.async = true;
        clickyScript.setAttribute('data-id', '101498160');
        clickyScript.src = '//static.getclicky.com/js';
        document.head.appendChild(clickyScript);
    })();
});


// Global variables
let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const itemsPerPage = 12;
let currentGenre = 'all';
let currentLanguage = 'all';

// Load data from data.json
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allMovies = data.movies;
        
        console.log(`Loaded ${allMovies.length} movies`);
        
        // Initial display
        filteredMovies = [...allMovies];
        displayMovies();
        setupCategories();
        setupLanguages();
        displayLiveChannels();
        
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('moviesGrid').innerHTML = `
            <div class="error" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3>Failed to load movies</h3>
                <p>Please check your data.json file</p>
            </div>
        `;
    }
}

// Display movies in grid - NOW EXACTLY LIKE LIVE CHANNELS
function displayMovies() {
    const grid = document.getElementById('moviesGrid');
    if (!grid) return;
    
    // Clear existing
    grid.innerHTML = '';
    
    // Calculate items to show
    const start = 0;
    const end = currentPage * itemsPerPage;
    const moviesToShow = filteredMovies.slice(start, end);
    
    if (moviesToShow.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3>No movies found</h3>
                <p>Try a different category or search</p>
            </div>
        `;
        return;
    }
    
    // Create movie cards - SAME STRUCTURE AS CHANNEL CARDS
    moviesToShow.forEach(movie => {
        const card = createMovieCard(movie);
        grid.appendChild(card);
    });
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (end >= filteredMovies.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Create movie card HTML - SAME STRUCTURE AS CHANNEL CARDS
function createMovieCard(movie) {
    const div = document.createElement('div');
    div.className = 'movie-card';
    
    // Calculate rating
    const rating = movie.ratingCount > 0 ? 
        (movie.ratingTotal / movie.ratingCount).toFixed(1) : 'N/A';
    
    // SAME EXACT STRUCTURE AS CHANNEL CARDS
    div.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy" 
             onerror="this.src='https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'">
        <h3><a href="movies/${movie.id}/" style="color: white; text-decoration: none;">${movie.title}</a></h3>
        <p>${movie.description.substring(0, 100)}${movie.description.length > 100 ? '...' : ''}</p>
        <div class="movie-meta">
            <span class="movie-rating">
                <i class="fas fa-star"></i> ${rating}
            </span>
            <span class="movie-views">
                <i class="fas fa-eye"></i> ${movie.views}
            </span>
        </div>
        <a href="movies/${movie.id}/" style="
            display: inline-block;
            background: #e50914;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 10px;
        ">Watch Now</a>
    `;
    
    return div;
}

// Setup categories
function setupCategories() {
    const container = document.getElementById('categoryList');
    if (!container) return;
    
    // Get unique genres from movies
    const genres = ['all', "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Adult", "Adventure",
    "Fantasy", "Crime", "News", "Sports", "TvSeries", "TvShow", "Family", "Mystery", "Biography", "History", "War"];
    
    genres.forEach(genre => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        if (genre === 'all') button.classList.add('active');
        button.textContent = genre === 'all' ? 'All Movies' : genre;
        button.dataset.genre = genre;
        
        button.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter movies
            currentGenre = genre;
            currentPage = 1;
            filterMovies();
        });
        
        container.appendChild(button);
    });
}

// Setup languages
function setupLanguages() {
    const container = document.getElementById('languageList');
    if (!container) return;
    
    const languages = ['all', "English", "Hindi", "Marathi", "Tagalog", "Tamil", "Kannada", "Telugu", "Malayalam", "Punjabi",
    "Bengali", "Spanish", "French", "German", "Italian", "Japanese", "Korean", "Chinese"];
    
    container.innerHTML = '';
    
    languages.forEach(language => {
        const button = document.createElement('button');
        button.className = 'category-btn language-btn';
        if (language === 'all') button.classList.add('active');
        button.textContent = language === 'all' ? 'All Languages' : language;
        button.dataset.language = language;
        
        button.addEventListener('click', function() {
            // Update active button for language
            document.querySelectorAll('.language-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter movies by language
            currentLanguage = language;
            currentPage = 1;
            filterMovies();
        });
        
        container.appendChild(button);
    });
}

// Filter movies by genre and language
function filterMovies() {
    if (currentGenre === 'all' && currentLanguage === 'all') {
        filteredMovies = [...allMovies];
    } else {
        filteredMovies = allMovies.filter(movie => {
            const genreMatch = currentGenre === 'all' || 
                movie.genre.toLowerCase() === currentGenre.toLowerCase();
            
            // Note: Since data.json doesn't have language field for movies,
            // we'll need to add it. For now, we'll simulate with available data.
            // In your actual data.json, each movie should have a language field.
            const languageMatch = currentLanguage === 'all' || 
                (movie.language && movie.language.toLowerCase() === currentLanguage.toLowerCase());
            
            return genreMatch && languageMatch;
        });
    }
    
    displayMovies();
}


// Display live channels
function displayLiveChannels() {
    const container = document.getElementById('channelsGrid');
    if (!container) return;
    
    // Filter live channels
    const liveChannels = allMovies.filter(movie => 
        movie.genre === 'Sports' || movie.genre === 'News' || movie.genre === 'TvShow'
    );
    
    if (liveChannels.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <h3>No live channels available</h3>
                <p>Check back later for live TV updates</p>
            </div>
        `;
        return;
    }
    
    // Create channel cards - SAME STRUCTURE AS MOVIE CARDS
    liveChannels.forEach(channel => {
        const div = document.createElement('div');
        div.className = 'channel-card';
        
        div.innerHTML = `
            <img src="${channel.poster}" alt="${channel.title}" 
                 onerror="this.src='https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'">
            <h3>${channel.title}</h3>
            <p>${channel.description.substring(0, 100)}${channel.description.length > 100 ? '...' : ''}</p>
            <a href="movies/${channel.id}/" style="
                display: inline-block;
                background: #e50914;
                color: white;
                padding: 8px 16px;
                border-radius: 4px;
                text-decoration: none;
                margin-top: 10px;
            ">Watch Live</a>
        `;
        
        container.appendChild(div);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
                document.documentElement.style.setProperty('--dark', '#f5f5f5');
                document.documentElement.style.setProperty('--dark-light', '#fff');
                document.documentElement.style.setProperty('--light', '#333');
            } else {
                icon.className = 'fas fa-moon';
                document.documentElement.style.setProperty('--dark', '#141414');
                document.documentElement.style.setProperty('--dark-light', '#222');
                document.documentElement.style.setProperty('--light', '#fff');
            }
        });
    }
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            
            if (query === '') {
                filteredMovies = [...allMovies];
            } else {
                filteredMovies = allMovies.filter(movie => 
                    movie.title.toLowerCase().includes(query) ||
                    movie.description.toLowerCase().includes(query) ||
                    movie.genre.toLowerCase().includes(query)
                );
            }
            
            currentPage = 1;
            displayMovies();
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            displayMovies();
        });
    }
}