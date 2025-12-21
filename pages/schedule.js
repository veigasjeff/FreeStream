// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import schedule from '../data/schedules.json';
// import { 
//   FaCalendarAlt, FaClock, FaFilm, FaExclamationTriangle, 
//   FaSpinner, FaFilter, FaSortAmountDown, FaCalendarDay,
//   FaArrowUp, FaSearch, FaEye, FaPlay
// } from 'react-icons/fa';
// import { useState, useEffect, useRef } from 'react';

// export default function SchedulePage() {
//   const baseUrl = "https://freestreaming.vercel.app";
  
//   // State management
//   const [visibleShows, setVisibleShows] = useState([]);
//   const [filteredShows, setFilteredShows] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('all');
//   const [selectedGenre, setSelectedGenre] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const currentIndexRef = useRef(0);
//   const BATCH_SIZE = 12;

//   // Initialize with all shows
//   useEffect(() => {
//     const allShows = [...schedule.shows].sort((a, b) => 
//       new Date(b.date) - new Date(a.date)
//     );
//     setFilteredShows(allShows);
//     loadInitialBatch(allShows);
//   }, []);

//   // Filter shows based on criteria
//   useEffect(() => {
//     let filtered = [...schedule.shows];
    
//     // Filter by date
//     if (selectedDate !== 'all') {
//       filtered = filtered.filter(show => show.date === selectedDate);
//     }
    
//     // Filter by genre
//     if (selectedGenre !== 'all') {
//       filtered = filtered.filter(show => 
//         Array.isArray(show.genre) ? show.genre.includes(selectedGenre) : show.genre === selectedGenre
//       );
//     }
    
//     // Filter by search query
//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(show => 
//         show.title.toLowerCase().includes(query) ||
//         show.description.toLowerCase().includes(query) ||
//         (Array.isArray(show.cast) && show.cast.some(actor => actor.toLowerCase().includes(query)))
//       );
//     }
    
//     setFilteredShows(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)));
//     loadInitialBatch(filtered);
//   }, [selectedDate, selectedGenre, searchQuery]);

//   const loadInitialBatch = (shows) => {
//     const initialData = shows.slice(0, BATCH_SIZE);
//     setVisibleShows(initialData);
//     currentIndexRef.current = BATCH_SIZE;
//     setHasMore(shows.length > BATCH_SIZE);
//   };

//   const loadMoreItems = () => {
//     if (!hasMore || isLoading) return;
    
//     setIsLoading(true);
    
//     setTimeout(() => {
//       const currentIndex = currentIndexRef.current;
//       const nextIndex = currentIndex + BATCH_SIZE;
//       const nextBatch = filteredShows.slice(currentIndex, nextIndex);
      
//       if (nextBatch.length > 0) {
//         setVisibleShows(prev => [...prev, ...nextBatch]);
//         currentIndexRef.current = nextIndex;
//       }
      
//       if (nextIndex >= filteredShows.length) {
//         setHasMore(false);
//       }
      
//       setIsLoading(false);
//     }, 300);
//   };

//   // Get unique dates for filter
//   const uniqueDates = [...new Set(schedule.shows.map(show => show.date))].sort();

//   // Get unique genres for filter
//   const allGenres = schedule.shows.flatMap(show => 
//     Array.isArray(show.genre) ? show.genre : [show.genre]
//   );
//   const uniqueGenres = [...new Set(allGenres)].sort();

//   // Schema for Schedule Page
//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "@id": `${baseUrl}/schedule/#collectionpage`,
//     "url": `${baseUrl}/schedule`,
//     "name": "Free Streaming Schedule - Watch Movies Online Free",
//     "description": "Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies.",
//     "mainEntity": {
//       "@type": "ItemList",
//       "itemListElement": schedule.shows.slice(0, 50).map((show, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "item": {
//           "@type": "Movie",
//           "@id": `${baseUrl}/schedules/${show.id}`,
//           "name": show.title,
//           "dateCreated": show.year,
//           "description": show.description.substring(0, 100),
//           "duration": show.duration,
//           "actor": show.cast.map(actor => ({ "@type": "Person", "name": actor })),
//           "genre": Array.isArray(show.genre) ? show.genre.join(", ") : show.genre
//         }
//       }))
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Free Streaming Schedule - Watch Movies Online Free</title>
//         <meta name="description" content="Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies." />
//         <meta name="keywords" content="movie schedule, streaming schedule, watch movies online, movie showtimes, free movie schedule, streaming calendar" />
//         <link rel="canonical" href={`${baseUrl}/schedule`} />
        
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800">
//           <div className="container mx-auto px-4 py-12">
//             <div className="text-center">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                 Movie <span className="text-blue-400">Streaming Schedule</span>
//               </h1>
//               <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
//                 Browse our complete schedule of free movie streams. All times in GMT.
//               </p>
              
//               {/* Filters */}
//               <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
//                 <div className="relative">
//                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search movies..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 w-full md:w-64 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
                
