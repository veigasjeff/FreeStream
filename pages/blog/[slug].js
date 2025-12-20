import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import postsData from "../../data/posts.json";
import schedule from "../../data/schedules.json";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaTag,
  FaArrowLeft,
  FaShareAlt,
  FaBookOpen,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaLink
} from "react-icons/fa";

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
import { useState } from 'react';

export default function BlogPost({ post, relatedMovie, recentPosts }) {
  const router = useRouter();
  const baseUrl = "https://freestreaming.vercel.app";
  const currentUrl = `${baseUrl}/blog/${post.slug}`;
  
  // Share state
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Format dates properly for SEO
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  // Share functions
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `${post.title} - Read this article on Free Streaming Blog`;
  const shareTitle = `${post.title} | Free Streaming Blog`;
  const imageUrl = `${baseUrl}/${post.image}`;

  // Article Schema for Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${currentUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}/${post.image}`,
    author: {
      "@type": "Organization",
      name: "Free Streaming",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Free Streaming",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: formatDate(post.date),
    dateModified: formatDate(post.date),
    articleBody: post.content,
    articleSection: post.category || "Streaming Guides",
    keywords: post.keywords,
    wordCount: post.content.split(" ").length,
    timeRequired: `PT${Math.ceil(post.content.split(" ").length / 200)}M`,
    thumbnailUrl: `${baseUrl}/${post.image}`,
    inLanguage: "en-US",
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: currentUrl,
      },
    ],
  };

  // Share article
  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: currentUrl,
      });
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <>
      <Head>
        <title>{post.title} | Free Streaming Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={`${baseUrl}/${post.image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Free Streaming" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="article:published_time"
          content={formatDate(post.date)}
        />
        <meta
          property="article:modified_time"
          content={formatDate(post.date)}
        />
        <meta property="article:author" content="Free Streaming" />
        <meta
          property="article:section"
          content={post.category || "Streaming Guides"}
        />
        {post.keywords &&
          post.keywords
            .split(",")
            .map((tag, idx) => (
              <meta key={idx} property="article:tag" content={tag.trim()} />
            ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`${baseUrl}/${post.image}`} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Share This Article</h3>
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
                    src={`/${post.image}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{post.title}</h4>
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
                hashtag="#FreeStreamingBlog"
                className="flex flex-col items-center gap-2"
              >
                <FacebookIcon size={48} round />
                <span className="text-xs text-gray-300">Facebook</span>
              </FacebookShareButton>
              
              <TwitterShareButton 
                url={currentUrl}
                title={shareText}
                hashtags={["FreeStreaming", "Blog"]}
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
              
              <LinkedinShareButton 
                url={currentUrl}
                title={shareText}
                summary={post.excerpt}
                source="Free Streaming"
                className="flex flex-col items-center gap-2"
              >
                <LinkedinIcon size={48} round />
                <span className="text-xs text-gray-300">LinkedIn</span>
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href="/blog"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Blog
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white truncate max-w-xs md:max-w-md">
              {post.title}
            </span>
          </div>
        </nav>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Article Header */}
              <header className="mb-8">
                {post.category && (
                  <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                    {post.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <time dateTime={formatDate(post.date)}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span>Free Streaming Team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>
                      {Math.ceil(post.content.split(" ").length / 200)} min read
                    </span>
                  </div>
                  <button
                    onClick={shareArticle}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    <FaShareAlt /> Share
                  </button>
                </div>
              </header>

              {/* Featured Image */}
              <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-8 border border-gray-700">
                <Image
                  src={`/${post.image}`}
                  alt={post.title}
                  fill
                  quality={90}
                  style={{
                    filter:
                      "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)",
                  }}
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg prose-invert max-w-none mb-12">
                {post.content.split("\n\n").map((paragraph, idx) => (
                  <div key={idx} className="mb-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>

              {/* Related Movie CTA */}
              {relatedMovie && (
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 mb-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FaBookOpen /> Want to Watch This Movie?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    We're streaming <strong>{relatedMovie.title}</strong> for
                    free in HD quality. No registration or subscription
                    required.
                  </p>
                  <Link
                    href={`/schedules/${relatedMovie.id}`}
                    className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                  >
                    Watch {relatedMovie.title} Now
                  </Link>
                </div>
              )}

              {/* Quick Share Section */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaShareAlt /> Share This Article
                </h3>
                <div className="flex flex-wrap gap-3">
                  <FacebookShareButton 
                    url={currentUrl} 
                    quote={shareText}
                    hashtag="#FreeStreamingBlog"
                    className="transition-transform hover:scale-110"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  
                  <TwitterShareButton 
                    url={currentUrl}
                    title={shareText}
                    hashtags={["FreeStreaming", "Blog"]}
                    className="transition-transform hover:scale-110"
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  
                  <WhatsappShareButton 
                    url={currentUrl}
                    title={shareText}
                    separator=" - "
                    className="transition-transform hover:scale-110"
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  
                  <TelegramShareButton 
                    url={currentUrl}
                    title={shareText}
                    className="transition-transform hover:scale-110"
                  >
                    <TelegramIcon size={40} round />
                  </TelegramShareButton>
                  
                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition-all hover:scale-110"
                    title="Copy link"
                  >
                    <FaLink className="text-white" />
                  </button>
                </div>
                {copied && (
                  <div className="mt-2 text-sm text-green-400 animate-pulse">
                    ✓ Link copied to clipboard!
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center py-8 border-t border-gray-800">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  <FaArrowLeft /> Back to Blog
                </Link>
                <button
                  onClick={shareArticle}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  <FaShareAlt /> Share Article
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-8">
                {/* About */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">About This Blog</h3>
                  <p className="text-gray-300 mb-4">
                    We provide expert guides and latest updates on free movie
                    streaming. Learn how to watch your favorite films legally
                    and in HD quality.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    Visit Homepage →
                  </Link>
                </div>

                {/* Social Share Widget */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Share This Article</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <FacebookShareButton 
                      url={currentUrl} 
                      quote={shareText}
                      hashtag="#FreeStreamingBlog"
                      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <FacebookIcon size={40} round />
                      <span className="text-xs text-gray-300">Facebook</span>
                    </FacebookShareButton>
                    
                    <TwitterShareButton 
                      url={currentUrl}
                      title={shareText}
                      hashtags={["FreeStreaming", "Blog"]}
                      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <TwitterIcon size={40} round />
                      <span className="text-xs text-gray-300">Twitter</span>
                    </TwitterShareButton>
                    
                    <WhatsappShareButton 
                      url={currentUrl}
                      title={shareText}
                      separator=" - "
                      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <WhatsappIcon size={40} round />
                      <span className="text-xs text-gray-300">WhatsApp</span>
                    </WhatsappShareButton>
                    
                    <TelegramShareButton 
                      url={currentUrl}
                      title={shareText}
                      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <TelegramIcon size={40} round />
                      <span className="text-xs text-gray-300">Telegram</span>
                    </TelegramShareButton>
                    
                    <LinkedinShareButton 
                      url={currentUrl}
                      title={shareText}
                      summary={post.excerpt}
                      source="Free Streaming"
                      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <LinkedinIcon size={40} round />
                      <span className="text-xs text-gray-300">LinkedIn</span>
                    </LinkedinShareButton>
                    
                    <button
                      onClick={handleCopyLink}
                      className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                      title="Copy link"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full">
                        <FaLink className="text-white" />
                      </div>
                      <span className="text-xs text-gray-300">Copy Link</span>
                    </button>
                  </div>
                  {copied && (
                    <div className="mt-3 text-center text-sm text-green-400 animate-pulse">
                      ✓ Link copied to clipboard!
                    </div>
                  )}
                </div>

                {/* Recent Posts */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Articles</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.slug}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                      >
                        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-medium group-hover:text-blue-400 transition-colors line-clamp-2">
                              {recentPost.title}
                            </h4>
                            <p className="text-gray-400 text-sm mt-1">
                              {new Date(recentPost.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                {post.keywords && (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FaTag /> Article Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.keywords
                        .split(",")
                        .slice(0, 10)
                        .map((keyword, idx) => (
                          <span
                            key={idx}
                            className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                          >
                            {keyword.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// Generate all static paths for blog posts
export async function getStaticPaths() {
  const paths = postsData.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking", // Better for SEO than 'false'
  };
}

// Pre-render each blog post at build time
export async function getStaticProps({ params }) {
  const post = postsData.posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Get related movie
  const relatedMovie = post.relatedMovieId
    ? schedule.shows.find((s) => s.id === post.relatedMovieId)
    : null;

  // Get recent posts (excluding current)
  const recentPosts = postsData.posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return {
    props: {
      post,
      relatedMovie,
      recentPosts,
    },
    // Re-generate page every hour
    revalidate: 3600,
  };
}