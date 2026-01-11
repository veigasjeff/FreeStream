
// import React from 'react';
// import { Movie } from '../types';
// import PlayIcon from './icons/PlayIcon';

// interface MovieCardProps {
//     movie: Movie;
//     onPlay: (movie: Movie) => void;
//     onViewDetails: (movie: Movie) => void;
// }

// const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onViewDetails }) => {
//     const rating = movie.ratingCount > 0 ? (movie.ratingTotal / movie.ratingCount).toFixed(1) : 'N/A';
    
//     return (
//         <div className="bg-gray-900 rounded-lg overflow-hidden group relative cursor-pointer" onClick={() => onViewDetails(movie)}>
//             <div className="aspect-[2/3] relative">
//                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
//                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
//                  <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
//                      {rating} <i className="fas fa-star text-yellow-300"></i>
//                  </div>
//                  <div className="absolute bottom-0 left-0 right-0 p-3">
//                     <h3 className="text-white font-bold truncate">{movie.title}</h3>
//                       <span className="text-white font-bold truncate">{movie.language}</span>
//                     <div className="text-gray-400 text-sm flex justify-between">
//                         <span>{movie.genre}</span>
//                         <span>{new Date(movie.date).getFullYear()}</span>
//                     </div>
//                  </div>
//                  <div 
//                     className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
//                 >
//                     <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center text-white transform scale-75 group-hover:scale-100 transition-transform">
//                         <PlayIcon className="w-8 h-8" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MovieCard;















// import React from 'react';
// import { Movie } from '../types';
// import PlayIcon from './icons/PlayIcon';
// import InfoIcon from './icons/InfoIcon';

// interface MovieCardProps {
//     movie: Movie;
//     onPlay: (movie: Movie) => void;
//     onViewDetails: (movie: Movie) => void;
// }

// const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onViewDetails }) => {
//     const rating = movie.ratingCount > 0 ? (movie.ratingTotal / movie.ratingCount).toFixed(1) : 'N/A';
    
//     return (
//         <div className="bg-gray-900 rounded-lg overflow-hidden group relative cursor-pointer">
//             <div className="aspect-[2/3] relative">
//                 <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
//                 <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
//                     {rating} <i className="fas fa-star text-yellow-300"></i>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 p-3">
//                     <h3 className="text-white font-bold truncate">{movie.title}</h3>
//                     <span className="text-white font-bold truncate">{movie.language}</span>
//                     <div className="text-gray-400 text-sm flex justify-between">
//                         <span>{movie.genre}</span>
//                         <span>{new Date(movie.date).getFullYear()}</span>
//                     </div>
//                 </div>
//             </div>
            
//             <div className="p-4 space-y-3">
//                 <div className="flex justify-between items-center">
//                     <div className="text-gray-400 text-sm">
//                         <div className="flex items-center gap-1">
//                             <i className="fas fa-clock"></i>
//                             <span>{movie.views.toLocaleString()} views</span>
//                         </div>
//                     </div>
//                     <div className="text-yellow-400 text-sm flex items-center gap-1">
//                         <i className="fas fa-star"></i>
//                         <span>{rating}</span>
//                     </div>
//                 </div>
                
//                 <div className="flex items-center space-x-3">
//                     <button
//                         onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
//                         className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-transform hover:scale-105 flex-1 justify-center"
//                     >
//                         <PlayIcon className="w-4 h-4" />
//                         <span>Watch</span>
//                     </button>
//                     <button
//                         onClick={(e) => { e.stopPropagation(); onViewDetails(movie); }}
//                         className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-transform hover:scale-105 flex-1 justify-center"
//                     >
//                         <InfoIcon className="w-4 h-4" />
//                         <span>Details</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MovieCard;







import React from 'react';
import { Movie } from '../types';
import PlayIcon from './icons/PlayIcon';
import InfoIcon from './icons/InfoIcon';

interface MovieCardProps {
    movie: Movie;
    onPlay: (movie: Movie) => void;
    onViewDetails: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onViewDetails }) => {
    const rating = movie.ratingCount > 0 ? (movie.ratingTotal / movie.ratingCount).toFixed(1) : 'N/A';
    
    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group cursor-pointer">
            <div className="relative" onClick={() => onViewDetails(movie)}>
                <div className="aspect-[2/3] relative overflow-hidden">
                    <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-110" 
                        loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {rating} <i className="fas fa-star text-yellow-300 ml-1"></i>
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-bold text-sm truncate">{movie.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-300 text-xs font-medium">{movie.language}</span>
                        <span className="text-gray-400 text-xs">{new Date(movie.date).getFullYear()}</span>
                    </div>
                </div>
            </div>
            
            <div className="p-3 bg-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center text-gray-400 text-xs">
                        <i className="fas fa-eye mr-1"></i>
                        <span>{movie.views.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                        {movie.genre}
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
                        className="bg-primary hover:bg-primary-dark text-white font-medium text-sm py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-transform hover:scale-105 flex-1 min-w-0"
                    >
                        <PlayIcon className="w-3 h-3" />
                        <span className="truncate">Watch</span>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onViewDetails(movie); }}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-transform hover:scale-105 flex-1 min-w-0"
                    >
                        <InfoIcon className="w-3 h-3" />
                        <span className="truncate">Details</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;