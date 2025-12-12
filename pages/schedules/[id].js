// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import schedule from '../../data/schedules.json';
// import YouTubePlayer from '../../components/YouTubePlayer';
// import { 
//   FacebookShareButton, 
//   TwitterShareButton,
//   FacebookIcon,
//   TwitterIcon
// } from "react-share";
// import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle } from 'react-icons/fa';
// import Link from 'next/link';

// export default function ShowPage({ show }) {
//   const router = useRouter();
//   const { id } = router.query;

//   if (!show) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-dark">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-light mb-4">Show not found</h1>
//           <Link href="/schedule" className="btn-primary">← Back to Schedule</Link>
//         </div>
//       </div>
//     );
//   }

//   const baseUrl = "https://freestreaming.vercel.app";
//   const currentUrl = `${baseUrl}/schedules/${show.id}`;
//   const shareUrl = typeof window !== 'undefined' ? window.location.href : currentUrl;
//   const title = `Watch "${show.title}" on Free Streaming | Live Streaming`;

//   const relatedShows = schedule.shows
//     .filter(s => s.id !== show.id)
//     .slice(0, 3);

//   // FULL Article Schema (like the example)
//   const articleSchema = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Article",
//         "@id": `${currentUrl}/#article`,
//         "isPartOf": {
//           "@id": `${currentUrl}/`
//         },
//         "author": {
//           "@type": "Person",
//           "@id": `${baseUrl}/#/schema/person/admin`,
//           "name": "FreeStream Admin"
//         },
//         "headline": `Watch ${show.title} - Now Streaming on Free Streaming`,
//         "datePublished": show.date + "T10:00:00+00:00",
//         "dateModified": new Date().toISOString(),
//         "mainEntityOfPage": {
//           "@id": `${currentUrl}/`
//         },
//         "wordCount": show.description.length,
//         "commentCount": 0,
//         "publisher": {
//           "@id": `${baseUrl}/#organization`
//         },
//         "image": {
//           "@id": `${currentUrl}/#primaryimage`
//         },
//         "thumbnailUrl": `${baseUrl}/${show.image}`,
//         "articleSection": show.genre,
//         "inLanguage": "en-US",
//         "potentialAction": [
//           {
//             "@type": "WatchAction",
//             "target": `${baseUrl}/player/${show.id}`,
//             "name": "Watch Live Stream"
//           }
//         ]
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${currentUrl}/`,
//         "url": currentUrl,
//         "name": `Watch ${show.title} - Watch Trailer & Free Streaming`,
//         "isPartOf": {
//           "@id": `${baseUrl}/#website`
//         },
//         "primaryImageOfPage": {
//           "@id": `${currentUrl}/#primaryimage`
//         },
//         "image": {
//           "@id": `${currentUrl}/#primaryimage`
//         },
//         "thumbnailUrl": `${baseUrl}/${show.image}`,
//         "datePublished": show.date + "T10:00:00+00:00",
//         "description": show.description.substring(0, 160) + " | Watch live streaming on Free Streaming.",
//         "breadcrumb": {
//           "@id": `${currentUrl}/#breadcrumb`
//         },
//         "inLanguage": "en-US",
//         "potentialAction": [
//           {
//             "@type": "ReadAction",
//             "target": [currentUrl]
//           }
//         ]
//       },
//       {
//         "@type": "ImageObject",
//         "inLanguage": "en-US",
//         "@id": `${currentUrl}/#primaryimage`,
//         "url": `${baseUrl}/${show.image}`,
//         "contentUrl": `${baseUrl}/${show.image}`,
//         "width": 1200,
//         "height": 675,
//         "caption": `${show.title} - Watch on Free Streaming`
//       },
//       {
//         "@type": "BreadcrumbList",
//         "@id": `${currentUrl}/#breadcrumb`,
//         "itemListElement": [
//           {
//             "@type": "ListItem",
//             "position": 1,
//             "name": "Home",
//             "item": `${baseUrl}/`
//           },
//           {
//             "@type": "ListItem",
//             "position": 2,
//             "name": "Schedule",
//             "item": `${baseUrl}/schedule`
//           },
//           {
//             "@type": "ListItem",
//             "position": 3,
//             "name": show.title
//           }
//         ]
//       },
//       {
//         "@type": "WebSite",
//         "@id": `${baseUrl}/#website`,
//         "url": `${baseUrl}/`,
//         "name": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online.",
//         "description": "Watch movies live at scheduled times like a real cinema. Daily shows streamed live. Free HD streaming.",
//         "publisher": {
//           "@id": `${baseUrl}/#organization`
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
//           "@id": `${baseUrl}/#/schema/logo/image/`,
//           "url": `${baseUrl}/logo.png`,
//           "contentUrl": `${baseUrl}/logo.png`,
//           "width": 512,
//           "height": 512,
//           "caption": "Free Streaming"
//         },
//         "image": {
//           "@id": `${baseUrl}/#/schema/logo/image/`
//         }
//       },
//       {
//         "@type": "Person",
//         "@id": `${baseUrl}/#/schema/person/admin`,
//         "name": "FreeStream Admin",
//         "image": {
//           "@type": "ImageObject",
//           "inLanguage": "en-US",
//           "@id": `${baseUrl}/#/schema/person/image/`,
//           "url": `${baseUrl}/admin-avatar.jpg`,
//           "contentUrl": `${baseUrl}/admin-avatar.jpg`,
//           "caption": "FreeStream Admin"
//         },
//         "url": `${baseUrl}/author/admin/`
//       },
//       // Movie Schema
//       {
//         "@type": "Movie",
//         "name": show.title,
//         "description": show.description,
//         "image": `${baseUrl}/${show.image}`,
//         "datePublished": show.date,
//         "duration": show.duration,
//         "genre": show.genre,
//         "actor": show.cast.map(actor => ({ "@type": "Person", "name": actor })),
//         "director": { "@type": "Person", "name": show.director },
//         "contentRating": show.rating,
//         "inLanguage": show.language,
//         "subtitleLanguage": show.subtitles,
//         "trailer": {
//           "@type": "VideoObject",
//           "name": `${show.title} Trailer`,
//           "description": show.description,
//           "thumbnailUrl": `${baseUrl}/${show.image}`,
//           "uploadDate": show.date,
//           "contentUrl": `https://www.youtube.com/watch?v=${show.youtubeid}`,
//           "embedUrl": `https://www.youtube.com/embed/${show.youtubeid}`
//         }
//       }
//     ]
//   };

