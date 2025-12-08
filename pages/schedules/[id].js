// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import schedule from '../../Data/schedules.json';
// import YouTubePlayer from '../../components/YouTubePlayer';
// import { 
//   FacebookShareButton, 
//   TwitterShareButton,
//   FacebookIcon,
//   TwitterIcon
// } from "react-share";
// import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle } from 'react-icons/fa';
// import Link from 'next/link';

// export default function ShowPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const show = schedule.shows.find(s => s.id === id);

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

//   const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
//   const title = `Watch "${show.title}" on FreeStream Cinema`;

//   const relatedShows = schedule.shows
//     .filter(s => s.id !== show.id)
//     .slice(0, 3);

//   return (
//     <>
//       <Head>
//         <title>{show.title} - Watch Trailer | FreeStream Cinema</title>
//         <meta name="description" content={show.description.substring(0, 160)} />
//         <meta name="keywords" content={`${show.keywords}, watch free, streaming, online movie`} />
//         <link rel="canonical" href={`https://freestreamcinema.com/schedules/${show.id}`} />
        
//         <meta property="og:title" content={show.title} />
//         <meta property="og:description" content={show.description.substring(0, 160)} />
//         <meta property="og:image" content={`https://freestreamcinema.com/${show.image}`} />
//         <meta property="og:url" content={`https://freestreamcinema.com/schedules/${show.id}`} />
//         <meta property="og:type" content="video.movie" />
        
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={show.title} />
//         <meta name="twitter:description" content={show.description.substring(0, 160)} />
//         <meta name="twitter:image" content={`https://freestreamcinema.com/${show.image}`} />
        
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Article",
//               "headline": `Movie Details: ${show.title}`,
//               "description": show.description,
//               "datePublished": show.date,
//               "dateModified": new Date().toISOString(),
//               "image": `https://freestreamcinema.com/${show.image}`,
//               "author": {
//                 "@type": "Organization",
//                 "name": "FreeStream Cinema"
//               },
//               "publisher": {
//                 "@type": "Organization",
//                 "name": "FreeStream Cinema",
//                 "logo": {
//                   "@type": "ImageObject",
//                   "url": "https://freestreamcinema.com/logo.png"
//                 }
//               }
//             })
//           }}
//         />
//       </Head>

//       <div className="min-h-screen py-8 bg-dark">
//         <div className="container mx-auto px-4">
//           <nav className="mb-8">
//             <ol className="flex items-center space-x-2 text-light/70 text-sm flex-wrap">
//               <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
//               <li>/</li>
//               <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
//               <li>/</li>
//               <li className="text-primary font-semibold truncate max-w-xs">{show.title}</li>
//             </ol>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="glass-card overflow-hidden mb-8">
//                 <div className="p-6 border-b border-white/10">
//                   <h1 className="text-3xl font-bold text-light">{show.title}</h1>
//                   <div className="flex items-center gap-4 mt-2 text-light/70">
//                     <span className="flex items-center gap-1">
//                       <FaClock /> {show.time}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <FaCalendar /> {show.date}
//                     </span>
//                     <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
//                       {show.rating}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <YouTubePlayer 
//                     videoId={show.youtubeid} 
//                     title={show.title}
//                   />
//                 </div>
//               </div>

