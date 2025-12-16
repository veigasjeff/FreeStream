// import Head from 'next/head';
// import Link from 'next/link';
// import postsData from '../../data/posts.json';
// import Image from 'next/image';

// export default function BlogIndex() {
//   const baseUrl = "https://freestreaming.vercel.app"; // CHANGE THIS

//   // Helper to fix image paths
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '/images/default-movie.jpg';
//     if (imagePath.startsWith('http')) return imagePath;
//     return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
//   };

//   // Schema for the blog collection
//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "headline": "Movie News & Streaming Guides",
//     "description": "Read the latest news, updates, and streaming guides for movies and TV shows.",
//     "url": `${baseUrl}/blog`,
//     "mainEntity": {
//       "@type": "ItemList",
//       "itemListElement": postsData.posts.map((post, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "url": `${baseUrl}/blog/${post.slug}`,
//         "name": post.title
//       }))
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Movie Streaming Guides & News | Free Streaming Blog</title>
//         <meta name="description" content="Latest updates, how-to guides, and news about free movie streaming online. Read our articles to find out how to watch your favorite films." />
//         <link rel="canonical" href={`${baseUrl}/blog`} />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
//       </Head>

//       <div className="min-h-screen bg-black text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16 pt-10">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
//               Streaming Guides & News
//             </h1>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               Tips, tricks, and guides on how to watch the latest movies online for free.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {postsData.posts.map((post) => (
//               <article key={post.slug} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 flex flex-col h-full group">
//                 <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
//                   <div className="relative h-56 w-full bg-gray-800 overflow-hidden">
//                      <Image 
//                        src={getImageUrl(post.image)} 
//                        alt={post.title}
//                        fill
//                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
//                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                      />
//                   </div>
//                   <div className="p-6 flex flex-col flex-grow">
//                     <div className="flex justify-between items-center mb-3">
//                       <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Guide</span>
//                       <span className="text-xs text-gray-500">{post.date}</span>
//                     </div>
//                     <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">
//                       {post.title}
//                     </h2>
//                     <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
//                       {post.excerpt}
//                     </p>
//                     <span className="text-white font-bold text-sm uppercase tracking-wide flex items-center mt-auto group-hover:underline">
//                       Read Article <span className="ml-2 text-red-500">&rarr;</span>
//                     </span>
//                   </div>
//                 </Link>
//               </article>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }










import Head from 'next/head';
import Link from 'next/link';
import postsData from '../../data/posts.json';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function BlogIndex() {
  const baseUrl = "https://freestreaming.vercel.app"; // CHANGE THIS

  // --- INFINITE SCROLL STATE ---
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  
  const POSTS_PER_PAGE = 6; // Load 6 posts at a time

  // --- INITIAL LOAD ---
  useEffect(() => {
    // Load first batch immediately
    setDisplayedPosts(postsData.posts.slice(0, POSTS_PER_PAGE));
    if (postsData.posts.length <= POSTS_PER_PAGE) {
      setHasMore(false);
    }
  }, []);

  // --- SCROLL HANDLER ---
  const loadMorePosts = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate network delay for smooth UX (optional, remove setTimeout for instant load)
    setTimeout(() => {
      const currentLength = displayedPosts.length;
      const nextBatch = postsData.posts.slice(currentLength, currentLength + POSTS_PER_PAGE);
      
      if (nextBatch.length > 0) {
        setDisplayedPosts(prev => [...prev, ...nextBatch]);
      }

      if (currentLength + nextBatch.length >= postsData.posts.length) {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 800); 
  };

  // --- INTERSECTION OBSERVER FOR SCROLL TRIGGER ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 } // Trigger when loader is fully visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [displayedPosts, hasMore, isLoading]);

  // Helper to fix image paths
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/default-movie.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  // Schema for the blog collection
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": "Movie News & Streaming Guides",
    "description": "Read the latest news, updates, and streaming guides for movies and TV shows.",
    "url": `${baseUrl}/blog`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": postsData.posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}/blog/${post.slug}`,
        "name": post.title
      }))
    }
  };

  return (
    <>
      <Head>
        <title>Movie Streaming Guides & News | Free Streaming Blog</title>
        <meta name="description" content="Latest updates, how-to guides, and news about free movie streaming online. Read our articles to find out how to watch your favorite films." />
        <link rel="canonical" href={`${baseUrl}/blog`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </Head>

      <div className="min-h-screen bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 pt-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
              Streaming Guides & News
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tips, tricks, and guides on how to watch the latest movies online for free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <article key={post.slug} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 flex flex-col h-full group animate-fadeIn">
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-56 w-full bg-gray-800 overflow-hidden">
                     <Image 
                       src={getImageUrl(post.image)} 
                       alt={post.title}
                       fill
                       className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Guide</span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="text-white font-bold text-sm uppercase tracking-wide flex items-center mt-auto group-hover:underline">
                      Read Article <span className="ml-2 text-red-500">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* --- LOADING INDICATOR & TRIGGER --- */}
          <div ref={loaderRef} className="py-12 text-center">
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-3">
                <FaSpinner className="animate-spin text-4xl text-red-600" />
                <p className="text-gray-400 text-sm animate-pulse">Loading more articles...</p>
              </div>
            )}
            
            {!hasMore && displayedPosts.length > 0 && (
              <p className="text-gray-600 text-sm mt-8">You've reached the end of the list.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}