
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Movie } from './types';
import { MOVIES_DATA, GENRES, LANGUAGES } from './constants';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMovies from './components/FeaturedMovies';
import Categories from './components/Categories';
import MoviesGrid from './components/MoviesGrid';
import Languages from './components/Languages';
import Faq from './components/Faq';
import Footer from './components/Footer';
import MovieDetailsModal from './components/MovieDetailsModal';
import PlayerModal from './components/PlayerModal';
import AgeVerificationModal from './components/AgeVerificationModal';

// Import new pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Dmca from './pages/Dmca';
import ContactUs from './pages/ContactUs';

export type Page = 'home' | 'privacy' | 'terms' | 'dmca' | 'contact';


const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(12);
    
    const [isAgeVerified, setIsAgeVerified] = useState(false);
    const [showAgeModal, setShowAgeModal] = useState(false);

    const [selectedMovieForDetails, setSelectedMovieForDetails] = useState<Movie | null>(null);
    const [selectedMovieForPlayer, setSelectedMovieForPlayer] = useState<Movie | null>(null);
    
    const [currentPage, setCurrentPage] = useState<Page>('home');


    useEffect(() => {
        // Check verification status from local storage on initial load
        const ageVerified = localStorage.getItem('ageVerified');
        if (ageVerified === 'true') {
            setIsAgeVerified(true);
        }
    }, []);

    const handleAgeConfirm = useCallback(() => {
        localStorage.setItem('ageVerified', 'true');
        setIsAgeVerified(true);
        setShowAgeModal(false);
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage('home'); // Switch to home page to display results
        setVisibleCount(12); // Reset visible count on new search
    };

    const handleCategorySelect = useCallback((category: string) => {
        setSelectedCategory(category.toLowerCase());
        setCurrentPage('home'); // Switch to home page to display results
        setVisibleCount(12); // Reset visible count on new filter
    }, []);

    const handleShowDetails = useCallback((movie: Movie) => {
        setSelectedMovieForDetails(movie);
    }, []);

    const handlePlayMovie = useCallback((movie: Movie) => {
        // Only show the age modal if the content is 'Adult' and user is not verified
        if (movie.genre.toLowerCase() === 'adult' && !isAgeVerified) {
            setShowAgeModal(true);
        } else {
            setSelectedMovieForPlayer(movie);
        }
    }, [isAgeVerified]);

    const handleLoadMore = useCallback(() => {
        setVisibleCount(prevCount => prevCount + 12);
    }, []);

    const filteredMovies = useMemo(() => {
        return MOVIES_DATA.filter(movie => {
            const matchesCategory = selectedCategory === 'all' || 
                                    movie.genre.toLowerCase() === selectedCategory ||
                                    movie.language.toLowerCase() === selectedCategory;
            
            const matchesSearch = searchTerm === '' ||
                                  movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  movie.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    const trendingMovies = useMemo(() => MOVIES_DATA.slice(0, 6), []);
    const allGenres = useMemo(() => ['all', ...GENRES], []);

    const renderPage = () => {
        switch (currentPage) {
            case 'privacy':
                return <PrivacyPolicy />;
            case 'terms':
                return <TermsOfService />;
            case 'dmca':
                return <Dmca />;
            case 'contact':
                return <ContactUs />;
            case 'home':
            default:
                return (
                    <>
                        <Hero onSearch={handleSearch} />
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16 md:space-y-24">
                            <FeaturedMovies movies={trendingMovies} onPlay={handlePlayMovie} onViewDetails={handleShowDetails} />
                            <Categories genres={allGenres} selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
                            <MoviesGrid 
                                movies={filteredMovies.slice(0, visibleCount)}
                                hasMore={visibleCount < filteredMovies.length}
                                onLoadMore={handleLoadMore}
                                onPlay={handlePlayMovie}
                                onViewDetails={handleShowDetails}
                            />
                            <Languages languages={LANGUAGES} onSelectLanguage={handleCategorySelect} />
                            <Faq />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="bg-black text-gray-200 font-sans">
            <Navbar onSearch={handleSearch} />
            
            <main>
                {renderPage()}
            </main>

            <Footer onNavigate={setCurrentPage} />
            
            {showAgeModal && !isAgeVerified && (
                <AgeVerificationModal onConfirm={handleAgeConfirm} onDeny={() => window.location.href = 'about:blank'} />
            )}

            {selectedMovieForDetails && (
                <MovieDetailsModal 
                    movie={selectedMovieForDetails} 
                    onClose={() => setSelectedMovieForDetails(null)} 
                    onPlay={handlePlayMovie}
                />
            )}

            {selectedMovieForPlayer && (
                <PlayerModal 
                    movie={selectedMovieForPlayer} 
                    onClose={() => setSelectedMovieForPlayer(null)} 
                />
            )}
            
        </div>
    );
};

export default App;