//                 <select
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="all">All Dates</option>
//                   {uniqueDates.map(date => (
//                     <option key={date} value={date}>
//                       {new Date(date).toLocaleDateString('en-US', { 
//                         weekday: 'short', 
//                         month: 'short', 
//                         day: 'numeric' 
//                       })}
//                     </option>
//                   ))}
//                 </select>
                
//                 <select
//                   value={selectedGenre}
//                   onChange={(e) => setSelectedGenre(e.target.value)}
//                   className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="all">All Genres</option>
//                   {uniqueGenres.map(genre => (
//                     <option key={genre} value={genre}>{genre}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="text-gray-400">
//                 Showing {visibleShows.length} of {filteredShows.length} movies
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Schedule Grid */}
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {visibleShows.map((show) => (
//               <div 
//                 key={show.id} 
//                 className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
//               >
//                 <div className="relative h-56">
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
//                   <Image
//                     src={`/${show.image}`}
//                     alt={show.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                   />
//                   <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold z-20">
//                     {show.time}
//                   </div>
//                   {show.category === 'Adult' && (
//                     <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1 z-20">
//                       <FaExclamationTriangle /> 18+
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="p-5">
//                   <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
//                     {show.title}
//                   </h3>
                  
//                   <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
//                     <div className="flex items-center gap-1">
//                       <FaClock className="text-blue-400" />
//                       <span>{show.time}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <FaCalendarAlt className="text-green-400" />
//                       <span>{show.date}</span>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm mb-4 line-clamp-2">
//                     {show.description || "Watch this exciting movie."}
//                   </p>
                  
//                   <div className="flex gap-2">
//                     <Link 
//                       href={`/schedules/${show.id}`}
//                       className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
//                     >
//                       <FaEye /> Details
//                     </Link>
//                     <Link 
//                       href={`/player/${show.id}`}
//                       className={`flex-1 py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
//                         show.isLive 
//                           ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
//                           : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
//                       }`}
//                     >
//                       <FaPlay /> {show.isLive ? 'Live' : 'Watch'}
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Load More */}
//           {hasMore && (
//             <div className="text-center mt-12">
//               <button
//                 onClick={loadMoreItems}
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center gap-2">
//                     <FaSpinner className="animate-spin" /> Loading...
//                   </span>
//                 ) : (
//                   'Load More Movies'
//                 )}
//               </button>
//             </div>
//           )}

//           {/* No Results */}
//           {visibleShows.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-4">🎬</div>
//               <h3 className="text-2xl font-bold text-white mb-4">No Movies Found</h3>
//               <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
//               <button
//                 onClick={() => {
//                   setSelectedDate('all');
//                   setSelectedGenre('all');
//                   setSearchQuery('');
//                 }}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}

//           {/* Back to Home */}
//           <div className="text-center mt-12 pt-8 border-t border-gray-800">
//             <Link 
//               href="/" 
//               className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//             >
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




















































// DATE ORDER 

// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import schedule from '../data/schedules.json';
// import { 
//   FaCalendarAlt, FaClock, FaFilm, FaExclamationTriangle, 
//   FaSpinner, FaFilter, FaSortAmountDown, FaCalendarDay,
//   FaArrowUp, FaSearch, FaEye, FaPlay
// } from 'react-icons/fa';
// import { useState, useEffect, useRef } from 'react';

// export default function SchedulePage() {
//   const baseUrl = "https://freestreaming.vercel.app";
  
//   // State management
//   const [visibleShows, setVisibleShows] = useState([]);
//   const [filteredShows, setFilteredShows] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('all');
//   const [selectedGenre, setSelectedGenre] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Adult content warning state
//   const [showAdultWarning, setShowAdultWarning] = useState(false);
//   const [selectedAdultShow, setSelectedAdultShow] = useState(null);
//   const [intendedAction, setIntendedAction] = useState(null);
  
//   const currentIndexRef = useRef(0);
//   const BATCH_SIZE = 12;

//   // Initialize with all shows - Display from START of JSON (top to bottom)
//   useEffect(() => {
//     // Sort by date ASCENDING (from top to bottom of JSON)
//     const allShows = [...schedule.shows].sort((a, b) => {
//       const dateA = new Date(a.date);
//       const dateB = new Date(b.date);
//       return dateA - dateB; // Ascending order (earliest first)
//     });
//     setFilteredShows(allShows);
//     loadInitialBatch(allShows);
//   }, []);

//   // Filter shows based on criteria
//   useEffect(() => {
//     let filtered = [...schedule.shows];
    
//     // Filter by date
//     if (selectedDate !== 'all') {
//       filtered = filtered.filter(show => show.date === selectedDate);
//     }
    
//     // Filter by genre
//     if (selectedGenre !== 'all') {
//       filtered = filtered.filter(show => 
//         Array.isArray(show.genre) ? show.genre.includes(selectedGenre) : show.genre === selectedGenre
//       );
//     }
    
//     // Filter by search query
//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(show => 
//         show.title.toLowerCase().includes(query) ||
//         (show.description && show.description.toLowerCase().includes(query)) ||
//         (Array.isArray(show.cast) && show.cast.some(actor => actor.toLowerCase().includes(query)))
//       );
//     }
    
//     // Sort in correct order (ascending by date) - top to bottom
//     const sortedFiltered = filtered.sort((a, b) => {
//       const dateA = new Date(a.date);
//       const dateB = new Date(b.date);
//       return dateA - dateB; // Ascending order
//     });
    
//     setFilteredShows(sortedFiltered);
//     loadInitialBatch(sortedFiltered);
//   }, [selectedDate, selectedGenre, searchQuery]);

//   const loadInitialBatch = (shows) => {
//     const initialData = shows.slice(0, BATCH_SIZE);
//     setVisibleShows(initialData);
//     currentIndexRef.current = BATCH_SIZE;
//     setHasMore(shows.length > BATCH_SIZE);
//   };

//   const loadMoreItems = () => {
//     if (!hasMore || isLoading) return;
    
//     setIsLoading(true);
    
//     setTimeout(() => {
//       const currentIndex = currentIndexRef.current;
//       const nextIndex = currentIndex + BATCH_SIZE;
//       const nextBatch = filteredShows.slice(currentIndex, nextIndex);
      
//       if (nextBatch.length > 0) {
//         setVisibleShows(prev => [...prev, ...nextBatch]);
//         currentIndexRef.current = nextIndex;
//       }
      
//       if (nextIndex >= filteredShows.length) {
//         setHasMore(false);
//       }
      
//       setIsLoading(false);
//     }, 300);
//   };

//   // Handle Adult content click
//   const handleAdultClick = (show, action, e) => {
//     if (show.category === 'Adult') {
//       e.preventDefault();
//       setSelectedAdultShow(show);
//       setIntendedAction(action);
//       setShowAdultWarning(true);
//       return false;
//     }
//     return true;
//   };

//   // Handle age verification
//   const handleAgeVerification = () => {
//     setShowAdultWarning(false);
    
//     // Proceed with intended action
//     if (selectedAdultShow && intendedAction) {
//       if (intendedAction === 'details') {
//         window.location.href = `/schedules/${selectedAdultShow.id}`;
//       } else if (intendedAction === 'watch') {
//         window.location.href = `/player/${selectedAdultShow.id}`;
//       }
//     }
//   };

//   // Handle cancel
//   const handleCancel = () => {
//     setShowAdultWarning(false);
//     setSelectedAdultShow(null);
//     setIntendedAction(null);
//   };

//   // Get unique dates for filter
//   const uniqueDates = [...new Set(schedule.shows.map(show => show.date))].sort();

//   // Get unique genres for filter
//   const allGenres = schedule.shows.flatMap(show => 
//     Array.isArray(show.genre) ? show.genre : [show.genre]
//   );
//   const uniqueGenres = [...new Set(allGenres)].sort();

//   // Schema for Schedule Page
//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "@id": `${baseUrl}/schedule/#collectionpage`,
//     "url": `${baseUrl}/schedule`,
//     "name": "Free Streaming Schedule - Watch Movies Online Free",
//     "description": "Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies.",
//     "mainEntity": {
//       "@type": "ItemList",
//       "itemListElement": schedule.shows.slice(0, 50).map((show, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "item": {
//           "@type": "Movie",
//           "@id": `${baseUrl}/schedules/${show.id}`,
//           "name": show.title,
//           "dateCreated": show.year,
//           "description": show.description ? show.description.substring(0, 100) : "",
//           "duration": show.duration,
//           "actor": show.cast ? show.cast.map(actor => ({ "@type": "Person", "name": actor })) : [],
//           "genre": Array.isArray(show.genre) ? show.genre.join(", ") : show.genre
//         }
//       }))
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Free Streaming Schedule - Watch Movies Online Free</title>
//         <meta name="description" content="Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies." />
//         <meta name="keywords" content="movie schedule, streaming schedule, watch movies online, movie showtimes, free movie schedule, streaming calendar" />
//         <link rel="canonical" href={`${baseUrl}/schedule`} />
        
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
//       </Head>

//       {/* Adult Content Warning Modal */}
//       {showAdultWarning && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
//             <div className="flex items-center gap-3 mb-4 text-red-500">
//               <FaExclamationTriangle className="text-3xl" />
//               <h3 className="text-2xl font-bold">Adult Content Warning</h3>
//             </div>
//             <p className="text-gray-300 mb-4">
//               <strong>This content is rated ADULT and is restricted to viewers 18 years or older.</strong>
//             </p>
//             <p className="text-gray-400 mb-6">
//               This content is restricted to viewers 18+. Contains explicit adult material. By clicking "Continue", you confirm that you are 
//               at least 18 years old and agree to view adult content.
//             </p>
//             <div className="flex gap-3">
//               <button 
//                 onClick={handleCancel}
//                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleAgeVerification}
//                 className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-bold transition-colors"
//               >
//                 Continue (18+)
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800">
//           <div className="container mx-auto px-4 py-12">
//             <div className="text-center">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                 Movie <span className="text-blue-400">Streaming Schedule</span>
//               </h1>
//               <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
//                 Browse our complete schedule of free movie streams. All times in GMT.
//               </p>
              
//               {/* Filters */}
//               <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
//                 <div className="relative">
//                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search movies..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 w-full md:w-64 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
                
//                 <select
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="all">All Dates</option>
//                   {uniqueDates.map(date => (
//                     <option key={date} value={date}>
//                       {new Date(date).toLocaleDateString('en-US', { 
//                         weekday: 'short', 
//                         month: 'short', 
//                         day: 'numeric' 
//                       })}
//                     </option>
//                   ))}
//                 </select>
                
//                 <select
//                   value={selectedGenre}
//                   onChange={(e) => setSelectedGenre(e.target.value)}
//                   className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="all">All Genres</option>
//                   {uniqueGenres.map(genre => (
//                     <option key={genre} value={genre}>{genre}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="text-gray-400">
//                 Showing {visibleShows.length} of {filteredShows.length} movies
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Schedule Grid */}
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {visibleShows.map((show) => {
//               const isAdult = show.category === 'Adult';
//               return (
//                 <div 
//                   key={show.id} 
//                   className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
//                 >
//                   <div className="relative h-56">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
//                     {show.image && (
//                       <Image
//                         src={`/${show.image}`}
//                         alt={show.title}
//                         fill
//                           quality={90}
//                 style={{
//                   filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)',
//                   objectFit: 'cover',
//                 }}
//                         className="object-cover group-hover:scale-105 transition-transform duration-500"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                       />
//                     )}
//                     <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold z-20">
//                       {show.time}
//                     </div>
//                     {isAdult && (
//                       <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1 z-20">
//                         <FaExclamationTriangle /> 18+
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="p-5">
//                     <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
//                       {show.title}
//                       {isAdult && (
//                         <span className="ml-2 text-red-400 text-xs font-bold">[ADULT]</span>
//                       )}
//                     </h3>
                    
//                     <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
//                       <div className="flex items-center gap-1">
//                         <FaClock className="text-blue-400" />
//                         <span>{show.time}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FaCalendarAlt className="text-green-400" />
//                         <span>{show.date}</span>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-300 text-sm mb-4 line-clamp-2">
//                       {show.description || "Watch this exciting movie."}
//                     </p>
                    
//                     <div className="flex gap-2">
//                       {/* Details Button */}
//                       {isAdult ? (
//                         <button
//                           onClick={(e) => handleAdultClick(show, 'details', e)}
//                           className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
//                         >
//                           <FaEye /> Details
//                         </button>
//                       ) : (
//                         <Link 
//                           href={`/schedules/${show.id}`}
//                           className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
//                         >
//                           <FaEye /> Details
//                         </Link>
//                       )}
                      
//                       {/* Watch Button */}
//                       {isAdult ? (
//                         <button
//                           onClick={(e) => handleAdultClick(show, 'watch', e)}
//                           className={`flex-1 py-2 rounded-lg text-sm font-medium text-center flex items-center justify-center gap-2 ${
//                             show.isLive 
//                               ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
//                               : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
//                           }`}
//                         >
//                           <FaPlay /> {show.isLive ? 'Live' : 'Watch'}
//                         </button>
//                       ) : (
//                         <Link 
//                           href={`/player/${show.id}`}
//                           className={`flex-1 py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
//                             show.isLive 
//                               ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
//                               : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
//                           }`}
//                         >
//                           <FaPlay /> {show.isLive ? 'Live' : 'Watch'}
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Load More */}
//           {hasMore && (
//             <div className="text-center mt-12">
//               <button
//                 onClick={loadMoreItems}
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center gap-2">
//                     <FaSpinner className="animate-spin" /> Loading...
//                   </span>
//                 ) : (
//                   'Load More Movies'
//                 )}
//               </button>
//             </div>
//           )}

//           {/* No Results */}
//           {visibleShows.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-4">🎬</div>
//               <h3 className="text-2xl font-bold text-white mb-4">No Movies Found</h3>
//               <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
//               <button
//                 onClick={() => {
//                   setSelectedDate('all');
//                   setSelectedGenre('all');
//                   setSearchQuery('');
//                 }}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}

//           {/* Back to Home */}
//           <div className="text-center mt-12 pt-8 border-t border-gray-800">
//             <Link 
//               href="/" 
//               className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//             >
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




//LOGICAL ISSUE

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import schedule from '../data/schedules.json';
import { 
  FaCalendarAlt, FaClock, FaFilm, FaExclamationTriangle, 
  FaSpinner, FaFilter, FaSortAmountDown, FaCalendarDay,
  FaArrowUp, FaSearch, FaEye, FaPlay
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function SchedulePage() {
  const baseUrl = "https://freestreaming.vercel.app";
  
  // State management
  const [visibleShows, setVisibleShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Adult content warning state
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [selectedAdultShow, setSelectedAdultShow] = useState(null);
  const [intendedAction, setIntendedAction] = useState(null);
  
  const currentIndexRef = useRef(0);
  const BATCH_SIZE = 12;

  // Initialize with all shows in EXACT JSON ORDER (no sorting)
  useEffect(() => {
    const allShows = [...schedule.shows]; // Keep original JSON order
    setFilteredShows(allShows);
    loadInitialBatch(allShows);
  }, []);

  // Filter shows based on criteria
  useEffect(() => {
    let filtered = [...schedule.shows];
    
    // Filter by date
    if (selectedDate !== 'all') {
      filtered = filtered.filter(show => show.date === selectedDate);
    }
    
    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(show => 
        Array.isArray(show.genre) ? show.genre.includes(selectedGenre) : show.genre === selectedGenre
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(show => 
        show.title.toLowerCase().includes(query) ||
        (show.description && show.description.toLowerCase().includes(query)) ||
        (Array.isArray(show.cast) && show.cast.some(actor => actor.toLowerCase().includes(query)))
      );
    }
    
    // Maintain original JSON order - find index in original array
    const sortedFiltered = [...filtered].sort((a, b) => {
      const indexA = schedule.shows.findIndex(show => show.id === a.id);
      const indexB = schedule.shows.findIndex(show => show.id === b.id);
      return indexA - indexB;
    });
    
    setFilteredShows(sortedFiltered);
    loadInitialBatch(sortedFiltered);
  }, [selectedDate, selectedGenre, searchQuery]);

  const loadInitialBatch = (shows) => {
    const initialData = shows.slice(0, BATCH_SIZE);
    setVisibleShows(initialData);
    currentIndexRef.current = BATCH_SIZE;
    setHasMore(shows.length > BATCH_SIZE);
  };

  const loadMoreItems = () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const currentIndex = currentIndexRef.current;
      const nextIndex = currentIndex + BATCH_SIZE;
      const nextBatch = filteredShows.slice(currentIndex, nextIndex);
      
      if (nextBatch.length > 0) {
        setVisibleShows(prev => [...prev, ...nextBatch]);
        currentIndexRef.current = nextIndex;
      }
      
      if (nextIndex >= filteredShows.length) {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 300);
  };

  // Handle Adult content click
  const handleAdultClick = (show, action, e) => {
    if (show.category === 'Adult') {
      e.preventDefault();
      setSelectedAdultShow(show);
      setIntendedAction(action);
      setShowAdultWarning(true);
      return false;
    }
    return true;
  };

  // Handle age verification
  const handleAgeVerification = () => {
    setShowAdultWarning(false);
    
    // Proceed with intended action
    if (selectedAdultShow && intendedAction) {
      if (intendedAction === 'details') {
        window.location.href = `/schedules/${selectedAdultShow.id}`;
      } else if (intendedAction === 'watch') {
        window.location.href = `/player/${selectedAdultShow.id}`;
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowAdultWarning(false);
    setSelectedAdultShow(null);
    setIntendedAction(null);
  };

  // Get unique dates for filter
  const uniqueDates = [...new Set(schedule.shows.map(show => show.date))].sort();

  // Get unique genres for filter
  const allGenres = schedule.shows.flatMap(show => 
    Array.isArray(show.genre) ? show.genre : [show.genre]
  );
  const uniqueGenres = [...new Set(allGenres)].sort();

  // Schema for Schedule Page
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/schedule/#collectionpage`,
    "url": `${baseUrl}/schedule`,
    "name": "Free Streaming Schedule - Watch Movies Online Free",
    "description": "Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": schedule.shows.slice(0, 50).map((show, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Movie",
          "@id": `${baseUrl}/schedules/${show.id}`,
          "name": show.title,
          "dateCreated": show.year,
          "description": show.description ? show.description.substring(0, 100) : "",
          "duration": show.duration,
          "actor": show.cast ? show.cast.map(actor => ({ "@type": "Person", "name": actor })) : [],
          "genre": Array.isArray(show.genre) ? show.genre.join(", ") : show.genre
        }
      }))
    }
  };

  return (
    <>
      <Head>
        <title>Free Streaming Schedule - Watch Movies Online Free</title>
        <meta name="description" content="Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies." />
        <meta name="keywords" content="movie schedule, streaming schedule, watch movies online, movie showtimes, free movie schedule, streaming calendar" />
        <link rel="canonical" href={`${baseUrl}/schedule`} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </Head>

      {/* Adult Content Warning Modal */}
      {showAdultWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <FaExclamationTriangle className="text-3xl" />
              <h3 className="text-2xl font-bold">Adult Content Warning</h3>
            </div>
            <p className="text-gray-300 mb-4">
              <strong>This content is rated ADULT and is restricted to viewers 18 years or older.</strong>
            </p>
            <p className="text-gray-400 mb-6">
              This content is restricted to viewers 18+. Contains explicit adult material. By clicking "Continue", you confirm that you are 
              at least 18 years old and agree to view adult content.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAgeVerification}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-bold transition-colors"
              >
                Continue (18+)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Movie <span className="text-blue-400">Streaming Schedule</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
                Browse our complete schedule of free movie streams. All times in GMT.
              </p>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 w-full md:w-64 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Dates</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Genres</option>
                  {uniqueGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              <div className="text-gray-400">
                Showing {visibleShows.length} of {filteredShows.length} movies & tv shows.
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleShows.map((show) => {
              const isAdult = show.category === 'Adult';
              return (
                <div 
                  key={show.id} 
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
                >
                  <div className="relative h-56">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    {show.image && (
                      <Image
                        src={`/${show.image}`}
                        alt={show.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    )}
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold z-20">
                      {show.time}
                    </div>
                    {isAdult && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1 z-20">
                        <FaExclamationTriangle /> 18+
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                      {show.title}
                      {isAdult && (
                        <span className="ml-2 text-red-400 text-xs font-bold">[ADULT]</span>
                      )}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-blue-400" />
                        <span>{show.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-green-400" />
                        <span>{show.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {show.description || "Watch this exciting movie."}
                    </p>
                    
                    <div className="flex gap-2">
                      {/* Details Button */}
                      {isAdult ? (
                        <button
                          onClick={(e) => handleAdultClick(show, 'details', e)}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <FaEye /> Details
                        </button>
                      ) : (
                        <Link 
                          href={`/schedules/${show.id}`}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
                        >
                          <FaEye /> Details
                        </Link>
                      )}
                      
                      {/* Watch Button */}
                      {isAdult ? (
                        <button
                          onClick={(e) => handleAdultClick(show, 'watch', e)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium text-center flex items-center justify-center gap-2 ${
                            show.isLive 
                              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                          }`}
                        >
                          <FaPlay /> {show.isLive ? 'Live' : 'Watch'}
                        </button>
                      ) : (
                        <Link 
                          href={`/player/${show.id}`}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
                            show.isLive 
                              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                          }`}
                        >
                          <FaPlay /> {show.isLive ? 'Live' : 'Watch'}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={loadMoreItems}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <FaSpinner className="animate-spin" /> Loading...
                  </span>
                ) : (
                  'Load More Movies'
                )}
              </button>
            </div>
          )}

          {/* No Results */}
          {visibleShows.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Movies Found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSelectedDate('all');
                  setSelectedGenre('all');
                  setSearchQuery('');
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-12 pt-8 border-t border-gray-800">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}






// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import schedule from '../data/schedules.json';
// import { 
//   FaCalendarAlt, FaClock, FaFilm, FaExclamationTriangle, 
//   FaSpinner, FaFilter, FaSortAmountDown, FaCalendarDay,
//   FaArrowUp, FaSearch, FaEye, FaPlay
// } from 'react-icons/fa';
// import { useState, useEffect, useRef } from 'react';

// export default function SchedulePage() {
//   const baseUrl = "https://freestreaming.vercel.app";
  
//   // State management
//   const [visibleShows, setVisibleShows] = useState([]);
//   const [filteredShows, setFilteredShows] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('all');
//   const [selectedGenre, setSelectedGenre] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Adult content warning state
//   const [showAdultWarning, setShowAdultWarning] = useState(false);
//   const [selectedAdultShow, setSelectedAdultShow] = useState(null);
//   const [intendedAction, setIntendedAction] = useState(null);
  
//   const currentIndexRef = useRef(0);
//   const BATCH_SIZE = 12;

//   // Initialize with all shows in EXACT JSON ORDER (no sorting)
//   useEffect(() => {
//     const allShows = [...schedule.shows]; // Keep original JSON order
//     setFilteredShows(allShows);
//     loadInitialBatch(allShows);
//   }, []);

//   // Filter shows based on criteria - FIXED LOGIC
//   useEffect(() => {
//     let filtered = [...schedule.shows];
    
//     // Filter by date
//     if (selectedDate !== 'all') {
//       filtered = filtered.filter(show => {
//         // For live channels with date "2025-12-31", show them in all date filters
//         if (show.date === "2025-12-31") return true;
//         return show.date === selectedDate;
//       });
//     }
    
//     // Filter by genre
//     if (selectedGenre !== 'all') {
//       filtered = filtered.filter(show => {
//         if (!show.genre || show.genre.length === 0) return false;
        
//         // Handle both array and string genre formats
//         if (Array.isArray(show.genre)) {
//           return show.genre.some(g => 
//             g.toLowerCase().includes(selectedGenre.toLowerCase())
//           );
//         }
//         return show.genre.toLowerCase().includes(selectedGenre.toLowerCase());
//       });
//     }
    
//     // Filter by search query
//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase().trim();
//       filtered = filtered.filter(show => {
//         // Search in title
//         if (show.title && show.title.toLowerCase().includes(query)) return true;
        
//         // Search in description
//         if (show.description && show.description.toLowerCase().includes(query)) return true;
        
//         // Search in cast
//         if (show.cast && Array.isArray(show.cast)) {
//           return show.cast.some(actor => 
//             actor && actor.toLowerCase().includes(query)
//           );
//         }
        
//         // Search in director
//         if (show.director) {
//           if (Array.isArray(show.director)) {
//             return show.director.some(dir => 
//               dir && dir.toLowerCase().includes(query)
//             );
//           }
//           return show.director.toLowerCase().includes(query);
//         }
        
//         return false;
//       });
//     }
    
//     // Maintain original JSON order by matching IDs with original array
//     const sortedFiltered = filtered.sort((a, b) => {
//       const indexA = schedule.shows.findIndex(show => show.id === a.id);
//       const indexB = schedule.shows.findIndex(show => show.id === b.id);
//       return indexA - indexB;
//     });
    
//     setFilteredShows(sortedFiltered);
//     loadInitialBatch(sortedFiltered);
//   }, [selectedDate, selectedGenre, searchQuery]);

//   const loadInitialBatch = (shows) => {
//     const initialData = shows.slice(0, BATCH_SIZE);
//     setVisibleShows(initialData);
//     currentIndexRef.current = Math.min(BATCH_SIZE, shows.length);
//     setHasMore(shows.length > BATCH_SIZE);
//   };

//   const loadMoreItems = () => {
//     if (!hasMore || isLoading) return;
    
//     setIsLoading(true);
    
//     setTimeout(() => {
//       const currentIndex = currentIndexRef.current;
//       const nextIndex = currentIndex + BATCH_SIZE;
//       const nextBatch = filteredShows.slice(currentIndex, nextIndex);
      
//       if (nextBatch.length > 0) {
//         setVisibleShows(prev => [...prev, ...nextBatch]);
//         currentIndexRef.current = nextIndex;
//       }
      
//       if (nextIndex >= filteredShows.length) {
//         setHasMore(false);
//       }
      
//       setIsLoading(false);
//     }, 300);
//   };

//   // Handle Adult content click
//   const handleAdultClick = (show, action, e) => {
//     if (show.category === 'Adult') {
//       e.preventDefault();
//       setSelectedAdultShow(show);
//       setIntendedAction(action);
//       setShowAdultWarning(true);
//       return false;
//     }
//     return true;
//   };

//   // Handle age verification
//   const handleAgeVerification = () => {
//     setShowAdultWarning(false);
    
//     // Proceed with intended action
//     if (selectedAdultShow && intendedAction) {
//       if (intendedAction === 'details') {
//         window.location.href = `/schedules/${selectedAdultShow.id}`;
//       } else if (intendedAction === 'watch') {
//         window.location.href = `/player/${selectedAdultShow.id}`;
//       }
//     }
//   };

//   // Handle cancel
//   const handleCancel = () => {
//     setShowAdultWarning(false);
//     setSelectedAdultShow(null);
//     setIntendedAction(null);
//   };

//   // Get unique dates for filter (excluding live channels date 2025-12-31)
//   const uniqueDates = [...new Set(schedule.shows
//     .filter(show => show.date && show.date !== "2025-12-31")
//     .map(show => show.date)
//   )].sort((a, b) => new Date(b) - new Date(a)); // Sort descending (newest first)

//   // Get unique genres for filter
//   const allGenres = schedule.shows.flatMap(show => {
//     if (!show.genre) return [];
//     if (Array.isArray(show.genre)) return show.genre;
//     return [show.genre];
//   });
  
//   // Clean and deduplicate genres
//   const uniqueGenres = [...new Set(allGenres
//     .filter(genre => genre && typeof genre === 'string')
//     .map(genre => genre.trim())
//   )].sort();

//   // Schema for Schedule Page
//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "@id": `${baseUrl}/schedule/#collectionpage`,
//     "url": `${baseUrl}/schedule`,
//     "name": "Free Streaming Schedule - Watch Movies Online Free",
//     "description": "Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies.",
//     "mainEntity": {
//       "@type": "ItemList",
//       "itemListElement": schedule.shows.slice(0, 50).map((show, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "item": {
//           "@type": "Movie",
//           "@id": `${baseUrl}/schedules/${show.id}`,
//           "name": show.title,
//           "dateCreated": show.year,
//           "description": show.description ? show.description.substring(0, 100) : "",
//           "duration": show.duration,
//           "actor": show.cast ? show.cast.map(actor => ({ "@type": "Person", "name": actor })) : [],
//           "genre": Array.isArray(show.genre) ? show.genre.join(", ") : show.genre
//         }
//       }))
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Free Streaming Schedule - Watch Movies Online Free</title>
//         <meta name="description" content="Browse our complete movie streaming schedule. Find showtimes, dates, and streaming information for all movies." />
//         <meta name="keywords" content="movie schedule, streaming schedule, watch movies online, movie showtimes, free movie schedule, streaming calendar" />
//         <link rel="canonical" href={`${baseUrl}/schedule`} />
        
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
//       </Head>

//       {/* Adult Content Warning Modal */}
//       {showAdultWarning && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
//             <div className="flex items-center gap-3 mb-4 text-red-500">
//               <FaExclamationTriangle className="text-3xl" />
//               <h3 className="text-2xl font-bold">Adult Content Warning</h3>
//             </div>
//             <p className="text-gray-300 mb-4">
//               <strong>This content is rated ADULT and is restricted to viewers 18 years or older.</strong>
//             </p>
//             <p className="text-gray-400 mb-6">
//               This content is restricted to viewers 18+. Contains explicit adult material. By clicking "Continue", you confirm that you are 
//               at least 18 years old and agree to view adult content.
//             </p>
//             <div className="flex gap-3">
//               <button 
//                 onClick={handleCancel}
//                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleAgeVerification}
//                 className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-bold transition-colors"
//               >
//                 Continue (18+)
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800">
//           <div className="container mx-auto px-4 py-12">
//             <div className="text-center">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                 Movie <span className="text-blue-400">Streaming Schedule</span>
//               </h1>
//               <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
//                 Browse our complete schedule of free movie streams. All times in GMT.
//               </p>
              
//               {/* Filters */}
//               <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
//                 <div className="relative">
//                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search movies, actors, directors..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 w-full md:w-64 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
                
//                 <select
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="all">All Dates</option>
//                   {uniqueDates.map(date => (
//                     <option key={date} value={date}>
//                       {new Date(date).toLocaleDateString('en-US', { 
//                         weekday: 'short', 
//                         month: 'short', 
//                         day: 'numeric' 
//                       })}
//                     </option>
//                   ))}
//                 </select>
                
//                 <select
//                   value={selectedGenre}
//                   onChange={(e) => setSelectedGenre(e.target.value)}
//                   className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
//                 >
//                   <option value="all">All Genres</option>
//                   {uniqueGenres.map(genre => (
//                     <option key={genre} value={genre}>{genre}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="text-gray-400">
//                 Showing {visibleShows.length} of {filteredShows.length} movies
//                 {filteredShows.length !== schedule.shows.length && (
//                   <span className="ml-2 text-blue-400">
//                     (Filtered from {schedule.shows.length} total)
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Schedule Grid */}
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {visibleShows.map((show) => {
//               const isAdult = show.category === 'Adult';
//               const isLive = show.time && show.time.includes('Live');
              
//               return (
//                 <div 
//                   key={show.id} 
//                   className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
//                 >
//                   <div className="relative h-56">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
//                     {show.image && (
//                       <Image
//                         src={`/${show.image}`}
//                         alt={show.title}
//                         fill
//                         className="object-cover group-hover:scale-105 transition-transform duration-500"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                       />
//                     )}
//                     <div className={`absolute top-3 left-3 ${isLive ? 'bg-red-600' : 'bg-blue-600'} text-white px-3 py-1 rounded-md text-sm font-bold z-20`}>
//                       {show.time || 'Available'}
//                     </div>
//                     {isAdult && (
//                       <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1 z-20">
//                         <FaExclamationTriangle /> 18+
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="p-5">
//                     <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
//                       {show.title}
//                       {isAdult && (
//                         <span className="ml-2 text-red-400 text-xs font-bold">[ADULT]</span>
//                       )}
//                     </h3>
                    
//                     <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
//                       <div className="flex items-center gap-1">
//                         <FaClock className="text-blue-400" />
//                         <span>{show.time || 'Available Now'}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FaCalendarAlt className="text-green-400" />
//                         <span>{show.date || 'No date'}</span>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-300 text-sm mb-4 line-clamp-2">
//                       {show.description || "Watch this exciting content."}
//                     </p>
                    
//                     <div className="flex gap-2">
//                       {/* Details Button */}
//                       {isAdult ? (
//                         <button
//                           onClick={(e) => handleAdultClick(show, 'details', e)}
//                           className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
//                         >
//                           <FaEye /> Details
//                         </button>
//                       ) : (
//                         <Link 
//                           href={`/schedules/${show.id}`}
//                           className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
//                         >
//                           <FaEye /> Details
//                         </Link>
//                       )}
                      
//                       {/* Watch Button */}
//                       {isAdult ? (
//                         <button
//                           onClick={(e) => handleAdultClick(show, 'watch', e)}
//                           className={`flex-1 py-2 rounded-lg text-sm font-medium text-center flex items-center justify-center gap-2 ${
//                             isLive 
//                               ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
//                               : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
//                           }`}
//                         >
//                           <FaPlay /> {isLive ? 'Live' : 'Watch'}
//                         </button>
//                       ) : (
//                         <Link 
//                           href={`/player/${show.id}`}
//                           className={`flex-1 py-2 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
//                             isLive 
//                               ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
//                               : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
//                           }`}
//                         >
//                           <FaPlay /> {isLive ? 'Live' : 'Watch'}
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Load More */}
//           {hasMore && (
//             <div className="text-center mt-12">
//               <button
//                 onClick={loadMoreItems}
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               >
//                 {isLoading ? (
//                   <span className="flex items-center gap-2">
//                     <FaSpinner className="animate-spin" /> Loading...
//                   </span>
//                 ) : (
//                   'Load More Movies'
//                 )}
//               </button>
//             </div>
//           )}

//           {/* No Results */}
//           {visibleShows.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-4">🎬</div>
//               <h3 className="text-2xl font-bold text-white mb-4">No Content Found</h3>
//               <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
//               <button
//                 onClick={() => {
//                   setSelectedDate('all');
//                   setSelectedGenre('all');
//                   setSearchQuery('');
//                 }}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg"
//               >
//                 Reset All Filters
//               </button>
//             </div>
//           )}

//           {/* Back to Home */}
//           <div className="text-center mt-12 pt-8 border-t border-gray-800">
//             <Link 
//               href="/" 
//               className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//             >
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }