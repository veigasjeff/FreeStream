// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log('🚀 MOVIE PAGE GENERATOR - ES MODULE VERSION');
// console.log('===========================================\n');

// // Read data.json
// const rawData = fs.readFileSync('data.json', 'utf8');
// const data = JSON.parse(rawData);
// const movies = data.movies;

// console.log(`📊 Found ${movies.length} movies to process\n`);

// // Create movies directory
// const moviesDir = 'movies';
// if (!fs.existsSync(moviesDir)) {
//     fs.mkdirSync(moviesDir, { recursive: true });
// }

// // Function to fix poster URL path
// function fixPosterUrl(posterUrl) {
//     if (posterUrl.startsWith('http://') || posterUrl.startsWith('https://')) {
//         return posterUrl;
//     }
    
//     if (posterUrl.startsWith('../public/')) {
//         return '/public/' + posterUrl.replace('../public/', '');
//     }
    
//     if (posterUrl.startsWith('public/')) {
//         return '/' + posterUrl;
//     }
    
//     if (!posterUrl.includes('/')) {
//         return '/public/' + posterUrl;
//     }
    
//     return posterUrl;
// }

// // Function to escape HTML for onerror attribute
// function escapeForOnError(html) {
//     return html
//         .replace(/\\/g, '\\\\')
//         .replace(/'/g, "\\'")
//         .replace(/"/g, '\\"')
//         .replace(/\n/g, '')
//         .replace(/\r/g, '');
// }

// // Function to generate complete movie page
// function generateMoviePage(movie) {
//     const rating = movie.ratingCount > 0 ? 
//         (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
    
//     const year = new Date(movie.timestamp * 1000).getFullYear();
//     const dateString = new Date(movie.timestamp * 1000).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });
    
//     // Get available streams
//     const streams = [
//         { name: 'Server 1', url: movie.streamUrl },
//         { name: 'Server 2', url: movie.stream2Url },
//         { name: 'Server 3', url: movie.stream3Url },
//         { name: 'Server - Hindi Dubbed', url: movie.stream4Url }
//     ].filter(stream => stream.url && stream.url.trim() !== '');
    
//     const hasYoutube = movie.playUrl && movie.playUrl.trim() !== '';
    
//     // Get similar movies
//     const similarMovies = movies
//         .filter(m => m.id !== movie.id && m.genre === movie.genre)
//         .slice(0, 6);
    
//     // Get cast images or use fallback SVG
//     const castImages = movie.castimage || [];
    
//     // Fix poster URL - ensure it's correct
//     const posterUrl = fixPosterUrl(movie.poster);
    
//     // Modern user icon SVG for fallback
//     const userIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
//   <circle cx="64" cy="64" r="60" fill="#e50914" opacity="0.08"/>
//   <circle cx="64" cy="44" r="18" fill="#e50914"/>
//   <path d="M28 108c0-20 18-32 36-32s36 12 36 32" fill="#e50914"/>
// </svg>`;
    
//     // Prepare escaped versions
//     const escapedUserIconSVG = escapeForOnError(userIconSVG);
    
//     // Start building HTML
//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="mobile-web-app-capable" content="yes">
//     <meta name="apple-mobile-web-app-capable" content="yes">
//     <meta name="robots" content="index,follow,archive,snippet,imageindex">

//     <title>Watch ${movie.title} Online Free | FreeStream</title>
//     <meta name="description" content="${movie.description.replace(/"/g, '&quot;')}">
//     <meta name="keywords" content="${movie.keywords}">
    
//     <!-- Open Graph -->
//     <meta property="og:title" content="Watch ${movie.title} Online Free">
//     <meta property="og:description" content="${movie.description.replace(/"/g, '&quot;')}">
//     <meta property="og:image" content="${posterUrl}">
//     <meta property="og:url" content="https://freestreaming.vercel.app/movies/${movie.id}/">
//     <meta property="og:type" content="video.movie">
    
//     <!-- Twitter -->
//     <meta name="twitter:card" content="summary_large_image">
//     <meta name="twitter:title" content="${movie.title}">
//     <meta name="twitter:description" content="${movie.description.replace(/"/g, '&quot;')}">
//     <meta name="twitter:image" content="${posterUrl}">
//      <!-- Icons -->
//      <link rel="icon" href="https://freestreaming.vercel.app/public/favicon.ico" />
//      <link rel="apple-touch-icon" sizes="180x180" href="https://freestreaming.vercel.app/public/apple-touch-icon.png">
//      <link rel="icon" type="image/png" sizes="32x32" href="https://freestreaming.vercel.app/public/favicon-32x32.png">
//      <link rel="icon" type="image/png" sizes="16x16" href="https://freestreaming.vercel.app/public/favicon-16x16.png">
//      <link rel="manifest" href="https://freestreaming.vercel.app/public/site.webmanifest">
     
//     <!-- Schema.org -->
//     <script type="application/ld+json">
//     {
//         "@context": "https://schema.org",
//         "@type": "Movie",
//         "name": "${movie.title.replace(/"/g, '\\"')}",
//         "description": "${movie.description.replace(/"/g, '\\"')}",
//         "image": "${posterUrl}",
//         "datePublished": "${year}",
//         "genre": "${movie.genre}",
//         "director": "${movie.director.join(', ').replace(/"/g, '\\"')}",
//         "cast": "${movie.cast.join(', ').replace(/"/g, '\\"')}",
//         "aggregateRating": {
//         "@type": "AggregateRating",
//         "ratingValue": "${rating}",
//         "ratingCount": "${movie.ratingCount}",
//         "bestRating": "10",
//         "worstRating": "0"
// }
//     }
//     </script>
    
   

//     <style>
//         /* Reset */
//         * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//         }
        
//         body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background: #0f0f0f;
//             color: white;
//             line-height: 1.6;
//         }
        
//         a {
//             color: inherit;
//             text-decoration: none;
//         }
        
//         button {
//             cursor: pointer;
//             font-family: inherit;
//         }
        
//         img {
//             max-width: 100%;
//             height: auto;
//             display: block;
//         }
        
//         /* Container */
//         .container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 0 20px;
//         }
        
//         /* Header */
//         .site-header {
//             background: rgba(15, 15, 15, 0.95);
//             backdrop-filter: blur(10px);
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             z-index: 1000;
//             padding: 15px 0;
//             border-bottom: 1px solid rgba(255,255,255,0.1);
//         }
        
//         .header-content {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//         }
        
//         .logo {
//             font-size: 24px;
//             font-weight: bold;
//             color: #e50914;
//         }
        
//         .logo i {
//             margin-right: 10px;
//         }
        
//         .back-btn {
//             background: #e50914;
//             color: white;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 4px;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             gap: 8px;
//         }
        
//         /* Movie Hero */
//         .movie-hero {
//             background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('${posterUrl}');
//             background-size: cover;
//             background-position: center;
//             background-repeat: no-repeat;
//             padding: 120px 0 60px;
//             margin-top: 60px;
//             min-height: 600px;
//             display: flex;
//             align-items: center;
//         }
        
//         .movie-grid {
//             display: grid;
//             grid-template-columns: 300px 1fr;
//             gap: 40px;
//             align-items: start;
//         }
        
//         .movie-poster {
//             border-radius: 10px;
//             overflow: hidden;
//             box-shadow: 0 10px 30px rgba(0,0,0,0.5);
//             height: 450px;
//             width: 330px;
//             position: relative;
//             background: #1a1a1a;
//         }
        
//         .movie-poster img {
//             width: 100%;
//             height: 100%;
//             object-fit: fill;
//         }
        
//         .movie-info {
//             padding: 20px 0;
//         }
        
//         .movie-title {
//             font-size: 36px;
//             margin-bottom: 10px;
//             text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
//         }
        
//         .movie-year {
//             color: #999;
//             font-size: 24px;
//         }
        
//         .movie-meta {
//             display: flex;
//             gap: 15px;
//             margin: 20px 0;
//             flex-wrap: wrap;
//         }
        
//         .rating {
//             background: #e50914;
//             color: white;
//             padding: 5px 15px;
//             border-radius: 20px;
//             display: flex;
//             align-items: center;
//             gap: 5px;
//         }
        
//         .genre {
//             background: rgba(255,255,255,0.1);
//             padding: 5px 15px;
//             border-radius: 20px;
//         }
//         .language {
//             background: rgba(29, 5, 248, 1);
//             padding: 5px 15px;
//             border-radius: 20px;
//         }    
        
//         .views {
//             color: #999;
//             display: flex;
//             align-items: center;
//             gap: 5px;
//         }
        
//         /* Action Buttons */
//         .action-buttons {
//             display: flex;
//             gap: 15px;
//             margin: 25px 0;
//             flex-wrap: wrap;
//         }
        
//         .btn {
//             padding: 12px 24px;
//             border-radius: 4px;
//             font-size: 16px;
//             font-weight: 600;
//             cursor: pointer;
//             display: inline-flex;
//             align-items: center;
//             gap: 10px;
//             border: none;
//             transition: all 0.3s ease;
//         }
        
//         .btn-primary {
//             background: #e50914;
//             color: white;
//         }
        
//         .btn-primary:hover {
//             background: #b2070f;
//             transform: translateY(-2px);
//         }
        
//         .btn-secondary {
//             background: rgba(255,255,255,0.1);
//             color: white;
//             border: 1px solid rgba(255,255,255,0.2);
//         }
        
