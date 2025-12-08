// import Head from 'next/head';
// import HeroSection from '../components/HeroSection';
// import schedule from '../data/schedules.json';
// import { FaFire, FaCalendarCheck, FaVideo, FaUsers, FaPlayCircle, FaClock } from 'react-icons/fa';
// import Link from 'next/link';

// export default function Home() {
//   const today = new Date().toISOString().split('T')[0];
//   const todaysShows = schedule.shows.filter(show => show.date === today);
  
//   // Get all unique times from today's shows
//   const todaysTimes = [...new Set(todaysShows.map(show => show.time))];
  
//   // Get the first 3 times or all if less than 3
//   const displayTimes = todaysTimes.slice(0, 3);
  
//   const baseUrl = "https://freestreamcinema.vercel.app/";

//   const features = [
//     {
//       icon: <FaFire className="text-white text-2xl" />,
//       title: "FreeStream Cinema - Watch Movies, TV Shows & News Online.",
//       description: "TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now."
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
//         "name": "FreeStream Cinema - Watch Movies, TV Shows & News Online.",
//         "description": "TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
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
//         "name": "FreeStream Cinema",
//         "url": `${baseUrl}/`,
//         "logo": {
//           "@type": "ImageObject",
//           "inLanguage": "en-US",
//           "@id": `${baseUrl}/#logo`,
//           "url": `${baseUrl}/logo.png`,
//           "contentUrl": `${baseUrl}/logo.png`,
//           "width": 512,
//           "height": 512,
//           "caption": "FreeStream Cinema Logo"
//         },
//         "image": {
//           "@id": `${baseUrl}/#logo`
//         },
//         "sameAs": [
//           "https://twitter.com/freestreamcinema",
//           "https://facebook.com/freestreamcinema"
//         ]
//       }
//     ]
//   };

//   return (
//     <>
//       <Head>
//         <title>FreeStream Cinema - Watch Movies, TV Shows & News Online.</title>
//         <meta name="description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
//         <meta name="keywords" content="free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online" />
//         <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//         <link rel="canonical" href={baseUrl} />
        
//         <meta property="og:title" content="FreeStream Cinema - Watch Movies, TV Shows & News Online." />
//         <meta property="og:description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={baseUrl} />
//         <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:site_name" content="FreeStream Cinema" />
        
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="FreeStream Cinema - Watch Movies, TV Shows & News Online." />
//         <meta name="twitter:description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
//         <meta name="twitter:image" content={`${baseUrl}/twitter-image.jpg`} />
//         <meta name="twitter:site" content="@freestreamcinema" />
        
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(websiteSchema)
//           }}
//         />
//       </Head>

//       <HeroSection />

//       <section className="py-20 bg-gradient-to-b from-dark to-black">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               Why <span className="gradient-text">FreeStream Cinema</span>
//             </h1>
//             <p className="text-xl text-light/70 max-w-3xl mx-auto">
//               Experience the thrill of real cinema from the comfort of your home
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="glass-card p-8 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary mb-6">
//                   {feature.icon}
//                 </div>
//                 <h2 className="text-2xl font-bold text-light mb-4">{feature.title}</h2>
//                 <p className="text-light/70">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-12">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
//                 Today's <span className="gradient-text">Live Schedule</span>
//               </h2>
//               <p className="text-xl text-light/70">
//                 Click "Watch Live" to go to the player during stream time
//               </p>
//             </div>
//             <Link 
//               href="/schedule" 
//               className="btn-secondary hidden md:flex items-center space-x-2"
//             >
//               <FaCalendarCheck />
//               <span>View Full Schedule</span>
//             </Link>
//           </div>

//           {todaysShows.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {todaysShows.map((show) => (
//                 <div key={show.id} className="glass-card overflow-hidden group">
//                   <div className="relative h-64">
//                     <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
//                       <FaPlayCircle className="text-white text-6xl opacity-50" />
//                     </div>
//                     <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
//                       <div className="flex items-center space-x-1">
//                         <FaClock className="text-light text-sm" />
//                         <span className="text-light text-sm font-semibold">{show.time}</span>
//                       </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent">
//                       <h3 className="text-xl font-bold text-white mb-1">{show.title}</h3>
//                       <p className="text-light/70 text-sm">{show.duration} • {show.rating}</p>
//                     </div>
//                   </div>
                  
//                   <div className="p-6">
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="text-light/70 text-sm">{Array.isArray(show.genre) ? show.genre.slice(0, 2).join(', ') : show.genre}</div>
//                       <div className="text-accent font-bold">{show.year}</div>
//                     </div>
                    
