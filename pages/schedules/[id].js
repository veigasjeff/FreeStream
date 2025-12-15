// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import schedule from '../../data/schedules.json';
// import YouTubePlayer from '../../components/YouTubePlayer';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { FaClock, FaCalendar, FaUser, FaStar, FaLanguage, FaClosedCaptioning, FaFilm, FaPlayCircle, FaLink } from 'react-icons/fa';
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

//   const baseUrl = "https://freestreaming.vercel.app";
//   const currentUrl = `${baseUrl}/schedules/${show?.id}`;
//   const shareUrl = typeof window !== 'undefined' ? window.location.href : currentUrl;
//   const shareTitle = `Watch "${show?.title}" on Free Streaming | Live Streaming`;

//   const pickRandomShows = () => {
//     const filteredShows = schedule.shows.filter(s => s.id !== show.id);
//     const shuffled = filteredShows.sort(() => 0.5 - Math.random());
//     setRandomShows(shuffled.slice(0, 3));
//   };

//   useEffect(() => {
//     if (show) pickRandomShows();
//     const interval = setInterval(() => { if (show) pickRandomShows(); }, 5000);
//     return () => clearInterval(interval);
//   }, [show]);

//   const copyDirectLink = () => {
//     navigator.clipboard.writeText(currentUrl).then(() => {
//       alert("Direct link copied to clipboard!");
//     });
//   };

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

//   return (
//     <>
//       <Head>
//         <title>{show.title} - Watch on Free Streaming</title>
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
//    <div className="glass-card p-6 text-center">
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
//               <div className="glass-card p-6 text-center">
//                 <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This Movie</span></h3>
//                 <div className="flex gap-3 justify-center items-center">
//                   <FacebookShareButton url={shareUrl} quote={shareTitle}>
//                     <FacebookIcon size={50} round />
//                   </FacebookShareButton>
//                   <TwitterShareButton url={shareUrl} title={shareTitle}>
//                     <TwitterIcon size={50} round />
//                   </TwitterShareButton>
//                   <button onClick={copyDirectLink} className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center justify-center" title="Copy Direct Link">
//                     <FaLink className="text-white" size={28} />
//                   </button>
//                 </div>
//               </div>

//               {/* <div className="glass-card p-6 text-center">
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
//               </div> */}

//               {/* Other Shows using Next/Image */}
//               {randomShows.length > 0 && (
//                 <div className="glass-card p-6">
//                   <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Other Shows</span></h3>
//                   <div className="space-y-4">
//                     {randomShows.map((rs) => (
//                       <Link key={rs.id} href={`/schedules/${rs.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
//                         <div className="w-24 h-24 relative flex-shrink-0">
//                           <Image
//                             src={`${baseUrl}/${rs.image}`}
//                             alt={rs.title}
//                             fill
//                             quality={90}
//                             style={{
//                             filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)',
//                             // objectFit: 'cover',
//                              }}
//                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                           />
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