//         .btn-secondary:hover {
//             background: rgba(255,255,255,0.2);
//             transform: translateY(-2px);
//         }
        
//         /* Share Modal */
//         .share-modal {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0,0,0,0.8);
//             display: none;
//             align-items: center;
//             justify-content: center;
//             z-index: 2000;
//         }
        
//         .share-modal.active {
//             display: flex;
//         }
        
//         .share-content {
//             background: #222;
//             padding: 30px;
//             border-radius: 10px;
//             max-width: 400px;
//             width: 90%;
//             text-align: center;
//         }
        
//         .share-buttons {
//             display: flex;
//             gap: 10px;
//             margin: 20px 0;
//             justify-content: center;
//             flex-wrap: wrap;
//         }
        
//         .share-btn {
//             padding: 12px 20px;
//             border-radius: 4px;
//             border: none;
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             font-weight: 600;
//             cursor: pointer;
//         }
        
//         .share-btn.facebook {
//             background: #1877f2;
//             color: white;
//         }
        
//         .share-btn.twitter {
//             background: #1da1f2;
//             color: white;
//         }
        
//         .share-btn.link {
//             background: #333;
//             color: white;
//         }
        
//         .close-share {
//             background: #e50914;
//             color: white;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 4px;
//             cursor: pointer;
//             margin-top: 20px;
//         }
        
//         /* Player Section */
//         .player-section {
//             background: #000;
//             border-radius: 10px;
//             overflow: hidden;
//             margin: 40px 0;
//             display: none;
//         }
        
//         .player-section.active {
//             display: block;
//         }
        
//         .player-header {
//             background: #222;
//             padding: 15px 20px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             border-bottom: 1px solid #333;
//         }
        
//         .close-player {
//             background: #333;
//             color: white;
//             border: none;
//             padding: 8px 16px;
//             border-radius: 4px;
//             cursor: pointer;
//         }
        
//         .video-container {
//             position: relative;
//             padding-bottom: 56.25%;
//             height: 0;
//         }
        
//         /* Video Enhancement Filter - Applied to all video players */
//         .video-container iframe,
//         .video-container .youtube-api-player {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             border: none;
//             /* Video Enhancement Filter */
//             filter: brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg);
//             transition: filter 0.3s ease;
//         }
        
//         /* Hover effect to show original for comparison */
//         .video-container iframe:hover,
//         .video-container .youtube-api-player:hover {
//             filter: brightness(1.15) contrast(1.25) saturate(1.22) hue-rotate(2deg);
//         }
        
//         /* YouTube API Player Container */
//         .youtube-api-player {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//         }
        
//         /* Server list */
//         .server-list {
//             background: #222;
//             padding: 20px;
//             border-top: 1px solid #333;
//         }
        
//         .server-buttons {
//             display: flex;
//             gap: 10px;
//             margin-top: 10px;
//             flex-wrap: wrap;
//         }
        
//         .server-btn {
//             background: #333;
//             color: white;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 4px;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             gap: 8px;
//         }
        
//         .server-btn.active {
//             background: #e50914;
//         }
        
//         /* Movie Content */
//         .movie-content {
//             padding: 40px 0;
//         }
        
//         .synopsis {
//             font-size: 18px;
//             line-height: 1.8;
//             color: #ccc;
//             margin-bottom: 30px;
//         }
        
//         .synopsis-content {
//             margin-top: 15px;
//             white-space: pre-line;
//             line-height: 1.6;
//         }
        
//         .details {
//             background: rgba(255,255,255,0.05);
//             border-radius: 10px;
//             padding: 25px;
//             margin: 30px 0;
//         }
        
//         .detail-row {
//             display: flex;
//             margin-bottom: 15px;
//             padding-bottom: 15px;
//             border-bottom: 1px solid rgba(255,255,255,0.1);
//         }
        
//         .detail-row:last-child {
//             margin-bottom: 0;
//             border-bottom: none;
//         }
        
//         .detail-label {
//             min-width: 120px;
//             color: #999;
//             font-weight: 600;
//         }
        
//         /* Cast */
//         .cast-section {
//             margin: 40px 0;
//         }
        
//         .cast-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
//             gap: 20px;
//             margin-top: 20px;
//         }
        
//         .cast-card {
//             background: rgba(255,255,255,0.05);
//             border-radius: 8px;
//             padding: 15px;
//             text-align: center;
//             transition: transform 0.3s ease;
//         }
        
//         .cast-card:hover {
//             transform: translateY(-5px);
//         }
        
//         .cast-image {
//             width: 140px;
//             height: 140px;
//             border-radius: 50%;
//             object-fit: cover;
//             margin: 0 auto 15px;
//             border: 3px solid #e50914;
//         }
        
//         .cast-svg {
//             width: 140px;
//             height: 140px;
//             margin: 0 auto 15px;
//             border-radius: 50%;
//             overflow: hidden;
//             border: 3px solid #e50914;
//         }
        
//         /* Keywords */
//         .keywords {
//             background: rgba(255,255,255,0.05);
//             border-radius: 10px;
//             padding: 25px;
//             margin: 30px 0;
//         }
        
//         .keyword-list {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 10px;
//             margin-top: 15px;
//         }
        
//         .keyword-tag {
//             background: rgba(255,255,255,0.1);
//             color: #999;
//             padding: 6px 12px;
//             border-radius: 20px;
//             font-size: 14px;
//         }
        
//         /* Similar Movies */
//         .similar-movies {
//             margin: 40px 0;
//             border-top: 1px solid rgba(255,255,255,0.1);
//             padding-top: 40px;
//         }
        
//         .similar-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
//             gap: 20px;
//             margin-top: 20px;
//         }
        
//         .similar-card {
//             background: rgba(255,255,255,0.05);
//             border-radius: 8px;
//             overflow: hidden;
//             transition: transform 0.3s ease;
//         }
        
//         .similar-card:hover {
//             transform: translateY(-5px);
//         }
        
//         .similar-card img {
//             width: 100%;
//             height: 240px;
//             object-fit: cover;
//         }
        
//         .similar-card h4 {
//             padding: 15px;
//             font-size: 16px;
//         }
        
//         /* Footer */
//         .footer {
//             background: rgba(255,255,255,0.05);
//             padding: 40px 0;
//             margin-top: 40px;
//             border-top: 1px solid rgba(255,255,255,0.1);
//         }
        
//         .footer-content {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 30px;
//         }
        
//         .footer-section h3 {
//             margin-bottom: 20px;
//             font-size: 18px;
//         }
        
//         .footer-section a {
//             display: block;
//             color: #999;
//             margin-bottom: 10px;
//         }
        
//         .footer-section a:hover {
//             color: #e50914;
//         }
        
//         .footer-bottom {
//             text-align: center;
//             padding-top: 30px;
//             margin-top: 30px;
//             border-top: 1px solid rgba(255,255,255,0.1);
//             color: #999;
//             font-size: 14px;
//         }
        
//         /* Theme Toggle */
//         .theme-toggle {
//             position: fixed;
//             bottom: 30px;
//             right: 30px;
//             background: #e50914;
//             color: white;
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             border: none;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 20px;
//             cursor: pointer;
//             z-index: 100;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.3);
//         }
        
//         /* Responsive */
//         @media (max-width: 1024px) {
//             .movie-grid {
//                 gap: 30px;
//             }
            
//             .movie-poster {
//                 height: 400px;
//                 width: 250px;
//             }
//         }
        
//         @media (max-width: 768px) {
//             .movie-hero {
//                 padding: 100px 0 40px;
//                 min-height: 500px;
//             }
            
//             .movie-grid {
//                 grid-template-columns: 1fr;
//                 text-align: center;
//             }
            
//             .movie-poster {
//                 height: 400px;
//                 width: 300px;
//                 margin: 0 auto;
//             }
            
//             .movie-title {
//                 font-size: 28px;
//             }
            
//             .movie-meta {
//                 justify-content: center;
//             }
            
//             .action-buttons {
//                 flex-direction: column;
//             }
            
//             .btn {
//                 width: 100%;
//                 justify-content: center;
//             }
            
//             .server-buttons {
//                 flex-direction: column;
//             }
            
//             .server-btn {
//                 width: 100%;
//                 justify-content: center;
//             }
            
//             .cast-grid, .similar-grid {
//                 grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
//             }
            
//             .share-buttons {
//                 flex-direction: column;
//             }
            
//             .share-btn {
//                 width: 100%;
//                 justify-content: center;
//             }
//         }
        
//         @media (max-width: 480px) {
//             .movie-hero {
//                 padding: 80px 0 30px;
//                 min-height: 400px;
//             }
            
//             .movie-poster {
//                 height: 350px;
//                 width: 250px;
//             }
            
//             .movie-title {
//                 font-size: 24px;
//             }
            
//             .movie-meta {
//                 flex-direction: column;
//                 align-items: center;
//                 gap: 10px;
//             }
            
//             .cast-grid, .similar-grid {
//                 grid-template-columns: repeat(2, 1fr);
//             }
            
//             .footer-content {
//                 grid-template-columns: 1fr;
//             }
            
//             .theme-toggle {
//                 bottom: 20px;
//                 right: 20px;
//                 width: 45px;
//                 height: 45px;
//                 font-size: 18px;
//             }
//         }
//     </style>
// </head>
// <body>
//     <!-- Header -->
//     <header class="site-header">
//         <div class="container header-content">
//             <a href="/" class="logo">
//                 <i class="fas fa-play-circle"></i> FreeStream
//             </a>
//             <button class="back-btn" onclick="window.history.back()">
//                 <i class="fas fa-arrow-left"></i> Back to Movies
//             </button>
//         </div>
//     </header>

