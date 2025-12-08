// import Link from 'next/link';
// import { FaPlay, FaClock, FaStar, FaCalendarAlt } from 'react-icons/fa';

// export default function MovieCard({ show, featured = false }) {
//   return (
//     <div className={`group relative ${featured ? 'col-span-1 md:col-span-2' : ''}`}>
//       <Link href={`/schedules/${show.id}`}>
//         <div className="glass-card overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
//           <div className="relative h-64 md:h-80 overflow-hidden">
//             {/* Image placeholder with gradient */}
//             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
//               <FaPlay className="text-white text-6xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
//             </div>
            
//             <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80"></div>
            
//             {/* Rating badge */}
//             <div className="absolute top-4 right-4 px-3 py-1 bg-dark/90 backdrop-blur-sm rounded-full z-10">
//               <div className="flex items-center space-x-1">
//                 <FaStar className="text-accent text-sm" />
//                 <span className="text-light text-sm font-semibold">{show.rating}</span>
//               </div>
//             </div>
            
//             {/* Time badge */}
//             <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full z-10">
//               <div className="flex items-center space-x-1">
//                 <FaClock className="text-light text-sm" />
//                 <span className="text-light text-sm font-semibold">{show.time}</span>
//               </div>
//             </div>
            
//             {/* Title overlay */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark to-transparent">
//               <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{show.title}</h3>
//               <p className="text-light/70 text-sm">{show.date} • {show.duration}</p>
//             </div>
//           </div>
          
//           <div className="p-6">
//             <div className="mb-4">
//               <p className="text-light/80 text-sm line-clamp-2 mb-4">{show.description}</p>
              
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {show.genre.slice(0, 2).map((genre, index) => (
//                   <span 
//                     key={index} 
//                     className="px-3 py-1 bg-white/10 rounded-full text-xs text-light/80"
//                   >
//                     {genre}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <Link 
//                 href={`/schedules/${show.id}`} 
//                 className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center space-x-2 transition-colors"
//               >
//                 <FaPlay className="text-sm" />
//                 <span>Watch Trailer</span>
//               </Link>
              
//               <Link 
//                 href={`/player/${show.id}`}
//                 className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center space-x-2 transition-colors"
//               >
//                 <FaPlay className="text-sm" />
//                 <span>Live Stream</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </Link>
      
//       {/* Glow effect */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
//     </div>
//   );
// }


















import Link from 'next/link';
import Image from 'next/image';
import { FaPlay, FaClock, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function MovieCard({ show, featured = false }) {
  const [imageSrc, setImageSrc] = useState(show.image ? `/${show.image}` : '/default-image.jpg');

  return (
    <div className={`group relative ${featured ? 'col-span-1 md:col-span-2' : ''}`}>
      <Link href={`/schedules/${show.id}`}>
        <div className="glass-card overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="relative h-64 md:h-80 overflow-hidden">
            {/* Image with Next.js Image component */}
            <div className="absolute inset-0">
              <Image
                src={imageSrc}
                alt={show.title}
                fill
                quality={90}
                style={{
                  filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)',
                  objectFit: 'cover',
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90"></div>
            
            {/* Rating badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-dark/90 backdrop-blur-sm rounded-full z-10">
              <div className="flex items-center space-x-1">
                <FaStar className="text-accent text-sm" />
                <span className="text-light text-sm font-semibold">{show.rating}</span>
              </div>
            </div>
            
            {/* Time badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full z-10">
              <div className="flex items-center space-x-1">
                <FaClock className="text-light text-sm" />
                <span className="text-light text-sm font-semibold">{show.time}</span>
              </div>
            </div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark to-transparent z-10">
              <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{show.title}</h3>
              <p className="text-light/70 text-sm">{show.date} • {show.duration}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <p className="text-light/80 text-sm line-clamp-2 mb-4">{show.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(show.genre) ? show.genre.slice(0, 2).map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-light/80"
                  >
                    {genre}
                  </span>
                )) : (
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-light/80">
                    {show.genre}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Link 
                href={`/schedules/${show.id}`} 
                className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center space-x-2 transition-colors"
              >
                <FaPlay className="text-sm" />
                <span>Watch Trailer</span>
              </Link>
              
              <Link 
                href={`/player/${show.id}`}
                className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center space-x-2 transition-colors"
              >
                <FaPlay className="text-sm" />
                <span>Live Stream</span>
              </Link>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
    </div>
  );
}