//   return (
//     <>
//       <Head>
//         <title>{show.title} - Watch on Free Streaming </title>
//         <meta name="description" content={`${show.description.substring(0, 155)} Watch live streaming at ${show.time} on ${show.date}. Free HD quality on Free Streaming.`} />
//         <meta name="keywords" content={`${show.keywords}, watch ${show.title} free, ${show.title} streaming, ${show.genre.join(' ')}, free movie streaming, live cinema`} />
//         <link rel="canonical" href={currentUrl} />
        
//         {/* Open Graph */}
//         <meta property="og:title" content={`Watch ${show.title} - Live Movie Streaming | Free Streaming`} />
//         <meta property="og:description" content={`${show.description.substring(0, 200)} Watch live at ${show.time} on ${show.date}.`} />
//         <meta property="og:image" content={`${baseUrl}/${show.image}`} />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:type" content="article" />
//         <meta property="og:site_name" content="Free Streaming" />
//         <meta property="og:published_time" content={show.date + "T10:00:00+00:00"} />
//         <meta property="og:modified_time" content={new Date().toISOString()} />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={`Watch ${show.title} - Live Streaming`} />
//         <meta name="twitter:description" content={`${show.description.substring(0, 200)} #FreeMovies #LiveStreaming`} />
//         <meta name="twitter:image" content={`${baseUrl}/${show.image}`} />
        
//         {/* JSON-LD Structured Data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(articleSchema)
//           }}
//         />
//       </Head>

//       <div className="min-h-screen py-8 bg-dark">
//         <div className="container mx-auto px-4">
//           <nav className="mb-8" aria-label="Breadcrumb">
//             <ol className="flex items-center space-x-2 text-light/70 text-sm flex-wrap">
//               <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
//               <li>/</li>
//               <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
//                 <li>/</li>
//               <li className="text-primary font-semibold truncate max-w-xs" aria-current="page">{show.title}</li>
//             </ol>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <article className="glass-card overflow-hidden mb-8">
//                 <header className="p-6 border-b border-white/10">
//                   <h1 className="text-3xl font-bold text-light mb-2"><span className="gradient-text">{show.title}</span> </h1>
//                   <div className="flex items-center gap-4 mt-2 text-light/70">
//                     <span className="flex items-center gap-1">
//                       <FaClock /> GMT {show.time}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaCalendar /> {show.date}
//                     </span>
//                     <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
//                       {show.rating}
//                     </span>
//                     <span className="text-light/50">• {show.duration}</span>
//                   </div>
//                 </header>
                
//                 <div className="p-6">
//                   <YouTubePlayer 
//                     videoId={show.youtubeid} 
//                     title={show.title}
//                   />
//                 </div>
//               </article>

//               <div className="glass-card p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
//                   <FaFilm className="text-primary" />
//                <span className="gradient-text">   Movie Details </span>
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-light/70 text-sm mb-2">Description</h3>
//                     <p className="text-light leading-relaxed">{show.description}</p>
                    
//                     <div className="mt-6">
//                       <h3 className="text-light/70 text-sm mb-2">Genre</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {show.genre.map((genre, index) => (
//                           <span 
//                             key={index} 
//                             className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80"
//                           >
//                             {genre}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2">
//                         <FaUser /> Director
//                       </h3>
//                       <p className="text-light font-semibold">{show.director}</p>
//                     </div>
                    
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2">Cast</h3>
//                       <p className="text-light">{show.cast.join(", ")}</p>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2">Duration</h3>
//                         <p className="text-light font-semibold">{show.duration}</p>
//                       </div>
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2">Year</h3>
//                         <p className="text-light font-semibold">{show.year}</p>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2">
//                           <FaLanguage /> Language
//                         </h3>
//                         <p className="text-light">{show.language}</p>
//                       </div>
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2">
//                           <FaClosedCaptioning /> Subtitles
//                         </h3>
//                         <p className="text-light">{show.subtitles.join(", ")}</p>
//                       </div>
//                    </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {show.keywords.split(", ").map((keyword, index) => (
//                     <span 
//                       key={index}
//                       title={keyword}
//                     >
//                       {keyword}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <aside className="space-y-6">
//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This Movie  </span> </h3>
//                 <div className="flex gap-3">
//                   <FacebookShareButton url={shareUrl} quote={title}>
//                     <FacebookIcon size={40} round />
//                   </FacebookShareButton>
//                   <TwitterShareButton url={shareUrl} title={title}>
//                     <TwitterIcon size={40} round />
//                   </TwitterShareButton>
//                 </div>
//               </div>