//     <!-- Share Modal -->
//     <div class="share-modal" id="shareModal">
//         <div class="share-content">
//             <h2>Share "${movie.title}"</h2>
//             <div class="share-buttons">
//                 <button class="share-btn facebook" onclick="shareToFacebook()">
//                     <i class="fab fa-facebook"></i> Facebook
//                 </button>
//                 <button class="share-btn twitter" onclick="shareToTwitter()">
//                     <i class="fab fa-twitter"></i> Twitter
//                 </button>
//                 <button class="share-btn link" onclick="copyLink()">
//                     <i class="fas fa-link"></i> Copy Link
//                 </button>
//             </div>
//             <button class="close-share" onclick="closeShareModal()">
//                 Close
//             </button>
//         </div>
//     </div>

//     <!-- Movie Hero -->
//     <section class="movie-hero">
//         <div class="container">
//             <div class="movie-grid">
//                 <div class="movie-poster">
//                     <img src="${posterUrl}" alt="${movie.title} Poster">
//                 </div>
                
//                 <div class="movie-info">
//                     <h1 class="movie-title">${movie.title}</h1>
                    
//                     <div class="movie-meta">
//                         <span class="rating">
//                             <i class="fas fa-star"></i> ${rating}/10
//                         </span>
//                         <span class="genre">${movie.genre}</span>
//                         <span class="views">
//                             <i class="fas fa-eye"></i> ${movie.views.toLocaleString()} views
//                         </span>
//                         <span class="language">
//                        Original Language :  ${movie.language} 
//                         </span>
//                     </div>
                    
//                     <div class="action-buttons">
//                         <button class="btn btn-primary" onclick="openPlayer()">
//                             <i class="fas fa-play"></i> Watch Now
//                         </button>
                        
//                         ${movie.downloadUrl ? `
//                         <a href="${movie.downloadUrl}" target="_blank" class="btn btn-secondary">
//                             <i class="fas fa-download"></i> Download HD
//                         </a>
//                         ` : ''}
                        
//                         <button class="btn btn-secondary" onclick="openShareModal()">
//                             <i class="fas fa-share-alt"></i> Share
//                         </button>
//                     </div>
                    
//                     <div class="synopsis">
//                         <h3>Synopsis</h3>
//                         <p>${movie.description}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

//     <!-- Player Section -->
//     <section class="player-section" id="playerSection">
//         <div class="player-header">
//             <h3>Now Playing: ${movie.title}</h3>
//             <button class="close-player" onclick="closePlayer()">
//                 <i class="fas fa-times"></i> Close Player
//             </button>
//         </div>
        
//         <div class="video-container">
//             <!-- YouTube API Player Container -->
//             <div id="youtube-player" class="youtube-api-player"></div>
            
//             <!-- Iframe Container for other streams -->
//             <div id="iframe-container" style="display: none;"></div>
//         </div>
        
//         ${streams.length > 0 ? `
//         <div class="server-list">
//             <h4>Available Servers:</h4>
//             <div class="server-buttons">
//                 ${streams.map((stream, index) => `
//                 <button class="server-btn" onclick="loadStream(${index})">
//                     <i class="fas fa-server"></i> ${stream.name}
//                 </button>
//                 `).join('')}
//             </div>
//         </div>
//         ` : ''}
//     </section>

//     <!-- Movie Content -->
//     <section class="movie-content">
//         <div class="container">
//             <div class="synopsis">
//                 <h2>Full Story</h2>
//                 <div class="synopsis-content">${movie.content}</div>
//             </div>
            
//             <div class="details">
//                 <div class="detail-row">
//                     <div class="detail-label">Director:</div>
//                     <div>${movie.director.join(', ')}</div>
//                 </div>
//                 <div class="detail-row">
//                     <div class="detail-label">Cast:</div>
//                     <div>${movie.cast.join(', ')}</div>
//                 </div>
//                 <div class="detail-row">
//                     <div class="detail-label">Released:</div>
//                     <div>${movie.date}</div>
//                 </div>
//                 <div class="detail-row">
//                     <div class="detail-label">Genre:</div>
//                     <div>${movie.genre}</div>
//                 </div>
//             </div>
            
//              <!-- Cast Section -->
//              <div class="cast-section">
//                  <h2>Cast & Crew</h2>
//                  <div class="cast-grid">
//                      ${movie.cast.map((actor, index) => {
//                         const castImage = castImages[index];
                        
//                         if (castImage) {
//                             const fixedCastImage = fixPosterUrl(castImage);
//                             return `
//                             <div class="cast-card">
//                                 <img src="${fixedCastImage}" alt="${actor}" class="cast-image">
//                                 <h4>${actor}</h4>
//                                 <p style="color: #999; font-size: 14px;">Actor</p>
//                             </div>
//                             `;
//                         } else {
//                             return `
//                             <div class="cast-card">
//                                 <div class="cast-svg">${userIconSVG}</div>
//                                 <h4>${actor}</h4>
//                                 <p style="color: #999; font-size: 14px;">Actor</p>
//                             </div>
//                             `;
//                         }
//                     }).join('')}
//                 </div>
//             </div>
            
//             <!-- Keywords -->
//             <div class="keywords">
//                 <h3>Related Keywords</h3>
//                 <div class="keyword-list">
//                     ${movie.keywords.split(',').slice(0, 15).map(keyword => `
//                     <span class="keyword-tag">${keyword.trim()}</span>
//                     `).join('')}
//                 </div>
//             </div>
//         </div>
//     </section>

//     <!-- Similar Movies -->
//     ${similarMovies.length > 0 ? `
//     <section class="similar-movies">
//         <div class="container">
//             <h2>Similar Movies</h2>
//             <div class="similar-grid">
//                 ${similarMovies.map(similar => {
//                     const similarPosterUrl = fixPosterUrl(similar.poster);
                    
//                     return `
//                     <a href="/movies/${similar.id}/" class="similar-card">
//                         <img src="${similarPosterUrl}" alt="${similar.title}">
//                         <h4>${similar.title}</h4>
//                         <p style="padding: 0 15px 15px; color: #999; font-size: 14px;">${similar.genre}</p>
//                     </a>
//                     `;
//                 }).join('')}
//             </div>
//         </div>
//     </section>
//     ` : ''}


//     <!-- Footer -->
//     <footer class="footer">
//         <div class="container">
//             <div class="footer-content">
//                 <div class="footer-section">
//                     <h3>FreeStream</h3>
//                     <p style="color: #999;">Watch free movies, TV shows, and live channels in HD quality.</p>
//                 </div>
//                 <div class="footer-section">
//                     <h3>Quick Links</h3>
//                     <a href="/">Home</a>
//                     <a href="/#movies">Movies</a>
//                     <a href="/#tv">TV Shows</a>
//                     <a href="/#live">Live TV</a>
//                 </div>
//                 <div class="footer-section">
//                     <h3>Legal</h3>
//                     <a href="/privacy">Privacy Policy</a>
//                     <a href="/terms">Terms of Service</a>
//                     <a href="/dmca">DMCA</a>
//                 </div>
//             </div>
//             <div class="footer-bottom">
//                 <p>&copy; 2025 FreeStream. Watch ${movie.title} online free in HD quality.</p>
//                 <p style="margin-top: 10px; font-size: 12px; opacity: 0.7;">Disclaimer: All content is provided for entertainment purposes only.</p>
//             </div>
//         </div>
//     </footer>

//     <!-- Theme Toggle Button -->
//     <button class="theme-toggle" id="themeToggle">
//         <i class="fas fa-moon"></i>
//     </button>
//     <!-- Ad Scripts -->
//     <script>(function(s){s.dataset.zone='10297164',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>
//     <script>(function(s){s.dataset.zone='10333131',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>

//     <script async data-id="101498160" src="//static.getclicky.com/js"></script>

//     <script async src="https://www.googletagmanager.com/gtag/js?id=G-RTHH33WQWQ"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-RTHH33WQWQ');
// </script>
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

//     <script>
//         // Movie data
//         const movieData = {
//             title: "${movie.title.replace(/"/g, '\\"')}",
//             youtubeId: "${movie.playUrl}",
//             streams: ${JSON.stringify(streams)},
//             hasYoutube: ${hasYoutube}
//         };
        
//         // YouTube API Player Variables
//         let youtubePlayer = null;
//         let youtubeAPILoaded = false;
        
//         // Load YouTube IFrame API
//         function loadYouTubeAPI() {
//             if (youtubeAPILoaded) return;
            
//             const tag = document.createElement('script');
//             tag.src = "https://www.youtube.com/iframe_api";
//             const firstScriptTag = document.getElementsByTagName('script')[0];
//             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//             youtubeAPILoaded = true;
//         }
        
//         // This function is called by YouTube API when ready
//         window.onYouTubeIframeAPIReady = function() {
//             // Player will be created when needed
//         };
        
//         // Initialize YouTube Player
//         function initYouTubePlayer(videoId) {
//             if (youtubePlayer) {
//                 youtubePlayer.loadVideoById(videoId);
//                 return youtubePlayer;
//             }
            
