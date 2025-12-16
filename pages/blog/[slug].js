// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import postsData from '../../data/posts.json';
// import schedule from '../../data/schedules.json';

// export default function BlogPost({ post, relatedMovie }) {
//   const baseUrl = "https://freestreaming.vercel.app"; // CHANGE THIS
//   const currentUrl = `${baseUrl}/blog/${post.slug}`;

//   const articleSchema = {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     "headline": post.title,
//     "description": post.excerpt,
//     "image": `${baseUrl}/${post.image}`,
//     "author": {
//       "@type": "Organization",
//       "name": "Free Streaming Team"
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "Free Streaming",
//       "logo": {
//         "@type": "ImageObject",
//         "url": `${baseUrl}/logo.png`
//       }
//     },
//     "datePublished": post.date,
//     "articleBody": post.content
//   };

//   return (
//     <>
//       <Head>
//         <title>{post.title}</title>
//         <meta name="description" content={post.excerpt} />
//         <link rel="canonical" href={currentUrl} />
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
//       </Head>

//       <div className="min-h-screen bg-black text-white pt-24 pb-12">
//         <article className="container mx-auto px-4 max-w-4xl">
//           <div className="mb-8">
//             <Link href="/blog" className="text-gray-400 hover:text-white mb-4 block">&larr; Back to Blog</Link>
//             <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
//             <p className="text-gray-400 border-b border-gray-800 pb-8">Published on {post.date}</p>
//           </div>

//           <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
//              <Image 
//                src={`/${post.image}`} 
//                alt={post.title}
//                fill
//                className="object-cover"
//                priority
//                quality={90}
//                style={{
//                   filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)',
//                 }}
             
//              />
//           </div>

//           <div className="prose prose-invert prose-lg max-w-none mb-12">
//             {/* Rendering content - split by newlines for basic paragraphs */}
//             {post.content.split('\n').map((paragraph, idx) => (
//               <p key={idx} className="mb-4 text-gray-300 leading-relaxed">
//                 {paragraph}
//               </p>
//             ))}
//           </div>

//           {/* Call to Action - Link to the Movie Page */}
//           {relatedMovie && (
//             <div className="bg-gradient-to-r from-red-900 to-black border border-red-700 p-8 rounded-xl text-center my-12">
//               <h3 className="text-2xl font-bold mb-4">Want to watch {relatedMovie.title} Click Below Now </h3>
//               <p className="mb-6 text-gray-300">We are streaming this movie for free in HD quality. No sign-up required.</p>
//               <Link 
//                 href={`/player/${relatedMovie.id}`}
//                 className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-full transition-transform transform hover:scale-105"
//               >
//                 Watch {relatedMovie.title} Now
//               </Link>
//             </div>
//           )}
//         </article>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = postsData.posts.map((post) => ({ params: { slug: post.slug } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const post = postsData.posts.find((p) => p.slug === params.slug);
//   // Find the related movie data to link back
//   const relatedMovie = post.relatedMovieId 
//     ? schedule.shows.find(s => s.id === post.relatedMovieId) 
//     : null;

//   if (!post) return { notFound: true };
//   return { props: { post, relatedMovie: relatedMovie || null }, revalidate: 60 };
// }












import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import postsData from '../../data/posts.json';
import schedule from '../../data/schedules.json';

export default function BlogPost({ post, relatedMovie }) {
  const baseUrl = "https://freestreaming.vercel.app"; // CHANGE THIS
  const currentUrl = `${baseUrl}/blog/${post.slug}`;

  // Robust Article Schema for Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${baseUrl}/${post.image}`,
    "author": {
      "@type": "Organization",
      "name": "Free Streaming Team",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Free Streaming",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": post.date,
    "dateModified": new Date().toISOString(), // Always shows fresh content
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "articleBody": post.content
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={currentUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <div className="min-h-screen bg-black text-white pt-24 pb-12">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link> &gt; 
            <Link href="/blog" className="hover:text-white mx-1">Blog</Link> &gt; 
            <span className="text-white mx-1 truncate">{post.title}</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-gray-400 border-b border-gray-800 pb-8">Published on {post.date}</p>
          </div>

          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
             <Image 
               src={`/${post.image}`} 
               alt={post.title}
               fill
               className="object-cover"
               priority
               quality={90}
               style={{
                  filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)',
                }}
             />
          </div>

          <div className="prose prose-invert prose-lg max-w-none mb-12">
            {/* Rendering content - split by newlines for basic paragraphs */}
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-gray-300 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

    <div className="text-center mt-8 md:mt-12">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <span className="gradient-text">
                      ← Back to Blog
                    </span>
                  </Link>
                </div>
          {/* DYNAMIC CALL TO ACTION - LINKS TO PLAYER */}
          {relatedMovie && (
            <div className="bg-gradient-to-br from-red-900/40 to-black border border-red-600/50 p-8 rounded-2xl text-center my-12 shadow-red-900/20 shadow-lg transform transition-all hover:scale-[1.01]">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                <span className="gradient-text"> Want to watch {relatedMovie.title} ? </span> 
              </h3>
              <p className="mb-8 text-gray-300 text-lg">
                Click Below Now. We are streaming this movie for free in HD quality. No sign-up required.
              </p>
              
              <Link 
                href={`/schedules/${relatedMovie.id}`}
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/50 group"
              >
                <span>Watch {relatedMovie.title} Now</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </Link>
            </div>
          )}
        </article>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = postsData.posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = postsData.posts.find((p) => p.slug === params.slug);
  
  // Find the related movie data to link back
  // This logic is crucial: it looks for the ID in schedules.json that matches relatedMovieId in posts.json
  const relatedMovie = post && post.relatedMovieId 
    ? schedule.shows.find(s => s.id === post.relatedMovieId) 
    : null;

  if (!post) return { notFound: true };
  
  return { 
    props: { 
      post, 
      relatedMovie: relatedMovie || null 
    }, 
    revalidate: 60 
  };
}