//               <div className="glass-card p-6 text-center">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Live Streaming Info </span></h3>
//                 <div className="space-y-4">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
//                     <p className="text-light/70">Streaming Time GMT</p>
//                   </div>
                  
//                   <div className="p-4 bg-white/5 rounded-lg">
//                     <p className="text-light mb-2">This movie will be streamed live at GMT Time :</p>
//                     <p className="text-primary font-bold">{show.date} • {show.time}</p>
//                   </div>
                  
//                   <Link 
//                     href={`/player/${show.id}`}
//                     className="btn-primary w-full py-3 flex items-center justify-center gap-2"
//                   >
//                     <FaPlayCircle />
//                     Go to Live Player
//                   </Link>
                  
//                   <div className="text-light/50 text-sm">
//                     <p>Live stream available only at scheduled time</p>
//                   </div>
//                 </div>
//               </div>

//               {relatedShows.length > 0 && (
//                 <div className="glass-card p-6">
//                   <h3 className="text-lg font-bold text-light mb-4"> <span className="gradient-text"> Other Shows </span></h3>
//                   <div className="space-y-4">
//                     {relatedShows.map((relatedShow) => (
//                       <Link 
//                         key={relatedShow.id}
//                         href={`/schedules/${relatedShow.id}`}
//                         className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
//                       >
//                         <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
//                           <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
//                             <FaFilm className="text-white/70 group-hover:text-primary transition-colors" />
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-light group-hover:text-primary transition-colors truncate">
//                             {relatedShow.title}
//                           </h4>
//                           <p className="text-light/70 text-xs mt-1">
//                             {relatedShow.time} • {relatedShow.genre[0]}
//                           </p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4"> <span className="gradient-text"> Streaming Info </span> </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Stream Time GMT:</span>
//                     <span className="text-light font-semibold">{show.time}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Date:</span>
//                     <span className="text-light font-semibold">{show.date}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Rating:</span>
//                     <span className="flex items-center gap-1 text-light font-semibold">
//                       <FaStar className="text-accent" />
//                       {show.rating}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Duration:</span>
//                     <span className="text-light font-semibold">{show.duration}</span>
//                   </div>
//                 </div>
//               </div>
//              <div className="text-center mt-8 md:mt-12">
//             <Link 
//               href="/schedule" 
//               className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//             ><span className="gradient-text">
//               ← Back to Full Schedule </span>
//             </Link>
          // </div>
              // {/* <div className="text-center">
              //   <Link 
              //     href="/schedule" 
              //     className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              //   >
              //     ← Back to Full Schedule
              //   </Link>
              // </div> */}
//             </aside>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({
//     params: { id: show.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find(s => s.id === params.id);

//   if (!show) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       show,
//     },
//     revalidate: 3600,
//   };
// }



























































































// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import schedule from '../../data/schedules.json';
// import YouTubePlayer from '../../components/YouTubePlayer';
// import { 
//   FacebookShareButton, 
//   TwitterShareButton,
//   FacebookIcon,
//   TwitterIcon
// } from "react-share";
// import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle, FaLink } from 'react-icons/fa';
// import Link from 'next/link';

// export default function ShowPage({ show }) {
//   const router = useRouter();
//   const { id } = router.query;

//   if (!show) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-dark">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-light mb-4">Show not found</h1>
//           <Link href="/schedule" className="btn-primary">← Back to Schedule</Link>
//         </div>
//       </div>
//     );
//   }

//   const baseUrl = "https://freestreaming.vercel.app";
//   const currentUrl = `${baseUrl}/schedules/${show.id}`;
//   const shareTitle = `Watch "${show.title}" on Free Streaming | Live Streaming`;

//   const relatedShows = schedule.shows
//     .filter(s => s.id !== show.id)
//     .slice(0, 3);

//   // Copy direct link to clipboard
//   const copyDirectLink = () => {
//     navigator.clipboard.writeText(currentUrl).then(() => {
//       alert("Direct link copied to clipboard!");
//     });
//   };

//   return (
//     <>
//       <Head>
//         <title>{show.title} - Watch on Free Streaming</title>
//         <meta name="description" content={`${show.description.substring(0, 155)} Watch live streaming at ${show.time} on ${show.date}. Free HD quality on Free Streaming.`} />
//         <meta name="keywords" content={`${show.keywords}, watch ${show.title} free, ${show.title} streaming, ${show.genre.join(' ')}, free movie streaming, live cinema`} />
//         <link rel="canonical" href={currentUrl} />

//         {/* Open Graph */}
//         <meta property="og:title" content={`Watch ${show.title} - Live Movie Streaming | Free Streaming`} />
//         <meta property="og:description" content={`${show.description.substring(0, 200)} Watch live at ${show.time} on ${show.date}.`} />
//         <meta property="og:image" content={`${baseUrl}/${show.image}`} />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:type" content="article" />
//         <meta property="og:site_name" content="Free Streaming" />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={`Watch ${show.title} - Live Streaming`} />
//         <meta name="twitter:description" content={`${show.description.substring(0, 200)} #FreeMovies #LiveStreaming`} />
//         <meta name="twitter:image" content={`${baseUrl}/${show.image}`} />
//       </Head>