//             youtubePlayer = new YT.Player('youtube-player', {
//                 height: '100%',
//                 width: '100%',
//                 videoId: videoId,
//                 playerVars: {
//                     'autoplay': 1,
//                     'mute': 1,
//                     'playsinline': 1,
//                     'rel': 0,
//                     'loop': 1,
//                     'modestbranding': 1,
//                     'controls': 1,
//                     'showinfo': 0,
//                     'playlist': videoId
//                 },
//                 events: {
//                     'onReady': onPlayerReady,
//                     'onStateChange': onPlayerStateChange
//                 }
//             });
            
//             return youtubePlayer;
//         }
        
//         // YouTube Player Events
//         function onPlayerReady(event) {
//             console.log('YouTube player ready');
//             event.target.playVideo();
//         }
        
//         function onPlayerStateChange(event) {
//             console.log('Player state changed:', event.data);
//         }
        
//         // Stop YouTube player completely
//         function stopYouTubePlayer() {
//             if (youtubePlayer) {
//                 try {
//                     // Stop video playback
//                     youtubePlayer.stopVideo();
//                     // Destroy the player instance
//                     youtubePlayer.destroy();
//                 } catch (e) {
//                     console.log('Error stopping YouTube player:', e);
//                 }
//                 youtubePlayer = null;
//             }
//         }
        
//         // Stop iframe videos
//         function stopIframeVideos() {
//             const iframeContainer = document.getElementById('iframe-container');
//             const iframe = iframeContainer.querySelector('iframe');
//             if (iframe) {
//                 // Store current src
//                 const currentSrc = iframe.src;
//                 iframe.dataset.src = currentSrc;
                
//                 // Stop video by clearing src
//                 iframe.src = '';
                
//                 // Try to send stop command to iframe
//                 try {
//                     iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
//                 } catch (e) {
//                     // Ignore errors
//                 }
//             }
//         }
        
//         // Stop all videos function
//         function stopAllVideos() {
//             stopYouTubePlayer();
//             stopIframeVideos();
//         }
        
//         // Player functions
//         function openPlayer() {
//             const playerSection = document.getElementById('playerSection');
//             playerSection.classList.add('active');
//             playerSection.scrollIntoView({ behavior: 'smooth' });
            
//             // Auto-play YouTube if available
//             if (movieData.hasYoutube) {
//                 loadYouTubePlayer(movieData.youtubeId);
//             }
//         }
        
//         function closePlayer() {
//             document.getElementById('playerSection').classList.remove('active');
            
//             // Stop all videos
//             stopAllVideos();
            
//             // Clear iframe container
//             const iframeContainer = document.getElementById('iframe-container');
//             iframeContainer.innerHTML = '';
//             iframeContainer.style.display = 'none';
            
//             // Show YouTube player container
//             document.getElementById('youtube-player').style.display = 'block';
            
//             // Reset active buttons
//             document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
//         }
        
//         function loadYouTubePlayer(videoId) {
//             // Stop any currently playing videos
//             stopAllVideos();
            
//             // Show YouTube player, hide iframe container
//             document.getElementById('youtube-player').style.display = 'block';
//             document.getElementById('iframe-container').style.display = 'none';
//             document.getElementById('iframe-container').innerHTML = '';
            
//             // Load YouTube API and initialize player
//             loadYouTubeAPI();
            
//             // Wait for API to load or initialize immediately
//             if (window.YT && window.YT.Player) {
//                 initYouTubePlayer(videoId);
//             } else {
//                 // Wait for API to load
//                 const checkReady = setInterval(() => {
//                     if (window.YT && window.YT.Player) {
//                         clearInterval(checkReady);
//                         initYouTubePlayer(videoId);
//                     }
//                 }, 100);
//             }
            
//             // Update active button
//             document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
//         }
        
//         function loadStream(index) {
//             const stream = movieData.streams[index];
//             if (!stream) return;
            
//             // Check if it's a YouTube URL
//             if (stream.url.includes('youtube.com') || stream.url.includes('youtu.be')) {
//                 const videoId = extractYouTubeId(stream.url);
//                 if (videoId) {
//                     loadYouTubePlayer(videoId);
//                 }
//             } else {
//                 // Direct iframe for other streaming sites
//                 loadIframeStream(stream.url);
//             }
            
//             // Update active button
//             document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
//             document.querySelectorAll('.server-btn')[index].classList.add('active');
//         }
        
//         function loadIframeStream(url) {
//             // Stop YouTube player first
//             stopYouTubePlayer();
            
//             // Show iframe container, hide YouTube player
//             document.getElementById('youtube-player').style.display = 'none';
//             const iframeContainer = document.getElementById('iframe-container');
//             iframeContainer.style.display = 'block';
            
//             // Create iframe with video enhancement filter
//             iframeContainer.innerHTML = \`<iframe 
//                 src="\${url}"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowfullscreen>
//             </iframe>\`;
//         }
        
//         function extractYouTubeId(url) {
//             const regExp = /^.*(youtu\\.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/;
//             const match = url.match(regExp);
//             return (match && match[2].length === 11) ? match[2] : null;
//         }
        
//         // Share functions
//         function openShareModal() {
//             document.getElementById('shareModal').classList.add('active');
//         }
        
//         function closeShareModal() {
//             document.getElementById('shareModal').classList.remove('active');
//         }
        
//         function shareToFacebook() {
//             const url = encodeURIComponent(window.location.href);
//             const title = encodeURIComponent('Watch ' + movieData.title + ' Online Free');
//             window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${url}&quote=\${title}\`, '_blank', 'width=600,height=400');
//             closeShareModal();
//         }
        
//         function shareToTwitter() {
//             const url = encodeURIComponent(window.location.href);
//             const text = encodeURIComponent('Watch "' + movieData.title + '" online for free!');
//             window.open(\`https://twitter.com/intent/tweet?url=\${url}&text=\${text}\`, '_blank', 'width=600,height=400');
//             closeShareModal();
//         }
        
//         function copyLink() {
//             const url = window.location.href;
//             navigator.clipboard.writeText(url).then(() => {
//                 alert('Link copied to clipboard!');
//             }).catch(() => {
//                 const textArea = document.createElement('textarea');
//                 textArea.value = url;
//                 document.body.appendChild(textArea);
//                 textArea.select();
//                 document.execCommand('copy');
//                 document.body.removeChild(textArea);
//                 alert('Link copied to clipboard!');
//             });
//             closeShareModal();
//         }
        
//         // Theme toggle functions
//         function initTheme() {
//             const savedTheme = localStorage.getItem('theme') || 'dark';
//             if (savedTheme === 'light') {
//                 document.body.classList.add('light-mode');
//                 document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
//             }
//         }
        
//         function toggleTheme() {
//             const body = document.body;
//             const themeToggle = document.getElementById('themeToggle');
            
//             if (body.classList.contains('light-mode')) {
//                 body.classList.remove('light-mode');
//                 localStorage.setItem('theme', 'dark');
//                 themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
//             } else {
//                 body.classList.add('light-mode');
//                 localStorage.setItem('theme', 'light');
//                 themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
//             }
//         }
        
//         // Initialize theme
//         initTheme();
        
//         // Add light mode CSS
//         const lightModeCSS = document.createElement('style');
//         lightModeCSS.textContent = \`
//             .light-mode {
//                 background: #f5f5f5;
//                 color: #333;
//             }
            
//             .light-mode .site-header {
//                 background: rgba(245, 245, 245, 0.95);
//                 border-bottom: 1px solid rgba(0,0,0,0.1);
//                 color: #333;
//             }
            
//             .light-mode .movie-hero {
//                 background: linear-gradient(rgba(245,245,245,0.9), rgba(245,245,245,0.9)), url('${posterUrl}');
//                 color: #333;
//             }
            
//             .light-mode .movie-title,
//             .light-mode .movie-year,
//             .light-mode .synopsis,
//             .light-mode .synopsis-content,
//             .light-mode .details,
//             .light-mode .detail-label,
//             .light-mode .detail-row div,
//             .light-mode .cast-section h2,
//             .light-mode .cast-card h4,
//             .light-mode .keywords h3,
//             .light-mode .similar-movies h2,
//             .light-mode .similar-card h4,
//             .light-mode .footer-section h3,
//             .light-mode .footer-bottom p,
//             .light-mode .footer-section p {
//                 color: #333 !important;
//             }
            
//             .light-mode .movie-meta .views,
//             .light-mode .cast-card p,
//             .light-mode .similar-card p,
//             .light-mode .footer-section a {
//                 color: #666 !important;
//             }
            
//             .light-mode .genre,
//             .light-mode .btn-secondary,
//             .light-mode .server-btn,
//             .light-mode .cast-card,
//             .light-mode .keyword-tag,
//             .light-mode .similar-card,
//             .light-mode .details,
//             .light-mode .keywords {
//                 background: rgba(0,0,0,0.05);
//                 color: #333;
//             }
//             .light-mode .language,
//             .light-mode .btn-secondary,
//             .light-mode .server-btn,
//             .light-mode .cast-card,
//             .light-mode .keyword-tag,
//             .light-mode .similar-card,
//             .light-mode .details,
//             .light-mode .keywords {
//                 background: rgba(0,0,0,0.05);
//                 color: #333;
//             }    
            
//             .light-mode .footer {
//                 background: rgba(0,0,0,0.05);
//                 border-top: 1px solid rgba(0,0,0,0.1);
//                 color: #333;
//             }
            
//             .light-mode .share-content {
//                 background: #f5f5f5;
//                 color: #333;
//             }
            
