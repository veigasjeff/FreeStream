// import Head from 'next/head';
// import Link from 'next/link';
// import Footer from '../../components/Footer';
// import schedule from '../../data/schedules.json';
// import { FaArrowLeft } from 'react-icons/fa';

// export default function PlayerPage({ show }) {
//   return (
//     <>
//       <Head>
//         <title>Watch {show.title} - Free Streaming</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
//       </Head>
      
//       {/* Main container with fixed dimensions */}
//       <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: 'black',
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         {/* Header with Back Button */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 100,
//           backgroundColor: 'rgba(0,0,0,0.8)',
//           padding: '15px 20px',
//           borderBottom: '1px solid #333'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             maxWidth: '1200px',
//             margin: '0 auto'
//           }}>
//             <Link 
//               href={`/schedules/${show.id}`}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 color: 'white',
//                 textDecoration: 'none',
//                 fontSize: '16px',
//                 fontWeight: '500',
//                 padding: '8px 16px',
//                 backgroundColor: 'rgba(0,0,0,0.7)',
//                 borderRadius: '8px',
//                 border: '1px solid #444'
//               }}
//             >
//               <FaArrowLeft style={{ fontSize: '18px' }} />
//               <span>Back to Schedule</span>
//             </Link>
            
//             <div style={{
//               flex: 1,
//               textAlign: 'center',
//               padding: '0 20px'
//             }}>
//               <h1 style={{
//                 color: 'white',
//                 fontSize: '18px',
//                 fontWeight: 'bold',
//                 margin: 0,
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap'
//               }}>
//                 {show.title}
//               </h1>
//               <p style={{
//                 color: '#aaa',
//                 fontSize: '14px',
//                 margin: '4px 0 0 0'
//               }}>
//                 Live Now
//               </p>
//             </div>
            
//             <div style={{ width: '120px' }}></div>
//           </div>
//         </div>

//         {/* Video Player Container - Takes all remaining space */}
//         <div style={{
//           flex: 1,
//           position: 'relative',
//           width: '100%',
//           height: '100%',
//           marginTop: '70px',
//           marginBottom: '70px'
//         }}>
//           <iframe
//             src={show.streamUrl}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               border: 'none',
//               filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)'
//             }}
//             allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
//             allowFullScreen
//             title={`${show.title} Player`}
//             loading="eager"
//           />
//         </div>

//         {/* Footer - FIXED POSITION AT BOTTOM */}
//         <div style={{
//           position: 'fixed',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: '70px',
//           backgroundColor: 'black',
//           borderTop: '1px solid #333',
//           zIndex: 100
//         }}>
//           <div style={{
//             maxWidth: '1200px',
//             width: '100%',
//             height: '100%',
//             margin: '0 auto',
//             padding: '0 20px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             {/* <Footer /> */}
//               <div className="text-center mt-8 md:mt-12 mb-16">
//             <Link 
//               href="/schedule" 
//               className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//             ><span className="gradient-text">
//               ← Back to Full Schedule </span>
//             </Link>
//           </div>
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
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find(s => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }








// // pages/schedules/[id].js
// import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import schedule from '../../data/schedules.json';
// import { FaArrowLeft, FaExpand, FaCompress } from 'react-icons/fa';

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const iframeRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isPlayingHls, setIsPlayingHls] = useState(false);

//   // Enter fullscreen on the parent container
//   const enterFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;

//     try {
//       if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//       // after request, browser will fire fullscreenchange and state will update
//     } catch (err) {
//       // ignore; some browsers block programmatic fullscreen without user gesture
//       // but this function is intended to be called from a user click
//       // console.warn('requestFullscreen failed', err);
//     }
//   };

//   // Exit fullscreen
//   const exitFullscreen = async () => {
//     try {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
//       else if (document.msExitFullscreen) document.msExitFullscreen();
//     } catch (err) {
//       // ignore
//     }
//   };

//   // Toggle fullscreen
//   const toggleFullscreen = () => {
//     if (isFullscreen) exitFullscreen();
//     else enterFullscreen();
//   };

//   // Listen for fullscreen changes to hide/show UI
//   useEffect(() => {
//     function onFsChange() {
//       const el = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
//       setIsFullscreen(Boolean(el));
//     }

//     document.addEventListener('fullscreenchange', onFsChange);
//     document.addEventListener('webkitfullscreenchange', onFsChange);
//     document.addEventListener('mozfullscreenchange', onFsChange);
//     document.addEventListener('MSFullscreenChange', onFsChange);

//     // ESC key fallback: ensure state sync
//     const onKey = (e) => {
//       if (e.key === 'Escape') {
//         setTimeout(() => {
//           const el = document.fullscreenElement || document.webkitFullscreenElement || null;
//           setIsFullscreen(Boolean(el));
//         }, 50);
//       }
//     };
//     document.addEventListener('keydown', onKey);

//     return () => {
//       document.removeEventListener('fullscreenchange', onFsChange);
//       document.removeEventListener('webkitfullscreenchange', onFsChange);
//       document.removeEventListener('mozfullscreenchange', onFsChange);
//       document.removeEventListener('MSFullscreenChange', onFsChange);
//       document.removeEventListener('keydown', onKey);
//     };
//   }, []);

//   // Initialize HLS if streamUrl is m3u8 and browser requires Hls.js
//   useEffect(() => {
//     let hls = null;
//     const src = show?.streamUrl || '';

//     const setupHls = async () => {
//       if (!src || !src.endsWith('.m3u8')) return;

//       const video = videoRef.current;
//       if (!video) return;

//       // Safari and some browsers support native HLS via <video>
//       const canPlayNative = video.canPlayType('application/vnd.apple.mpegurl') !== '';

//       if (canPlayNative) {
//         video.src = src;
//         video.play().catch(() => {});
//         setIsPlayingHls(true);
//         return;
//       }

//       // Try dynamic import of hls.js
//       try {
//         const Hls = (await import('hls.js')).default;
//         if (Hls.isSupported()) {
//           hls = new Hls();
//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//           setIsPlayingHls(true);
//         } else {
//           // Hls.js not supported
//           setIsPlayingHls(false);
//         }
//       } catch (err) {
//         // hls.js not installed or failed import
//         // fallback: set video src and hope for native support
//         try {
//           video.src = src;
//           video.play().catch(() => {});
//           setIsPlayingHls(true);
//         } catch (e) {
//           setIsPlayingHls(false);
//         }
//       }
//     };

//     setupHls();

//     return () => {
//       if (hls) {
//         try { hls.destroy(); } catch (e) {}
//         hls = null;
//       }
//     };
//   }, [show]);