//               <div className="glass-card p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
//                   <FaFilm className="text-primary" />
//                   Movie Details
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
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {show.keywords.split(", ").map((keyword, index) => (
//                     <span 
//                       key={index}
//                       className="px-3 py-1 bg-white/5 text-light/80 text-sm rounded-full hover:bg-white/10 transition-colors cursor-default"
//                       title={keyword}
//                     >
//                       {keyword}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div className="glass-card p-6">
//                 <h3 className="text-lg font-bold text-light mb-4">Share This Movie</h3>
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
//                 <h3 className="text-lg font-bold text-light mb-4">Live Streaming Info</h3>
//                 <div className="space-y-4">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
//                     <p className="text-light/70">Streaming Time</p>
//                   </div>
                  
//                   <div className="p-4 bg-white/5 rounded-lg">
//                     <p className="text-light mb-2">This movie will be streamed live at:</p>
//                     <p className="text-primary font-bold">{show.date} • {show.time}</p>
//                   </div>
                  
//                   <Link 
//                     href={`/player?id=${show.id}`}
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
//                   <h3 className="text-lg font-bold text-light mb-4">Other Shows</h3>
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
//                 <h3 className="text-lg font-bold text-light mb-4">Streaming Info</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-light/70">Stream Time:</span>
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

//               <div className="text-center">
//                 <Link 
//                   href="/schedule" 
//                   className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
//                 >
//                   ← Back to Full Schedule
//                 </Link>
//               </div>
//             </div>
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

//   return {
//     props: {
//       show: show || null,
//     },
//     revalidate: 3600,
//   };
// }




import Head from 'next/head';
import { useRouter } from 'next/router';
import schedule from '../../Data/schedules.json';
import YouTubePlayer from '../../components/YouTubePlayer';
import { 
  FacebookShareButton, 
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";
import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function ShowPage({ show }) {
  const router = useRouter();
  const { id } = router.query;

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

  const baseUrl = "https://freestreamcinema.vercel.app/";
  const currentUrl = `${baseUrl}/schedules/${show.id}`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : currentUrl;
  const title = `Watch "${show.title}" on FreeStream Cinema | Live Streaming`;

  const relatedShows = schedule.shows
    .filter(s => s.id !== show.id)
    .slice(0, 3);

  // FULL Article Schema (like the example)
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${currentUrl}/#article`,
        "isPartOf": {
          "@id": `${currentUrl}/`
        },
        "author": {
          "@type": "Person",
          "@id": `${baseUrl}/#/schema/person/admin`,
          "name": "FreeStream Admin"
        },
        "headline": `Watch ${show.title} - Live Movie Streaming on FreeStream Cinema`,
        "datePublished": show.date + "T10:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@id": `${currentUrl}/`
        },
        "wordCount": show.description.length,
        "commentCount": 0,
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "image": {
          "@id": `${currentUrl}/#primaryimage`
        },
        "thumbnailUrl": `${baseUrl}/${show.image}`,
        "articleSection": show.genre,
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "WatchAction",
            "target": `${baseUrl}/player/${show.id}`,
            "name": "Watch Live Stream"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${currentUrl}/`,
        "url": currentUrl,
        "name": `Watch ${show.title} - Live Movie Streaming | FreeStream Cinema`,
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "primaryImageOfPage": {
          "@id": `${currentUrl}/#primaryimage`
        },
        "image": {
          "@id": `${currentUrl}/#primaryimage`
        },
        "thumbnailUrl": `${baseUrl}/${show.image}`,
        "datePublished": show.date + "T10:00:00+00:00",
        "description": show.description.substring(0, 160) + " | Watch live streaming on FreeStream Cinema.",
        "breadcrumb": {
          "@id": `${currentUrl}/#breadcrumb`
        },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [currentUrl]
          }
        ]
      },
      {
        "@type": "ImageObject",
        "inLanguage": "en-US",
        "@id": `${currentUrl}/#primaryimage`,
        "url": `${baseUrl}/${show.image}`,
        "contentUrl": `${baseUrl}/${show.image}`,
        "width": 1200,
        "height": 675,
        "caption": `${show.title} - Watch on FreeStream Cinema`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
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
            "name": "Schedule",
            "item": `${baseUrl}/schedule`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": show.title
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": `${baseUrl}/`,
        "name": "FreeStream Cinema - Watch Movies Live Online",
        "description": "Watch movies live at scheduled times like a real cinema. Daily shows streamed live. Free HD streaming.",
        "publisher": {
          "@id": `${baseUrl}/#organization`
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
          "@id": `${baseUrl}/#/schema/logo/image/`,
          "url": `${baseUrl}/logo.png`,
          "contentUrl": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512,
          "caption": "FreeStream Cinema"
        },
        "image": {
          "@id": `${baseUrl}/#/schema/logo/image/`
        }
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#/schema/person/admin`,
        "name": "FreeStream Admin",
        "image": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": `${baseUrl}/#/schema/person/image/`,
          "url": `${baseUrl}/admin-avatar.jpg`,
          "contentUrl": `${baseUrl}/admin-avatar.jpg`,
          "caption": "FreeStream Admin"
        },
        "url": `${baseUrl}/author/admin/`
      },
      // Movie Schema
      {
        "@type": "Movie",
        "name": show.title,
        "description": show.description,
        "image": `${baseUrl}/${show.image}`,
        "datePublished": show.date,
        "duration": show.duration,
        "genre": show.genre,
        "actor": show.cast.map(actor => ({ "@type": "Person", "name": actor })),
        "director": { "@type": "Person", "name": show.director },
        "contentRating": show.rating,
        "inLanguage": show.language,
        "subtitleLanguage": show.subtitles,
        "trailer": {
          "@type": "VideoObject",
          "name": `${show.title} Trailer`,
          "description": show.description,
          "thumbnailUrl": `${baseUrl}/${show.image}`,
          "uploadDate": show.date,
          "contentUrl": `https://www.youtube.com/watch?v=${show.youtubeid}`,
          "embedUrl": `https://www.youtube.com/embed/${show.youtubeid}`
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{show.title} - Watch Trailer & Live Stream | FreeStream Cinema</title>
        <meta name="description" content={`${show.description.substring(0, 155)} Watch live streaming at ${show.time} on ${show.date}. Free HD quality on FreeStream Cinema.`} />
        <meta name="keywords" content={`${show.keywords}, watch ${show.title} free, ${show.title} streaming, ${show.genre.join(' ')}, free movie streaming, live cinema`} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Watch ${show.title} - Live Movie Streaming | FreeStream Cinema`} />
        <meta property="og:description" content={`${show.description.substring(0, 200)} Watch live at ${show.time} on ${show.date}.`} />
        <meta property="og:image" content={`${baseUrl}/${show.image}`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="FreeStream Cinema" />
        <meta property="og:published_time" content={show.date + "T10:00:00+00:00"} />
        <meta property="og:modified_time" content={new Date().toISOString()} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Watch ${show.title} - Live Streaming`} />
        <meta name="twitter:description" content={`${show.description.substring(0, 200)} #FreeMovies #LiveStreaming`} />
        <meta name="twitter:image" content={`${baseUrl}/${show.image}`} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
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
                  <h1 className="text-3xl font-bold text-light mb-2"><span className="gradient-text">{show.title}</span> </h1>
                  <div className="flex items-center gap-4 mt-2 text-light/70">
                    <span className="flex items-center gap-1">
                      <FaClock /> GMT {show.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendar /> {show.date}
                    </span>
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                      {show.rating}
                    </span>
                    <span className="text-light/50">• {show.duration}</span>
                  </div>
                </header>
                
                <div className="p-6">
                  <YouTubePlayer 
                    videoId={show.youtubeid} 
                    title={show.title}
                  />
                </div>
              </article>

              <div className="glass-card p-6 mb-8">
                <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
                  <FaFilm className="text-primary" />
               <span className="gradient-text">   Movie Details </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-light/70 text-sm mb-2">Description</h3>
                    <p className="text-light leading-relaxed">{show.description}</p>
                    
                    <div className="mt-6">
                      <h3 className="text-light/70 text-sm mb-2">Genre</h3>
                      <div className="flex flex-wrap gap-2">
                        {show.genre.map((genre, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2">
                        <FaUser /> Director
                      </h3>
                      <p className="text-light font-semibold">{show.director}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-light/70 text-sm mb-2">Cast</h3>
                      <p className="text-light">{show.cast.join(", ")}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-light/70 text-sm mb-2">Duration</h3>
                        <p className="text-light font-semibold">{show.duration}</p>
                      </div>
                      <div>
                        <h3 className="text-light/70 text-sm mb-2">Year</h3>
                        <p className="text-light font-semibold">{show.year}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2">
                          <FaLanguage /> Language
                        </h3>
                        <p className="text-light">{show.language}</p>
                      </div>
                      <div>
                        <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2">
                          <FaClosedCaptioning /> Subtitles
                        </h3>
                        <p className="text-light">{show.subtitles.join(", ")}</p>
                      </div>
                   </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {show.keywords.split(", ").map((keyword, index) => (
                    <span 
                      key={index}
                      title={keyword}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This Movie  </span> </h3>
                <div className="flex gap-3">
                  <FacebookShareButton url={shareUrl} quote={title}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                </div>
              </div>

              <div className="glass-card p-6 text-center">
                <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Live Streaming Info </span></h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
                    <p className="text-light/70">Streaming Time GMT</p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-light mb-2">This movie will be streamed live at GMT Time :</p>
                    <p className="text-primary font-bold">{show.date} • {show.time}</p>
                  </div>
                  
                  <Link 
                    href={`/player/${show.id}`}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                  >
                    <FaPlayCircle />
                    Go to Live Player
                  </Link>
                  
                  <div className="text-light/50 text-sm">
                    <p>Live stream available only at scheduled time</p>
                  </div>
                </div>
              </div>

              {relatedShows.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-light mb-4"> <span className="gradient-text"> Other Shows </span></h3>
                  <div className="space-y-4">
                    {relatedShows.map((relatedShow) => (
                      <Link 
                        key={relatedShow.id}
                        href={`/schedules/${relatedShow.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                            <FaFilm className="text-white/70 group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-light group-hover:text-primary transition-colors truncate">
                            {relatedShow.title}
                          </h4>
                          <p className="text-light/70 text-xs mt-1">
                            {relatedShow.time} • {relatedShow.genre[0]}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-light mb-4"> <span className="gradient-text"> Streaming Info </span> </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-light/70">Stream Time GMT:</span>
                    <span className="text-light font-semibold">{show.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-light/70">Date:</span>
                    <span className="text-light font-semibold">{show.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-light/70">Rating:</span>
                    <span className="flex items-center gap-1 text-light font-semibold">
                      <FaStar className="text-accent" />
                      {show.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-light/70">Duration:</span>
                    <span className="text-light font-semibold">{show.duration}</span>
                  </div>
                </div>
              </div>
             <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/schedule" 
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            ><span className="gradient-text">
              ← Back to Full Schedule </span>
            </Link>
          </div>
              {/* <div className="text-center">
                <Link 
                  href="/schedule" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  ← Back to Full Schedule
                </Link>
              </div> */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = schedule.shows.map((show) => ({
    params: { id: show.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find(s => s.id === params.id);

  if (!show) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      show,
    },
    revalidate: 3600,
  };
}