//             .light-mode .share-btn.link {
//                 background: #ddd;
//                 color: #333;
//             }
            
//             .light-mode .back-btn,
//             .light-mode .btn-primary,
//             .light-mode .share-btn.facebook,
//             .light-mode .share-btn.twitter,
//             .light-mode .close-share,
//             .light-mode .server-btn.active,
//             .light-mode .theme-toggle {
//                 color: white !important;
//             }
            
//             .light-mode .logo {
//                 color: #e50914;
//             }
//         \`;
//         document.head.appendChild(lightModeCSS);
        
//         // Event listeners
//         document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        
//         // Keyboard shortcuts
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape') {
//                 closePlayer();
//                 closeShareModal();
//             }
//             if (e.key === ' ') {
//                 e.preventDefault();
//                 openPlayer();
//             }
//         });
        
//         // Auto-open player if URL has #watch
//         if (window.location.hash === '#watch') {
//             setTimeout(() => openPlayer(), 1000);
//         }
        
//         // Close share modal when clicking outside
//         document.getElementById('shareModal').addEventListener('click', (e) => {
//             if (e.target.id === 'shareModal') {
//                 closeShareModal();
//             }
//         });

//         console.log('🎬 Movie page loaded:', movieData.title);
//     </script>
// </body>
// </html>`;
// }

// // Generate all movie pages
// console.log('Generating movie pages...\n');

// let successCount = 0;
// let errorCount = 0;

// movies.forEach((movie, index) => {
//     try {
//         const movieDir = path.join(moviesDir, movie.id);
        
//         // Create directory
//         if (!fs.existsSync(movieDir)) {
//             fs.mkdirSync(movieDir, { recursive: true });
//         }
        
//         // Generate HTML
//         const html = generateMoviePage(movie);
        
//         // Write file
//         fs.writeFileSync(path.join(movieDir, 'index.html'), html);
        
//         successCount++;
//         console.log(`✅ ${index + 1}. ${movie.title}`);
        
//     } catch (error) {
//         errorCount++;
//         console.log(`❌ ${index + 1}. ${movie.title} - ERROR: ${error.message}`);
//     }
// });

// // Generate sitemap.xml
// console.log('\n📄 Generating sitemap.xml...');
// const baseUrl = 'https://freestreaming.vercel.app';
// const today = new Date().toISOString().split('T')[0];

// let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//         xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
//         xmlns:xhtml="http://www.w3.org/1999/xhtml"
//         xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
//         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

//     <url>
//         <loc>${baseUrl}/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>daily</changefreq>
//         <priority>1.0</priority>
//     </url>
    
//     <url>
//         <loc>${baseUrl}/movies/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//     </url>
    
//     <url>
//         <loc>${baseUrl}/live-tv/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//     </url>

//      <url>
//         <loc>${baseUrl}/tvshows/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//     </url>

//      <url>
//         <loc>${baseUrl}/terms-of-service/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//     </url>

//      <url>
//         <loc>${baseUrl}/dmca/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//     </url>

//      <url>
//         <loc>${baseUrl}/privacy-policy/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>weekly</changefreq>
//         <priority>0.8</priority>
//     </url>`;

// movies.forEach(movie => {
//     sitemap += `
//     <url>
//         <loc>${baseUrl}/movies/${movie.id}/</loc>
//         <lastmod>${today}</lastmod>
//         <changefreq>daily</changefreq>
//         <priority>0.9</priority>
//     </url>`;
// });

// sitemap += '\n</urlset>';

// fs.writeFileSync('sitemap.xml', sitemap);
// console.log('✅ sitemap.xml created');

// // Generate robots.txt
// console.log('📄 Generating robots.txt...');
// const robots = `User-agent: *
// Allow: /
// Sitemap: ${baseUrl}/sitemap.xml`;

// fs.writeFileSync('robots.txt', robots);
// console.log('✅ robots.txt created');

// console.log('\n' + '='.repeat(50));
// console.log('🎉 GENERATION COMPLETED!');
// console.log(`✅ Successfully generated: ${successCount} movie pages`);
// if (errorCount > 0) {
//     console.log(`❌ Errors: ${errorCount}`);
// }
// console.log('='.repeat(50));

// console.log('\n📋 GENERATED FILES:');
// console.log('1. movies/ folder with all movie pages');
// console.log('2. sitemap.xml (SEO optimized)');
// console.log('3. robots.txt (SEO optimized)');

// console.log('\n🚀 TO TEST:');
// console.log('1. Run: npm run dev');
// console.log('2. Visit: http://localhost:3000/movies/movie-id/');
// console.log('   Example: http://localhost:3000/movies/pharma-2025-full-movie/');

// console.log('\n🎬 ALL KEY FIXES RESTORED:');
// console.log('✅ RESTORED stopAllVideos() function that properly destroys YouTube player');
// console.log('✅ REMOVED tab-stop logic (video now plays continuously across interactions)');
// console.log('✅ FIXED Cast & Similar Movies sections with proper escaping');
// console.log('✅ UPDATED Cast & Crew image size to 140px (bigger as requested)');
// console.log('✅ KEPT all YouTube API functionality intact');
// console.log('✅ KEPT video enhancement filters');
// console.log('✅ KEPT original layout and logic completely intact');
























import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 MOVIE PAGE GENERATOR - ES MODULE VERSION');
console.log('===========================================\n');

// Read data.json
const rawData = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(rawData);
const movies = data.movies;

console.log(`📊 Found ${movies.length} movies to process\n`);

// Create movies directory
const moviesDir = 'movies';
if (!fs.existsSync(moviesDir)) {
    fs.mkdirSync(moviesDir, { recursive: true });
}

// Function to fix poster URL path
function fixPosterUrl(posterUrl) {
    if (posterUrl.startsWith('http://') || posterUrl.startsWith('https://')) {
        return posterUrl;
    }
    
    if (posterUrl.startsWith('../public/')) {
        return '/public/' + posterUrl.replace('../public/', '');
    }
    
    if (posterUrl.startsWith('public/')) {
        return '/' + posterUrl;
    }
    
    if (!posterUrl.includes('/')) {
        return '/public/' + posterUrl;
    }
    
    return posterUrl;
}

// Function to escape HTML for onerror attribute
function escapeForOnError(html) {
    return html
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '')
        .replace(/\r/g, '');
}

// Function to escape HTML
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Function to escape for JSON-LD
function escapeJson(text) {
    if (!text) return '';
    return text
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .trim();
}