//   // When entering fullscreen, add a small class to container to remove shadows etc.
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     if (isFullscreen) {
//       container.style.backgroundColor = 'black';
//     } else {
//       container.style.backgroundColor = '';
//     }
//   }, [isFullscreen]);

//   // Determine whether URL is an iframe-type or direct video
//   const isM3u8 = show.streamUrl && String(show.streamUrl).toLowerCase().includes('.m3u8');
//   const isDirectMp4 = show.streamUrl && (String(show.streamUrl).toLowerCase().endsWith('.mp4') || String(show.streamUrl).toLowerCase().includes('.mp4?'));

//   // Inline styles (kept simple for drop-in)
//   const styles = {
//     pageWrapper: {
//       width: '100%',
//       minHeight: '100vh',
//       background: '#000',
//       color: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'stretch'
//     },
//     header: {
//       padding: '12px 18px',
//       borderBottom: '1px solid rgba(255,255,255,0.04)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       maxWidth: 1200,
//       margin: '0 auto',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     title: { fontWeight: 700, fontSize: 18, textAlign: 'center', flex: 1, color: '#fff', marginLeft: 16, marginRight: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
//     playerArea: {
//       width: '100%',
//       height: 'calc(100vh - 160px)', // header + footer roughly
//       background: '#000',
//       display: 'flex',
//       alignItems: 'stretch',
//       justifyContent: 'center',
//     },
//     container: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       maxWidth: '1400px'
//     },
//     iframe: {
//       width: '100%',
//       height: '100%',
//       border: 'none',
//       display: 'block',
//       background: '#000'
//     },
//     video: {
//       width: '100%',
//       height: '100%',
//       background: '#000',
//       display: 'block',
//       outline: 'none'
//     },
//     controlsButton: {
//       position: 'absolute',
//       top: 12,
//       right: 12,
//       zIndex: 9999,
//       background: 'rgba(0,0,0,0.6)',
//       border: '1px solid rgba(255,255,255,0.08)',
//       color: '#fff',
//       padding: '8px 12px',
//       borderRadius: 8,
//       cursor: 'pointer',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 8,
//       fontSize: 14
//     },
//     footer: {
//       padding: '16px 18px',
//       borderTop: '1px solid rgba(255,255,255,0.04)',
//       textAlign: 'center',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     backLink: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 10,
//       textDecoration: 'none',
//       color: '#fff',
//       padding: '8px 12px',
//       background: 'rgba(255,255,255,0.03)',
//       borderRadius: 6
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Watch {show.title} - Player</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div style={styles.pageWrapper}>
//         {/* Header (not fixed) - will be hidden automatically in fullscreen via CSS when desired */}
//         {!isFullscreen && (
//           <header style={styles.header}>
//             <Link href={`/schedules/${show.id}`} style={styles.backLink}>
//               <FaArrowLeft />
//               <span>Back to Schedule</span>
//             </Link>

//             <div style={styles.title}>{show.title}</div>

//             <div style={{ width: 120 }}></div>
//           </header>
//         )}

//         {/* Player area */}
//         <div style={styles.playerArea}>
//           <div ref={containerRef} style={styles.container}>

//             {/* Fullscreen toggle controlled by parent container */}
//             <button
//               onClick={toggleFullscreen}
//               aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
//               style={styles.controlsButton}
//             >
//               {isFullscreen ? <><FaCompress /> Exit</> : <><FaExpand /> Fullscreen</>}
//             </button>

//             {/* If the source is an HLS (.m3u8) or MP4, use <video> and Hls.js fallback */}
//             {isM3u8 || isDirectMp4 ? (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 autoPlay
//                 // allow fullscreen on video when inside parent fullscreen (the parent handles fullscreen)
//                 // attributes for iOS Safari
//                 webkit-playsinline="true"
//                 // If mp4, set src directly
//                 src={isDirectMp4 ? show.streamUrl : undefined}
//               />
//             ) : (
//               // Otherwise render an iframe embed (VdoCipher, Multiembed, DaddyHD, Short.icu, etc.)
//               <iframe
//                 ref={iframeRef}
//                 src={show.streamUrl}
//                 style={styles.iframe}
//                 allow="autoplay; encrypted-media; picture-in-picture; fullscreen; accelerometer; gyroscope"
//                 allowFullScreen
//                 title={show.title}
//               />
//             )}
//           </div>
//         </div>

//         {/* Footer (not fixed) - hidden in fullscreen */}
//         {!isFullscreen && (
//           <footer style={styles.footer}>
//             <Link href="/schedule" style={styles.backLink}>
//               ← Back to Full Schedule
//             </Link>
//           </footer>
//         )}
//       </div>
//     </>
//   );
// }

// // Next.js data fetching
// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({ params: { id: show.id } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }









// // pages/schedules/[id].js
// import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import schedule from '../../data/schedules.json';
// import { FaExpand, FaCompress } from 'react-icons/fa';

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const iframeRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isPlayingHls, setIsPlayingHls] = useState(false);

//   const enterFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;

//     try {
//       if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     } catch {}
//   };

//   const exitFullscreen = async () => {
//     try {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
//       else if (document.msExitFullscreen) document.msExitFullscreen();
//     } catch {}
//   };

//   const toggleFullscreen = () => {
//     if (isFullscreen) exitFullscreen();
//     else enterFullscreen();
//   };

//   useEffect(() => {
//     function onFsChange() {
//       const el =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement;
//       setIsFullscreen(Boolean(el));
//     }

//     document.addEventListener('fullscreenchange', onFsChange);
//     document.addEventListener('webkitfullscreenchange', onFsChange);
//     document.addEventListener('mozfullscreenchange', onFsChange);
//     document.addEventListener('MSFullscreenChange', onFsChange);

//     const onKey = (e) => {
//       if (e.key === 'Escape') {
//         setTimeout(() => {
//           const el =
//             document.fullscreenElement ||
//             document.webkitFullscreenElement ||
//             null;
//           setIsFullscreen(Boolean(el));
//         }, 50);
//       }
//     };

//     document.addEventListener('keydown', onKey);

//     return () => {
//       document.removeEventListener('fullscreenchange', onFsChange);
//       document.removeEventListener('webkitfullscreenchange', onFsChange);
//       document.removeEventListener('mozfullscreenchange', onFsChange);
//       document.removeEventListener('MSFullscreenChange', onFsChange);
//       document.removeEventListener('keydown', onKey);
//     };
//   }, []);

//   useEffect(() => {
//     let hls = null;
//     const src = show?.streamUrl || '';

//     const setupHls = async () => {
//       if (!src || !src.endsWith('.m3u8')) return;

//       const video = videoRef.current;
//       if (!video) return;

