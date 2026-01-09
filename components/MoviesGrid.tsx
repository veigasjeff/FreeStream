
import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MoviesGridProps {
    movies: Movie[];
    hasMore: boolean;
    onLoadMore: () => void;
    onPlay: (movie: Movie) => void;
    onViewDetails: (movie: Movie) => void;
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies, hasMore, onLoadMore, onPlay, onViewDetails }) => {
    return (
        <section id="movies">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-display font-bold text-3xl md:text-4xl border-l-4 border-primary pl-4">
                    🎥 Latest Movies
                </h2>
            </div>

            {movies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {movies.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            onPlay={onPlay} 
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500">
                    <p className="text-xl">No movies found. Try a different search or category.</p>
                </div>
            )}
            
            {hasMore && (
                <div className="text-center mt-12">
                    <button 
                        onClick={onLoadMore}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
                    >
                        <i className="fas fa-sync-alt mr-2"></i> Load More Movies
                    </button>
                </div>
            )}
        </section>
    );
};

export default MoviesGrid;
