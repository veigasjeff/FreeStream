import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import postsData from "../../data/posts.json";
import { FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";

export default function BlogIndex({ posts }) {
  const baseUrl = "https://freestreaming.vercel.app";

  // Blog collection schema for SEO
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/blog/#collectionpage`,
    url: `${baseUrl}/blog`,
    name: "Movie Streaming Guides & News",
    description:
      "Latest updates, how-to guides, and news about free movie streaming online.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          "@id": `${baseUrl}/blog/${post.slug}`,
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: "Free Streaming",
          },
        },
      })),
    },
    publisher: {
      "@type": "Organization",
      name: "Free Streaming",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  // Breadcrumb schema
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
    ],
  };

  return (
    <>
      <Head>
        <title>Movie Streaming Guides & News | Free Streaming Blog</title>
        <meta
          name="description"
          content="Latest updates, how-to guides, and news about free movie streaming online. Read our articles to find out how to watch your favorite films."
        />
        <meta
          name="keywords"
          content="movie guides, streaming news, watch movies online, free streaming tips, movie reviews, streaming updates"
        />
        <link rel="canonical" href={`${baseUrl}/blog`} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Movie Streaming Guides & News | Free Streaming Blog"
        />
        <meta
          property="og:description"
          content="Latest updates, how-to guides, and news about free movie streaming online."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/blog`} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="Movie Streaming Guides & News | Free Streaming Blog"
        />
        <meta
          name="twitter:description"
          content="Latest updates, how-to guides, and news about free movie streaming online."
        />
        <meta name="twitter:image" content={`${baseUrl}/twitter-image.jpg`} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Breadcrumb Navigation */}
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">Blog</span>
          </div>
        </nav>

        {/* Header */}
        <header className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Streaming Guides & News
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Expert tips, latest updates, and comprehensive guides to help you
            enjoy free streaming
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-blue-900/50 border border-blue-700 rounded-full text-sm flex items-center gap-2">
              <FaTag /> Streaming Tips
            </span>
            <span className="px-4 py-2 bg-purple-900/50 border border-purple-700 rounded-full text-sm flex items-center gap-2">
              <FaTag /> Movie Reviews
            </span>
            <span className="px-4 py-2 bg-red-900/50 border border-red-700 rounded-full text-sm flex items-center gap-2">
              <FaTag /> How-To Guides
            </span>
          </div>
        </header>

        {/* Blog Posts Grid */}
        <main className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 group"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={`/${post.image}`}
                      alt={post.title}
                      fill
                      quality={90}
                      style={{
                        filter:
                          "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)",
                        objectFit: "cover",
                      }}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    {post.category && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold">
                        {post.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser /> Free Streaming Team
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Keywords */}
                    {post.keywords && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {post.keywords
                            .split(",")
                            .slice(0, 3)
                            .map((keyword, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                              >
                                {keyword.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <span className="text-blue-400 font-medium group-hover:underline">
                        Read Full Article
                      </span>
                      <span className="text-gray-400 text-sm">
                        {post.content.split(" ").length / 200} min read
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Showing {posts.length} of {postsData.posts.length} articles
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg mt-6 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

// IMPORTANT: This pre-renders the page at build time
export async function getStaticProps() {
  // Sort posts by date, newest first
  const sortedPosts = [...postsData.posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return {
    props: {
      posts: sortedPosts,
    },
    // Re-generate page every hour
    revalidate: 3600,
  };
}