//       const canPlayNative =
//         video.canPlayType('application/vnd.apple.mpegurl') !== '';

//       if (canPlayNative) {
//         video.src = src;
//         video.play().catch(() => {});
//         setIsPlayingHls(true);
//         return;
//       }

//       try {
//         const Hls = (await import('hls.js')).default;
//         if (Hls.isSupported()) {
//           hls = new Hls();
//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//           setIsPlayingHls(true);
//         } else {
//           setIsPlayingHls(false);
//         }
//       } catch {
//         try {
//           video.src = src;
//           video.play().catch(() => {});
//           setIsPlayingHls(true);
//         } catch {
//           setIsPlayingHls(false);
//         }
//       }
//     };

//     setupHls();

//     return () => {
//       if (hls) {
//         try {
//           hls.destroy();
//         } catch {}
//         hls = null;
//       }
//     };
//   }, [show]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     if (isFullscreen) container.style.backgroundColor = 'black';
//     else container.style.backgroundColor = '';
//   }, [isFullscreen]);

//   const isM3u8 =
//     show.streamUrl &&
//     String(show.streamUrl).toLowerCase().includes('.m3u8');
//   const isDirectMp4 =
//     show.streamUrl &&
//     (String(show.streamUrl).toLowerCase().endsWith('.mp4') ||
//       String(show.streamUrl).toLowerCase().includes('.mp4?'));

//   const styles = {
//     pageWrapper: {
//       width: '100%',
//       minHeight: '100vh',
//       background: '#000',
//       color: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'stretch'
//     },
//     playerArea: {
//       width: '100%',
//       height: 'calc(100vh - 80px)',
//       background: '#000',
//       display: 'flex',
//       alignItems: 'stretch',
//       justifyContent: 'center'
//     },
//     container: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       maxWidth: '1400px'
//     },
//     iframe: {
//       width: '100%',
//       height: '100%',
//       border: 'none',
//       display: 'block',
//       background: '#000'
//     },
//     video: {
//       width: '100%',
//       height: '100%',
//       background: '#000',
//       display: 'block',
//       outline: 'none'
//     },
//     controlsButton: {
//       position: 'absolute',
//       top: 12,
//       right: 12,
//       zIndex: 9999,
//       background: 'rgba(0,0,0,0.6)',
//       border: '1px solid rgba(255,255,255,0.08)',
//       color: '#fff',
//       padding: '8px 12px',
//       borderRadius: 8,
//       cursor: 'pointer',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 8,
//       fontSize: 14
//     },
//     footer: {
//       padding: '16px 18px',
//       borderTop: '1px solid rgba(255,255,255,0.04)',
//       textAlign: 'center',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     backLink: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 10,
//       textDecoration: 'none',
//       color: '#fff',
//       padding: '8px 12px',
//       background: 'rgba(255,255,255,0.03)',
//       borderRadius: 6
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Watch {show.title} - Player</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div style={styles.pageWrapper}>
//         <div style={styles.playerArea}>
//           <div ref={containerRef} style={styles.container}>
//             <button
//               onClick={toggleFullscreen}
//               aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
//               style={styles.controlsButton}
//             >
//               {isFullscreen ? (
//                 <>
//                   <FaCompress /> Exit
//                 </>
//               ) : (
//                 <>
//                   <FaExpand /> Fullscreen
//                 </>
//               )}
//             </button>

//             {isM3u8 || isDirectMp4 ? (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 autoPlay
//                 webkit-playsinline="true"
//                 src={isDirectMp4 ? show.streamUrl : undefined}
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={show.streamUrl}
//                 style={styles.iframe}
//                 allow="autoplay; encrypted-media; picture-in-picture; fullscreen; accelerometer; gyroscope"
//                 allowFullScreen
//                 title={show.title}
//               />
//             )}
//           </div>
//         </div>

//         {!isFullscreen && (
//           <footer style={styles.footer}>
//             <Link href="/schedule" style={styles.backLink}>
//               ← Back to Full Schedule
//             </Link>
//           </footer>
//         )}
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({
//     params: { id: show.id }
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }

















































// // pages/schedules/[id].js
// import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import schedule from '../../data/schedules.json';
// import { FaExpand, FaCompress } from 'react-icons/fa';

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const iframeRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isPlayingHls, setIsPlayingHls] = useState(false);

//   const enterFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;

//     try {
//       if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     } catch {}
//   };

//   const exitFullscreen = async () => {
//     try {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
//       else if (document.msExitFullscreen) document.msExitFullscreen();
//     } catch {}
//   };

//   const toggleFullscreen = () => {
//     if (isFullscreen) exitFullscreen();
//     else enterFullscreen();
//   };

//   useEffect(() => {
//     function onFsChange() {
//       const el =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement;
//       setIsFullscreen(Boolean(el));
//     }

//     document.addEventListener('fullscreenchange', onFsChange);
//     document.addEventListener('webkitfullscreenchange', onFsChange);
//     document.addEventListener('mozfullscreenchange', onFsChange);
//     document.addEventListener('MSFullscreenChange', onFsChange);

//     const onKey = (e) => {
//       if (e.key === 'Escape') {
//         setTimeout(() => {
//           const el =
//             document.fullscreenElement ||
//             document.webkitFullscreenElement ||
//             null;
//           setIsFullscreen(Boolean(el));
//         }, 50);
//       }
//     };

//     document.addEventListener('keydown', onKey);

//     return () => {
//       document.removeEventListener('fullscreenchange', onFsChange);
//       document.removeEventListener('webkitfullscreenchange', onFsChange);
//       document.removeEventListener('mozfullscreenchange', onFsChange);
//       document.removeEventListener('MSFullscreenChange', onFsChange);
//       document.removeEventListener('keydown', onKey);
//     };
//   }, []);

//   useEffect(() => {
//     let hls = null;
//     const src = show?.streamUrl || '';

//     const setupHls = async () => {
//       if (!src || !src.endsWith('.m3u8')) return;

//       const video = videoRef.current;
//       if (!video) return;

//       const canPlayNative =
//         video.canPlayType('application/vnd.apple.mpegurl') !== '';

//       if (canPlayNative) {
//         video.src = src;
//         video.play().catch(() => {});
//         setIsPlayingHls(true);
//         return;
//       }

//       try {
//         const Hls = (await import('hls.js')).default;
//         if (Hls.isSupported()) {
//           hls = new Hls();
//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//           setIsPlayingHls(true);
//         } else {
//           setIsPlayingHls(false);
//         }
//       } catch {
//         try {
//           video.src = src;
//           video.play().catch(() => {});
//           setIsPlayingHls(true);
//         } catch {
//           setIsPlayingHls(false);
//         }
//       }
//     };

