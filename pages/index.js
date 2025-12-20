import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import schedule from '../data/schedules.json';
import postsData from '../data/posts.json';
import { 
  FaFire, FaCalendarCheck, FaVideo, FaUsers, FaPlayCircle, 
  FaClock, FaArrowRight, FaExclamationTriangle, FaCalendarAlt,
  FaStar, FaCheckCircle, FaGlobe, FaMobileAlt, FaFilm
} from 'react-icons/fa';

export default function Home({ todaysShows, latestPosts }) {
  const baseUrl = "https://freestreaming.vercel.app";
  const currentDate = new Date().toISOString();

  // Get all unique times from today's shows
  const todaysTimes = [...new Set(todaysShows.map(show => show.time))];
  const displayTimes = todaysTimes.slice(0, 3);

  // Helper function for images
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/default-movie.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/${imagePath}`;
  };

  // Features data
  const features = [
    {
      icon: <FaFire className="text-white text-2xl" />,
      title: "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online",
      description: "Watch thousands of movies, TV shows, live sports and news channels completely free. No registration or subscription required."
    },
    {
      icon: <FaCalendarCheck className="text-white text-2xl" />,
      title: "Fixed Schedule Times",
      description: displayTimes.length > 0 
        ? `Daily shows at ${displayTimes.join(', ')}${displayTimes.length < todaysTimes.length ? ' and more' : ''}`
        : "Check our schedule for daily streaming times"
    },
    {
      icon: <FaVideo className="text-white text-2xl" />,
      title: "HD Quality Streaming",
      description: "High-definition streaming on all devices - phones, tablets, computers, and smart TVs"
    },
    {
      icon: <FaUsers className="text-white text-2xl" />,
      title: "Live Community Watching",
      description: "Watch with other viewers simultaneously in our live streaming community"
    }
  ];

  // Steps data
  const steps = [
    {
      number: "01",
      title: "Check Movie Schedule",
      description: "Browse our daily movie schedule with exact streaming times"
    },
    {
      number: "02",
      title: "Click Watch Live",
      description: "Go to player page during scheduled stream time"
    },
    {
      number: "03",
      title: "Enjoy Free Streaming",
      description: "Watch the movie in HD quality with built-in player controls"
    }
  ];

  // Website Schema for SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online",
    "description": "Watch free movies, TV shows, live sports and news channels online. No registration or subscription required. HD quality streaming on all devices.",
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Free Streaming",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`,
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://twitter.com/freestreaming",
      "https://facebook.com/freestreaming",
      "https://instagram.com/freestreaming"
    ]
  };

  // WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/#webpage`,
    "url": baseUrl,
    "name": "Free Streaming - Watch Movies, TV Shows, Live Sports & News Online",
    "isPartOf": {
      "@id": `${baseUrl}/#website`
    },
    "datePublished": "2024-01-01T00:00:00+00:00",
    "dateModified": currentDate,
    "description": "Watch free movies, TV shows, live sports and news channels online. No registration or subscription required. HD quality streaming on all devices.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        }
      ]
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Free Streaming really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Free Streaming is 100% free. No registration required, no subscription fees, no hidden charges. Simply visit our website during stream times and watch."
        }
      },
      {
        "@type": "Question",
        "name": "What devices can I use to watch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can watch on any device with a web browser - smartphones, tablets, laptops, desktop computers, and smart TVs. No app installation needed."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No account creation is required. Our service is completely anonymous and free to use without any sign-up process."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Free Streaming - Watch Movies, TV Shows, Live Sports & News Online</title>
        <meta name="description" content="Watch free movies, TV shows, live sports and news channels online. No registration or subscription required. HD quality streaming on all devices." />
        <meta name="keywords" content="free movies, free streaming, watch movies online, HD movies, TV shows, live sports, news streaming, free cinema, online movies, streaming movies, watch TV online" />
        <link rel="canonical" href={baseUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free Streaming - Watch Movies, TV Shows, Live Sports & News Online" />
        <meta property="og:description" content="Watch free movies, TV shows, live sports and news channels online. No registration or subscription required. HD quality streaming on all devices." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Free Streaming" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={currentDate} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Streaming - Watch Movies, TV Shows, Live Sports & News Online" />
        <meta name="twitter:description" content="Watch free movies, TV shows, live sports and news channels online. No registration or subscription required." />
        <meta name="twitter:image" content={`${baseUrl}/twitter-image.jpg`} />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        {/* HERO SECTION */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Watch <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Movies, TV Shows</span> & News Live Online
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                100% Free Streaming with scheduled showtimes. No registration, no subscription fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/schedule" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-blue-500/30"
                >
                  View Full Schedule
                </Link>
                <Link 
                  href="/player/bbc-news-channel-hd" 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-gray-700"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaPlayCircle /> Watch Live Now
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose <span className="text-blue-400">Free Streaming</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Experience premium streaming without the price tag
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TODAY'S SCHEDULE SECTION */}
        <section className="py-16 bg-gray-900/40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Today's <span className="text-blue-400">Live Schedule</span>
                </h2>
                <p className="text-gray-300">
                  Click "Watch Live" during stream times. All times in GMT.
                </p>
              </div>
              <Link 
                href="/schedule" 
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaCalendarAlt />
                View Full Schedule
              </Link>
            </div>

            {todaysShows.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todaysShows.slice(0, 6).map((show) => (
                  <div 
                    key={show.id} 
                    className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
                  >
                    <div className="relative h-52">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                      <Image 
                        src={getImageUrl(show.image)}
                        alt={show.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold z-20">
                        {show.time}
                      </div>
                      {show.category === 'Adult' && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1 z-20">
                          <FaExclamationTriangle /> 18+
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {show.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-blue-400" />
                          <span>{show.time} GMT</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaFilm className="text-green-400" />
                          <span className="truncate">
                            {Array.isArray(show.genre) ? show.genre.slice(0, 2).join(", ") : show.genre}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {show.description || "Watch this exciting content now."}
                      </p>
                      
                      <div className="flex gap-2">
                        <Link 
                          href={`/schedules/${show.id}`}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium text-center transition-colors"
                        >
                          View Details
                        </Link>
                        <Link 
                          href={`/player/${show.id}`}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                            show.isLive 
                              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
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
              <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Shows Scheduled Today</h3>
                <p className="text-gray-400 mb-6">Check the full schedule for upcoming shows and events</p>
                <Link href="/schedule" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg">
                  View Full Schedule
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How It <span className="text-blue-400">Works</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Three simple steps to enjoy free live streaming
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-5">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG POSTS SECTION */}
        {latestPosts.length > 0 && (
          <section className="py-16 bg-gray-900/40">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Latest <span className="text-blue-400">Streaming News</span>
                  </h2>
                  <p className="text-gray-300">Guides, updates, and news for streaming enthusiasts</p>
                </div>
                <Link 
                  href="/blog" 
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2"
                >
                  Read All Articles <FaArrowRight />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <div key={post.slug} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                    <div className="relative h-48">
                      <Image 
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-blue-400 text-sm mb-2 font-medium">{post.date}</p>
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                      >
                        Read Full Article <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-gray-700">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready for <span className="text-blue-400">Live Streaming?</span>
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Visit the player page during scheduled times to watch live streaming in HD quality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/schedule" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-blue-500/30"
                >
                  View Schedule
                </Link>
                <Link 
                  href="/player/bbc-news-channel-hd" 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-gray-600"
                >
                  Go to Live Player
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const today = new Date().toISOString().split('T')[0];
  
  // Filter today's shows
  const todaysShows = schedule.shows.filter(show => show.date === today);
  
  // Get latest 3 posts for homepage
  const latestPosts = postsData.posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return {
    props: {
      todaysShows,
      latestPosts,
    },
    // Re-generate homepage every 10 minutes
    revalidate: 600,
  };
}