
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import schedule from '../../data/schedules.json';
import postsData from '../../data/posts.json';
import YouTubePlayer from '../../components/YouTubePlayer';
import { 
  FaClock, FaCalendar, FaPlayCircle, FaShareAlt, FaStar, 
  FaLanguage, FaClosedCaptioning, FaCalendarAlt, FaTags,
  FaArrowLeft, FaUserFriends, FaVideo, FaFilm, FaExclamationTriangle
} from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

// React Share Components
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share';

export default function ShowPage({ show, relatedPost, similarShows }) {
  const router = useRouter();
  const baseUrl = "https://freestreaming.vercel.app";
  const currentUrl = `${baseUrl}/schedules/${show.id}`;
  
  // State for random similar movies that change every 5 seconds
  const [randomSimilarMovies, setRandomSimilarMovies] = useState([]);
  
  // Adult content warning state
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [selectedAdultShow, setSelectedAdultShow] = useState(null);
  const [intendedAction, setIntendedAction] = useState(null);
  
  // Share state
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Check if main show is adult content
  const isAdult = show.category === 'Adult';

  // Function to get 4 random movies from all available movies (excluding current one)
  const getRandomMovies = useCallback(() => {
    const allMovies = schedule.shows.filter(movie => movie.id !== show.id);
    const shuffled = [...allMovies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [show.id]);

  // Initialize with random movies and set interval to change them
  useEffect(() => {
    // Set initial random movies
    setRandomSimilarMovies(getRandomMovies());
    
    // Change movies every 5 seconds
    const interval = setInterval(() => {
      setRandomSimilarMovies(getRandomMovies());
    }, 5000);

    return () => clearInterval(interval);
  }, [getRandomMovies]);

  // Handle Adult content click for similar movies
  const handleAdultClick = (movie, action, e) => {
    if (movie.category === 'Adult') {
      e.preventDefault();
      e.stopPropagation();
      setSelectedAdultShow(movie);
      setIntendedAction(action);
      setShowAdultWarning(true);
      return false;
    }
    return true;
  };

  // Handle Adult content click for main show
  const handleMainAdultClick = (action, e) => {
    if (isAdult) {
      e.preventDefault();
      setIntendedAction(action);
      setSelectedAdultShow(show);
      setShowAdultWarning(true);
      return false;
    }
    return true;
  };

  // Handle age verification
  const handleAgeVerification = () => {
    setShowAdultWarning(false);
    
    // Proceed with intended action using router
    if (selectedAdultShow && intendedAction) {
      if (intendedAction === 'watch') {
        router.push(`/player/${selectedAdultShow.id}`);
      } else if (intendedAction === 'details') {
        router.push(`/schedules/${selectedAdultShow.id}`);
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowAdultWarning(false);
    setSelectedAdultShow(null);
    setIntendedAction(null);
  };

  // Share functions
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Watch "${show.title}" (${show.year}) online for free on Free Streaming!`;
  const shareTitle = `Watch ${show.title} (${show.year}) Online Free | Free Streaming`;
  const imageUrl = `${baseUrl}/${show.image}`;

  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/fallback-movie.jpg';
    
    // If image path already starts with http or https, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Check if it's a YouTube thumbnail
    if (imagePath.includes('youtube.com') || imagePath.includes('ytimg.com')) {
      return imagePath;
    }
    
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // For local images
    return `/${cleanPath}`;
  };

  // Helper function to get full image URL for metadata
  const getFullImageUrl = (imagePath) => {
    const cleanPath = getImageUrl(imagePath);
    if (cleanPath.startsWith('http')) {
      return cleanPath;
    }
    return `${baseUrl}${cleanPath}`;
  };

  // Format date for schema
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  // Article Schema for Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${currentUrl}#article`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "headline": `Watch ${show.title} (${show.year}) Full Movie Online Free - Live Streaming`,
    "description": show.description?.substring(0, 160) || `Watch ${show.title} online for free`,
    "image": getFullImageUrl(show.image),
    "author": {
      "@type": "Organization",
      "name": "Free Streaming",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Free Streaming",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": show.date ? formatDate(show.date) : new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "articleBody": `${show.title} is a ${Array.isArray(show.genre) ? show.genre.join(", ") : show.genre || "movie"} ${show.year ? show.year + " " : ""}movie. ${show.description || ""} Directed by ${Array.isArray(show.director) ? show.director.join(", ") : show.director || "N/A"}. Starring ${show.cast?.join(", ") || "N/A"}. Watch it live on our platform.`,
    "keywords": show.keywords || `${show.title} movie`,
    "articleSection": "Movies",
    "wordCount": (show.description?.split(' ').length || 0) + 50,
    "thumbnailUrl": getFullImageUrl(show.image),
    "inLanguage": show.language || "English"
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Movies Schedule",
        "item": `${baseUrl}/schedule`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": show.title,
        "item": currentUrl
      }
    ]
  };

  // VideoObject Schema for embedded player
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": show.title,
    "description": show.description || `Watch ${show.title} online`,
    "thumbnailUrl": getFullImageUrl(show.image),
    "uploadDate": show.date ? formatDate(show.date) : new Date().toISOString(),
    "duration": show.duration || "PT2H",
    "contentUrl": show.streamUrl || `${baseUrl}/player/${show.id}`,
    "embedUrl": `https://www.youtube.com/embed/${show.youtubeid}`,
    "genre": Array.isArray(show.genre) ? show.genre.join(", ") : show.genre || "Movie",
    "actor": show.cast?.map(actor => ({ "@type": "Person", "name": actor })) || [],
    "director": Array.isArray(show.director) 
      ? show.director.map(director => ({ "@type": "Person", "name": director }))
      : { "@type": "Person", "name": show.director || "N/A" }
  };

  // Hidden main movie image for SEO
  const mainMovieImage = show.image ? getImageUrl(show.image) : '/images/fallback-movie.jpg';

  return (
    <>
      <Head>
        <title>{`Watch ${show.title} (${show.year}) Online Free | Free Streaming`}</title>
        <meta name="description" content={`Stream ${show.title} online for free. ${show.description?.substring(0, 155) || `Watch ${show.title} in HD`}... Watch in HD without registration.`} />
        <meta name="keywords" content={`${show.title}, watch ${show.title} online, free ${show.title} streaming, ${Array.isArray(show.genre) ? show.genre.join(", ") : show.genre || "movie"}, ${show.year} movie, ${show.cast?.slice(0, 3).join(", ") || show.title}`} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Watch ${show.title} (${show.year}) Free Online`} />
        <meta property="og:description" content={show.description || `Watch ${show.title} online free`} />
        <meta property="og:image" content={getFullImageUrl(show.image)} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Free Streaming" />
        <meta property="og:video" content={`https://www.youtube.com/embed/${show.youtubeid}`} />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={`Watch ${show.title} (${show.year}) Free Online`} />
        <meta name="twitter:description" content={show.description?.substring(0, 200) || `Watch ${show.title} online`} />
        <meta name="twitter:image" content={getFullImageUrl(show.image)} />
        <meta name="twitter:player" content={`https://www.youtube.com/embed/${show.youtubeid}`} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
        
        {/* Hidden image for SEO */}
        <link rel="preload" as="image" href={mainMovieImage} />
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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Share This Movie</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getImageUrl(show.image)}
                    alt={show.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{show.title}</h4>
                  <p className="text-gray-400 text-sm">Share with your friends</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-3">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent text-white text-sm truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    copied ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-3">
              <FacebookShareButton 
                url={currentUrl} 
                quote={shareText}
                hashtag="#FreeStreaming"
                className="flex flex-col items-center gap-2"
              >
                <FacebookIcon size={48} round />
                <span className="text-xs text-gray-300">Facebook</span>
              </FacebookShareButton>
              
              <TwitterShareButton 
                url={currentUrl}
                title={shareText}
                hashtags={["FreeStreaming", "FreeMovies"]}
                className="flex flex-col items-center gap-2"
              >
                <TwitterIcon size={48} round />
                <span className="text-xs text-gray-300">Twitter</span>
              </TwitterShareButton>
              
              <WhatsappShareButton 
                url={currentUrl}
                title={shareText}
                separator=" - "
                className="flex flex-col items-center gap-2"
              >
                <WhatsappIcon size={48} round />
                <span className="text-xs text-gray-300">WhatsApp</span>
              </WhatsappShareButton>
              
              <TelegramShareButton 
                url={currentUrl}
                title={shareText}
                className="flex flex-col items-center gap-2"
              >
                <TelegramIcon size={48} round />
                <span className="text-xs text-gray-300">Telegram</span>
              </TelegramShareButton>
              
              <RedditShareButton 
                url={currentUrl}
                title={shareText}
                windowWidth={660}
                windowHeight={460}
                className="flex flex-col items-center gap-2"
              >
                <RedditIcon size={48} round />
                <span className="text-xs text-gray-300">Reddit</span>
              </RedditShareButton>
            </div>
          </div>
        </div>
      )}

      {/* Hidden SEO image */}
      <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
        <Image
          src={mainMovieImage}
          alt={`${show.title} movie poster`}
          width={1200}
          height={630}
          priority={true}
          quality={100}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Breadcrumb Navigation */}
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/schedule" className="text-gray-400 hover:text-blue-400 transition-colors">
              Movies
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white truncate max-w-xs md:max-w-lg">{show.title}</span>
          </div>
        </nav>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <header className="mb-8">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {show.title} 
                      {show.year && <span className="text-gray-400"> ({show.year})</span>}
                    </h1>
                    {isAdult && (
                      <div className="inline-flex items-center text-white px-3 py-1 rounded-md text-sm font-bold mb-4">
                        {/* Adult badge removed per request */}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaShareAlt /> Share
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                  {show.rating && (
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span>IMDb: {show.rating}</span>
                    </div>
                  )}
                  {show.duration && (
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{show.duration}</span>
                    </div>
                  )}
                  {show.language && (
                    <div className="flex items-center gap-2">
                      <FaLanguage />
                      <span>{show.language}</span>
                    </div>
                  )}
                  {show.subtitles && show.subtitles[0] !== "NA" && (
                    <div className="flex items-center gap-2">
                      <FaClosedCaptioning />
                      <span>Subtitles Available</span>
                    </div>
                  )}
                </div>
              </header>

              {/* Video Player */}
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-8 border border-gray-800 shadow-2xl">
                <YouTubePlayer videoId={show.youtubeid} title={show.title} />
              </div>

              {/* Movie Details */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
                <div className="flex flex-wrap gap-4 mb-8">
                  {isAdult ? (
                    <button
                      onClick={(e) => handleMainAdultClick('watch', e)}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/30"
                    >
                      <FaPlayCircle size={24} /> WATCH LIVE STREAM
                    </button>
                  ) : (
                    <Link
                      href={`/player/${show.id}`}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/30"
                    >
                      <FaPlayCircle size={24} /> WATCH LIVE STREAM
                    </Link>
                  )}
                  {show.time && (
                    <div className="flex items-center gap-3 text-gray-300 bg-gray-700/50 px-6 py-4 rounded-xl">
                      <FaClock className="text-blue-400" /> 
                      <div>
                        <div className="font-bold text-lg">{show.time}</div>
                        <div className="text-sm text-gray-400">Stream Time (GMT)</div>
                      </div>
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-3">
                  Movie Synopsis
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  {show.description || `Watch ${show.title} online for free. Stream ${show.title} in HD quality.`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {show.director && (
                      <div>
                        <span className="text-gray-500 block mb-1 text-sm">Director</span>
                        <span className="text-white font-semibold text-lg">
                          {Array.isArray(show.director) ? show.director.join(", ") : show.director}
                        </span>
                      </div>
                    )}
                    {show.cast && show.cast.length > 0 && (
                      <div>
                        <span className="text-gray-500 block mb-1 text-sm">Cast</span>
                        <span className="text-white font-semibold text-lg">
                          {show.cast.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {show.genre && (
                      <div>
                        <span className="text-gray-500 block mb-1 text-sm">Genre</span>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(show.genre) ? show.genre.map((genre, idx) => (
                            <span key={idx} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                              {genre}
                            </span>
                          )) : (
                            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                              {show.genre}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {show.year && (
                      <div>
                        <span className="text-gray-500 block mb-1 text-sm">Release Year</span>
                        <span className="text-white font-semibold text-lg">
                          {show.year}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Related Blog Post */}
              {relatedPost && (
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6 mb-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FaVideo /> Read More About This Movie
                  </h3>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <h4 className="text-xl font-bold text-blue-400 hover:text-blue-300 mb-2 transition-colors">
                      {relatedPost.title} →
                    </h4>
                    <p className="text-gray-300 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaCalendarAlt /> {relatedPost.date}
                    </div>
                  </Link>
                </div>
              )}

              {/* Similar Movies (Random - Changes every 5 seconds) */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-3">
                  Similar Movies & TV Shows You Might Like
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {randomSimilarMovies.map((movie) => {
                    const isMovieAdult = movie.category === 'Adult';
                    const movieImage = getImageUrl(movie.image);
                    const movieTitle = movie.title || "Unknown Movie";
                    
                    if (isMovieAdult) {
                      return (
                        <button
                          key={movie.id}
                          onClick={(e) => handleAdultClick(movie, 'details', e)}
                          className="bg-gray-800/30 hover:bg-gray-700/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all group cursor-pointer w-full text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={movieImage}
                                alt={movieTitle}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform"
                                sizes="80px"
                                loading="lazy"
                              />
                              <div className="absolute top-1 right-1 bg-red-600 text-white px-1 py-0.5 rounded text-xs font-bold z-10">
                                18+
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                {movieTitle}
                                <span className="ml-2 text-red-400 text-xs font-bold">[ADULT]</span>
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                {movie.year && <span>{movie.year}</span>}
                                {movie.year && movie.duration && <span>•</span>}
                                {movie.duration && <span>{movie.duration}</span>}
                              </div>
                              <div className="text-blue-400 text-sm mt-2">
                                Watch Now →
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    } else {
                      return (
                        <Link
                          key={movie.id}
                          href={`/schedules/${movie.id}`}
                          className="bg-gray-800/30 hover:bg-gray-700/50 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={movieImage}
                                alt={movieTitle}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform"
                                sizes="80px"
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                {movieTitle}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                {movie.year && <span>{movie.year}</span>}
                                {movie.year && movie.duration && <span>•</span>}
                                {movie.duration && <span>{movie.duration}</span>}
                              </div>
                              <div className="text-blue-400 text-sm mt-2">
                                Watch Now →
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  })}
                </div>
                {randomSimilarMovies.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Loading similar movies...
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 sticky top-6">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3 flex items-center gap-2">
                  <FaCalendarAlt /> Streaming Schedule
                </h3>
                <div className="space-y-4 mb-8">
                  {show.date && (
                    <div className="p-4 bg-gray-900/50 rounded-xl border-l-4 border-blue-500">
                      <p className="text-sm text-gray-400">Stream Date</p>
                      <p className="font-bold text-lg">{show.date}</p>
                    </div>
                  )}
                  {show.time && (
                    <div className="p-4 bg-gray-900/50 rounded-xl border-l-4 border-green-500">
                      <p className="text-sm text-gray-400">Stream Time</p>
                      <p className="font-bold text-lg">{show.time} GMT</p>
                    </div>
                  )}
                </div>

                {/* Social Share Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaShareAlt /> Share This Movie
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <FacebookShareButton 
                      url={currentUrl} 
                      quote={shareText}
                      hashtag="#FreeStreaming"
                      className="transition-transform hover:scale-110"
                    >
                      <FacebookIcon size={36} round />
                    </FacebookShareButton>
                    
                    <TwitterShareButton 
                      url={currentUrl}
                      title={shareText}
                      hashtags={["FreeStreaming", "FreeMovies"]}
                      className="transition-transform hover:scale-110"
                    >
                      <TwitterIcon size={36} round />
                    </TwitterShareButton>
                    
                    <WhatsappShareButton 
                      url={currentUrl}
                      title={shareText}
                      separator=" - "
                      className="transition-transform hover:scale-110"
                    >
                      <WhatsappIcon size={36} round />
                    </WhatsappShareButton>
                    
                    <TelegramShareButton 
                      url={currentUrl}
                      title={shareText}
                      className="transition-transform hover:scale-110"
                    >
                      <TelegramIcon size={36} round />
                    </TelegramShareButton>
                    
                    <button
                      onClick={handleCopyLink}
                      className="w-9 h-9 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition-all hover:scale-110"
                      title="Copy link"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  {copied && (
                    <div className="mt-2 text-sm text-green-400 animate-pulse">
                      ✓ Link copied to clipboard!
                    </div>
                  )}
                </div>

                {show.keywords && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FaTags /> Keywords & Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {show.keywords
                        .split(",")
                        .slice(0, 15)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg transition-colors cursor-default"
                            title={tag.trim()}
                          >
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Link
                    href="/schedule"
                    className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors w-full"
                  >
                    <FaArrowLeft /> Back to Full Schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = schedule.shows.map((show) => ({ 
    params: { id: show.id } 
  }));

  return { 
    paths, 
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find((s) => s.id === params.id);
  
  if (!show) {
    return {
      notFound: true,
    };
  }

  // Find related blog post
  const relatedPost = postsData.posts.find((p) => p.relatedMovieId === show.id) || null;

  // We keep similarShows in props but it won't be used (maintaining backward compatibility)
  const similarShows = [];

  return {
    props: {
      show,
      relatedPost,
      similarShows,
    },
    revalidate: 3600,
  };
}