//     setupHls();

//     return () => {
//       if (hls) {
//         try {
//           hls.destroy();
//         } catch {}
//         hls = null;
//       }
//     };
//   }, [show]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     if (isFullscreen) container.style.backgroundColor = 'black';
//     else container.style.backgroundColor = '';
//   }, [isFullscreen]);

//   const isM3u8 =
//     show.streamUrl &&
//     String(show.streamUrl).toLowerCase().includes('.m3u8');
//   const isDirectMp4 =
//     show.streamUrl &&
//     (String(show.streamUrl).toLowerCase().endsWith('.mp4') ||
//       String(show.streamUrl).toLowerCase().includes('.mp4?'));

//   const filterStyle = 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)';

//   const styles = {
//     pageWrapper: {
//       width: '100%',
//       minHeight: '100vh',
//       background: '#000',
//       color: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'stretch'
//     },
//     playerArea: {
//       width: '100%',
//       height: 'calc(100vh - 80px)',
//       background: '#000',
//       display: 'flex',
//       alignItems: 'stretch',
//       justifyContent: 'center'
//     },
//     container: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       maxWidth: '1400px'
//     },
//     iframe: {
//       width: '100%',
//       height: '100%',
//       border: 'none',
//       display: 'block',
//       background: '#000',
//       filter: filterStyle,
//       WebkitFilter: filterStyle
//     },
//     video: {
//       width: '100%',
//       height: '100%',
//       background: '#000',
//       display: 'block',
//       outline: 'none',
//       filter: filterStyle,
//       WebkitFilter: filterStyle
//     },
//     controlsButton: {
//       position: 'absolute',
//       top: 12,
//       right: 12,
//       zIndex: 9999,
//       background: 'rgba(0,0,0,0.6)',
//       border: '1px solid rgba(255,255,255,0.08)',
//       color: '#fff',
//       padding: '8px 12px',
//       borderRadius: 8,
//       cursor: 'pointer',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 8,
//       fontSize: 14
//     },
//     footer: {
//       padding: '16px 18px',
//       borderTop: '1px solid rgba(255,255,255,0.04)',
//       textAlign: 'center',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     backLink: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 10,
//       textDecoration: 'none',
//       color: '#fff',
//       padding: '8px 12px',
//       background: 'rgba(255,255,255,0.03)',
//       borderRadius: 6
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Watch {show.title} - Player</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div style={styles.pageWrapper}>
//         <div style={styles.playerArea}>
//           <div ref={containerRef} style={styles.container}>
//             <button
//               onClick={toggleFullscreen}
//               aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
//               style={styles.controlsButton}
//             >
//               {isFullscreen ? (
//                 <>
//                   <FaCompress /> Exit
//                 </>
//               ) : (
//                 <>
//                   <FaExpand /> Fullscreen
//                 </>
//               )}
//             </button>

//             {isM3u8 || isDirectMp4 ? (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 autoPlay
//                 webkit-playsinline="true"
//                 src={isDirectMp4 ? show.streamUrl : undefined}
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={show.streamUrl}
//                 style={styles.iframe}
//                 allow="autoplay; encrypted-media; picture-in-picture; fullscreen; accelerometer; gyroscope"
//                 allowFullScreen
//                 title={show.title}
//               />
//             )}
//           </div>
//         </div>

//         {!isFullscreen && (
//           <footer style={styles.footer}>
//             <Link href="/schedule" style={styles.backLink}>
//               ← Back to Full Schedule
//             </Link>
//           </footer>
//         )}
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({
//     params: { id: show.id }
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }
























// PERFECT 

// pages/schedules/[id].js
// import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import schedule from '../../data/schedules.json';
// import { FaExpand, FaCompress } from 'react-icons/fa';

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const iframeRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isPlayingHls, setIsPlayingHls] = useState(false);

//   const filterStyle = 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)';

//   const enterFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;

//     try {
//       if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     } catch {}
//   };

//   const exitFullscreen = async () => {
//     try {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
//       else if (document.msExitFullscreen) document.msExitFullscreen();
//     } catch {}
//   };

//   const toggleFullscreen = () => {
//     if (isFullscreen) exitFullscreen();
//     else enterFullscreen();
//   };

//   useEffect(() => {
//     function onFsChange() {
//       const el =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement;
//       setIsFullscreen(Boolean(el));
//     }

//     document.addEventListener('fullscreenchange', onFsChange);
//     document.addEventListener('webkitfullscreenchange', onFsChange);
//     document.addEventListener('mozfullscreenchange', onFsChange);
//     document.addEventListener('MSFullscreenChange', onFsChange);

//     const onKey = (e) => {
//       if (e.key === 'Escape') {
//         setTimeout(() => {
//           const el =
//             document.fullscreenElement ||
//             document.webkitFullscreenElement ||
//             null;
//           setIsFullscreen(Boolean(el));
//         }, 50);
//       }
//     };

//     document.addEventListener('keydown', onKey);

//     return () => {
//       document.removeEventListener('fullscreenchange', onFsChange);
//       document.removeEventListener('webkitfullscreenchange', onFsChange);
//       document.removeEventListener('mozfullscreenchange', onFsChange);
//       document.removeEventListener('MSFullscreenChange', onFsChange);
//       document.removeEventListener('keydown', onKey);
//     };
//   }, []);

//   useEffect(() => {
//     let hls = null;
//     const src = show?.streamUrl || '';

//     const setupHls = async () => {
//       if (!src || !src.endsWith('.m3u8')) return;

//       const video = videoRef.current;
//       if (!video) return;

//       const canPlayNative =
//         video.canPlayType('application/vnd.apple.mpegurl') !== '';

//       if (canPlayNative) {
//           video.src = src;
//         video.play().catch(() => {});
//         setIsPlayingHls(true);
//         return;
//       }

//       try {
//         const Hls = (await import('hls.js')).default;
//         if (Hls.isSupported()) {
//           hls = new Hls();
//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//           setIsPlayingHls(true);
//         } else {
//           setIsPlayingHls(false);
//         }
//       } catch {
//         try {
//           video.src = src;
//           video.play().catch(() => {});
//           setIsPlayingHls(true);
//         } catch {
//           setIsPlayingHls(false);
//         }
//       }
//     };

//     setupHls();

//     return () => {
//       if (hls) {
//         try {
//           hls.destroy();
//         } catch {}
//         hls = null;
//       }
//     };
//   }, [show]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     if (isFullscreen) container.style.backgroundColor = 'black';
//     else container.style.backgroundColor = '';
//   }, [isFullscreen]);

//   const isM3u8 =
//     show.streamUrl &&
//     String(show.streamUrl).toLowerCase().includes('.m3u8');

