// import Head from 'next/head';
// import schedule from '../data/schedules.json';
// import postsData from '../data/posts.json';
// import { FaFire, FaCalendarCheck, FaVideo, FaUsers, FaPlayCircle, FaClock, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// export default function Home() {
//   const today = new Date().toISOString().split('T')[0];
//   const todaysShows = schedule.shows.filter(show => show.date === today);
  
//   // Get all unique times from today's shows
//   const todaysTimes = [...new Set(todaysShows.map(show => show.time))];
  
//   // Get the first 3 times or all if less than 3
//   const displayTimes = todaysTimes.slice(0, 3);
  
//   const baseUrl = "https://freestreaming.vercel.app";
//   const currentDate = new Date().toISOString();

//   // --- FIXED: Use empty array initially, set posts in useEffect ---
//   const [rotatedPosts, setRotatedPosts] = useState([]);
//   const [isClient, setIsClient] = useState(false);

//   // IMAGE PATH FIXER
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '/images/default-movie.jpg';
//     if (imagePath.startsWith('http')) return imagePath;
//     return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
//   };

//   // --- FIXED: Initialize and rotate posts only on client side ---
//   useEffect(() => {
//     setIsClient(true);
    
//     // Initialize with first 3 posts
//     if (postsData.posts && postsData.posts.length > 0) {
//       const initialPosts = postsData.posts.slice(0, 3);
//       setRotatedPosts(initialPosts);
//     }

//     // Set up rotation interval
//     const interval = setInterval(() => {
//       if (postsData.posts && postsData.posts.length > 0) {
//         const allPosts = [...postsData.posts];
        
//         // Fisher-Yates Shuffle Algorithm
//         for (let i = allPosts.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
//         }

