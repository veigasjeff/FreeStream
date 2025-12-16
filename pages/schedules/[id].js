import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import schedule from "../../data/schedules.json";
import postsData from "../../data/posts.json";
import YouTubePlayer from "../../components/YouTubePlayer";
import { FaClock, FaCalendar, FaPlayCircle, FaShareAlt } from "react-icons/fa";

export default function ShowPage({ show, relatedPost }) {
  const baseUrl = "https://freestreaming.vercel.app"; // CHANGE TO YOUR DOMAIN
  const currentUrl = `${baseUrl}/schedules/${show.id}`;

  // STRICT ARTICLE SCHEMA FOR GOOGLE INDEXING
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    headline: `Watch ${show.title} Full Movie Online Free - Live Streaming`,
    description: show.description,
    image: `${baseUrl}/${show.image}`,
    author: {
      "@type": "Organization",
      name: "Free Streaming",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Free Streaming",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: show.date
      ? new Date(show.date).toISOString()
      : new Date().toISOString(),
    dateModified: new Date().toISOString(),
    articleBody: `${show.title} is a ${show.genre.join(
      ", "
    )} movie released in ${show.year}. ${show.description} Directed by ${
      Array.isArray(show.director) ? show.director.join(", ") : show.director
    }. Cast includes ${show.cast.join(", ")}. Watch it live on our platform.`,
    keywords: show.keywords,
  };

  return (
    <>
      <Head>
        <title>{`Watch ${show.title} (${show.year}) Online Free | Free Streaming`}</title>
        <meta
          name="description"
          content={`Stream ${
            show.title
          } online for free. ${show.description.substring(
            0,
            100
          )}... Watch in HD without registration.`}
        />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={`Watch ${show.title} Free Online`} />
        <meta property="og:description" content={show.description} />
        <meta property="og:image" content={`${baseUrl}/${show.image}`} />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white pb-20">
        {/* Breadcrumbs for SEO */}
        <div className="container mx-auto px-4 py-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          &gt;
          <Link href="/schedule" className="hover:text-primary mx-1">
            Movies
          </Link>{" "}
          &gt;
          <span className="text-white mx-1">{show.title}</span>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {show.title}
              </h1>

              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-8 border border-gray-800 shadow-2xl">
                <YouTubePlayer videoId={show.youtubeid} title={show.title} />
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <div className="flex flex-wrap gap-4 mb-6">
                  <Link
                    href={`/player/${show.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105"
                  >
                    <FaPlayCircle size={20} /> WATCH LIVE STREAM
                  </Link>
                  <div className="flex items-center gap-2 text-gray-300 bg-gray-800 px-4 py-3 rounded-full">
                    <FaClock className="text-primary" /> {show.time}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-primary">
                  Movie Synopsis
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {show.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="text-gray-500 block mb-1">Director</span>
                    <span className="text-white font-semibold">
                      {Array.isArray(show.director)
                        ? show.director.join(", ")
                        : show.director}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Cast</span>
                    <span className="text-white font-semibold">
                      {show.cast.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Genre</span>
                    <span className="text-white font-semibold">
                      {show.genre.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">
                      Release Year
                    </span>
                    <span className="text-white font-semibold">
                      {show.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Related Blog Post Link - SEO Goldmine */}
              {relatedPost && (
                <div className="mt-8 bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-2">
                    Read More About This Movie
                  </h3>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="text-blue-400 hover:text-blue-300 hover:underline text-lg"
                  >
                    {relatedPost.title} &rarr;
                  </Link>
                  <p className="text-gray-400 mt-2 text-sm">
                    {relatedPost.excerpt}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 p-6 rounded-xl sticky top-4">
                <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
                  Streaming Schedule
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-black/50 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-gray-400">Stream Date</p>
                    <p className="font-bold">{show.date}</p>
                  </div>
                  <div className="p-4 bg-black/50 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm text-gray-400">Stream Time</p>
                    <p className="font-bold">{show.time}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {show.keywords
                      .split(",")
                      .slice(0, 10)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="text-center mt-8 md:mt-12">
                  <Link
                    href="/schedule"
                    className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <span className="gradient-text">
                      ← Back to Full Schedule
                    </span>
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
  const paths = schedule.shows.map((show) => ({ params: { id: show.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find((s) => s.id === params.id);
  // Find related blog post if exists
  const relatedPost =
    postsData.posts.find((p) => p.relatedMovieId === show?.id) || null;

  if (!show) return { notFound: true };
  return { props: { show, relatedPost }, revalidate: 60 };
}