//   const isDirectMp4 =
//     show.streamUrl &&
//     (String(show.streamUrl).toLowerCase().endsWith('.mp4') ||
//       String(show.streamUrl).toLowerCase().includes('.mp4?'));

//   const styles = {
//     pageWrapper: {
//       width: '100%',
//       minHeight: '100vh',
//       background: '#000',
//       color: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'stretch'
//     },
//     header: {
//       padding: '12px 18px',
//       borderBottom: '1px solid rgba(255,255,255,0.04)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       maxWidth: 1200,
//       margin: '0 auto',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     title: {
//       fontWeight: 700,
//       fontSize: 18,
//       textAlign: 'center',
//       color: '#fff',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       whiteSpace: 'nowrap'
//     },
//     playerArea: {
//       width: '100%',
//       height: 'calc(100vh - 160px)',
//       background: '#000',
//       display: 'flex',
//       alignItems: 'stretch',
//       justifyContent: 'center'
//     },
//     container: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       maxWidth: '1400px'
//     },
//     iframe: {
//       width: '100%',
//       height: '100%',
//       border: 'none',
//       display: 'block',
//       background: '#000',
//       filter: filterStyle
//     },
//     video: {
//       width: '100%',
//       height: '100%',
//       background: '#000',
//       display: 'block',
//       outline: 'none',
//       filter: filterStyle
//     },
//     controlsButton: {
//       position: 'absolute',
//       top: 12,
//       right: 12,
//       zIndex: 9999,
//       background: 'rgba(0,0,0,0.6)',
//       border: '1px solid rgba(255,255,255,0.08)',
//       color: '#fff',
//       padding: '8px 12px',
//       borderRadius: 8,
//       cursor: 'pointer',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 8,
//       fontSize: 14
//     },
//     footer: {
//       padding: '16px 18px',
//       borderTop: '1px solid rgba(255,255,255,0.04)',
//       textAlign: 'center',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     backLink: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 10,
//       textDecoration: 'none',
//       color: '#fff',
//       padding: '8px 12px',
//       background: 'rgba(255,255,255,0.03)',
//       borderRadius: 6
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Watch {show.title} - Player</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div style={styles.pageWrapper}>

//         {!isFullscreen && (
//           <header style={styles.header}>
//             <div style={styles.title}>{show.title}</div>
//           </header>
//         )}

//         <div style={styles.playerArea}>
//           <div ref={containerRef} style={styles.container}>

//             <button
//               onClick={toggleFullscreen}
//               aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
//               style={styles.controlsButton}
//             >
//               {isFullscreen ? (
//                 <>
//                   <FaCompress /> Exit
//                 </>
//               ) : (
//                 <>
//                   <FaExpand /> Fullscreen
//                 </>
//               )}
//             </button>

//             {isM3u8 || isDirectMp4 ? (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 autoPlay
//                 webkit-playsinline="true"
//                 src={isDirectMp4 ? show.streamUrl : undefined}
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={show.streamUrl}
//                 style={styles.iframe}
//                 allow="autoplay; encrypted-media; picture-in-picture; fullscreen; accelerometer; gyroscope"
//                 allowFullScreen
//                 title={show.title}
//               />
//             )}
//           </div>
//         </div>

//         {!isFullscreen && (
//           <footer style={styles.footer}>
//             <Link href="/schedule" style={styles.backLink}>
//               ← Back to Full Schedule
//             </Link>
//           </footer>
//         )}
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({ params: { id: show.id } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }






























//100 % FULL CODE 

// import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import schedule from '../../data/schedules.json';
// import { FaExpand, FaCompress } from 'react-icons/fa';

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const iframeRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isPlayingHls, setIsPlayingHls] = useState(false);

//   const filterStyle = 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)';

//   // -------------------------
//   //   ★ GLOBAL AD BLOCKER ★
//   // -------------------------
//   const injectAdBlocker = () => {
//     try {
//       const iframe = iframeRef.current;
//       if (iframe && iframe.contentWindow) {
//         const win = iframe.contentWindow;
//         const doc = iframe.contentDocument;

//         // BLOCK POPUPS / FAKE CLICKS
//         win.open = () => null;
//         win.alert = () => null;
//         win.confirm = () => null;
//         win.prompt = () => null;
//         win.print = () => null;
//         win.onbeforeunload = null;
//         win.onclick = null;

//         // BLOCK REDIRECT SCRIPTS
//         Object.defineProperty(win, 'location', {
//           configurable: false,
//           enumerable: false,
//           writable: false,
//           value: win.location
//         });

//         // REMOVE ADS EVERY 500ms
//         setInterval(() => {
//           const kills = [
//             'iframe[src*="ads"]',
//             'iframe[src*="doubleclick"]',
//             'iframe[src*="pop"]',
//             'iframe[src*="click"]',
//             '#ad',
//             '.ads',
//             '.ad-banner',
//             '.banner',
//             '.sponsor',
//             '.promotion',
//             '[id*="ad"]',
//             '[class*="ad"]'
//           ];
//           kills.forEach(selector => {
//             const el = doc.querySelector(selector);
//             if (el) el.remove();
//           });

//           // REMOVE OVERLAY ADS
//           const overlays = doc.querySelectorAll('*[style*="z-index"],*[style*="position: fixed"]');
//           overlays.forEach(el => {
//             if (el.innerText && el.innerText.toLowerCase().includes("ad")) {
//               el.remove();
//             }
//           });

//         }, 500);
//       }
//     } catch {}
//   };

//   // HLS / MP4 AD BLOCKER
//   const stripHlsAds = (url) => {
//     if (!url) return url;
//     return url
//       .replace(/(\?|&)ads?=[^&]*/gi, '')
//       .replace(/(\?|&)adtag=[^&]*/gi, '')
//       .replace(/(\?|&)ad=[^&]*/gi, '')
//       .replace(/#EXT-X-DISCONTINUITY/g, '')
//       .replace(/#EXTINF:\d+\.\d+,ad/gi, '');
//   };

//   const enterFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;
//     try {
//       if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     } catch {}
//   };

//   const exitFullscreen = async () => {
//     try {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
//       else if (document.msExitFullscreen) document.msExitFullscreen();
//     } catch {}
//   };

//   const toggleFullscreen = () => {
//     if (isFullscreen) exitFullscreen();
//     else enterFullscreen();
//   };

//   useEffect(() => {
//     function onFsChange() {
//       const el =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement;
//       setIsFullscreen(Boolean(el));
//     }