//       <div className="min-h-screen py-8 bg-dark">
//         <div className="container mx-auto px-4">
//           <nav className="mb-8" aria-label="Breadcrumb">
//             <ol className="flex items-center space-x-2 text-light/70 text-sm flex-wrap">
//               <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
//               <li>/</li>
//               <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
//               <li>/</li>
//               <li className="text-primary font-semibold truncate max-w-xs" aria-current="page">{show.title}</li>
//             </ol>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <article className="glass-card overflow-hidden mb-8">
//                 <header className="p-6 border-b border-white/10">
//                   <h1 className="text-3xl font-bold text-light mb-2"><span className="gradient-text">{show.title}</span></h1>
//                   <div className="flex items-center gap-4 mt-2 text-light/70">
//                     <span className="flex items-center gap-1"><FaClock /> GMT {show.time}</span>
//                     <span className="flex items-center gap-1"><FaCalendar /> {show.date}</span>
//                     <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{show.rating}</span>
//                     <span className="text-light/50">• {show.duration}</span>
//                   </div>
//                 </header>
//                 <div className="p-6">
//                   <YouTubePlayer videoId={show.youtubeid} title={show.title} />
//                 </div>
//               </article>

//               <div className="glass-card p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
//                   <FaFilm className="text-primary" /><span className="gradient-text">Movie Details</span>
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-light/70 text-sm mb-2">Description</h3>
//                     <p className="text-light leading-relaxed">{show.description}</p>
//                     <div className="mt-6">
//                       <h3 className="text-light/70 text-sm mb-2">Genre</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {show.genre.map((genre, index) => (
//                           <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80">{genre}</span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaUser /> Director</h3>
//                       <p className="text-light font-semibold">{show.director}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2">Cast</h3>
//                       <p className="text-light">{show.cast.join(", ")}</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2">Duration</h3>
//                         <p className="text-light font-semibold">{show.duration}</p>
//                       </div>
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2">Year</h3>
//                         <p className="text-light font-semibold">{show.year}</p>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaLanguage /> Language</h3>
//                         <p className="text-light">{show.language}</p>
//                       </div>
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaClosedCaptioning /> Subtitles</h3>
//                         <p className="text-light">{show.subtitles.join(", ")}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {show.keywords.split(", ").map((keyword, index) => (
//                     <span key={index} title={keyword}>{keyword}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <aside className="space-y-6">
//               {/* Social Share Buttons - Only Logos */}
//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This Movie</span></h3>
//                 <div className="flex gap-3">
//                   <FacebookShareButton url={currentUrl} quote={shareTitle}>
//                     <FacebookIcon size={40} round />
//                   </FacebookShareButton>
//                   <TwitterShareButton url={currentUrl} title={shareTitle}>
//                     <TwitterIcon size={40} round />
//                   </TwitterShareButton>
//                   <button
//                     onClick={copyDirectLink}
//                     className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center justify-center"
//                     title="Copy Direct Link"
//                   >
//                     <FaLink className="text-white" size={28} />
//                   </button>
//                 </div>
//               </div>

//               {/* Live Streaming Info */}
//               <div className="glass-card p-6 text-center">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Live Streaming Info</span></h3>
//                 <div className="space-y-4">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
//                     <p className="text-light/70">Streaming Time GMT</p>
//                   </div>
//                   <div className="p-4 bg-white/5 rounded-lg">
//                     <p className="text-light mb-2">This movie will be streamed live at GMT Time :</p>
//                     <p className="text-primary font-bold">{show.date} • {show.time}</p>
//                   </div>
//                   <Link
//                     href={`/player/${show.id}`}
//                     className="btn-primary w-full py-3 flex items-center justify-center gap-2"
//                   >
//                     <FaPlayCircle /> Go to Live Player
//                   </Link>
//                   <div className="text-light/50 text-sm">
//                     <p>Live stream available only at scheduled time</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Related Shows */}
//               {relatedShows.length > 0 && (
//                 <div className="glass-card p-6">
//                   <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Other Shows</span></h3>
//                   <div className="space-y-4">
//                     {relatedShows.map((relatedShow) => (
//                       <Link
//                         key={relatedShow.id}
//                         href={`/schedules/${relatedShow.id}`}
//                         className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
//                       >
//                         <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
//                           <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
//                             <FaFilm className="text-white/70 group-hover:text-primary transition-colors" />
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-light group-hover:text-primary transition-colors truncate">{relatedShow.title}</h4>
//                           <p className="text-light/70 text-xs mt-1">{relatedShow.time} • {relatedShow.genre[0]}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Streaming Info */}
//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Streaming Info</span></h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Stream Time GMT:</span>
//                     <span className="text-light font-semibold">{show.time}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Date:</span>
//                     <span className="text-light font-semibold">{show.date}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Rating:</span>
//                     <span className="flex items-center gap-1 text-light font-semibold"><FaStar className="text-accent" />{show.rating}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Duration:</span>
//                     <span className="text-light font-semibold">{show.duration}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-center mt-8 md:mt-12">
//                 <Link 
//                   href="/schedule" 
//                   className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//                 >
//                   <span className="gradient-text">← Back to Full Schedule</span>
//                 </Link>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({
//     params: { id: show.id },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find(s => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 3600 };
// }























// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import schedule from '../../data/schedules.json';
// import YouTubePlayer from '../../components/YouTubePlayer';
// import { 
//   FacebookShareButton, 
//   TwitterShareButton,
//   FacebookIcon,
//   TwitterIcon
// } from "react-share";
// import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle, FaLink } from 'react-icons/fa';
// import Link from 'next/link';

// export default function ShowPage({ show }) {
//   const router = useRouter();
//   const { id } = router.query;

//   if (!show) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-dark">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-light mb-4">Show not found</h1>
//           <Link href="/schedule" className="btn-primary">← Back to Schedule</Link>
//         </div>
//       </div>
//     );
//   }

//   const baseUrl = "https://freestreaming.vercel.app";
//   const currentUrl = `${baseUrl}/schedules/${show.id}`;
//   const shareTitle = `Watch "${show.title}" on Free Streaming | Live Streaming`;

//   const relatedShows = schedule.shows
//     .filter(s => s.id !== show.id)
//     .slice(0, 3);

//   // Copy direct link to clipboard
//   const copyDirectLink = () => {
//     navigator.clipboard.writeText(currentUrl).then(() => {
//       alert("Direct link copied to clipboard!");
//     });
//   };

//   return (
//     <>
//       <Head>
//         <title>{show.title} - Watch on Free Streaming</title>
//         <meta name="description" content={`${show.description.substring(0, 155)} Watch live streaming at ${show.time} on ${show.date}. Free HD quality on Free Streaming.`} />
//         <meta name="keywords" content={`${show.keywords}, watch ${show.title} free, ${show.title} streaming, ${show.genre.join(' ')}, free movie streaming, live cinema`} />
//         <link rel="canonical" href={currentUrl} />

//         {/* Open Graph */}
//         <meta property="og:title" content={`Watch ${show.title} - Live Movie Streaming | Free Streaming`} />
//         <meta property="og:description" content={`${show.description.substring(0, 200)} Watch live at ${show.time} on ${show.date}.`} />
//         <meta property="og:image" content={`${baseUrl}/${show.image}`} />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:type" content="article" />
//         <meta property="og:site_name" content="Free Streaming" />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={`Watch ${show.title} - Live Streaming`} />
//         <meta name="twitter:description" content={`${show.description.substring(0, 200)} #FreeMovies #LiveStreaming`} />
//         <meta name="twitter:image" content={`${baseUrl}/${show.image}`} />
//       </Head>

//       <div className="min-h-screen py-8 bg-dark">
//         <div className="container mx-auto px-4">
//           <nav className="mb-8" aria-label="Breadcrumb">
//             <ol className="flex items-center space-x-2 text-light/70 text-sm flex-wrap">
//               <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
//               <li>/</li>
//               <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
//               <li>/</li>
//               <li className="text-primary font-semibold truncate max-w-xs" aria-current="page">{show.title}</li>
//             </ol>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <article className="glass-card overflow-hidden mb-8">
//                 <header className="p-6 border-b border-white/10">
//                   <h1 className="text-3xl font-bold text-light mb-2"><span className="gradient-text">{show.title}</span></h1>
//                   <div className="flex items-center gap-4 mt-2 text-light/70">
//                     <span className="flex items-center gap-1"><FaClock /> GMT {show.time}</span>
//                     <span className="flex items-center gap-1"><FaCalendar /> {show.date}</span>
//                     <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{show.rating}</span>
//                     <span className="text-light/50">• {show.duration}</span>
//                   </div>
//                 </header>
//                 <div className="p-6">
//                   <YouTubePlayer videoId={show.youtubeid} title={show.title} />
//                 </div>
//               </article>

//               <div className="glass-card p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
//                   <FaFilm className="text-primary" /><span className="gradient-text">Movie Details</span>
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-light/70 text-sm mb-2">Description</h3>
//                     <p className="text-light leading-relaxed">{show.description}</p>
//                     <div className="mt-6">
//                       <h3 className="text-light/70 text-sm mb-2">Genre</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {show.genre.map((genre, index) => (
//                           <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80">{genre}</span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaUser /> Director</h3>
//                       <p className="text-light font-semibold">{show.director}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2">Cast</h3>
//                       <p className="text-light">{show.cast.join(", ")}</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2">Duration</h3>
//                         <p className="text-light font-semibold">{show.duration}</p>
//                       </div>
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2">Year</h3>
//                         <p className="text-light font-semibold">{show.year}</p>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaLanguage /> Language</h3>
//                         <p className="text-light">{show.language}</p>
//                       </div>
//                       <div>
//                         <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaClosedCaptioning /> Subtitles</h3>
//                         <p className="text-light">{show.subtitles.join(", ")}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {show.keywords.split(", ").map((keyword, index) => (
//                     <span key={index} title={keyword}>{keyword}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <aside className="space-y-6">
//               {/* Social Share Buttons */}
//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This Movie</span></h3>
//                 <div className="flex gap-3">
//                   <FacebookShareButton url={currentUrl} quote={shareTitle}>
//                     <FacebookIcon size={40} round />
//                   </FacebookShareButton>
//                   <TwitterShareButton url={currentUrl} title={shareTitle}>
//                     <TwitterIcon size={40} round />
//                   </TwitterShareButton>
//                   <button
//                     onClick={copyDirectLink}
//                     className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center justify-center"
//                     title="Copy Direct Link"
//                   >
//                     <FaLink className="text-white" size={28} />
//                   </button>
//                 </div>
//               </div>

//               {/* Live Streaming Info */}
//               <div className="glass-card p-6 text-center">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Live Streaming Info</span></h3>
//                 <div className="space-y-4">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
//                     <p className="text-light/70">Streaming Time GMT</p>
//                   </div>
//                   <div className="p-4 bg-white/5 rounded-lg">
//                     <p className="text-light mb-2">This movie will be streamed live at GMT Time :</p>
//                     <p className="text-primary font-bold">{show.date} • {show.time}</p>
//                   </div>
//                   <Link
//                     href={`/player/${show.id}`}
//                     className="btn-primary w-full py-3 flex items-center justify-center gap-2"
//                   >
//                     <FaPlayCircle /> Go to Live Player
//                   </Link>
//                   <div className="text-light/50 text-sm">
//                     <p>Live stream available only at scheduled time</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Related Shows with images */}
//               {relatedShows.length > 0 && (
//                 <div className="glass-card p-6">
//                   <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Other Shows</span></h3>
//                   <div className="space-y-4">
//                     {relatedShows.map((relatedShow) => (
//                       <Link
//                         key={relatedShow.id}
//                         href={`/schedules/${relatedShow.id}`}
//                         className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
//                       >
//                         <div className="w-20 h-12 rounded overflow-hidden flex-shrink-0">
//                           <img
//                             src={`${baseUrl}/${relatedShow.image}`}
//                             alt={relatedShow.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-light group-hover:text-primary transition-colors truncate">{relatedShow.title}</h4>
//                           <p className="text-light/70 text-xs mt-1">{relatedShow.time} • {relatedShow.genre[0]}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Streaming Info */}
//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Streaming Info</span></h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Stream Time GMT:</span>
//                     <span className="text-light font-semibold">{show.time}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Date:</span>
//                     <span className="text-light font-semibold">{show.date}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Rating:</span>
//                     <span className="flex items-center gap-1 text-light font-semibold"><FaStar className="text-accent" />{show.rating}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Duration:</span>
//                     <span className="text-light font-semibold">{show.duration}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-center mt-8 md:mt-12">
//                 <Link 
//                   href="/schedule" 
//                   className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//                 >
//                   <span className="gradient-text">← Back to Full Schedule</span>
//                 </Link>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({
//     params: { id: show.id },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find(s => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 3600 };
// }














































































































// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import schedule from '../../data/schedules.json';
// import YouTubePlayer from '../../components/YouTubePlayer';
// import dynamic from 'next/dynamic';
// import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle } from 'react-icons/fa';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// // Dynamic import for react-share buttons to prevent SSR issues
// const FacebookShareButton = dynamic(() => import('react-share').then(mod => mod.FacebookShareButton), { ssr: false });
// const TwitterShareButton = dynamic(() => import('react-share').then(mod => mod.TwitterShareButton), { ssr: false });
// const FacebookIcon = dynamic(() => import('react-share').then(mod => mod.FacebookIcon), { ssr: false });
// const TwitterIcon = dynamic(() => import('react-share').then(mod => mod.TwitterIcon), { ssr: false });

// export default function ShowPage({ show }) {
//   const router = useRouter();
//   const [randomShows, setRandomShows] = useState([]);

//   const pickRandomShows = () => {
//     const filteredShows = schedule.shows.filter(s => s.id !== show.id);
//     const shuffled = filteredShows.sort(() => 0.5 - Math.random());
//     setRandomShows(shuffled.slice(0, 3));
//   };

//   useEffect(() => {
//     pickRandomShows();
//     const interval = setInterval(pickRandomShows, 5000);
//     return () => clearInterval(interval);
//   }, [show.id]);

//   if (!show) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-dark">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-light mb-4">Show not found</h1>
//           <Link href="/schedule" className="btn-primary">← Back to Schedule</Link>
//         </div>
//       </div>
//     );
//   }

//   const baseUrl = "https://freestreaming.vercel.app";
//   const currentUrl = `${baseUrl}/schedules/${show.id}`;
//   const shareUrl = typeof window !== 'undefined' ? window.location.href : currentUrl;
//   const title = `Watch "${show.title}" on Free Streaming | Live Streaming`;

//   return (
//     <>
//       <Head>
//         <title>{show.title} - Watch on Free Streaming </title>
//         <meta name="description" content={`${show.description.substring(0, 155)} Watch live streaming at ${show.time} on ${show.date}. Free HD quality on Free Streaming.`} />
//         <meta name="keywords" content={`${show.keywords}, watch ${show.title} free, ${show.title} streaming, ${show.genre.join(' ')}, free movie streaming, live cinema`} />
//         <link rel="canonical" href={currentUrl} />

//         <meta property="og:title" content={`Watch ${show.title} - Live Movie Streaming | Free Streaming`} />
//         <meta property="og:description" content={`${show.description.substring(0, 200)} Watch live at ${show.time} on ${show.date}.`} />
//         <meta property="og:image" content={`${baseUrl}/${show.image}`} />
//         <meta property="og:url" content={currentUrl} />
//         <meta property="og:type" content="article" />
//         <meta property="og:site_name" content="Free Streaming" />
//         <meta property="og:published_time" content={show.date + "T10:00:00+00:00"} />
//         <meta property="og:modified_time" content={new Date().toISOString()} />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={`Watch ${show.title} - Live Streaming`} />
//         <meta name="twitter:description" content={`${show.description.substring(0, 200)} #FreeMovies #LiveStreaming`} />
//         <meta name="twitter:image" content={`${baseUrl}/${show.image}`} />
//       </Head>

//       <div className="min-h-screen py-8 bg-dark">
//         <div className="container mx-auto px-4">
//           <nav className="mb-8" aria-label="Breadcrumb">
//             <ol className="flex items-center space-x-2 text-light/70 text-sm flex-wrap">
//               <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
//               <li>/</li>
//               <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
//               <li>/</li>
//               <li className="text-primary font-semibold truncate max-w-xs" aria-current="page">{show.title}</li>
//             </ol>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <article className="glass-card overflow-hidden mb-8">
//                 <header className="p-6 border-b border-white/10">
//                   <h1 className="text-3xl font-bold text-light mb-2"><span className="gradient-text">{show.title}</span></h1>
//                   <div className="flex items-center gap-4 mt-2 text-light/70">
//                     <span className="flex items-center gap-1"><FaClock /> GMT {show.time}</span>
//                     <span className="flex items-center gap-1"><FaCalendar /> {show.date}</span>
//                     <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{show.rating}</span>
//                     <span className="text-light/50">• {show.duration}</span>
//                   </div>
//                 </header>
//                 <div className="p-6">
//                   <YouTubePlayer videoId={show.youtubeid} title={show.title} />
//                 </div>
//               </article>