//         setRotatedPosts(allPosts.slice(0, 3));
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const features = [
//     {
//       icon: <FaFire className="text-white text-2xl" />,
//       title: "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
//       description: "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now."
//     },
//     {
//       icon: <FaCalendarCheck className="text-white text-2xl" />,
//       title: "Fixed Schedule",
//       description: displayTimes.length > 0 
//         ? `Daily shows at ${displayTimes.join(', ')}${displayTimes.length < todaysTimes.length ? ' and more' : ''}`
//         : "Check schedule for today's shows"
//     },
//     {
//       icon: <FaVideo className="text-white text-2xl" />,
//       title: "HD Quality",
//       description: "High-quality streaming on all devices"
//     },
//     {
//       icon: <FaUsers className="text-white text-2xl" />,
//       title: "Real-time",
//       description: "Watch with other viewers simultaneously"
//     }
//   ];

//   const steps = [
//     {
//       title: "Check Schedule",
//       description: "View movie streaming times on our schedule page"
//     },
//     {
//       title: "Click Watch Live",
//       description: "Go to the player during the scheduled stream time"
//     },
//     {
//       title: "Enjoy the Show",
//       description: "Watch the live stream with built-in player controls"
//     }
//   ];

//   const websiteSchema = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "WebSite",
//         "@id": `${baseUrl}/#website`,
//         "url": `${baseUrl}/`,
//         "name": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
//         "description": "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
//         "publisher": {
//           "@id": `${baseUrl}/#organization`
//         },
//         "potentialAction": {
//           "@type": "SearchAction",
//           "target": `${baseUrl}/?s={search_term_string}`,
//           "query-input": "required name=search_term_string"
//         },
//         "inLanguage": "en-US"
//       },
//       {
//         "@type": "Organization",
//         "@id": `${baseUrl}/#organization`,
//         "name": "Free Streaming",
//         "url": `${baseUrl}/`,
//         "logo": {
//           "@type": "ImageObject",
//           "inLanguage": "en-US",
//           "@id": `${baseUrl}/#logo`,
//           "url": `${baseUrl}/logo.png`,
//           "contentUrl": `${baseUrl}/logo.png`,
//           "width": 512,
//           "height": 512,
//           "caption": "Free Streaming Logo"
//         },
//         "image": {
//           "@id": `${baseUrl}/#logo`
//         }
//       }
//     ]
//   };

//   const articleSchema = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Article",
//         "@id": `${baseUrl}/#article`,
//         "headline": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
//         "description": "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
//         "datePublished": currentDate,
//         "dateModified": currentDate,
//         "author": {
//           "@type": "Person",
//           "name": "Free Streaming Admin",
//           "url": `${baseUrl}/author/admin`
//         },
//         "publisher": {
//           "@type": "Organization",
//           "name": "Free Streaming",
//           "logo": {
//             "@type": "ImageObject",
//             "url": `${baseUrl}/logo.png`
//           }
//         },
//         "mainEntityOfPage": {
//           "@type": "WebPage",
//           "@id": `${baseUrl}/`
//         },
//         "articleBody": "Free Streaming is a revolutionary online platform that brings the cinema experience to your home. Watch live streaming movies, TV shows, and news at scheduled times. No registration, no subscription fees - completely free.",
//         "inLanguage": "en-US",
//         "articleSection": ["Movies", "TV Shows", "News", "Live Streaming", "Free Entertainment"],
//         "keywords": "free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online",
//         "thumbnailUrl": `${baseUrl}/og-image.jpg`,
//         "image": {
//           "@type": "ImageObject",
//           "url": `${baseUrl}/og-image.jpg`,
//           "width": 1200,
//           "height": 630,
//           "caption": "Free Streaming- Online Streaming Platform"
//         }
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${baseUrl}/`,
//         "url": `${baseUrl}/`,
//         "name": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
//         "isPartOf": {
//           "@id": `${baseUrl}/#website`
//         },
//         "datePublished": currentDate,
//         "dateModified": currentDate,
//         "description": "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
//         "breadcrumb": {
//           "@type": "BreadcrumbList",
//           "itemListElement": [
//             {
//               "@type": "ListItem",
//               "position": 1,
//               "name": "Home",
//               "item": `${baseUrl}/`
//             }
//           ]
//         }
//       },
//       {
//         "@type": "FAQPage",
//         "mainEntity": [
//           {
//             "@type": "Question",
//             "name": "What is Free Streaming",
//             "acceptedAnswer": {
//               "@type": "Answer",
//               "text": "Free Streaming is an online streaming platform that allows you to watch movies, TV shows, and news completely free of charge. We stream content live at scheduled times, similar to a traditional cinema experience."
//             }
//           },
//           {
//             "@type": "Question",
//             "name": "Is Free Streaming really free?",
//             "acceptedAnswer": {
//               "@type": "Answer",
//               "text": "Yes, Free Streaming is 100% free. No registration required, no subscription fees, no hidden charges. Simply visit our website during stream times and watch."
//             }
//           }
//         ]
//       }
//     ]
//   };

//   // --- FIXED: Check if data exists before rendering ---
//   if (!schedule || !postsData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-dark to-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="text-white mt-4">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.</title>
//         <meta name="description" content="TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
//         <meta name="keywords" content="free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online" />
//         <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//         <link rel="canonical" href={baseUrl} />
        
//         <meta property="og:title" content="Free Streaming - Watch Movies, TV Shows, Live Sports & News Online." />
//         <meta property="og:description" content="TV, shows, news, and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={baseUrl} />
//         <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:site_name" content="Free Streaming" />
//         <meta property="og:locale" content="en_US" />
//         <meta property="og:updated_time" content={currentDate} />
        
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Free Streaming - Watch Movies, TV Shows, Live Sports & News Online." />
//         <meta name="twitter:description" content="TV, shows, news, and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
//         <meta name="twitter:image" content={`${baseUrl}/twitter-image.jpg`} />
        
//         {/* Primary Schema - Website */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(websiteSchema)
//           }}
//         />
        
//         {/* Article Schema for Main Page */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(articleSchema)
//           }}
//         />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-b from-dark to-black">
//         {/* HERO SECTION */}
//         <section className="relative py-20 md:py-32 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
//           <div className="container mx-auto px-4 relative z-10">
//             <div className="text-center max-w-4xl mx-auto">
//               <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                 Watch <span className="text-blue-400">Movies, TV Shows & News</span> Live Online
//               </h1>
//               <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Free streaming with scheduled showtimes. No registration, no subscription fees.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link 
//                   href="/schedule" 
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
//                 >
//                   View Schedule
//                 </Link>
//                 <Link 
//                   href="/player/bbc-news-channel-hd" 
//                   className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors border border-gray-700"
//                 >
//                   Watch Live
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FEATURES SECTION */}
//         <section className="py-20">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                 Why Choose <span className="text-blue-400">Free Streaming</span>
//               </h2>
//               <p className="text-gray-300 max-w-2xl mx-auto">
//                 Experience the cinema from the comfort of your home
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {features.map((feature, index) => (
//                 <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
//                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mb-4">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                   <p className="text-gray-400">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* TODAY'S SCHEDULE SECTION */}
//         <section className="py-20 bg-gray-900/50">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
//               <div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
//                   Today's <span className="text-blue-400">Live Schedule</span>
//                 </h2>
//                 <p className="text-gray-300">
//                   Click "Watch Live" during stream times
//                 </p>
//               </div>
//               <Link 
//                 href="/schedule" 
//                 className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
//               >
//                 <FaCalendarCheck />
//                 View Full Schedule
//               </Link>
//             </div>

//             {todaysShows.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {todaysShows.map((show) => (
//                   <div key={show.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
//                     <div className="relative h-48">
//                       <img 
//                         src={getImageUrl(show.image)}
//                         alt={show.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = '/images/default-movie.jpg';
//                         }}
//                       />
//                       <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
//                         {show.time}
//                       </div>
//                       {show.category === 'Adult' && (
//                         <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
//                           <FaExclamationTriangle /> 18+
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="p-4">
//                       <h3 className="text-lg font-bold text-white mb-2">{show.title}</h3>
                      
//                       <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
//                         <div className="flex items-center gap-1">
//                           <FaClock className="text-blue-400" />
//                           <span>{show.time} GMT</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <FaPlayCircle className="text-green-400" />
//                           <span>{Array.isArray(show.genre) ? show.genre.slice(0, 2).join(", ") : show.genre}</span>
//                         </div>
//                       </div>
                      
//                       <p className="text-gray-300 text-sm mb-4 line-clamp-2">
//                         {show.description || "Watch this exciting movie."}
//                       </p>
                      
//                       <div className="mb-4">
//                         {show.isLive ? (
//                           <div className="flex items-center gap-2 text-red-400 font-medium">
//                             <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                             LIVE NOW
//                           </div>
//                         ) : (
//                           <div className="text-gray-400 text-sm">
//                             Streams at {show.time} GMT
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="flex gap-2">
//                         <Link 
//                           href={`/schedules/${show.id}`}
//                           className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm font-medium text-center"
//                         >
//                           Details
//                         </Link>
//                         <Link 
//                           href={`/player/${show.id}`}
//                           className={`flex-1 py-2 rounded text-sm font-medium text-center ${
//                             show.isLive 
//                               ? 'bg-red-600 hover:bg-red-700 text-white' 
//                               : 'bg-blue-600 hover:bg-blue-700 text-white'
//                           }`}
//                         >
//                           {show.isLive ? 'Watch Live' : 'Play Now'}
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-6xl mb-4">🎬</div>
//                 <h3 className="text-2xl font-bold text-white mb-4">No Shows Scheduled Today</h3>
//                 <p className="text-gray-400 mb-6">Check the full schedule for upcoming shows</p>
//                 <Link href="/schedule" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
//                   View Full Schedule
//                 </Link>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* HOW IT WORKS SECTION */}
//         <section className="py-20">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                 How It <span className="text-blue-400">Works</span>
//               </h2>
//               <p className="text-gray-300 max-w-2xl mx-auto">
//                 Simple steps to enjoy live cinema experience
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {steps.map((step, index) => (
//                 <div key={index} className="relative">
//                   <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
//                     <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
//                       {index + 1}
//                     </div>
//                     <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
//                     <p className="text-gray-400">{step.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* BLOG POSTS SECTION */}
//         {isClient && rotatedPosts.length > 0 && (
//           <section className="py-20 bg-gray-900/50">
//             <div className="container mx-auto px-4">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
//                 <div>
//                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
//                     Latest <span className="text-blue-400">Streaming News</span>
//                   </h2>
//                   <p className="text-gray-300">Guides, updates, and news for movie lovers</p>
//                 </div>
//                 <Link 
//                   href="/blog" 
//                   className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2"
//                 >
//                   Read All Articles <FaArrowRight />
//                 </Link>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {rotatedPosts.map((post, index) => (
//                   <div key={`${post.slug}-${index}`} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
//                     <div className="h-48 bg-gray-700">
//                       <img 
//                         src={getImageUrl(post.image)}
//                         alt={post.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = '/images/default-movie.jpg';
//                         }}
//                       />
//                     </div>
//                     <div className="p-6">
//                       <p className="text-blue-400 text-sm mb-2 font-medium">{post.date}</p>
//                       <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
//                         {post.title}
//                       </h3>
//                       <p className="text-gray-400 text-sm mb-4 line-clamp-3">
//                         {post.excerpt}
//                       </p>
//                       <Link 
//                         href={`/blog/${post.slug}`}
//                         className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
//                       >
//                         Read Article <FaArrowRight className="text-xs" />
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         {/* CTA SECTION */}
//         <section className="py-20">
//           <div className="container mx-auto px-4">
//             <div className="bg-gray-800/50 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-gray-700">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//                 Ready for <span className="text-blue-400">Live Cinema?</span>
//               </h2>
//               <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Go to the player page during scheduled times to watch live streaming
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link 
//                   href="/schedule" 
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
//                 >
//                   View Schedule
//                 </Link>
//                 <Link 
//                   href="/player/bbc-news-channel-hd" 
//                   className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors border border-gray-600"
//                 >
//                   Go to Live Player
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }







import Head from 'next/head';
import schedule from '../data/schedules.json';
import postsData from '../data/posts.json';
import { FaFire, FaCalendarCheck, FaVideo, FaUsers, FaPlayCircle, FaClock, FaArrowRight, FaExclamationTriangle, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const today = new Date().toISOString().split('T')[0];
  const todaysShows = schedule.shows.filter(show => show.date === today);
  
  // Get all unique times from today's shows
  const todaysTimes = [...new Set(todaysShows.map(show => show.time))];
  
  // Get the first 3 times or all if less than 3
  const displayTimes = todaysTimes.slice(0, 3);
  
  const baseUrl = "https://freestreaming.vercel.app";
  const currentDate = new Date().toISOString();

  // --- FIXED: Use empty array initially, set posts in useEffect ---
  const [rotatedPosts, setRotatedPosts] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // IMAGE PATH FIXER
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/default-movie.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  // --- FIXED: Initialize and rotate posts only on client side ---
  useEffect(() => {
    setIsClient(true);
    
    // Initialize with first 3 posts
    if (postsData.posts && postsData.posts.length > 0) {
      const initialPosts = postsData.posts.slice(0, 3);
      setRotatedPosts(initialPosts);
    }

    // Set up rotation interval
    const interval = setInterval(() => {
      if (postsData.posts && postsData.posts.length > 0) {
        const allPosts = [...postsData.posts];
        
        // Fisher-Yates Shuffle Algorithm
        for (let i = allPosts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
        }

        setRotatedPosts(allPosts.slice(0, 3));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const features = [
    {
      icon: <FaFire className="text-white text-xl md:text-2xl" />,
      title: "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
      description: "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now."
    },
    {
      icon: <FaCalendarCheck className="text-white text-xl md:text-2xl" />,
      title: "Fixed Schedule",
      description: displayTimes.length > 0 
        ? `Daily shows at ${displayTimes.join(', ')}${displayTimes.length < todaysTimes.length ? ' and more' : ''}`
        : "Check schedule for today's shows"
    },
    {
      icon: <FaVideo className="text-white text-xl md:text-2xl" />,
      title: "HD Quality",
      description: "High-quality streaming on all devices"
    },
    {
      icon: <FaUsers className="text-white text-xl md:text-2xl" />,
      title: "Real-time",
      description: "Watch with other viewers simultaneously"
    }
  ];

  const steps = [
    {
      title: "Check Schedule",
      description: "View movie streaming times on our schedule page"
    },
    {
      title: "Click Watch Live",
      description: "Go to the player during the scheduled stream time"
    },
    {
      title: "Enjoy the Show",
      description: "Watch the live stream with built-in player controls"
    }
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": `${baseUrl}/`,
        "name": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
        "description": "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Free Streaming",
        "url": `${baseUrl}/`,
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": `${baseUrl}/#logo`,
          "url": `${baseUrl}/logo.png`,
          "contentUrl": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512,
          "caption": "Free Streaming Logo"
        },
        "image": {
          "@id": `${baseUrl}/#logo`
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/#article`,
        "headline": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
        "description": "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
        "datePublished": currentDate,
        "dateModified": currentDate,
        "author": {
          "@type": "Person",
          "name": "Free Streaming Admin",
          "url": `${baseUrl}/author/admin`
        },
        "publisher": {
          "@type": "Organization",
          "name": "Free Streaming",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/`
        },
        "articleBody": "Free Streaming is a revolutionary online platform that brings the cinema experience to your home. Watch live streaming movies, TV shows, and news at scheduled times. No registration, no subscription fees - completely free.",
        "inLanguage": "en-US",
        "articleSection": ["Movies", "TV Shows", "News", "Live Streaming", "Free Entertainment"],
        "keywords": "free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online",
        "thumbnailUrl": `${baseUrl}/og-image.jpg`,
        "image": {
          "@type": "ImageObject",
          "url": `${baseUrl}/og-image.jpg`,
          "width": 1200,
          "height": 630,
          "caption": "Free Streaming- Online Streaming Platform"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/`,
        "url": `${baseUrl}/`,
        "name": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "datePublished": currentDate,
        "dateModified": currentDate,
        "description": "TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${baseUrl}/`
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Free Streaming",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Free Streaming is an online streaming platform that allows you to watch movies, TV shows, and news completely free of charge. We stream content live at scheduled times, similar to a traditional cinema experience."
            }
          },
          {
            "@type": "Question",
            "name": "Is Free Streaming really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Free Streaming is 100% free. No registration required, no subscription fees, no hidden charges. Simply visit our website during stream times and watch."
            }
          }
        ]
      }
    ]
  };

  // --- FIXED: Check if data exists before rendering ---
  if (!schedule || !postsData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.</title>
        <meta name="description" content="TV, shows, news, sports and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta name="keywords" content="free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={baseUrl} />
        
        {/* MOBILE SPECIFIC META TAGS */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
        
        <meta property="og:title" content="Free Streaming - Watch Movies, TV Shows, Live Sports & News Online." />
        <meta property="og:description" content="TV, shows, news, and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Free Streaming" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={currentDate} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Streaming - Watch Movies, TV Shows, Live Sports & News Online." />
        <meta name="twitter:description" content="TV, shows, news, and movies for free with Free Streaming. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta name="twitter:image" content={`${baseUrl}/twitter-image.jpg`} />
        
        {/* Primary Schema - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        
        {/* Article Schema for Main Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-dark to-black">
        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden fixed top-4 right-4 z-50 p-3 bg-gray-800/90 backdrop-blur-sm rounded-lg text-white border border-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* MOBILE NAVIGATION MENU */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm pt-20 px-6 mobile-menu">
            <div className="flex flex-col space-y-6">
              <Link 
                href="/" 
                className="text-white text-xl font-bold py-3 border-b border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/schedule" 
                className="text-white text-xl font-bold py-3 border-b border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link 
                href="/blog" 
                className="text-white text-xl font-bold py-3 border-b border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/player/bbc-news-channel-hd" 
                className="bg-blue-600 text-white text-xl font-bold py-4 rounded-lg text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Watch Live Now
              </Link>
            </div>
          </div>
        )}

        {/* HERO SECTION - MOBILE OPTIMIZED */}
        <section className="relative pt-16 pb-12 md:pt-20 md:pb-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Watch <span className="text-blue-400">Movies, TV Shows & News</span> Live Online
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
                Free streaming with scheduled showtimes. No registration, no subscription fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
                <Link 
                  href="/schedule" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-3 md:px-8 rounded-lg text-sm md:text-lg transition-colors w-full sm:w-auto text-center"
                >
                  View Schedule
                </Link>
                <Link 
                  href="/player/bbc-news-channel-hd" 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 md:py-3 md:px-8 rounded-lg text-sm md:text-lg transition-colors border border-gray-700 w-full sm:w-auto text-center"
                >
                  Watch Live
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION - MOBILE OPTIMIZED */}
        <section className="py-12 md:py-20 px-2">
          <div className="container mx-auto px-2 md:px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                Why Choose <span className="text-blue-400">Free Streaming</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-2">
                Experience the cinema from the comfort of your home
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-700">
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 mb-3 md:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 line-clamp-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TODAY'S SCHEDULE SECTION - MOBILE OPTIMIZED */}
        <section className="py-12 md:py-20 bg-gray-900/50 px-2">
          <div className="container mx-auto px-2 md:px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-3 md:gap-4">
              <div className="w-full md:w-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
                  Today's <span className="text-blue-400">Live Schedule</span>
                </h2>
                <p className="text-gray-300 text-sm md:text-base">
                  Click "Watch Live" during stream times
                </p>
              </div>
              <Link 
                href="/schedule" 
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-lg flex items-center gap-2 transition-colors w-full md:w-auto justify-center md:justify-start"
              >
                <FaCalendarCheck />
                <span className="text-sm md:text-base">View Full Schedule</span>
              </Link>
            </div>

            {todaysShows.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {todaysShows.map((show) => (
                  <div key={show.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="relative h-40 sm:h-48 md:h-48">
                      <img 
                        src={getImageUrl(show.image)}
                        alt={show.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/default-movie.jpg';
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm font-bold">
                        {show.time}
                      </div>
                      {show.category === 'Adult' && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm font-bold flex items-center gap-1">
                          <FaExclamationTriangle size={10} /> 18+
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 md:p-4">
                      <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-1">{show.title}</h3>
                      
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3 text-xs md:text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-blue-400" size={12} />
                          <span>{show.time} GMT</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaPlayCircle className="text-green-400" size={12} />
                          <span className="line-clamp-1">
                            {Array.isArray(show.genre) ? show.genre.slice(0, 2).join(", ") : show.genre}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                        {show.description || "Watch this exciting movie."}
                      </p>
                      
                      <div className="mb-3 md:mb-4">
                        {show.isLive ? (
                          <div className="flex items-center gap-2 text-red-400 font-medium text-sm md:text-base">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            LIVE NOW
                          </div>
                        ) : (
                          <div className="text-gray-400 text-xs md:text-sm">
                            Streams at {show.time} GMT
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Link 
                          href={`/schedules/${show.id}`}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-xs md:text-sm font-medium text-center"
                        >
                          Details
                        </Link>
                        <Link 
                          href={`/player/${show.id}`}
                          className={`flex-1 py-2 rounded text-xs md:text-sm font-medium text-center ${
                            show.isLive 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {show.isLive ? 'Watch Live' : 'Play Now'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 md:py-12">
                <div className="text-5xl md:text-6xl mb-4">🎬</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">No Shows Scheduled Today</h3>
                <p className="text-gray-400 mb-5 md:mb-6 text-sm md:text-base">Check the full schedule for upcoming shows</p>
                <Link href="/schedule" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 md:py-3 px-5 md:px-6 rounded-lg text-sm md:text-base">
                  View Full Schedule
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS SECTION - MOBILE OPTIMIZED */}
        <section className="py-12 md:py-20 px-2">
          <div className="container mx-auto px-2 md:px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                How It <span className="text-blue-400">Works</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-2">
                Simple steps to enjoy live cinema experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-800/50 rounded-xl p-5 md:p-6 border border-gray-700">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3 md:mb-4 text-sm md:text-base">
                      {index + 1}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG POSTS SECTION - MOBILE OPTIMIZED */}
        {isClient && rotatedPosts.length > 0 && (
          <section className="py-12 md:py-20 bg-gray-900/50 px-2">
            <div className="container mx-auto px-2 md:px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-3 md:gap-4">
                <div className="w-full md:w-auto">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
                    Latest <span className="text-blue-400">Streaming News</span>
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base">Guides, updates, and news for movie lovers</p>
                </div>
                <Link 
                  href="/blog" 
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 text-sm md:text-base"
                >
                  Read All Articles <FaArrowRight />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {rotatedPosts.map((post, index) => (
                  <div key={`${post.slug}-${index}`} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                    <div className="h-36 sm:h-40 md:h-48 bg-gray-700">
                      <img 
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/default-movie.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <p className="text-blue-400 text-xs md:text-sm mb-2 font-medium">{post.date}</p>
                      <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-blue-400 hover:text-blue-300 text-xs md:text-sm font-medium inline-flex items-center gap-1"
                      >
                        Read Article <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA SECTION - MOBILE OPTIMIZED */}
        <section className="py-12 md:py-20 px-2">
          <div className="container mx-auto px-2 md:px-4">
            <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 lg:p-12 text-center max-w-4xl mx-auto border border-gray-700">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                Ready for <span className="text-blue-400">Live Cinema?</span>
              </h2>
              <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
                Go to the player page during scheduled times to watch live streaming
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link 
                  href="/schedule" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-3 md:px-8 rounded-lg text-sm md:text-lg transition-colors w-full sm:w-auto text-center"
                >
                  View Schedule
                </Link>
                <Link 
                  href="/player/bbc-news-channel-hd" 
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 md:py-3 md:px-8 rounded-lg text-sm md:text-lg transition-colors border border-gray-600 w-full sm:w-auto text-center"
                >
                  Go to Live Player
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE FIXED BOTTOM NAVIGATION */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 z-40">
          <div className="flex justify-around py-3">
            <Link href="/" className="flex flex-col items-center text-white text-xs">
              <FaFire size={16} />
              <span className="mt-1">Home</span>
            </Link>
            <Link href="/schedule" className="flex flex-col items-center text-white text-xs">
              <FaCalendarCheck size={16} />
              <span className="mt-1">Schedule</span>
            </Link>
            <Link href="/player/bbc-news-channel-hd" className="flex flex-col items-center text-white text-xs">
              <FaPlayCircle size={16} />
              <span className="mt-1">Live</span>
            </Link>
            <Link href="/blog" className="flex flex-col items-center text-white text-xs">
              <FaVideo size={16} />
              <span className="mt-1">Blog</span>
            </Link>
          </div>
        </div>

        {/* ADD PADDING FOR MOBILE BOTTOM NAV */}
        <div className="h-16 md:h-0"></div>
      </div>
    </>
  );
}