// Function to generate complete movie page
function generateMoviePage(movie) {
    const rating = movie.ratingCount > 0 ? 
        (movie.ratingTotal / movie.ratingCount).toFixed(1) : '0.0';
    
    const year = new Date(movie.timestamp * 1000).getFullYear();
    const dateString = new Date(movie.timestamp * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Get available streams
    const streams = [
        { name: 'Server 1', url: movie.streamUrl },
        { name: 'Server 2', url: movie.stream2Url },
        { name: 'Server 3', url: movie.stream3Url },
        { name: 'Server - Hindi Dubbed', url: movie.stream4Url }
    ].filter(stream => stream.url && stream.url.trim() !== '');
    
    const hasYoutube = movie.playUrl && movie.playUrl.trim() !== '';
    
    // Get similar movies
    const similarMovies = movies
        .filter(m => m.id !== movie.id && m.genre === movie.genre)
        .slice(0, 6);
    
    // Get cast images or use fallback SVG
    const castImages = movie.castimage || [];
    
    // Fix poster URL - ensure it's correct
    const posterUrl = fixPosterUrl(movie.poster);
    
    // Modern user icon SVG for fallback
    const userIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="60" fill="#e50914" opacity="0.08"/>
  <circle cx="64" cy="44" r="18" fill="#e50914"/>
  <path d="M28 108c0-20 18-32 36-32s36 12 36 32" fill="#e50914"/>
</svg>`;
    
    // Prepare escaped versions
    const escapedUserIconSVG = escapeForOnError(userIconSVG);
    
    // SEO elements
    const seoTitle = `Watch ${movie.title}  Online Free | FreeStream`;
    const seoDescription = movie.description.length > 155 ? 
        movie.description.substring(0, 152) + '...' : movie.description;
    const canonicalUrl = `https://freestreaming.vercel.app/movies/${movie.id}/`;
    
    // Start building HTML - MAINTAINING EXACT ORIGINAL LAYOUT
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="robots" content="index,follow,archive,snippet,imageindex">
    <meta name="revisit-after" content="7 days">
    <meta name="distribution" content="global">

    <!-- Primary SEO Meta Tags -->
    <title>${escapeHtml(seoTitle)}</title>
    <meta name="description" content="${escapeHtml(seoDescription)}">
    <meta name="keywords" content="${escapeHtml(movie.keywords)}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${escapeHtml(movie.title)}">
    <meta property="og:description" content="${escapeHtml(seoDescription)}">
    <meta property="og:image" content="${posterUrl}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="FreeStream">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(movie.title)}">
    <meta name="twitter:description" content="${escapeHtml(seoDescription)}">
    <meta name="twitter:image" content="${posterUrl}">
    
    <!-- Icons -->
    <link rel="icon" href="https://freestreaming.vercel.app/public/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="https://freestreaming.vercel.app/public/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://freestreaming.vercel.app/public/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://freestreaming.vercel.app/public/favicon-16x16.png">
    <link rel="manifest" href="https://freestreaming.vercel.app/public/site.webmanifest">
     
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Movie",
        "name": "${escapeJson(movie.title)}",
        "description": "${escapeJson(movie.description)}",
        "image": "${posterUrl}",
        "url": "${canonicalUrl}",
        "datePublished": "${(movie.date)}",        
        "genre": "${escapeJson(movie.genre)}",
        "director": "${escapeJson(movie.director.join(', '))}",
        "actor": "${escapeJson(movie.cast.join(', '))}",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "${rating}",
            "ratingCount": "${movie.ratingCount}",
            "bestRating": "10",
            "worstRating": "0"
        },
        "publisher": {
            "@type": "Organization",
            "name": "FreeStream",
            "logo": {
                "@type": "ImageObject",
                "url": "https://freestreaming.vercel.app/public/logo.png"
            }
        }
    }
    </script>
    
    <!-- Breadcrumb Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://freestreaming.vercel.app"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Movies",
                "item": "https://freestreaming.vercel.app/movies/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "${escapeJson(movie.title)}",
                "item": "${canonicalUrl}"
            }
        ]
    }
    </script>

    <!-- ORIGINAL STYLE FROM ATTACHMENT FILE - DO NOT CHANGE -->
    <style>
        /* Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0f0f0f;
            color: white;
            line-height: 1.6;
        }
        
        a {
            color: inherit;
            text-decoration: none;
        }
        
        button {
            cursor: pointer;
            font-family: inherit;
        }
        
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        
        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header */
        .site-header {
            background: rgba(15, 15, 15, 0.95);
            backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #e50914;
        }
        
        .logo i {
            margin-right: 10px;
        }
        
        .back-btn {
            background: #e50914;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        /* Movie Hero */
        .movie-hero {
            background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('${posterUrl}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            padding: 120px 0 60px;
            margin-top: 60px;
            min-height: 600px;
            display: flex;
            align-items: center;
        }
        
        .movie-grid {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 40px;
            align-items: start;
        }
        
        .movie-poster {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            height: 450px;
            width: 330px;
            position: relative;
            background: #1a1a1a;
        }
        
        .movie-poster img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
        
        .movie-info {
            padding: 20px 0;
        }
        
        .movie-title {
            font-size: 36px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .movie-year {
            color: #999;
            font-size: 24px;
        }
        
        .movie-meta {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .rating {
            background: #e50914;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .genre {
            background: rgba(255,255,255,0.1);
            padding: 5px 15px;
            border-radius: 20px;
        }
        .language {
            background: rgba(29, 5, 248, 1);
            padding: 5px 15px;
            border-radius: 20px;
        }    
        
        .views {
            color: #999;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        /* Action Buttons */
        .action-buttons {
            display: flex;
            gap: 15px;
            margin: 25px 0;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: none;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #e50914;
            color: white;
        }
        
        .btn-primary:hover {
            background: #b2070f;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: rgba(255,255,255,0.1);
            color: white;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .btn-secondary:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }
        
        /* Share Modal */
        .share-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        
        .share-modal.active {
            display: flex;
        }
        
        .share-content {
            background: #222;
            padding: 30px;
            border-radius: 10px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        }
        
        .share-buttons {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .share-btn {
            padding: 12px 20px;
            border-radius: 4px;
            border: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            cursor: pointer;
        }
        
        .share-btn.facebook {
            background: #1877f2;
            color: white;
        }
        
        .share-btn.twitter {
            background: #1da1f2;
            color: white;
        }
        
        .share-btn.link {
            background: #333;
            color: white;
        }
        
        .close-share {
            background: #e50914;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
        }
        
        /* Player Section */
        .player-section {
            background: #000;
            border-radius: 10px;
            overflow: hidden;
            margin: 40px 0;
            display: none;
        }
        
        .player-section.active {
            display: block;
        }
        
        .player-header {
            background: #222;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #333;
        }
        
        .close-player {
            background: #333;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
        }
        
        /* Video Enhancement Filter - Applied to all video players */
        .video-container iframe,
        .video-container .youtube-api-player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            /* Video Enhancement Filter */
            filter: brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg);
            transition: filter 0.3s ease;
        }
        
        /* Hover effect to show original for comparison */
        .video-container iframe:hover,
        .video-container .youtube-api-player:hover {
            filter: brightness(1.15) contrast(1.25) saturate(1.22) hue-rotate(2deg);
        }
        
        /* YouTube API Player Container */
        .youtube-api-player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        /* Server list */
        .server-list {
            background: #222;
            padding: 20px;
            border-top: 1px solid #333;
        }
        
        .server-buttons {
            display: flex;
            gap: 10px;
            margin-top: 10px;
            flex-wrap: wrap;
        }
        
        .server-btn {
            background: #333;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .server-btn.active {
            background: #e50914;
        }
        
        /* Movie Content */
        .movie-content {
            padding: 40px 0;
        }
        
        .synopsis {
            font-size: 18px;
            line-height: 1.8;
            color: #ccc;
            margin-bottom: 30px;
        }
        
        .synopsis-content {
            margin-top: 15px;
            white-space: pre-line;
            line-height: 1.6;
        }
        
        .details {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .detail-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
        }
        
        .detail-label {
            min-width: 120px;
            color: #999;
            font-weight: 600;
        }
        
        /* Cast */
        .cast-section {
            margin: 40px 0;
        }
        
        .cast-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .cast-card {
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .cast-card:hover {
            transform: translateY(-5px);
        }
        
        .cast-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 15px;
            border: 3px solid #e50914;
        }
        
        .cast-svg {
            width: 140px;
            height: 140px;
            margin: 0 auto 15px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #e50914;
        }
        
        /* Keywords */
        .keywords {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .keyword-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        
        .keyword-tag {
            background: rgba(255,255,255,0.1);
            color: #999;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
        }
        
        /* Similar Movies */
        .similar-movies {
            margin: 40px 0;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 40px;
        }
        
        .similar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .similar-card {
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        
        .similar-card:hover {
            transform: translateY(-5px);
        }
        
        .similar-card img {
            width: 100%;
            height: 240px;
            object-fit: cover;
        }
        
        .similar-card h4 {
            padding: 15px;
            font-size: 16px;
        }
        
        /* Footer */
        .footer {
            background: rgba(255,255,255,0.05);
            padding: 40px 0;
            margin-top: 40px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        
        .footer-section h3 {
            margin-bottom: 20px;
            font-size: 18px;
        }
        
        .footer-section a {
            display: block;
            color: #999;
            margin-bottom: 10px;
        }
        
        .footer-section a:hover {
            color: #e50914;
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 30px;
            margin-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: #999;
            font-size: 14px;
        }
        
        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #e50914;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            z-index: 100;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .movie-grid {
                gap: 30px;
            }
            
            .movie-poster {
                height: 400px;
                width: 250px;
            }
        }
        
        @media (max-width: 768px) {
            .movie-hero {
                padding: 100px 0 40px;
                min-height: 500px;
            }
            
            .movie-grid {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .movie-poster {
                height: 400px;
                width: 300px;
                margin: 0 auto;
            }
            
            .movie-title {
                font-size: 28px;
            }
            
            .movie-meta {
                justify-content: center;
            }
            
            .action-buttons {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
            }
            
            .server-buttons {
                flex-direction: column;
            }
            
            .server-btn {
                width: 100%;
                justify-content: center;
            }
            
            .cast-grid, .similar-grid {
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            }
            
            .share-buttons {
                flex-direction: column;
            }
            
            .share-btn {
                width: 100%;
                justify-content: center;
            }
        }
        
        @media (max-width: 480px) {
            .movie-hero {
                padding: 80px 0 30px;
                min-height: 400px;
            }
            
            .movie-poster {
                height: 350px;
                width: 250px;
            }
            
            .movie-title {
                font-size: 24px;
            }
            
            .movie-meta {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .cast-grid, .similar-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .footer-content {
                grid-template-columns: 1fr;
            }
            
            .theme-toggle {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="site-header">
        <div class="container header-content">
            <a href="/" class="logo">
                <i class="fas fa-play-circle"></i> FreeStream
            </a>
            <button class="back-btn" onclick="window.history.back()">
                <i class="fas fa-arrow-left"></i> Back to Movies
            </button>
        </div>
    </header>

    <!-- Share Modal -->
    <div class="share-modal" id="shareModal">
        <div class="share-content">
            <h2>Share "${(movie.title)}"</h2>
            <div class="share-buttons">
                <button class="share-btn facebook" onclick="shareToFacebook()">
                    <i class="fab fa-facebook"></i> Facebook
                </button>
                <button class="share-btn twitter" onclick="shareToTwitter()">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button class="share-btn link" onclick="copyLink()">
                    <i class="fas fa-link"></i> Copy Link
                </button>
            </div>
            <button class="close-share" onclick="closeShareModal()">
                Close
            </button>
        </div>
    </div>

    <!-- Movie Hero -->
    <section class="movie-hero">
        <div class="container">
            <div class="movie-grid">
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${escapeHtml(movie.title)} Poster" loading="lazy">
                </div>
                
                <div class="movie-info">
                    <h1 class="movie-title">${escapeHtml(movie.title)}</h1>
                    
                    <div class="movie-meta">
                        <span class="rating">
                            <i class="fas fa-star"></i> ${rating}/10
                        </span>
                        <span class="genre">${escapeHtml(movie.genre)}</span>
                        <span class="views">
                            <i class="fas fa-eye"></i> ${movie.views.toLocaleString()} views
                        </span>
                        <span class="language">
                       Original Language :  ${escapeHtml(movie.language)} 
                        </span>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="openPlayer()">
                            <i class="fas fa-play"></i> Watch Now
                        </button>
                        
                        ${movie.downloadUrl ? `
                        <a href="${movie.downloadUrl}" target="_blank" class="btn btn-secondary">
                            <i class="fas fa-download"></i> Download HD
                        </a>
                        ` : ''}
                        
                        <button class="btn btn-secondary" onclick="openShareModal()">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                    
                    <div class="synopsis">
                        <h3>Synopsis</h3>
                        <p>${escapeHtml(movie.description)}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Player Section -->
    <section class="player-section" id="playerSection">
        <div class="player-header">
            <h3>Now Playing: ${escapeHtml(movie.title)}</h3>
            <button class="close-player" onclick="closePlayer()">
                <i class="fas fa-times"></i> Close Player
            </button>
        </div>
        
        <div class="video-container">
            <!-- YouTube API Player Container -->
            <div id="youtube-player" class="youtube-api-player"></div>
            
            <!-- Iframe Container for other streams -->
            <div id="iframe-container" style="display: none;"></div>
        </div>
        
        ${streams.length > 0 ? `
        <div class="server-list">
            <h4>Available Servers:</h4>
            <div class="server-buttons">
                ${streams.map((stream, index) => `
                <button class="server-btn" onclick="loadStream(${index})">
                    <i class="fas fa-server"></i> ${stream.name}
                </button>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </section>

    <!-- Movie Content -->
    <section class="movie-content">
        <div class="container">
            <div class="synopsis">
                <h2>Full Story</h2>
                <div class="synopsis-content">${escapeHtml(movie.content)}</div>
            </div>
            
            <div class="details">
                <div class="detail-row">
                    <div class="detail-label">Director:</div>
                    <div>${escapeHtml(movie.director.join(', '))}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Cast:</div>
                    <div>${escapeHtml(movie.cast.join(', '))}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Released:</div>
                    <div>${escapeHtml(movie.date)}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Genre:</div>
                    <div>${escapeHtml(movie.genre)}</div>
                </div>
            </div>
            
             <!-- Cast Section -->
             <div class="cast-section">
                 <h2>Cast & Crew</h2>
                 <div class="cast-grid">
                     ${movie.cast.map((actor, index) => {
                        const castImage = castImages[index];
                        
                        if (castImage) {
                            const fixedCastImage = fixPosterUrl(castImage);
                            return `
                            <div class="cast-card">
                                <img src="${fixedCastImage}" alt="${escapeHtml(actor)}" class="cast-image" loading="lazy">
                                <h4>${escapeHtml(actor)}</h4>
                                <p style="color: #999; font-size: 14px;">Actor</p>
                            </div>
                            `;
                        } else {
                            return `
                            <div class="cast-card">
                                <div class="cast-svg">${userIconSVG}</div>
                                <h4>${escapeHtml(actor)}</h4>
                                <p style="color: #999; font-size: 14px;">Actor</p>
                            </div>
                            `;
                        }
                    }).join('')}
                </div>
            </div>
            
            <!-- Keywords -->
            <div class="keywords">
                <h3>Related Keywords</h3>
                <div class="keyword-list">
                    ${movie.keywords.split(',').slice(0, 15).map(keyword => `
                    <span class="keyword-tag">${escapeHtml(keyword.trim())}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Similar Movies -->
    ${similarMovies.length > 0 ? `
    <section class="similar-movies">
        <div class="container">
            <h2>Similar Movies</h2>
            <div class="similar-grid">
                ${similarMovies.map(similar => {
                    const similarPosterUrl = fixPosterUrl(similar.poster);
                    
                    return `
                    <a href="/movies/${similar.id}/" class="similar-card">
                        <img src="${similarPosterUrl}" alt="${escapeHtml(similar.title)}" loading="lazy">
                        <h4>${escapeHtml(similar.title)}</h4>
                        <p style="padding: 0 15px 15px; color: #999; font-size: 14px;">${escapeHtml(similar.genre)}</p>
                    </a>
                    `;
                }).join('')}
            </div>
        </div>
    </section>
    ` : ''}


    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>FreeStream</h3>
                    <p style="color: #999;">Watch free movies, TV shows, and live channels in HD quality.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <a href="/">Home</a>
                    <a href="/#movies">Movies</a>
                    <a href="/#tv">TV Shows</a>
                    <a href="/#live">Live TV</a>
                </div>
                <div class="footer-section">
                    <h3>Legal</h3>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/dmca">DMCA</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 FreeStream. Watch ${escapeHtml(movie.title)} online free in HD quality.</p>
                <p style="margin-top: 10px; font-size: 12px; opacity: 0.7;">Disclaimer: All content is provided for entertainment purposes only.</p>
            </div>
        </div>
    </footer>

    <!-- Theme Toggle Button -->
    <button class="theme-toggle" id="themeToggle">
        <i class="fas fa-moon"></i>
    </button>
    <!-- Ad Scripts -->
    <script>(function(s){s.dataset.zone='10297164',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>
    <script>(function(s){s.dataset.zone='10333131',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>

    <script async data-id="101498160" src="//static.getclicky.com/js"></script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-RTHH33WQWQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RTHH33WQWQ');
</script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- ORIGINAL SCRIPT FROM ATTACHMENT FILE - DO NOT CHANGE -->
    <script>
        // Movie data
        const movieData = {
            title: "${escapeJson(movie.title)}",
            youtubeId: "${escapeJson(movie.playUrl)}",
            streams: ${JSON.stringify(streams)},
            hasYoutube: ${hasYoutube}
        };
        
        // YouTube API Player Variables
        let youtubePlayer = null;
        let youtubeAPILoaded = false;
        
        // Load YouTube IFrame API
        function loadYouTubeAPI() {
            if (youtubeAPILoaded) return;
            
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            youtubeAPILoaded = true;
        }
        
        // This function is called by YouTube API when ready
        window.onYouTubeIframeAPIReady = function() {
            // Player will be created when needed
        };
        
        // Initialize YouTube Player
        function initYouTubePlayer(videoId) {
            if (youtubePlayer) {
                youtubePlayer.loadVideoById(videoId);
                return youtubePlayer;
            }
            
            youtubePlayer = new YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'mute': 1,
                    'playsinline': 1,
                    'rel': 0,
                    'loop': 1,
                    'modestbranding': 1,
                    'controls': 1,
                    'showinfo': 0,
                    'playlist': videoId
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            
            return youtubePlayer;
        }
        
        // YouTube Player Events
        function onPlayerReady(event) {
            console.log('YouTube player ready');
            event.target.playVideo();
        }
        
        function onPlayerStateChange(event) {
            console.log('Player state changed:', event.data);
        }
        
        // Stop YouTube player completely
        function stopYouTubePlayer() {
            if (youtubePlayer) {
                try {
                    // Stop video playback
                    youtubePlayer.stopVideo();
                    // Destroy the player instance
                    youtubePlayer.destroy();
                } catch (e) {
                    console.log('Error stopping YouTube player:', e);
                }
                youtubePlayer = null;
            }
        }
        
        // Stop iframe videos
        function stopIframeVideos() {
            const iframeContainer = document.getElementById('iframe-container');
            const iframe = iframeContainer.querySelector('iframe');
            if (iframe) {
                // Store current src
                const currentSrc = iframe.src;
                iframe.dataset.src = currentSrc;
                
                // Stop video by clearing src
                iframe.src = '';
                
                // Try to send stop command to iframe
                try {
                    iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                } catch (e) {
                    // Ignore errors
                }
            }
        }
        
        // Stop all videos function
        function stopAllVideos() {
            stopYouTubePlayer();
            stopIframeVideos();
        }
        
        // Player functions
        function openPlayer() {
            const playerSection = document.getElementById('playerSection');
            playerSection.classList.add('active');
            playerSection.scrollIntoView({ behavior: 'smooth' });
            
            // Auto-play YouTube if available
            if (movieData.hasYoutube) {
                loadYouTubePlayer(movieData.youtubeId);
            }
        }
        
        function closePlayer() {
            document.getElementById('playerSection').classList.remove('active');
            
            // Stop all videos
            stopAllVideos();
            
            // Clear iframe container
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.innerHTML = '';
            iframeContainer.style.display = 'none';
            
            // Show YouTube player container
            document.getElementById('youtube-player').style.display = 'block';
            
            // Reset active buttons
            document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
        }
        
        function loadYouTubePlayer(videoId) {
            // Stop any currently playing videos
            stopAllVideos();
            
            // Show YouTube player, hide iframe container
            document.getElementById('youtube-player').style.display = 'block';
            document.getElementById('iframe-container').style.display = 'none';
            document.getElementById('iframe-container').innerHTML = '';
            
            // Load YouTube API and initialize player
            loadYouTubeAPI();
            
            // Wait for API to load or initialize immediately
            if (window.YT && window.YT.Player) {
                initYouTubePlayer(videoId);
            } else {
                // Wait for API to load
                const checkReady = setInterval(() => {
                    if (window.YT && window.YT.Player) {
                        clearInterval(checkReady);
                        initYouTubePlayer(videoId);
                    }
                }, 100);
            }
            
            // Update active button
            document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
        }
        
        function loadStream(index) {
            const stream = movieData.streams[index];
            if (!stream) return;
            
            // Check if it's a YouTube URL
            if (stream.url.includes('youtube.com') || stream.url.includes('youtu.be')) {
                const videoId = extractYouTubeId(stream.url);
                if (videoId) {
                    loadYouTubePlayer(videoId);
                }
            } else {
                // Direct iframe for other streaming sites
                loadIframeStream(stream.url);
            }
            
            // Update active button
            document.querySelectorAll('.server-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.server-btn')[index].classList.add('active');
        }
        
        function loadIframeStream(url) {
            // Stop YouTube player first
            stopYouTubePlayer();
            
            // Show iframe container, hide YouTube player
            document.getElementById('youtube-player').style.display = 'none';
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.style.display = 'block';
            
            // Create iframe with video enhancement filter
            iframeContainer.innerHTML = \`<iframe 
                src="\${url}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>\`;
        }
        
        function extractYouTubeId(url) {
            const regExp = /^.*(youtu\\.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }
        
        // Share functions
        function openShareModal() {
            document.getElementById('shareModal').classList.add('active');
        }
        
        function closeShareModal() {
            document.getElementById('shareModal').classList.remove('active');
        }
        
        function shareToFacebook() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent('Watch ' + movieData.title + ' Online Free');
            window.open(\`https://www.facebook.com/sharer/sharer.php?u=\${url}&quote=\${title}\`, '_blank', 'width=600,height=400');
            closeShareModal();
        }
        
        function shareToTwitter() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Watch "' + movieData.title + '" online for free!');
            window.open(\`https://twitter.com/intent/tweet?url=\${url}&text=\${text}\`, '_blank', 'width=600,height=400');
            closeShareModal();
        }
        
        function copyLink() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            }).catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Link copied to clipboard!');
            });
            closeShareModal();
        }
        
        // Theme toggle functions
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            if (savedTheme === 'light') {
                document.body.classList.add('light-mode');
                document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
        
        function toggleTheme() {
            const body = document.body;
            const themeToggle = document.getElementById('themeToggle');
            
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
        
        // Initialize theme
        initTheme();
        
        // Add light mode CSS
        const lightModeCSS = document.createElement('style');
        lightModeCSS.textContent = \`
            .light-mode {
                background: #f5f5f5;
                color: #333;
            }
            
            .light-mode .site-header {
                background: rgba(245, 245, 245, 0.95);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                color: #333;
            }
            
            .light-mode .movie-hero {
                background: linear-gradient(rgba(245,245,245,0.9), rgba(245,245,245,0.9)), url('${posterUrl}');
                color: #333;
            }
            
            .light-mode .movie-title,
            .light-mode .movie-year,
            .light-mode .synopsis,
            .light-mode .synopsis-content,
            .light-mode .details,
            .light-mode .detail-label,
            .light-mode .detail-row div,
            .light-mode .cast-section h2,
            .light-mode .cast-card h4,
            .light-mode .keywords h3,
            .light-mode .similar-movies h2,
            .light-mode .similar-card h4,
            .light-mode .footer-section h3,
            .light-mode .footer-bottom p,
            .light-mode .footer-section p {
                color: #333 !important;
            }
            
            .light-mode .movie-meta .views,
            .light-mode .cast-card p,
            .light-mode .similar-card p,
            .light-mode .footer-section a {
                color: #666 !important;
            }
            
            .light-mode .genre,
            .light-mode .btn-secondary,
            .light-mode .server-btn,
            .light-mode .cast-card,
            .light-mode .keyword-tag,
            .light-mode .similar-card,
            .light-mode .details,
            .light-mode .keywords {
                background: rgba(0,0,0,0.05);
                color: #333;
            }
            .light-mode .language,
            .light-mode .btn-secondary,
            .light-mode .server-btn,
            .light-mode .cast-card,
            .light-mode .keyword-tag,
            .light-mode .similar-card,
            .light-mode .details,
            .light-mode .keywords {
                background: rgba(0,0,0,0.05);
                color: #333;
            }    
            
            .light-mode .footer {
                background: rgba(0,0,0,0.05);
                border-top: 1px solid rgba(0,0,0,0.1);
                color: #333;
            }
            
            .light-mode .share-content {
                background: #f5f5f5;
                color: #333;
            }
            
            .light-mode .share-btn.link {
                background: #ddd;
                color: #333;
            }
            
            .light-mode .back-btn,
            .light-mode .btn-primary,
            .light-mode .share-btn.facebook,
            .light-mode .share-btn.twitter,
            .light-mode .close-share,
            .light-mode .server-btn.active,
            .light-mode .theme-toggle {
                color: white !important;
            }
            
            .light-mode .logo {
                color: #e50914;
            }
        \`;
        document.head.appendChild(lightModeCSS);
        
        // Event listeners
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePlayer();
                closeShareModal();
            }
            if (e.key === ' ') {
                e.preventDefault();
                openPlayer();
            }
        });
        
        // Auto-open player if URL has #watch
        if (window.location.hash === '#watch') {
            setTimeout(() => openPlayer(), 1000);
        }
        
        // Close share modal when clicking outside
        document.getElementById('shareModal').addEventListener('click', (e) => {
            if (e.target.id === 'shareModal') {
                closeShareModal();
            }
        });

        console.log('🎬 Movie page loaded:', movieData.title);
    </script>
</body>
</html>`;
}

// Generate all movie pages
console.log('Generating movie pages...\n');

let successCount = 0;
let errorCount = 0;

movies.forEach((movie, index) => {
    try {
        const movieDir = path.join(moviesDir, movie.id);
        
        // Create directory
        if (!fs.existsSync(movieDir)) {
            fs.mkdirSync(movieDir, { recursive: true });
        }
        
        // Generate HTML
        const html = generateMoviePage(movie);
        
        // Write file
        fs.writeFileSync(path.join(movieDir, 'index.html'), html);
        
        successCount++;
        console.log(`✅ ${index + 1}. ${movie.title}`);
        
    } catch (error) {
        errorCount++;
        console.log(`❌ ${index + 1}. ${movie.title} - ERROR: ${error.message}`);
    }
});

// Generate sitemap.xml
console.log('\n📄 Generating sitemap.xml...');
const baseUrl = 'https://freestreaming.vercel.app';
const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <url>
        <loc>${baseUrl}/movies/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>${baseUrl}/live-tv/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

     <url>
        <loc>${baseUrl}/tvshows/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

     <url>
        <loc>${baseUrl}/terms-of-service/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

     <url>
        <loc>${baseUrl}/dmca/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

     <url>
        <loc>${baseUrl}/privacy-policy/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;

movies.forEach(movie => {
    const posterUrl = fixPosterUrl(movie.poster);
    const movieYear = new Date(movie.timestamp * 1000).getFullYear();
    
    sitemap += `
    <url>
        <loc>${baseUrl}/movies/${movie.id}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${posterUrl}</image:loc>
            <image:title>${escapeHtml(movie.title)} </image:title>
            <image:caption>${escapeHtml(movie.description)}</image:caption>
        </image:image>`;
    
    if (movie.playUrl) {
        sitemap += `
        <video:video>
            <video:thumbnail_loc>${posterUrl}</video:thumbnail_loc>
            <video:title>${escapeHtml(movie.title)} </video:title>
            <video:description>${escapeHtml(movie.description)}</video:description>
            <video:content_loc>https://www.youtube.com/watch?v=${movie.playUrl}</video:content_loc>
            <video:player_loc allow_embed="yes">https://www.youtube.com/embed/${movie.playUrl}</video:player_loc>
            <video:duration>7200</video:duration>
            <video:publication_date>${new Date(movie.timestamp * 1000).toISOString()}</video:publication_date>
            <video:family_friendly>yes</video:family_friendly>
            <video:requires_subscription>no</video:requires_subscription>
            <video:uploader info="${baseUrl}">FreeStream</video:uploader>
            <video:live>no</video:live>
        </video:video>`;
    }
    
    sitemap += `
    </url>`;
});

sitemap += '\n</urlset>';

fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ sitemap.xml created with video sitemap');

// Generate robots.txt
console.log('📄 Generating robots.txt...');
const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;

fs.writeFileSync('robots.txt', robots);
console.log('✅ robots.txt created');

console.log('\n' + '='.repeat(50));
console.log('🎉 GENERATION COMPLETED!');
console.log(`✅ Successfully generated: ${successCount} movie pages`);
if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`);
}
console.log('='.repeat(50));

console.log('\n📋 GENERATED FILES:');
console.log('1. movies/ folder with all movie pages');
console.log('2. sitemap.xml (SEO optimized with video sitemap)');
console.log('3. robots.txt (SEO optimized)');

console.log('\n🎬 SEO IMPROVEMENTS ADDED:');
console.log('✅ Complete Open Graph and Twitter Card meta tags');
console.log('✅ Enhanced Schema.org structured data (Movie, BreadcrumbList)');
console.log('✅ Canonical URLs for all pages');
console.log('✅ HTML escaping for all dynamic content');
console.log('✅ Video and Image Sitemap integration');
console.log('✅ ORIGINAL LAYOUT MAINTAINED EXACTLY');
console.log('✅ All ads and analytics scripts preserved');
console.log('✅ All original functionality maintained');

console.log('\n🚀 TO TEST:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000/movies/movie-id/');
console.log('   Example: http://localhost:3000/movies/pharma-2025-full-movie/');
console.log('===============================================\n');