//               <div className="glass-card p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
//                   <FaFilm className="text-primary" />
//                   <span className="gradient-text">Movie Details</span>
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-light/70 text-sm mb-2">Description</h3>
//                     <p className="text-light leading-relaxed">{show.description}</p>
//                     <div className="mt-6">
//                       <h3 className="text-light/70 text-sm mb-2">Genre</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {show.genre.map((genre, idx) => <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80">{genre}</span>)}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaUser /> Director</h3>
//                       <p className="text-light font-semibold">{show.director}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-light/70 text-sm mb-2">Cast</h3>
//                       <p className="text-light">{show.cast.join(", ")}</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div><h3 className="text-light/70 text-sm mb-2">Duration</h3><p className="text-light font-semibold">{show.duration}</p></div>
//                       <div><h3 className="text-light/70 text-sm mb-2">Year</h3><p className="text-light font-semibold">{show.year}</p></div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div><h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaLanguage /> Language</h3><p className="text-light">{show.language}</p></div>
//                       <div><h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaClosedCaptioning /> Subtitles</h3><p className="text-light">{show.subtitles.join(", ")}</p></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
//                 <div className="flex flex-wrap gap-2">{show.keywords.split(", ").map((kw, idx) => <span key={idx} title={kw}>{kw}</span>)}</div>
//               </div>
//             </div>

//             <aside className="space-y-6">
//               {/* Direct Social Share Logos */}
//               <div className="glass-card p-6 text-center">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This Movie</span></h3>
//                 <div className="flex gap-4 justify-center items-center">
//                   <FacebookShareButton url={shareUrl} quote={title}>
//                     <FacebookIcon size={50} round />
//                   </FacebookShareButton>
//                   <TwitterShareButton url={shareUrl} title={title}>
//                     <TwitterIcon size={50} round />
//                   </TwitterShareButton>
//                 </div>
//               </div>

//               {/* Live Streaming Info */}
//               <div className="glass-card p-6 text-center">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Live Streaming Info</span></h3>
//                 <div className="space-y-4">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
//                     <p className="text-light/70">Streaming Time GMT</p>
//                   </div>
//                   <div className="p-4 bg-white/5 rounded-lg">
//                     <p className="text-light mb-2">This movie will be streamed live at GMT Time :</p>
//                     <p className="text-primary font-bold">{show.date} • {show.time}</p>
//                   </div>
//                   <Link href={`/player/${show.id}`} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
//                     <FaPlayCircle /> Go to Live Player
//                   </Link>
//                   <div className="text-light/50 text-sm"><p>Live stream available only at scheduled time</p></div>
//                 </div>
//               </div>

//               {/* Other Shows */}
//               {randomShows.length > 0 && (
//                 <div className="glass-card p-6">
//                   <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Other Shows</span></h3>
//                   <div className="space-y-4">
//                     {randomShows.map((rs) => (
//                       <Link key={rs.id} href={`/schedules/${rs.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
//                         <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
//                           <img src={`${baseUrl}/${rs.image}`} alt={rs.title} className="w-full h-full object-cover" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-light group-hover:text-primary transition-colors truncate">{rs.title}</h4>
//                           <p className="text-light/70 text-xs mt-1">{rs.time} • {rs.genre[0]}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </aside>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Static Generation
// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({ params: { id: show.id } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 3600 };
// }









import Head from 'next/head';
import { useRouter } from 'next/router';
import schedule from '../../data/schedules.json';
import YouTubePlayer from '../../components/YouTubePlayer';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle, FaLink } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Dynamic import for react-share buttons to prevent SSR issues
const FacebookShareButton = dynamic(() => import('react-share').then(mod => mod.FacebookShareButton), { ssr: false });
const TwitterShareButton = dynamic(() => import('react-share').then(mod => mod.TwitterShareButton), { ssr: false });
const FacebookIcon = dynamic(() => import('react-share').then(mod => mod.FacebookIcon), { ssr: false });
const TwitterIcon = dynamic(() => import('react-share').then(mod => mod.TwitterIcon), { ssr: false });