//     document.addEventListener('fullscreenchange', onFsChange);
//     document.addEventListener('webkitfullscreenchange', onFsChange);
//     document.addEventListener('mozfullscreenchange', onFsChange);
//     document.addEventListener('MSFullscreenChange', onFsChange);

//     const onKey = (e) => {
//       if (e.key === 'Escape') {
//         setTimeout(() => {
//           const el =
//             document.fullscreenElement ||
//             document.webkitFullscreenElement ||
//             null;
//           setIsFullscreen(Boolean(el));
//         }, 50);
//       }
//     };

//     document.addEventListener('keydown', onKey);

//     return () => {
//       document.removeEventListener('fullscreenchange', onFsChange);
//       document.removeEventListener('webkitfullscreenchange', onFsChange);
//       document.removeEventListener('mozfullscreenchange', onFsChange);
//       document.removeEventListener('MSFullscreenChange', onFsChange);
//       document.removeEventListener('keydown', onKey);
//     };
//   }, []);

//   useEffect(() => {
//     let hls = null;
//     let src = stripHlsAds(show?.streamUrl || '');

//     const setupHls = async () => {
//       if (!src || !src.endsWith('.m3u8')) return;

//       const video = videoRef.current;
//       if (!video) return;

//       const canPlayNative =
//         video.canPlayType('application/vnd.apple.mpegurl') !== '';

//       if (canPlayNative) {
//         video.src = src;
//         video.play().catch(() => {});
//         setIsPlayingHls(true);
//         return;
//       }

//       try {
//         const Hls = (await import('hls.js')).default;
//         if (Hls.isSupported()) {
//           hls = new Hls();
//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//           setIsPlayingHls(true);
//         } else {
//           setIsPlayingHls(false);
//         }
//       } catch {
//         try {
//           video.src = src;
//           video.play().catch(() => {});
//           setIsPlayingHls(true);
//         } catch {
//           setIsPlayingHls(false);
//         }
//       }
//     };

//     setupHls();

//     return () => {
//       if (hls) {
//         try {
//           hls.destroy();
//         } catch {}
//         hls = null;
//       }
//     };
//   }, [show]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     if (isFullscreen) container.style.backgroundColor = 'black';
//     else container.style.backgroundColor = '';
//   }, [isFullscreen]);

//   // AD BLOCKER for iframe
//   useEffect(() => {
//     const interval = setInterval(() => injectAdBlocker(), 600);
//     return () => clearInterval(interval);
//   }, []);

//   const isM3u8 =
//     show.streamUrl &&
//     String(show.streamUrl).toLowerCase().includes('.m3u8');

//   const isDirectMp4 =
//     show.streamUrl &&
//     (String(show.streamUrl).toLowerCase().endsWith('.mp4') ||
//       String(show.streamUrl).toLowerCase().includes('.mp4?'));

//   const styles = {
//     pageWrapper: {
//       width: '100%',
//       minHeight: '100vh',
//       background: '#000',
//       color: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'stretch'
//     },
//     header: {
//       padding: '12px 18px',
//       borderBottom: '1px solid rgba(255,255,255,0.04)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       maxWidth: 1200,
//       margin: '0 auto',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     title: {
//       fontWeight: 700,
//       fontSize: 18,
//       textAlign: 'center',
//       color: '#fff',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       whiteSpace: 'nowrap'
//     },
//     playerArea: {
//       width: '100%',
//       height: 'calc(100vh - 160px)',
//       background: '#000',
//       display: 'flex',
//       alignItems: 'stretch',
//       justifyContent: 'center'
//     },
//     container: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       maxWidth: '1400px'
//     },
//     iframe: {
//       width: '100%',
//       height: '100%',
//       border: 'none',
//       display: 'block',
//       background: '#000',
//       filter: filterStyle
//     },
//     video: {
//       width: '100%',
//       height: '100%',
//       background: '#000',
//       display: 'block',
//       outline: 'none',
//       filter: filterStyle
//     },
//     controlsButton: {
//       position: 'absolute',
//       top: 12,
//       right: 12,
//       zIndex: 9999,
//       background: 'rgba(0,0,0,0.6)',
//       border: '1px solid rgba(255,255,255,0.08)',
//       color: '#fff',
//       padding: '8px 12px',
//       borderRadius: 8,
//       cursor: 'pointer',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 8,
//       fontSize: 14
//     },
//     footer: {
//       padding: '16px 18px',
//       borderTop: '1px solid rgba(255,255,255,0.04)',
//       textAlign: 'center',
//       background: 'rgba(0,0,0,0.85)'
//     },
//     backLink: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: 10,
//       textDecoration: 'none',
//       color: '#fff',
//       padding: '8px 12px',
//       background: 'rgba(255,255,255,0.03)',
//       borderRadius: 6
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Watch {show.title} - Player</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div style={styles.pageWrapper}>

//         {!isFullscreen && (
//           <header style={styles.header}>
//             <div style={styles.title}>{show.title}</div>
//           </header>
//         )}

//         <div style={styles.playerArea}>
//           <div ref={containerRef} style={styles.container}>

//             <button
//               onClick={toggleFullscreen}
//               aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
//               style={styles.controlsButton}
//             >
//               {isFullscreen ? (
//                 <>
//                   <FaCompress /> Exit
//                 </>
//               ) : (
//                 <>
//                   <FaExpand /> Fullscreen
//                 </>
//               )}
//             </button>

//             {isM3u8 || isDirectMp4 ? (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 autoPlay
//                 webkit-playsinline="true"
//                 src={isDirectMp4 ? stripHlsAds(show.streamUrl) : undefined}
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={stripHlsAds(show.streamUrl)}
//                 style={styles.iframe}
//                 allow="autoplay; encrypted-media; picture-in-picture; fullscreen; accelerometer; gyroscope"
//                 allowFullScreen
//                 title={show.title}
//               />
//             )}
//           </div>
//         </div>

//         {!isFullscreen && (
//           <footer style={styles.footer}>
//             <Link href="/schedule" style={styles.backLink}>
//               ← Back to Full Schedule
//             </Link>
//           </footer>
//         )}
//       </div>
//     </>
//   );
// }


// // -----------------------------
// // STATIC GENERATION
// // -----------------------------
// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({ params: { id: show.id } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }




