//                <div className="text-center mt-8 md:mt-12">
//                  <Link 
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

  // Helper function to convert duration to ISO 8601 format
  const convertDurationToISO = (durationStr) => {
    if (!durationStr || durationStr === "Live") return "PT2H";
    const hoursMatch = durationStr.match(/(\d+)h/);
    const minutesMatch = durationStr.match(/(\d+)min/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 2;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    return `PT${hours}H${minutes}M`;
  };

  // Generate Article Schema (JSON-LD)
  const generateArticleSchema = () => {
    if (!show) return null;

    const publishedDate = show.date && !isNaN(new Date(show.date).getTime()) 
      ? new Date(show.date + "T12:00:00Z").toISOString()
      : new Date().toISOString();

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      },
      "headline": show.title,
      "description": show.description?.substring(0, 200) || "",
      "image": `${baseUrl}/${show.image}`,
      "author": {
        "@type": "Organization",
        "name": "Free Streaming",
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "Free Streaming",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 512,
          "height": 512
        }
      },
      "datePublished": publishedDate,
      "dateModified": new Date().toISOString(),
      "articleSection": "Movie Streaming",
      "keywords": show.keywords || "",
      "genre": show.genre?.join(", ") || "",
      "inLanguage": show.language || "English",
      "wordCount": show.description ? show.description.split(' ').length : 100,
      "timeRequired": convertDurationToISO(show.duration),
      "url": currentUrl
    };
  };

  // Generate Movie Schema with ALL required fields
  const generateMovieSchema = () => {
    if (!show) return null;

    // Create movie schema with ALL REQUIRED FIELDS
    const movieSchema = {
      "@context": "https://schema.org",
      "@type": "Movie",
      "name": show.title || "Movie",
      "description": show.description || "",
      "image": `${baseUrl}/${show.image}`,
      "dateCreated": show.year || "2025",
      "genre": show.genre || [],
      "duration": convertDurationToISO(show.duration),
      "inLanguage": show.language || "English",
      "url": currentUrl,
      "contentRating": show.rating || ""
    };

    // Add director with proper Person object
    if (show.director) {
      if (Array.isArray(show.director)) {
        movieSchema.director = show.director.map(dir => ({
          "@type": "Person",
          "name": dir
        }));
      } else {
        movieSchema.director = {
          "@type": "Person",
          "name": show.director
        };
      }
    }

    // Add cast with individual Person objects
    if (show.cast && Array.isArray(show.cast)) {
      const actors = [];
      for (let i = 0; i < show.cast.length; i++) {
        if (show.cast[i] && show.cast[i].trim() !== '') {
          actors.push({
            "@type": "Person",
            "name": show.cast[i].trim()
          });
        }
      }
      if (actors.length > 0) {
        movieSchema.actor = actors;
      }
    }

    // Add subtitles if not "NA"
    if (show.subtitles && Array.isArray(show.subtitles)) {
      const validSubtitles = show.subtitles.filter(sub => sub !== "NA");
      if (validSubtitles.length > 0) {
        movieSchema.subtitleLanguage = validSubtitles;
      }
    }

    // Add rating if exists
    if (show.rating) {
      const ratingNum = parseFloat(show.rating);
      if (!isNaN(ratingNum)) {
        movieSchema.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": ratingNum.toString(),
          "ratingCount": "1000",
          "bestRating": "10",
          "worstRating": "1"
        };
      }
    }

    return movieSchema;
  };

  // Generate TVSeries Schema
  const generateTVSeriesSchema = () => {
    if (!show) return null;
    
    const isTVSeries = show.category === "TvSeries" || 
                      show.title?.toLowerCase().includes("season") || 
                      show.title?.toLowerCase().includes("s0");
    
    if (!isTVSeries) return null;

    const tvSchema = {
      "@context": "https://schema.org",
      "@type": "TVSeries",
      "name": show.title || "TV Series",
      "description": show.description || "",
      "image": `${baseUrl}/${show.image}`,
      "datePublished": show.date || "2025",
      "genre": show.genre || [],
      "inLanguage": show.language || "English",
      "url": currentUrl,
      "numberOfSeasons": "1"
    };

    // Add director
    if (show.director) {
      if (Array.isArray(show.director)) {
        tvSchema.director = show.director.map(dir => ({
          "@type": "Person",
          "name": dir
        }));
      } else {
        tvSchema.director = {
          "@type": "Person",
          "name": show.director
        };
      }
    }

    // Add cast
    if (show.cast && Array.isArray(show.cast)) {
      const actors = [];
      for (let i = 0; i < show.cast.length; i++) {
        if (show.cast[i] && show.cast[i].trim() !== '') {
          actors.push({
            "@type": "Person",
            "name": show.cast[i].trim()
          });
        }
      }
      if (actors.length > 0) {
        tvSchema.actor = actors;
      }
    }

    return tvSchema;
  };

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

  // Generate schemas
  const articleSchema = generateArticleSchema();
  const isTVSeries = show.category === "TvSeries" || 
                     show.title?.toLowerCase().includes("season") || 
                     show.title?.toLowerCase().includes("s0");
  
  const mediaSchema = isTVSeries ? generateTVSeriesSchema() : generateMovieSchema();

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  const displayDate = formatDate(show.date);

  return (
    <>
      <Head>
        <title>{show.title} - Watch on Free Streaming</title>
        <meta name="description" content={`${show.description?.substring(0, 155) || ''} Watch live streaming at ${show.time} on ${displayDate}. Free HD quality on Free Streaming.`} />
        <meta name="keywords" content={`${show.keywords || ''}, watch ${show.title} free, ${show.title} streaming, ${show.genre?.join(' ') || ''}, free movie streaming, live cinema`} />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`Watch ${show.title} - ${isTVSeries ? 'TV Series' : 'Movie'} Streaming | Free Streaming`} />
        <meta property="og:description" content={`${show.description?.substring(0, 200) || ''} Watch live at ${show.time} on ${displayDate}.`} />
        <meta property="og:image" content={`${baseUrl}/${show.image}`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Free Streaming" />
        <meta property="og:published_time" content={articleSchema?.datePublished || new Date().toISOString()} />
        <meta property="og:modified_time" content={new Date().toISOString()} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Watch ${show.title} - Live Streaming`} />
        <meta name="twitter:description" content={`${show.description?.substring(0, 200) || ''} #FreeMovies #LiveStreaming`} />
        <meta name="twitter:image" content={`${baseUrl}/${show.image}`} />
        <meta name="twitter:site" content="@freestreaming" />

        {/* Article Schema */}
        {articleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
        )}

        {/* Movie or TVSeries Schema */}
        {mediaSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaSchema) }}
          />
        )}

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Free Streaming" />
        <meta property="article:published_time" content={articleSchema?.datePublished || new Date().toISOString()} />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:section" content="Entertainment" />
        <meta property="article:tag" content={show.keywords || ''} />
        <meta name="news_keywords" content={show.keywords || ''} />
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
              <article className="glass-card overflow-hidden mb-8" itemScope itemType="https://schema.org/Article">
                <meta itemProp="datePublished" content={articleSchema?.datePublished} />
                <meta itemProp="dateModified" content={new Date().toISOString()} />
                <meta itemProp="author" content="Free Streaming" />
                <meta itemProp="publisher" content="Free Streaming" />
                
                <header className="p-6 border-b border-white/10">
                  <h1 className="text-3xl font-bold text-light mb-2" itemProp="headline">
                    <span className="gradient-text">{show.title}</span>
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-light/70">
                    <span className="flex items-center gap-1"><FaClock /> {show.time}</span>
                    <span className="flex items-center gap-1"><FaCalendar /> {displayDate}</span>
                    {show.rating && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded" itemProp="contentRating">{show.rating}</span>
                    )}
                    {show.duration && (
                      <span className="text-light/50">• {show.duration}</span>
                    )}
                  </div>
                </header>
                <div className="p-6">
                  <YouTubePlayer videoId={show.youtubeid} title={show.title} />
                </div>
              </article>
              
              <div className="glass-card p-6 text-center">
                <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Live Streaming Info</span></h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{show.time}</div>
                    <p className="text-light/70">Streaming Time</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-light mb-2">This {show.genre?.includes('Sports') ? 'sports event' : isTVSeries ? 'TV series' : 'movie'} will be streamed live at:</p>
                    <p className="text-primary font-bold">{displayDate} • {show.time}</p>
                  </div>
                  <Link href={`/player/${show.id}`} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                    <FaPlayCircle /> Go to Live Player
                  </Link>
                  <div className="text-light/50 text-sm"><p>Live stream available only at scheduled time</p></div>
                </div>
              </div>

              <div className="glass-card p-6 mb-8" itemScope itemType={isTVSeries ? "https://schema.org/TVSeries" : "https://schema.org/Movie"}>
                <h2 className="text-2xl font-bold text-light mb-6 flex items-center gap-2">
                  <FaFilm className="text-primary" />
                  <span className="gradient-text">{isTVSeries ? 'TV Series Details' : 'Movie Details'}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-light/70 text-sm mb-2">Description</h3>
                    <p className="text-light leading-relaxed" itemProp="description">{show.description}</p>
                    <div className="mt-6">
                      <h3 className="text-light/70 text-sm mb-2">Genre</h3>
                      <div className="flex flex-wrap gap-2">
                        {show.genre?.map((genre, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80" itemProp="genre">{genre}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {show.director && (
                      <div>
                        <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaUser /> Director</h3>
                        <p className="text-light font-semibold" itemProp="director">
                          {Array.isArray(show.director) ? show.director.join(", ") : show.director}
                        </p>
                      </div>
                    )}
                    {show.cast && show.cast.length > 0 && (
                      <div>
                        <h3 className="text-light/70 text-sm mb-2">Cast</h3>
                        <p className="text-light" itemProp="actor">{show.cast.join(", ")}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {show.duration && show.duration !== "Live" && (
                        <div>
                          <h3 className="text-light/70 text-sm mb-2">Duration</h3>
                          <p className="text-light font-semibold" itemProp="duration">{show.duration}</p>
                        </div>
                      )}
                      {show.year && (
                        <div>
                          <h3 className="text-light/70 text-sm mb-2">Year</h3>
                          <p className="text-light font-semibold" itemProp="dateCreated">{show.year}</p>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {show.language && (
                        <div>
                          <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaLanguage /> Language</h3>
                          <p className="text-light" itemProp="inLanguage">{show.language}</p>
                        </div>
                      )}
                      {show.subtitles && show.subtitles.length > 0 && show.subtitles[0] !== "NA" && (
                        <div>
                          <h3 className="text-light/70 text-sm mb-2 flex items-center gap-2"><FaClosedCaptioning /> Subtitles</h3>
                          <p className="text-light">{show.subtitles.join(", ")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {show.keywords && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold text-light mb-4">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {show.keywords.split(", ").map((kw, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-light/80" itemProp="keywords">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="glass-card p-6 text-center">
                <h3 className="text-lg font-bold text-light mb-4"><span className="gradient-text">Share This {show.genre?.includes('Sports') ? 'Event' : isTVSeries ? 'TV Series' : 'Movie'}</span></h3>
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
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-light group-hover:text-primary transition-colors truncate">{rs.title}</h4>
                          <p className="text-light/70 text-xs mt-1">{rs.time} • {rs.genre?.[0] || ''}</p>
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

  return { 
    props: { 
      show
    }, 
    revalidate: 3600 
  };
}