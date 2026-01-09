
import React from 'react';
import { Movie } from '../types';
import PlayIcon from './icons/PlayIcon';
import InfoIcon from './icons/InfoIcon';

interface FeaturedMoviesProps {
    movies: Movie[];
    onPlay: (movie: Movie) => void;
    onViewDetails: (movie: Movie) => void;
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ movies, onPlay, onViewDetails }) => {
    return (
        <section>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-8 border-l-4 border-primary pl-4">
                🔥 Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {movies.map((movie, index) => (
                    <div 
                        key={movie.id} 
                        className={`relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 group cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                        onClick={() => onViewDetails(movie)}
                    >
                        <img 
                            src={movie.poster} 
                            alt={movie.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                            <h3 className={`font-display font-bold ${index === 0 ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} mb-2`}>{movie.title}</h3>
                            <p className={`text-gray-300 text-sm mb-4 hidden md:block ${index === 0 ? 'line-clamp-2' : 'line-clamp-1'}`}>{movie.description}</p>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-5 rounded-full flex items-center gap-2 transition-transform hover:scale-105"
                                >
                                    <PlayIcon />
                                    <span>Watch</span>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onViewDetails(movie); }}
                                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-2 px-5 rounded-full flex items-center gap-2 transition-transform hover:scale-105"
                                >
                                    <InfoIcon />
                                    <span>Details</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedMovies;
