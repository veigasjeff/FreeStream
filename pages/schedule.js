import Head from 'next/head';
import schedule from '../data/schedules.json';
import { FaCalendarAlt, FaClock, FaFilm, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SchedulePage() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [intendedAction, setIntendedAction] = useState(null);
  
  const [visibleShowsCount, setVisibleShowsCount] = useState(15);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allShows, setAllShows] = useState([]);

  useEffect(() => {
    const allShowsArray = schedule.shows;
    setAllShows(allShowsArray);
  }, []);

  const visibleShows = allShows.slice(0, visibleShowsCount);
  const showsByDate = visibleShows.reduce((acc, show) => {
    if (!acc[show.date]) {
      acc[show.date] = [];
    }
    acc[show.date].push(show);
    return acc;
  }, {});

  const baseUrl = "https://freestreamcinema.vercel.app/";

  // IMAGE PATH FIXER: Ensures images from public folder have a leading slash
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/default-movie.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    }
  }, []);

  const handleAdultClick = (show, action) => {
    if (show?.category === 'Adult') {
      setSelectedShow(show);
      setIntendedAction(action);
      setShowNotification(true);
      document.body.style.overflow = 'hidden';
      return false;
    }
    return true;
  };

  const handleAgeVerification = () => {
    setIsAgeVerified(true);
    setShowNotification(false);
    localStorage.setItem('ageVerified', 'true');
    document.body.style.overflow = 'unset';
    
    if (selectedShow && intendedAction) {
      if (intendedAction === 'details') {
        router.push(`/schedules/${selectedShow.id}`);
      } else if (intendedAction === 'player') {
        router.push(`/player/${selectedShow.id}`);
      }
    }
  };

  const handleExit = () => {
    setShowNotification(false);
    setSelectedShow(null);
    setIntendedAction(null);
    document.body.style.overflow = 'unset';
  };

  const handleExitAttempt = () => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    
    setTimeout(() => {
      setVisibleShowsCount(prevCount => {
        const newCount = prevCount + 25;
        return Math.min(newCount, allShows.length);
      });
      setIsLoadingMore(false);
    }, 2000 + Math.random() * 1000);
  };

  const shouldShowLoadMore = visibleShowsCount < allShows.length;

  if (showNotification && selectedShow?.category === 'Adult') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border-2 border-red-600 rounded-xl p-6 w-full max-w-md mx-auto relative">
          <button 
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            onClick={handleExitAttempt}
          >
            ×
          </button>
          
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-red-500 text-2xl font-bold mb-2">18+ CONTENT</h2>
              <p className="text-gray-300 text-sm">You must be 18 years or older to access this content</p>
            </div>
            
            {showWarning && (
              <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 mb-4">
                <p className="text-yellow-300 text-sm">Please confirm your age or exit</p>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex items-center justify-center text-red-500 mb-3">
                <FaExclamationTriangle className="text-3xl" />
              </div>
              <p className="text-gray-300 text-sm mb-2">
                This content is restricted to adults only (18+).
              </p>
              <p className="text-gray-400 text-xs">
                By entering, you confirm you are 18 or older and agree to our terms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors w-full"
                onClick={handleAgeVerification}
              >
                I AM 18+ - ENTER
              </button>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors w-full"
                onClick={handleExit}
              >
                EXIT - NOT 18+
              </button>
            </div>
            
            <p className="text-gray-500 text-xs mt-4">
              Restricted access. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAgeVerified && selectedShow?.category === 'Adult') {
    return null;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Free Streaming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free Streaming is an online platform that streams movies live at scheduled times, similar to a traditional cinema. We offer 3 shows daily at fixed times"
        }
      },
      {
        "@type": "Question",
        "name": "How does the schedule work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Movies stream at exact scheduled times shown on our schedule page. Each movie plays at its designated time slot, and you can join the live stream when it's playing."
        }
      },
      {
        "@type": "Question",
        "name": "Is it really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Free Streaming is completely free. No registration, no subscriptions, and no hidden fees. Just visit our site during stream times and watch."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of movies do you stream?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We stream a variety of movies including Science Fiction, Action, Romance, Drama, and Adventure films. All movies are streamed in HD quality."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Movie Schedule",
        "item": `${baseUrl}/schedule`
      }
    ]
  };

  return (
    <>
      <Head>
        <title> Free Streaming - Daily Show Times & Streaming Schedule</title>
        <meta name="description" content="View daily movie schedule with fixed streaming times. Watch movies at scheduled times like a real cinema. 3 shows daily at 10 AM, 3 PM, and 8 PM." />
        <meta name="keywords" content="movie schedule, daily shows, streaming times, cinema schedule, film timetable, watch movies online, live movie schedule, free movie times" />
        <link rel="canonical" href={`${baseUrl}/schedule`} />
        
        <meta property="og:title" content=" Free Streaming - Daily Show Times" />
        <meta property="og:description" content="View daily movie schedule with fixed streaming times. Watch movies at scheduled times like a real cinema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/schedule`} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <section className="min-h-screen py-12 bg-gradient-to-b from-dark to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Daily <span className="gradient-text">Movie Tv Show & Live Sports Schedule</span>
            </h1>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              Watch movies at fixed times like a real cinema. Enjoy Live Sports. Click any show to watch trailer and details.
            </p>
            
            <div className="mt-4 text-gray-400 text-3xl">
              Showing {visibleShows.length} of {allShows.length} - Movies, Tv Show & Sports Events. 
            </div>
            
            <div className="mt-8 max-w-3xl mx-auto text-left hidden" aria-hidden="true">
              <h2 className="text-2xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-bold">What is Free Streaming?</h3>
                  <p>Free Streaming is an online platform that streams movies live at scheduled times, similar to a traditional cinema.</p>
                </div>
                <div>
                  <h3 className="font-bold">How does the schedule work?</h3>
                  <p>Movies stream at exact scheduled times shown on our schedule page. Each movie plays at its designated time slot.</p>
                </div>
                <div>
                  <h3 className="font-bold">Is it really free?</h3>
                  <p>Yes, Free Streaming is completely free. No registration, no subscriptions, and no hidden fees.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(showsByDate).map(([date, shows]) => (
              <div key={date} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 md:p-6">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base">Live streaming schedule is for this day & Streaming Now.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {shows.map((show) => (
                    <div key={show.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300">
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        {/* FIX: Using getImageUrl here as well */}
                        <img 
                          src={getImageUrl(show.image)}
                          alt={`${show.title} poster`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/default-movie.jpg';
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 md:px-3 py-1 rounded-md font-bold text-sm md:text-base">
                          {show.time}
                        </div>
                        {show.category === 'Adult' && (
                          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-md font-bold flex items-center gap-1 text-sm">
                            <FaExclamationTriangle />
                            18+
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                          <span className="gradient-text">{show.title}</span>
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <div className="flex items-center gap-1 text-gray-400 text-sm md:text-base">
                           GMT: <FaClock className="text-blue-500" />
                            <span>{show.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 text-sm md:text-base">
                            <FaFilm className="text-green-500" />
                            <span>{show.genre.join(", ")}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
                          {show.description || "Join us for this exciting movie experience."}
                        </p>
                        
                        <div className="mb-3 md:mb-4">
                          {show.isLive ? (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-red-400 font-bold">LIVE NOW</span>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm md:text-base">
                              Streams at GMT: <span className="text-blue-400 font-bold">{show.time}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                          {show.category === 'Adult' ? (
                            <>
                              <button 
                                onClick={() => handleAdultClick(show, 'details')}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base"
                              >
                                Watch Details
                              </button>
                              <button 
                                onClick={() => handleAdultClick(show, 'player')}
                                className={`flex-1 text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base ${
                                  show.isLive 
                                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                }`}
                              >
                                <span className="gradient-text">{show.isLive ? 'Watch Live' : 'Play Now'}</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <Link 
                                href={`/schedules/${show.id}`}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base"
                              >
                                Watch Details
                              </Link>
                              <Link 
                                href={`/player/${show.id}`}
                                className={`flex-1 text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base ${
                                  show.isLive 
                                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                }`}
                              >
                                <span className="gradient-text">{show.isLive ? 'Watch Live' : 'Play Now'}</span>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {shouldShowLoadMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
              >
                {isLoadingMore ? (
                  <div className="flex items-center justify-center gap-3">
                    <FaSpinner className="animate-spin text-xl" />
                    <span className="text-lg">Loading More Channels...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10 text-lg">Load More Channels</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </>
                )}
              </button>
              
              {isLoadingMore && (
                <div className="mt-6 space-y-3">
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-400 text-sm animate-pulse">
                    Fetching more movies from our collection...
                  </p>
                </div>
              )}
            </div>
          )}

          {!shouldShowLoadMore && allShows.length > 0 && (
            <div className="mt-12 text-center">
              <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg">
                <p className="font-bold text-lg">🎉 All Channels Loaded!</p>
                <p className="text-sm mt-1">You've viewed all {allShows.length} Channels in our schedule</p>
              </div>
            </div>
          )}

          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}














// import Head from 'next/head';
// import schedule from '../data/schedules.json';
// import { FaCalendarAlt, FaClock, FaFilm, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
// import Link from 'next/link';
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter } from 'next/router';

// export default function SchedulePage() {
//   const router = useRouter();
  
//   // --- AGE VERIFICATION STATE ---
//   const [showNotification, setShowNotification] = useState(false);
//   const [showWarning, setShowWarning] = useState(false);
//   const [isAgeVerified, setIsAgeVerified] = useState(false);
//   const [selectedShow, setSelectedShow] = useState(null);
//   const [intendedAction, setIntendedAction] = useState(null);
  
//   // --- INFINITE SCROLL STATE ---
//   const [visibleShows, setVisibleShows] = useState([]); 
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Using a Ref to track the current index prevents closure staleness in the observer
//   const indexRef = useRef(15); 
//   const loaderRef = useRef(null);

//   const ITEMS_PER_BATCH = 15;

//   // --- 1. INITIAL DATA LOAD ---
//   useEffect(() => {
//     // Load first batch immediately on mount
//     const initialData = schedule.shows.slice(0, ITEMS_PER_BATCH);
//     setVisibleShows(initialData);
//     indexRef.current = ITEMS_PER_BATCH;
    
//     if (schedule.shows.length <= ITEMS_PER_BATCH) {
//       setHasMore(false);
//     }
//   }, []);

//   // --- 2. LOAD MORE FUNCTION ---
//   const loadMoreItems = useCallback(() => {
//     if (isLoading || !hasMore) return;
    
//     setIsLoading(true);

//     // Artificial delay to show spinner (remove for instant load)
//     setTimeout(() => {
//       const currentCount = indexRef.current;
//       const nextCount = currentCount + ITEMS_PER_BATCH;
      
//       // Slice directly from the JSON import to avoid large state duplication
//       const nextBatch = schedule.shows.slice(currentCount, nextCount);
      
//       if (nextBatch.length > 0) {
//         setVisibleShows(prev => [...prev, ...nextBatch]);
//         indexRef.current = nextCount;
//       }

//       if (indexRef.current >= schedule.shows.length) {
//         setHasMore(false);
//       }
      
//       setIsLoading(false);
//     }, 500);
//   }, [isLoading, hasMore]);

//   // --- 3. INTERSECTION OBSERVER ---
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       const target = entries[0];
//       if (target.isIntersecting && hasMore && !isLoading) {
//         loadMoreItems();
//       }
//     }, {
//       root: null,
//       rootMargin: "100px", // Trigger before hitting bottom
//       threshold: 0.1
//     });

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [loadMoreItems, hasMore, isLoading]);

//   // --- HELPER: GROUP DATA BY DATE ---
//   const showsByDate = visibleShows.reduce((acc, show) => {
//     if (!acc[show.date]) {
//       acc[show.date] = [];
//     }
//     acc[show.date].push(show);
//     return acc;
//   }, {});

//   // --- HELPER: IMAGE PATH FIXER ---
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '/images/default-movie.jpg';
//     if (imagePath.startsWith('http')) return imagePath;
//     return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
//   };

//   // --- AGE GATE LOGIC ---
//   useEffect(() => {
//     const verified = localStorage.getItem('ageVerified');
//     if (verified === 'true') {
//       setIsAgeVerified(true);
//     }
//   }, []);

//   const handleAdultClick = (show, action) => {
//     if (show?.category === 'Adult') {
//       setSelectedShow(show);
//       setIntendedAction(action);
//       setShowNotification(true);
//       document.body.style.overflow = 'hidden';
//       return false;
//     }
//     return true;
//   };

//   const handleAgeVerification = () => {
//     setIsAgeVerified(true);
//     setShowNotification(false);
//     localStorage.setItem('ageVerified', 'true');
//     document.body.style.overflow = 'unset';
    
//     if (selectedShow && intendedAction) {
//       if (intendedAction === 'details') {
//         router.push(`/schedules/${selectedShow.id}`);
//       } else if (intendedAction === 'player') {
//         router.push(`/player/${selectedShow.id}`);
//       }
//     }
//   };

//   const handleExit = () => {
//     setShowNotification(false);
//     setSelectedShow(null);
//     setIntendedAction(null);
//     document.body.style.overflow = 'unset';
//   };

//   const handleExitAttempt = () => {
//     setShowWarning(true);
//     setTimeout(() => {
//       setShowWarning(false);
//     }, 3000);
//   };

//   // --- RENDER MODAL ---
//   if (showNotification && selectedShow?.category === 'Adult') {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
//         <div className="bg-gray-900 border-2 border-red-600 rounded-xl p-6 w-full max-w-md mx-auto relative">
//           <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl" onClick={handleExitAttempt}>×</button>
//           <div className="text-center">
//             <h2 className="text-red-500 text-2xl font-bold mb-2">18+ CONTENT</h2>
//             <p className="text-gray-300 text-sm mb-6">Restricted to adults only.</p>
//             {showWarning && <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 mb-4"><p className="text-yellow-300 text-sm">Please confirm your age or exit</p></div>}
//             <div className="flex flex-col gap-3">
//               <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold" onClick={handleAgeVerification}>I AM 18+ - ENTER</button>
//               <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold" onClick={handleExit}>EXIT</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAgeVerified && selectedShow?.category === 'Adult') {
//     return null;
//   }

//   // --- SEO JSON ---
//   const faqSchema = {
//     "@context": "https://schema.org", "@type": "FAQPage",
//     "mainEntity": [{ "@type": "Question", "name": "What is Free Streaming?", "acceptedAnswer": { "@type": "Answer", "text": "Free Streaming is an online platform that streams movies live at scheduled times." } }]
//   };

//   return (
//     <>
//       <Head>
//         <title>Free Streaming - Daily Show Times & Streaming Schedule</title>
//         <meta name="description" content="View daily movie schedule with fixed streaming times. Watch movies at scheduled times like a real cinema." />
//         <link rel="canonical" href="https://freestreamcinema.vercel.app/schedule" />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
//       </Head>

//       <section className="min-h-screen py-12 bg-gradient-to-b from-dark to-black">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               Daily <span className="gradient-text">Movie Tv Show & Live Sports Schedule</span>
//             </h1>
//             <p className="text-xl text-light/70 max-w-3xl mx-auto">
//               Watch movies at fixed times like a real cinema. Enjoy Live Sports.
//             </p>
//           </div>

//           <div className="space-y-12">
//             {Object.entries(showsByDate).map(([date, shows]) => (
//               <div key={date} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 md:p-6 animate-fadeIn">
//                 <div className="mb-6 md:mb-8">
//                   <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
//                     <FaCalendarAlt className="text-blue-500" />
//                     {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                   </h2>
//                   <p className="text-gray-400 text-sm md:text-base">Live streaming schedule is for this day & Streaming Now.</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//                   {shows.map((show) => (
//                     <div key={show.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300">
//                       <div className="relative h-56 md:h-64 overflow-hidden">
//                         <img 
//                           src={getImageUrl(show.image)} 
//                           alt={`${show.title} poster`}
//                           className="w-full h-full object-cover"
//                           onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-movie.jpg'; }}
//                         />
//                         <div className="absolute top-3 left-3 bg-red-600 text-white px-2 md:px-3 py-1 rounded-md font-bold text-sm md:text-base">
//                           {show.time}
//                         </div>
//                         {show.category === 'Adult' && (
//                           <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-md font-bold flex items-center gap-1 text-sm">
//                             <FaExclamationTriangle /> 18+
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="p-4 md:p-6">
//                         <h3 className="text-lg md:text-xl font-bold text-white mb-3">
//                           <span className="gradient-text">{show.title}</span>
//                         </h3>
//                         <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
//                           <div className="flex items-center gap-1 text-gray-400 text-sm md:text-base">
//                            GMT: <FaClock className="text-blue-500" /> <span>{show.time}</span>
//                           </div>
//                           <div className="flex items-center gap-1 text-gray-400 text-sm md:text-base">
//                             <FaFilm className="text-green-500" /> <span>{Array.isArray(show.genre) ? show.genre.join(", ") : show.genre}</span>
//                           </div>
//                         </div>
                        
//                         <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
//                           {show.description || "Join us for this exciting movie experience."}
//                         </p>
                        
//                         <div className="mb-3 md:mb-4">
//                           {show.isLive ? (
//                             <div className="flex items-center gap-2">
//                               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                               <span className="text-red-400 font-bold">LIVE NOW</span>
//                             </div>
//                           ) : (
//                             <div className="text-gray-400 text-sm md:text-base">
//                               Streams at GMT: <span className="text-blue-400 font-bold">{show.time}</span>
//                             </div>
//                           )}
//                         </div>
                        
//                         <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
//                           {show.category === 'Adult' ? (
//                             <>
//                               <button onClick={() => handleAdultClick(show, 'details')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base">Watch Details</button>
//                               <button onClick={() => handleAdultClick(show, 'player')} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base"><span className="gradient-text">Play Now</span></button>
//                             </>
//                           ) : (
//                             <>
//                               <Link href={`/schedules/${show.id}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base">Watch Details</Link>
//                               <Link href={`/player/${show.id}`} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-center py-2 md:py-3 rounded-lg font-bold transition-colors text-sm md:text-base"><span className="gradient-text">Play Now</span></Link>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* INFINITE SCROLL LOADER */}
//           <div ref={loaderRef} className="py-12 flex flex-col items-center justify-center min-h-[100px]">
//             {isLoading && hasMore && (
//               <div className="flex flex-col items-center gap-3">
//                 <FaSpinner className="animate-spin text-3xl text-blue-500" />
//                 <span className="text-gray-400 text-sm">Loading more content...</span>
//               </div>
//             )}
            
//             {!hasMore && visibleShows.length > 0 && (
//               <div className="text-gray-500 text-sm mt-4 p-4 border-t border-gray-800 w-full text-center">
//                 All items loaded. End of schedule.
//               </div>
//             )}
//           </div>

//           <div className="text-center mt-8 md:mt-12">
//             <Link href="/" className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

