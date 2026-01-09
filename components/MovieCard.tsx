
import React from 'react';
import { Movie } from '../types';
import PlayIcon from './icons/PlayIcon';

interface MovieCardProps {
    movie: Movie;
    onPlay: (movie: Movie) => void;
    onViewDetails: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onViewDetails }) => {
    const rating = movie.ratingCount > 0 ? (movie.ratingTotal / movie.ratingCount).toFixed(1) : 'N/A';
    
    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden group relative cursor-pointer" onClick={() => onViewDetails(movie)}>
            <div className="aspect-[2/3] relative">
                 <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                 <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                     {rating} <i className="fas fa-star text-yellow-300"></i>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-bold truncate">{movie.title}</h3>
                    <div className="text-gray-400 text-sm flex justify-between">
                        <span>{movie.genre}</span>
                        <span>{new Date(movie.date).getFullYear()}</span>
                    </div>
                 </div>
                 <div 
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
                >
                    <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform">
                        <PlayIcon className="w-8 h-8" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
