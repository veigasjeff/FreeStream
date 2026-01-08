import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import CategoryCard from '../components/CategoryCard';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import MovieModal from '../components/MovieModal';
import PlayerModal from '../components/PlayerModal';
import { moviesData, genres, languages } from '../utils/data';

export default function Home({ theme, toggleTheme }) {
  const [currentView, setCurrentView] = useState('grid');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [visibleMovies, setVisibleMovies] = useState(9);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check age verification on load
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) {
      setTimeout(() => setShowAgeModal(true), 1000);
    }

    // Scroll listener for navbar
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update back to top button visibility
    const updateBackToTop = () => {
      const backToTopBtn = document.getElementById('backToTop');
      if (backToTopBtn) {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    };
    
    window.addEventListener('scroll', updateBackToTop);
    return () => window.removeEventListener('scroll', updateBackToTop);
  }, []);

  const handleCategoryFilter = (category) => {
    setCurrentCategory(category);
    if (category === 'all') {
      setFilteredMovies(moviesData);
    } else {
      setFilteredMovies(moviesData.filter(movie => 
        movie.genre.toLowerCase() === category
      ));
    }
    setVisibleMovies(9);
    // Scroll to movies section
    document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageFilter = (language) => {
    setCurrentCategory(language);
    setFilteredMovies(moviesData.filter(movie => 
      movie.language.toLowerCase() === language
    ));
    setVisibleMovies(9);
    document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredMovies(moviesData);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = moviesData.filter(movie => 
      movie.title.toLowerCase().includes(term) ||
      movie.description.toLowerCase().includes(term) ||
      movie.genre.toLowerCase().includes(term) ||
      movie.language.toLowerCase().includes(term)
    );
    setFilteredMovies(filtered);
    setVisibleMovies(9);
    document.getElementById('movies')?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMoreMovies = () => {
    setVisibleMovies(prev => prev + 9);
  };

  const handleWatchMovie = (movie) => {
    // Check if it's adult content
    if (movie.genre === 'Adult') {
      const isVerified = localStorage.getItem('ageVerified');
      if (!isVerified) {
        setSelectedMovie(movie);
        setShowAgeModal(true);
        return;
      }
    }
    
    setSelectedMovie(movie);
    setShowPlayerModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleAgeConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowAgeModal(false);
    if (selectedMovie) {
      setShowPlayerModal(true);
    }
  };

  const handleAgeDeny = () => {
    setShowAgeModal(false);
    setSelectedMovie(null);
    window.location.href = 'https://www.google.com';
  };

  const handleModalClose = () => {
    setShowMovieModal(false);
    setShowPlayerModal(false);
    setSelectedMovie(null);
    document.body.style.overflow = 'auto';
  };

  const featuredMovies = moviesData.slice(0, 6);

  return (
    <>
      <Head>
        <title>FreeStream™ - Watch HD Movies & TV Shows Online Free</title>
        <meta 
          name="description" 
          content="Stream 5000+ HD movies, TV shows, and live channels completely free. No registration required. Watch latest movies online in multiple languages." 
        />
        <meta 
          name="keywords" 
          content="freeStream,movies free,free TV series,movies,watch movie online,watch TV series online,free movies,free movies online,entertainment,free movie streaming,free streaming,download free,free movies online,watch movies free,streaming movies,HD movies online,full movies online,movies online free,watch free movies,online movie streaming,free hd movies" 
        />
        <meta name="author" content="FreeStream" />
      </Head>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      
      <main className="main-content">
        {/* Featured Movies */}
        <section className="featured-section">
          <h2 className="section-title">🔥 Trending Now</h2>
          <div className="featured-grid">
            {featuredMovies.map((movie) => {
              const rating = movie.ratingCount > 0 
                ? (movie.ratingTotal / movie.ratingCount).toFixed(1) 
                : '0.0';
              
              return (
                <div key={movie.id} className="featured-card">
                  <div className="featured-badge">🔥 Trending</div>
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                  <div className="featured-content">
                    <h3>{movie.title}</h3>
                    <p>{movie.description.substring(0, 100)}...</p>
                    <div className="featured-rating">
                      <span className="stars">
                        {'⭐'.repeat(Math.floor(rating))}
                      </span>
                      <span>{rating}</span>
                    </div>
                    <button 
                      className="watch-btn" 
                      onClick={() => handleWatchMovie(movie)}
                    >
                      <i className="fas fa-play"></i> Watch Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Categories */}
        <section className="categories-section" id="categories">
          <div className="section-header">
            <h2 className="section-title">🎬 Browse by Category</h2>
            <div className="category-filters">
              <button 
                className={`filter-btn ${currentCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryFilter('all')}
              >
                All
              </button>
              {genres.slice(0, 18).map((genre) => (
                <button
                  key={genre}
                  className={`filter-btn ${currentCategory === genre.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(genre.toLowerCase())}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <div className="categories-grid">
            {genres.slice(0, 12).map((genre) => {
              const count = moviesData.filter(m => m.genre === genre).length;
              return (
                <CategoryCard
                  key={genre}
                  category={genre}
                  count={count}
                  onClick={() => handleCategoryFilter(genre.toLowerCase())}
                />
              );
            })}
          </div>
        </section>

        {/* Movies Grid */}
        <section className="movies-section" id="movies">
          <div className="section-header">
            <h2 className="section-title">🎥 Latest Movies</h2>
            <div className="view-controls">
              <button 
                className={`view-btn ${currentView === 'grid' ? 'active' : ''}`}
                onClick={() => setCurrentView('grid')}
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button 
                className={`view-btn ${currentView === 'list' ? 'active' : ''}`}
                onClick={() => setCurrentView('list')}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
          
          <div className="movies-container">
            <div className={`movies-grid ${currentView === 'list' ? 'list-view' : ''}`}>
              {filteredMovies.slice(0, visibleMovies).map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  view={currentView}
                  onWatchClick={handleWatchMovie}
                  onDetailsClick={handleMovieDetails}
                />
              ))}
            </div>
          </div>
          
          {filteredMovies.length > visibleMovies && (
            <div className="load-more">
              <button className="load-more-btn" onClick={loadMoreMovies}>
                <i className="fas fa-sync-alt"></i> Load More Movies
              </button>
            </div>
          )}
        </section>

        {/* Languages */}
        <section className="languages-section" id="languages">
          <h2 className="section-title">🌍 Browse by Language</h2>
          <div className="languages-grid">
            {languages.map((language) => {
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
              
              return (
                <div 
                  key={language} 
                  className="language-card"
                  onClick={() => handleLanguageFilter(language.toLowerCase())}
                >
                  <h3>{flags[language] || '🌐'} {language}</h3>
                  <span>{count} Movies</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </main>

      <Footer />

      {/* Modals */}
            
<MovieModal 
  isOpen={showMovieModal}
  onClose={handleModalClose}
  movie={selectedMovie}
  onWatchClick={handleWatchMovie}  // Add this prop
/>
      
      <PlayerModal 
        isOpen={showPlayerModal}
        onClose={handleModalClose}
        movie={selectedMovie}
        theme={theme}
      />
      
     

      {/* Back to Top Button */}
      <button className="back-to-top" id="backToTop">
        <i className="fas fa-arrow-up"></i>
      </button>

      <style jsx>{`
        .main-content {
          max-width: 1800px;
          margin: 0 auto;
          padding: clamp(2rem, 5vw, 4rem) 5%;
        }

        /* Featured Section */
        .featured-section {
          margin-bottom: 4rem;
        }
        
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(280px, 30vw, 400px), 1fr));
          gap: 2rem;
        }
        
        .featured-card {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          transition: var(--transition);
          cursor: pointer;
          height: clamp(300px, 50vh, 450px);
          box-shadow: var(--card-shadow);
        }
        
        .featured-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow);
        }
        
        .featured-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent 50%);
          z-index: 1;
        }
        
        .featured-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        
        .featured-card:hover img {
          transform: scale(1.05);
        }
        
        .featured-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(1rem, 3vw, 2rem);
          z-index: 2;
        }
        
        .featured-content h3 {
          font-size: clamp(1.4rem, 4vw, 1.8rem);
          margin-bottom: 0.5rem;
          color: #ffffff;
        }
        
        .featured-content p {
          color: #f5f5f5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .featured-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .featured-rating .stars {
          color: #ffd700;
        }
        
        .featured-rating span {
          color: #ffffff;
          font-weight: 600;
        }
        
        .featured-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          z-index: 3;
          font-size: 0.9rem;
        }
        
        .featured-content .watch-btn {
          padding: 0.8rem 1.5rem;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .featured-content .watch-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
        }

        /* Categories Section */
        .categories-section {
          margin-bottom: 4rem;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .category-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          padding: 0.7rem 1.5rem;
          background: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 50px;
          color: var(--light);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
          background: var(--gradient);
          border-color: var(--primary);
          color: #ffffff;
          transform: translateY(-2px);
        }
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(140px, 20vw, 250px), 1fr));
          gap: 1.5rem;
        }

        /* Movies Section */
        .movies-section {
          margin-bottom: 4rem;
        }
        
        .view-controls {
          display: flex;
          gap: 0.5rem;
          background: var(--input-bg);
          padding: 0.3rem;
          border-radius: var(--radius-sm);
        }
        
        .view-btn {
          padding: 0.7rem 1rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          color: var(--gray);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .view-btn:hover,
        .view-btn.active {
          background: var(--primary);
          color: #ffffff;
        }
        
        .movies-container {
          margin-bottom: 2rem;
        }
        
        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(280px, 22vw, 320px), 1fr));
          gap: clamp(1rem, 2.5vw, 2rem);
        }
        
        .movies-grid.list-view {
          grid-template-columns: 1fr;
        }
        
        .load-more {
          text-align: center;
          margin-top: 3rem;
        }
        
        .load-more-btn {
          padding: 1rem 3rem;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
        }
        
        .load-more-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(229, 9, 20, 0.3);
        }

        /* Languages Section */
        .languages-section {
          margin-bottom: 4rem;
        }
        
        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(150px, 15vw, 200px), 1fr));
          gap: 1.5rem;
        }
        
        .language-card {
          background: var(--dark-light);
          border-radius: var(--radius);
          padding: clamp(1rem, 2vw, 2rem);
          text-align: center;
          transition: var(--transition);
          cursor: pointer;
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
        }
        
        .language-card:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateY(-5px);
          color: #ffffff;
        }
        
        .language-card:hover h3,
        .language-card:hover span {
          color: #ffffff;
        }
        
        .language-card h3 {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          margin-bottom: 0.5rem;
        }
        
        .language-card span {
          color: var(--gray);
          font-size: 0.9rem;
        }

        /* Back to Top */
        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: clamp(40px, 5vw, 50px);
          height: clamp(40px, 5vw, 50px);
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          z-index: 100;
          transition: var(--transition);
          box-shadow: var(--shadow);
        }
        
        .back-to-top:hover {
          transform: translateY(-5px);
        }
        
        .back-to-top.visible {
          display: flex;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
          
          .movies-grid {
            grid-template-columns: 1fr;
          }
          
          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .category-filters {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}