// pages/player/[id].js
// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import { FaExpand, FaCompress } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const iframeRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // Set viewport height for mobile
//   useEffect(() => {
//     const setVH = () => document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
//     const handleResize = () => {
//       setVH();
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     window.addEventListener("orientationchange", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("orientationchange", handleResize);
//     };
//   }, []);

//   const stripAdParams = (url) => {
//     if (!url) return url;
//     return String(url)
//       .replace(/(\?|&)ads?=[^&]*/gi, "")
//       .replace(/(\?|&)adtag=[^&]*/gi, "")
//       .replace(/(\?|&)ad=[^&]*/gi, "")
//       .replace(/#EXT-X-DISCONTINUITY/gi, "")
//       .replace(/#EXTINF:\d+\.\d+,ad/gi, "");
//   };

//   const enterFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;
//     try {
//       if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     } catch {}
//   };

//   const exitFullscreen = async () => {
//     try {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
//       else if (document.msExitFullscreen) document.msExitFullscreen();
//     } catch {}
//   };

//   const toggleFullscreen = () => {
//     if (isFullscreen) exitFullscreen();
//     else enterFullscreen();
//   };

//   useEffect(() => {
//     const handler = () => {
//       const el =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement;
//       setIsFullscreen(Boolean(el));
//     };
//     document.addEventListener("fullscreenchange", handler);
//     document.addEventListener("webkitfullscreenchange", handler);
//     document.addEventListener("mozfullscreenchange", handler);
//     document.addEventListener("MSFullscreenChange", handler);
//     document.addEventListener("keydown", (e) => e.key === "Escape" && setTimeout(handler, 50));
//     return () => {
//       document.removeEventListener("fullscreenchange", handler);
//       document.removeEventListener("webkitfullscreenchange", handler);
//       document.removeEventListener("mozfullscreenchange", handler);
//       document.removeEventListener("MSFullscreenChange", handler);
//     };
//   }, []);

//   // HLS/MP4 setup
//   useEffect(() => {
//     let hls = null;
//     const src = stripAdParams(show?.streamUrl || "");
//     const video = videoRef.current;
//     if (!video || !src) return;

//     const isHls = src.toLowerCase().includes(".m3u8");
//     const isMp4 = src.toLowerCase().includes(".mp4");

//     const setup = async () => {
//       if (!isHls) {
//         if (isMp4) {
//           video.src = src;
//           await video.play().catch(() => {});
//         }
//         return;
//       }

//       const canPlayNative = video.canPlayType("application/vnd.apple.mpegurl") !== "";
//       if (canPlayNative) {
//         video.src = src;
//         await video.play().catch(() => {});
//         return;
//       }

//       try {
//         const Hls = (await import("hls.js")).default;
//         if (Hls.isSupported()) {
//           hls = new Hls({ enableWorker: true, lowLatencyMode: true });
//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, async () => await video.play().catch(() => {}));
//         } else {
//           video.src = src;
//           await video.play().catch(() => {});
//         }
//       } catch {
//         video.src = src;
//         await video.play().catch(() => {});
//       }
//     };
//     setup();

//     return () => hls && hls.destroy();
//   }, [show]);

//   const rawStream = show?.streamUrl || "";
//   const strippedStream = stripAdParams(rawStream);
//   const isHls = strippedStream.toLowerCase().includes(".m3u8");
//   const isMp4 = strippedStream.toLowerCase().includes(".mp4");

//   // Styles
//   const styles = {
//     page: { width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", overflow: "hidden" },
//     header: { height: 56, display: isFullscreen ? "none" : "flex", alignItems: "center", padding: "0 12px", background: "rgba(0,0,0,0.85)", fontWeight: 700 },
//     title: { margin: "0 auto", fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
//     playerWrap: { flex: "1 1 auto", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" },
//     playerContainer: { width: "100%", height: "100%", position: "relative", maxWidth: "none" },
//     controlsBtn: { position: "absolute", top: 12, right: 12, zIndex: 9999, background: "rgba(0,0,0,0.7)", color: "#fff", padding: "8px 12px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)" },
//     video: { width: "100%", height: "100%", objectFit: "contain", position: "absolute", top: 0, left: 0, background: "#000", filter: filterStyle },
//     iframe: { width: "100%", height: "100%", border: "none", position: "absolute", top: 0, left: 0, background: "#000", filter: filterStyle },
//     footer: { height: 56, display: isFullscreen ? "none" : "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)" },
//     backLink: { color: "#fff", padding: "8px 12px", borderRadius: 6, textDecoration: "none", background: "rgba(255,255,255,0.04)" },
//   };

//   return (
//     <>
//       <Head>
//         <title>{show?.title || "Player"}</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
//       </Head>
//       <div style={styles.page}>
//         <div style={styles.header}>
//           <div style={styles.title}>{show?.title || "Untitled"}</div>
//         </div>

//         <div style={styles.playerWrap}>
//           <div ref={containerRef} style={styles.playerContainer}>
//             <button style={styles.controlsBtn} onClick={toggleFullscreen}>
//               {isFullscreen ? <FaCompress /> : <FaExpand />}
//               {isFullscreen ? "Exit" : "Fullscreen"}
//             </button>

//             {isHls || isMp4 ? (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 webkit-playsinline="true"
//                 src={isMp4 ? strippedStream : undefined}
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={strippedStream}
//                 style={styles.iframe}
//                 allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
//                 allowFullScreen
//                 title={show?.title || "player-iframe"}
//               />
//             )}
//           </div>
//         </div>

//         <div style={styles.footer}>
//           <Link href="/schedule" style={styles.backLink}>
//             ← Back to Full Schedule
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// function normalizeSchedule(s) {
//   if (!s) return [];
//   if (Array.isArray(s)) return s;
//   if (s?.shows) return s.shows;
//   if (s?.default) return s.default;
//   try {
//     const vals = Object.values(s);
//     if (Array.isArray(vals) && vals.length && typeof vals[0] === "object") return vals;
//   } catch {}
//   return [];
// }

// export async function getStaticPaths() {
//   const list = normalizeSchedule(schedule);
//   const paths = list.map((item) => ({ params: { id: String(item.id) } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const list = normalizeSchedule(schedule);
//   const show = list.find((item) => String(item.id) === String(params.id));
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 30 };
// }









import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import rawSchedule from "../../data/schedules.json";
import { FaExpand, FaCompress } from "react-icons/fa";

// FILTER EFFECT
const filterStyle =
  "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

// NORMALIZE SCHEDULE FORMAT
function normalizeSchedule(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw.data && Array.isArray(raw.data)) return raw.data;
  if (raw.shows && Array.isArray(raw.shows)) return raw.shows;

  try {
    const vals = Object.values(raw).filter((v) => Array.isArray(v));
    if (vals.length === 1) return vals[0];
    if (vals.length > 1) return vals.flat();
  } catch {}

  return [];
}

const schedule = normalizeSchedule(rawSchedule);