//                     <p className="text-light/80 text-sm mb-4 line-clamp-2">{show.description}</p>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="text-light/70 text-sm">
//                         {show.date}
//                       </div>
//                       <div className="flex space-x-2">
//                         <Link 
//                           href={`/schedules/${show.id}`}
//                           className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
//                         >
//                           Details
//                         </Link>
//                         <Link 
//                           href={`/player/${show.id}`}
//                           className="btn-primary text-sm px-4 py-2"
//                         >
//                           Watch Live
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">🎬</div>
//               <h3 className="text-2xl font-bold text-light mb-4">No Shows Scheduled Today</h3>
//               <p className="text-light/70 mb-6">Check the full schedule for upcoming shows</p>
//               <Link href="/schedule" className="btn-primary">View Full Schedule</Link>
//             </div>
//           )}

//           <div className="text-center mt-12 md:hidden">
//             <Link href="/schedule" className="btn-secondary inline-flex items-center space-x-2">
//               <FaCalendarCheck />
//               <span>View Full Schedule</span>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gradient-to-b from-black to-dark">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               How It <span className="gradient-text">Works</span>
//             </h2>
//             <p className="text-xl text-light/70 max-w-3xl mx-auto">
//               Simple steps to enjoy live cinema experience
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {steps.map((step, index) => (
//               <div key={index} className="relative">
//                 <div className="glass-card p-8">
//                   <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold">
//                     {index + 1}
//                   </div>
//                   <div className="mt-8">
//                     <h3 className="text-2xl font-bold text-light mb-4">{step.title}</h3>
//                     <p className="text-light/70">{step.description}</p>
//                   </div>
//                 </div>
//                 {index < 2 && (
//                   <div className="hidden md:block absolute top-1/2 right-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary transform translate-x-full"></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="glass-card p-12 text-center max-w-4xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               Ready for <span className="gradient-text">Live Cinema?</span>
//             </h2>
//             <p className="text-xl text-light/70 mb-8 max-w-2xl mx-auto">
//               Go to the player page during scheduled times to watch live streaming
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/schedule" className="btn-primary px-8 py-4 text-lg">
//                 View Schedule
//               </Link>
//               <Link href="/player/bbc-news-channel-hd" className="btn-secondary px-8 py-4 text-lg">
//                 Go to Live Player
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }








import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import schedule from '../data/schedules.json';
import { FaFire, FaCalendarCheck, FaVideo, FaUsers, FaPlayCircle, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const today = new Date().toISOString().split('T')[0];
  const todaysShows = schedule.shows.filter(show => show.date === today);
  
  // Get all unique times from today's shows
  const todaysTimes = [...new Set(todaysShows.map(show => show.time))];
  
  // Get the first 3 times or all if less than 3
  const displayTimes = todaysTimes.slice(0, 3);
  
  const baseUrl = "https://freestreamcinema.vercel.app/";
  const currentDate = new Date().toISOString();

  const features = [
    {
      icon: <FaFire className="text-white text-2xl" />,
      title: "FreeStream Cinema - Watch Movies, TV Shows & News Online.",
      description: "TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now."
    },
    {
      icon: <FaCalendarCheck className="text-white text-2xl" />,
      title: "Fixed Schedule",
      description: displayTimes.length > 0 
        ? `Daily shows at ${displayTimes.join(', ')}${displayTimes.length < todaysTimes.length ? ' and more' : ''}`
        : "Check schedule for today's shows"
    },
    {
      icon: <FaVideo className="text-white text-2xl" />,
      title: "HD Quality",
      description: "High-quality streaming on all devices"
    },
    {
      icon: <FaUsers className="text-white text-2xl" />,
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
        "name": "FreeStream Cinema - Watch Movies, TV Shows & News Online.",
        "description": "TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
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
        "name": "FreeStream Cinema",
        "url": `${baseUrl}/`,
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": `${baseUrl}/#logo`,
          "url": `${baseUrl}/logo.png`,
          "contentUrl": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512,
          "caption": "FreeStream Cinema Logo"
        },
        "image": {
          "@id": `${baseUrl}/#logo`
        },
        "sameAs": [
          "https://twitter.com/freestreamcinema",
          "https://facebook.com/freestreamcinema"
        ]
      }
    ]
  };

  // ARTICLE SCHEMA FOR MAIN PAGE
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${baseUrl}/#article`,
        "headline": "FreeStream Cinema - Watch Movies, TV Shows & News Online",
        "description": "TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
        "datePublished": currentDate,
        "dateModified": currentDate,
        "author": {
          "@type": "Person",
          "name": "FreeStream Admin",
          "url": `${baseUrl}/author/admin`
        },
        "publisher": {
          "@type": "Organization",
          "name": "FreeStream Cinema",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/`
        },
        "articleBody": "FreeStream Cinema is a revolutionary online platform that brings the cinema experience to your home. Watch live streaming movies, TV shows, and news at scheduled times. No registration, no subscription fees - completely free. We offer daily shows with fixed schedules, HD quality streaming, and real-time viewing with other audiences. Our platform features thousands of movies, live news channels, entertainment programs, weather updates and more. Join thousands of viewers who enjoy our free streaming service daily.",
        "inLanguage": "en-US",
        "articleSection": ["Movies", "TV Shows", "News", "Live Streaming", "Free Entertainment"],
        "keywords": "free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online",
        "thumbnailUrl": `${baseUrl}/og-image.jpg`,
        "image": {
          "@type": "ImageObject",
          "url": `${baseUrl}/og-image.jpg`,
          "width": 1200,
          "height": 630,
          "caption": "FreeStream Cinema - Online Streaming Platform"
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".text-4xl", ".text-xl"]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/`,
        "url": `${baseUrl}/`,
        "name": "FreeStream Cinema - Watch Movies, TV Shows & News Online",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "datePublished": currentDate,
        "dateModified": currentDate,
        "description": "TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now.",
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
        },
        "potentialAction": [
          {
            "@type": "WatchAction",
            "target": `${baseUrl}/player/bbc-news-channel-hd`,
            "name": "Watch Live Stream"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is FreeStream Cinema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FreeStream Cinema is an online streaming platform that allows you to watch movies, TV shows, and news completely free of charge. We stream content live at scheduled times, similar to a traditional cinema experience."
            }
          },
          {
            "@type": "Question",
            "name": "Is FreeStream Cinema really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, FreeStream Cinema is 100% free. No registration required, no subscription fees, no hidden charges. Simply visit our website during stream times and watch."
            }
          },
          {
            "@type": "Question",
            "name": "How does the schedule work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We have fixed streaming times each day. You can check our schedule page for exact show times. Movies and shows stream live at their scheduled times."
            }
          },
          {
            "@type": "Question",
            "name": "What kind of content can I watch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer movies from various genres (action, romance, drama, sci-fi), TV shows, live news channels, entertainment programs, and weather updates."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>FreeStream Cinema - Watch Movies, TV Shows & News Online.</title>
        <meta name="description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta name="keywords" content="free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={baseUrl} />
        
        <meta property="og:title" content="FreeStream Cinema - Watch Movies, TV Shows & News Online." />
        <meta property="og:description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="FreeStream Cinema" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={currentDate} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FreeStream Cinema - Watch Movies, TV Shows & News Online." />
        <meta name="twitter:description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta name="twitter:image" content={`${baseUrl}/twitter-image.jpg`} />
        <meta name="twitter:site" content="@freestreamcinema" />
        <meta name="twitter:creator" content="@freestreamcinema" />
        
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

      <HeroSection />

      <section className="py-20 bg-gradient-to-b from-dark to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Why <span className="gradient-text">FreeStream Cinema</span>
            </h1>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              Experience the thrill of real cinema from the comfort of your home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary mb-6">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-bold text-light mb-4">{feature.title}</h2>
                <p className="text-light/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Today's <span className="gradient-text">Live Schedule</span>
              </h2>
              <p className="text-xl text-light/70">
                Click "Watch Live" to go to the player during stream time
              </p>
            </div>
            <Link 
              href="/schedule" 
              className="btn-secondary hidden md:flex items-center space-x-2"
            >
              <FaCalendarCheck />
              <span>View Full Schedule</span>
            </Link>
          </div>

          {todaysShows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {todaysShows.map((show) => (
                <div key={show.id} className="glass-card overflow-hidden group">
                  <div className="relative h-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <FaPlayCircle className="text-white text-6xl opacity-50" />
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-light text-sm" />
                        <span className="text-light text-sm font-semibold">{show.time}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent">
                      <h3 className="text-xl font-bold text-white mb-1">{show.title}</h3>
                      <p className="text-light/70 text-sm">{show.duration} • {show.rating}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-light/70 text-sm">{Array.isArray(show.genre) ? show.genre.slice(0, 2).join(', ') : show.genre}</div>
                      <div className="text-accent font-bold">{show.year}</div>
                    </div>
                    
                    <p className="text-light/80 text-sm mb-4 line-clamp-2">{show.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-light/70 text-sm">
                        {show.date}
                      </div>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/schedules/${show.id}`}
                          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
                        >
                          Details
                        </Link>
                        <Link 
                          href={`/player/${show.id}`}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Watch Live
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-light mb-4">No Shows Scheduled Today</h3>
              <p className="text-light/70 mb-6">Check the full schedule for upcoming shows</p>
              <Link href="/schedule" className="btn-primary">View Full Schedule</Link>
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link href="/schedule" className="btn-secondary inline-flex items-center space-x-2">
              <FaCalendarCheck />
              <span>View Full Schedule</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-light/70 max-w-3xl mx-auto">
              Simple steps to enjoy live cinema experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="glass-card p-8">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold">
                    {index + 1}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-light mb-4">{step.title}</h3>
                    <p className="text-light/70">{step.description}</p>
                  </div>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary transform translate-x-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready for <span className="gradient-text">Live Cinema?</span>
            </h2>
            <p className="text-xl text-light/70 mb-8 max-w-2xl mx-auto">
              Go to the player page during scheduled times to watch live streaming
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule" className="btn-primary px-8 py-4 text-lg">
                View Schedule
              </Link>
              <Link href="/player/bbc-news-channel-hd" className="btn-secondary px-8 py-4 text-lg">
                Go to Live Player
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}