
import React from 'react';
import { Movie } from '../types';
import PlayIcon from './icons/PlayIcon';

interface MovieDetailsModalProps {
    movie: Movie | null;
    onClose: () => void;
    onPlay: (movie: Movie) => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose, onPlay }) => {
    if (!movie) return null;

    const rating = movie.ratingCount > 0 ? (movie.ratingTotal / movie.ratingCount).toFixed(1) : 'N/A';
    
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center z-10">
                    <i className="fas fa-times"></i>
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    <div className="md:col-span-1">
                        <img src={movie.poster} alt={movie.title} className="rounded-lg w-full" />
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="font-display text-3xl font-bold text-white mb-2">{movie.title}</h2>
                        <div className="flex items-center space-x-4 text-gray-400 mb-4">
                            <span>{new Date(movie.date).getFullYear()}</span>
                            <span className="border-l border-gray-600 pl-4">{movie.genre}</span>
                            <div className="flex items-center gap-1">
                                <i className="fas fa-star text-yellow-400"></i>
                                <span>{rating}</span>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6">{movie.description}</p>
                        
                        <div className="space-y-3 text-sm mb-6">
                            <p><strong className="text-gray-400 w-24 inline-block">Director:</strong> {movie.director.join(', ')}</p>
                            <p><strong className="text-gray-400 w-24 inline-block">Cast:</strong> {movie.cast.join(', ')}</p>
                            <p><strong className="text-gray-400 w-24 inline-block">Language:</strong> {movie.language}</p>
                        </div>
                        
                        <button onClick={() => onPlay(movie)} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-transform hover:scale-105">
                            <PlayIcon />
                            <span>Watch Now</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsModal;