// STREAM URL RESOLVER
function findStreamUrlFromShow(show) {
  if (!show || typeof show !== "object") return null;

  const candidates = [
    "streamUrl",
    "stream_url",
    "streamURL",
    "stream",
    "url",
    "src",
    "source",
    "m3u8",
    "file",
    "link"
  ];

  for (const key of candidates) {
    if (show[key] && typeof show[key] === "string") return show[key];
  }

  for (const val of Object.values(show)) {
    if (val && typeof val === "object") {
      for (const key of candidates) {
        if (val[key] && typeof val[key] === "string") return val[key];
      }
    }
  }

  return null;
}

// REMOVE AD PARAMS
function stripAdParams(url) {
  if (!url || typeof url !== "string") return url || "";
  return String(url)
    .replace(/(\?|&)ads?=[^&]*/gi, "")
    .replace(/(\?|&)adtag=[^&]*/gi, "")
    .replace(/(\?|&)ad=[^&]*/gi, "")
    .replace(/#EXT-X-DISCONTINUITY/gi, "")
    .replace(/#EXTINF:\d+\.\d+,ad/gi, "");
}

// DETECT ANDROID WEBVIEW
function isAndroidWebView() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Android/i.test(ua) && /wv/i.test(ua);
}

export default function PlayerPage({ show, requestedId }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  const [streamUrl, setStreamUrl] = useState(null);
  const [forceVideoFallback, setForceVideoFallback] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // RESOLVE STREAM URL
  useEffect(() => {
    let candidate = findStreamUrlFromShow(show);

    if (!candidate && typeof show === "string") candidate = show;

    if (!candidate && requestedId) {
      const fallback = schedule.find(
        (s) => String(s?.id) === String(requestedId)
      );
      if (fallback) candidate = findStreamUrlFromShow(fallback);
    }

    setStreamUrl(candidate ? stripAdParams(candidate) : null);
  }, [show, requestedId]);

  // SMART AUTO MODE: Decide video or iframe
  const cleanedUrl = streamUrl || "";

  const isMp4 = /\.mp4($|\?)/i.test(cleanedUrl);
  const isM3u8 = /\.m3u8($|\?)/i.test(cleanedUrl);

  const isVideoType = isMp4 || isM3u8;
  const isAndroidWV = isAndroidWebView();

  // FULLSCREEN
  const enterFS = async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } catch {}
  };

  const exitFS = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } catch {}
  };

  const toggleFS = () => {
    isFullscreen ? exitFS() : enterFS();
  };

  useEffect(() => {
    const detect = () => {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement || document.webkitFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", detect);
    document.addEventListener("webkitfullscreenchange", detect);

    return () => {
      document.removeEventListener("fullscreenchange", detect);
      document.removeEventListener("webkitfullscreenchange", detect);
    };
  }, []);

  // LOAD VIDEO STREAM
  useEffect(() => {
    if (!isVideoType || forceVideoFallback) return;

    const video = videoRef.current;
    if (!video) return;

    let hls = null;

    const load = async () => {
      if (isMp4) {
        video.src = cleanedUrl;
        video.style.filter = filterStyle;
        video.play().catch(() => {});
        return;
      }

      if (isM3u8) {
        const native = video.canPlayType("application/vnd.apple.mpegurl");

        if (native) {
          video.src = cleanedUrl;
          video.style.filter = filterStyle;
          video.play().catch(() => {});
          return;
        }

        try {
          const Hls = (await import("hls.js")).default;
          if (Hls.isSupported()) {
            hls = new Hls({ enableWorker: true });
            hls.loadSource(cleanedUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.style.filter = filterStyle;
              video.play().catch(() => {});
            });

            return;
          }
        } catch {}

        video.src = cleanedUrl;
        video.style.filter = filterStyle;
        video.play().catch(() => {});
      }
    };

    load();

    return () => {
      if (hls) {
        try {
          hls.destroy();
        } catch {}
      }
    };
  }, [cleanedUrl, isVideoType, forceVideoFallback]);

  // IFRAME CONFIG + FAILSAFE
  useEffect(() => {
    if (isVideoType) return;

    const el = iframeRef.current;
    if (!el) return;

    el.removeAttribute("sandbox");
    el.setAttribute(
      "allow",
      "autoplay; fullscreen; encrypted-media; picture-in-picture"
    );
    el.setAttribute("allowfullscreen", "true");

    const timer = setTimeout(() => {
      if (!el.contentWindow) {
        setForceVideoFallback(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [cleanedUrl, isVideoType]);

  const shouldUseVideo =
    isVideoType || forceVideoFallback || isAndroidWV;

  const styles = {
    page: {
      width: "100vw",
      height: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    },
    header: {
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      background: "rgba(0,0,0,0.8)",
      fontWeight: "bold"
    },
    playerWrap: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    container: {
      width: "100%",
      height: "100%",
      position: "relative"
    },
    video: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      background: "#000",
      filter: filterStyle
    },
    iframe: {
      width: "100%",
      height: "100%",
      border: "none",
      background: "#000"
    },
    footer: {
      height: 56,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(0,0,0,0.8)"
    },
    back: {
      color: "#fff",
      textDecoration: "none",
      padding: "8px 12px",
      borderRadius: 6,
      background: "rgba(255,255,255,0.07)"
    },
    fsBtn: {
      position: "absolute",
      top: 12,
      right: 12,
      background: "rgba(0,0,0,0.55)",
      padding: "8px 12px",
      borderRadius: 8,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.08)",
      zIndex: 9999
    }
  };

  return (
    <>
      <Head>
        <title>{show?.title || "Player"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.page}>
        <div style={styles.header}>{show?.title || "Player"}</div>

        <div style={styles.playerWrap}>
          <div ref={containerRef} style={styles.container}>
            <button style={styles.fsBtn} onClick={toggleFS}>
              {isFullscreen ? <FaCompress /> : <FaExpand />}{" "}
              {isFullscreen ? "Exit" : "Fullscreen"}
            </button>

            {!cleanedUrl ? (
              <div style={{ color: "#fff", textAlign: "center", padding: 20 }}>
                Stream not available.
              </div>
            ) : shouldUseVideo ? (
              <video
                ref={videoRef}
                controls
                playsInline
                webkit-playsinline="true"
                style={styles.video}
              />
            ) : (
              <iframe ref={iframeRef} src={cleanedUrl} style={styles.iframe} />
            )}
          </div>
        </div>

        <div style={styles.footer}>
          <Link href="/schedules" style={styles.back}>
            ← Back to Schedule
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = schedule.map((item) => ({
    params: { id: String(item.id) }
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  let show = null;

  try {
    show = schedule.find((s) => String(s.id) === String(params.id));
    if (!show && rawSchedule[params.id]) show = rawSchedule[params.id];
  } catch {}

  return {
    props: { show: show || null, requestedId: params.id },
    revalidate: 30
  };
}