export default function ShowPage({ show }) {
  const router = useRouter();
  const [randomShows, setRandomShows] = useState([]);

  const baseUrl = "https://freestreaming.vercel.app";
  const currentUrl = `${baseUrl}/schedules/${show?.id}`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : currentUrl;
  const shareTitle = `Watch "${show?.title}" on Free Streaming | Live Streaming`;

  const pickRandomShows = () => {
    const filteredShows = schedule.shows.filter(s => s.id !== show.id);
    const shuffled = filteredShows.sort(() => 0.5 - Math.random());
    setRandomShows(shuffled.slice(0, 3));
  };

  useEffect(() => {
    if (show) pickRandomShows();
    const interval = setInterval(() => { if (show) pickRandomShows(); }, 5000);
    return () => clearInterval(interval);
  }, [show]);

  const copyDirectLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("Direct link copied to clipboard!");
    });
  };

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-light mb-4">Show not found</h1>
          <Link href="/schedule" className="btn-primary">← Back to Schedule</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{show.title} - Watch on Free Streaming</title>
        <meta name="description" content={`${show.description.substring(0, 155)} Watch live streaming at ${show.time} on ${show.date}. Free HD quality on Free Streaming.`} />
        <meta name="keywords" content={`${show.keywords}, watch ${show.title} free, ${show.title} streaming, ${show.genre.join(' ')}, free movie streaming, live cinema`} />
        <link rel="canonical" href={currentUrl} />

        <meta property="og:title" content={`Watch ${show.title} - Live Movie Streaming | Free Streaming`} />
        <meta property="og:description" content={`${show.description.substring(0, 200)} Watch live at ${show.time} on ${show.date}.`} />
        <meta property="og:image" content={`${baseUrl}/${show.image}`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Free Streaming" />
        <meta property="og:published_time" content={show.date + "T10:00:00+00:00"} />
        <meta property="og:modified_time" content={new Date().toISOString()} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Watch ${show.title} - Live Streaming`} />
        <meta name="twitter:description" content={`${show.description.substring(0, 200)} #FreeMovies #LiveStreaming`} />
        <meta name="twitter:image" content={`${baseUrl}/${show.image}`} />
      </Head>

      <div className="min-h-screen py-8 bg-dark">
        <div className="container mx-auto px-4">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-light/70 text-sm flex-wrap">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
              <li>/</li>
              <li className="text-primary font-semibold truncate max-w-xs" aria-current="page">{show.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <article className="glass-card overflow-hidden mb-8">
                <header className="p-6 border-b border-white/10">
                  <h1 className="text-3xl font-bold text-light mb-2"><span className="gradient-text">{show.title}</span></h1>
                  <div className="flex items-center gap-4 mt-2 text-light/70">
                    <span className="flex items-center gap-1"><FaClock /> GMT {show.time}</span>
                    <span className="flex items-center gap-1"><FaCalendar /> {show.date}</span>
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{show.rating}</span>
                    <span className="text-light/50">• {show.duration}</span>
                  </div>
                </header>
                <div className="p-6">
                  <YouTubePlayer videoId={show.youtubeid} title={show.title} />
                </div>
              </article>

              <div className="glass-card p-6 mb-8">
                <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
                  <FaFilm className="text-primary" />
                  <span className="gradient-text">Movie Details</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-light/70 text-sm mb-2">Description</h3>
                    <p className="text-light leading-relaxed">{show.description}</p>
                    <div className="mt-6">
                      <h3 className="text-light/70 text-sm mb-2">Genre</h3>
                      <div className="flex flex-wrap gap-2">
                        {show.genre.map((genre, idx) => <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80">{genre}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaUser /> Director</h3>
                      <p className="text-light font-semibold">{show.director}</p>
                    </div>
                    <div>
                      <h3 className="text-light/70 text-sm mb-2">Cast</h3>
                      <p className="text-light">{show.cast.join(", ")}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><h3 className="text-light/70 text-sm mb-2">Duration</h3><p className="text-light font-semibold">{show.duration}</p></div>
                      <div><h3 className="text-light/70 text-sm mb-2">Year</h3><p className="text-light font-semibold">{show.year}</p></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaLanguage /> Language</h3><p className="text-light">{show.language}</p></div>
                      <div><h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaClosedCaptioning /> Subtitles</h3><p className="text-light">{show.subtitles.join(", ")}</p></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
                <div className="flex flex-wrap gap-2">{show.keywords.split(", ").map((kw, idx) => <span key={idx} title={kw}>{kw}</span>)}</div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="glass-card p-6 text-center">
                <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This Movie</span></h3>
                <div className="flex gap-3 justify-center items-center">
                  <FacebookShareButton url={shareUrl} quote={shareTitle}>
                    <FacebookIcon size={50} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <TwitterIcon size={50} round />
                  </TwitterShareButton>
                  <button onClick={copyDirectLink} className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center justify-center" title="Copy Direct Link">
                    <FaLink className="text-white" size={28} />
                  </button>
                </div>
              </div>

              <div className="glass-card p-6 text-center">
                <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Live Streaming Info</span></h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
                    <p className="text-light/70">Streaming Time GMT</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-light mb-2">This movie will be streamed live at GMT Time :</p>
                    <p className="text-primary font-bold">{show.date} • {show.time}</p>
                  </div>
                  <Link href={`/player/${show.id}`} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                    <FaPlayCircle /> Go to Live Player
                  </Link>
                  <div className="text-light/50 text-sm"><p>Live stream available only at scheduled time</p></div>
                </div>
              </div>

              {/* Other Shows using Next/Image */}
              {randomShows.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Other Shows</span></h3>
                  <div className="space-y-4">
                    {randomShows.map((rs) => (
                      <Link key={rs.id} href={`/schedules/${rs.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-24 h-24 relative flex-shrink-0">
                          <Image
                            src={`${baseUrl}/${rs.image}`}
                            alt={rs.title}
                            fill
                            quality={90}
                            style={{
                            filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)',
                            // objectFit: 'cover',
                             }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-light group-hover:text-primary transition-colors truncate">{rs.title}</h4>
                          <p className="text-light/70 text-xs mt-1">{rs.time} • {rs.genre[0]}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

               <div className="text-center mt-8 md:mt-12">
                 <Link 
                  href="/schedule" 
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <span className="gradient-text">← Back to Full Schedule</span>
                </Link>
              </div> 
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// Static Generation
export async function getStaticPaths() {
  const paths = schedule.shows.map((show) => ({ params: { id: show.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find((s) => s.id === params.id);
  if (!show) return { notFound: true };
  return { props: { show }, revalidate: 3600 };
}
