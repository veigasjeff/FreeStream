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
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import schedule from "../../data/schedules.json";
import { FaExpand, FaCompress } from "react-icons/fa";

export default function PlayerPage({ show }) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHlsPlaying, setIsHlsPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const filterStyle =
    "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    
    const handleResize = () => {
      setVH();
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const stripAdParams = (url) => {
    if (!url) return url;
    return String(url)
      .replace(/(\?|&)ads?=[^&]*/gi, "")
      .replace(/(\?|&)adtag=[^&]*/gi, "")
      .replace(/(\?|&)ad=[^&]*/gi, "")
      .replace(/#EXT-X-DISCONTINUITY/gi, "")
      .replace(/#EXTINF:\d+\.\d+,ad/gi, "");
  };

  const enterFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } catch {}
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    } catch {}
  };

  const toggleFullscreen = () => {
    if (isFullscreen) exitFullscreen();
    else enterFullscreen();
  };

  useEffect(() => {
    const handler = () => {
      const el =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(Boolean(el));
    };

    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    document.addEventListener("mozfullscreenchange", handler);
    document.addEventListener("MSFullscreenChange", handler);

    const onKey = (e) => {
      if (e.key === "Escape") {
        setTimeout(handler, 50);
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
      document.removeEventListener("mozfullscreenchange", handler);
      document.removeEventListener("MSFullscreenChange", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    let hls = null;
    const raw = show?.streamUrl || "";
    const src = stripAdParams(raw);

    const setup = async () => {
      if (!src) return;
      const video = videoRef.current;
      if (!video) return;

      const isHls = src.toLowerCase().includes(".m3u8");
      if (!isHls) {
        try {
          video.src = src;
          await video.play().catch(() => {});
        } catch {}
        setIsHlsPlaying(false);
        return;
      }

      const canPlayNative = video.canPlayType("application/vnd.apple.mpegurl") !== "";
      if (canPlayNative) {
        video.src = src;
        try {
          await video.play().catch(() => {});
        } catch {}
        setIsHlsPlaying(true);
        return;
      }

      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, async () => {
            try {
              await video.play().catch(() => {});
            } catch {}
          });
          setIsHlsPlaying(true);
        } else {
          video.src = src;
          try {
            await video.play().catch(() => {});
          } catch {}
          setIsHlsPlaying(true);
        }
      } catch {
        try {
          video.src = src;
          await video.play().catch(() => {});
        } catch {}
        setIsHlsPlaying(false);
      }
    };

    setup();

    return () => {
      if (hls) {
        try {
          hls.destroy();
        } catch {}
        hls = null;
      }
    };
  }, [show]);

  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      e.preventDefault();
      if (e) e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnloadHandler, { passive: false });

    return () =>
      window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, []);

  const rawStream = show?.streamUrl || "";
  const strippedStream = stripAdParams(rawStream);
  const isHls = strippedStream.toLowerCase().includes(".m3u8");
  const isMp4 = strippedStream.toLowerCase().includes(".mp4");

  // Responsive calculations
  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width <= 1024;
  const aspectRatio = windowSize.width / windowSize.height;
  
  // Responsive font sizes
  const titleFontSize = isMobile ? '14px' : (isTablet ? '15px' : '16px');
  const buttonFontSize = isMobile ? '12px' : '14px';
  const backLinkFontSize = isMobile ? '14px' : '16px';
  
  // Responsive dimensions
  const headerHeight = isMobile ? '48px' : '56px';
  const footerHeight = isMobile ? '48px' : '56px';
  const buttonPadding = isMobile ? '6px 10px' : '8px 12px';
  const buttonGap = isMobile ? '6px' : '8px';
  const borderRadius = isMobile ? '6px' : '8px';
  
  // Responsive max-width for player container
  const playerMaxWidth = isMobile ? '100%' : (isTablet ? '100%' : '1400px');
  
  // Responsive controls button position
  const buttonTop = isMobile ? '8px' : '12px';
  const buttonRight = isMobile ? '8px' : '12px';

  const styles = {
    page: {
      width: "100vw",
      minHeight: "100vh",
      minHeight: "calc(var(--vh, 1vh) * 100)",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    },
    header: {
      height: headerHeight,
      minHeight: headerHeight,
      display: "flex",
      alignItems: "center",
      padding: isMobile ? "0 8px" : "0 12px",
      background: "rgba(0,0,0,0.85)",
      fontWeight: 700,
      flexShrink: 0,
    },
    title: {
      margin: "0 auto",
      fontSize: titleFontSize,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: isMobile ? "calc(100vw - 100px)" : "calc(100vw - 200px)",
      padding: isMobile ? "0 4px" : "0",
      textAlign: "center",
    },
    playerWrap: {
      width: "100%",
      flex: "1 1 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      minHeight: isMobile ? "calc(100vh - 96px)" : "calc(100vh - 112px)",
      minHeight: isMobile ? "calc((var(--vh, 1vh) * 100) - 96px)" : "calc((var(--vh, 1vh) * 100) - 112px)",
      overflow: "hidden",
    },
    playerContainer: {
      width: "100%",
      maxWidth: playerMaxWidth,
      height: "100%",
      position: "relative",
      aspectRatio: isMobile ? (aspectRatio > 1.5 ? "16/9" : "9/16") : "16/9",
      maxHeight: isMobile ? "calc(100vh - 96px)" : "calc(100vh - 112px)",
      margin: "0 auto",
    },
    controlsBtn: {
      position: "absolute",
      top: buttonTop,
      right: buttonRight,
      zIndex: 9999,
      background: "rgba(0,0,0,0.7)",
      color: "#fff",
      padding: buttonPadding,
      borderRadius: borderRadius,
      display: "flex",
      alignItems: "center",
      gap: buttonGap,
      fontSize: buttonFontSize,
      cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.1)",
      minWidth: isMobile ? "auto" : "100px",
      justifyContent: "center",
      transition: "all 0.2s ease",
    },
    video: {
      width: "100%",
      height: "100%",
      background: "#000",
      filter: filterStyle,
      objectFit: "contain",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
    },
    iframe: {
      width: "100%",
      height: "100%",
      border: "none",
      background: "#000",
      filter: filterStyle,
      position: "absolute",
      top: 0,
      left: 0,
    },
    footer: {
      height: footerHeight,
      minHeight: footerHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.85)",
      flexShrink: 0,
      padding: isMobile ? "0 8px" : "0",
    },
    backLink: {
      color: "#fff",
      padding: isMobile ? "6px 10px" : "8px 12px",
      borderRadius: borderRadius,
      textDecoration: "none",
      background: "rgba(255,255,255,0.04)",
      fontSize: backLinkFontSize,
      textAlign: "center",
      border: "1px solid rgba(255,255,255,0.1)",
      transition: "all 0.2s ease",
      width: isMobile ? "90%" : "auto",
      maxWidth: "300px",
    },
  };

  // Add responsive style for very small screens
  if (windowSize.width <= 480) {
    styles.title.fontSize = '13px';
    styles.title.maxWidth = 'calc(100vw - 80px)';
    styles.controlsBtn.gap = '4px';
    styles.controlsBtn.padding = '4px 8px';
    styles.backLink.padding = '4px 8px';
  }

  // Add responsive style for large screens
  if (windowSize.width > 1600) {
    styles.title.fontSize = '18px';
    styles.buttonFontSize = '16px';
    styles.backLinkFontSize = '18px';
  }

  return (
    <>
      <Head>
        <title>{show?.title || "Player"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no" />
        <style>{`
          @media (max-width: 480px) {
            * {
              -webkit-tap-highlight-color: transparent;
            }
          }
          @media (hover: hover) {
            button:hover {
              background: rgba(0,0,0,0.85) !important;
            }
            a:hover {
              background: rgba(255,255,255,0.08) !important;
            }
          }
        `}</style>
      </Head>

      <div style={styles.page}>
        {!isFullscreen && (
          <div style={styles.header}>
            <div style={styles.title}>{show?.title || "Untitled"}</div>
          </div>
        )}

        <div style={styles.playerWrap}>
          <div ref={containerRef} style={styles.playerContainer}>
            <button 
              style={styles.controlsBtn} 
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
              <span style={{ whiteSpace: 'nowrap' }}>
                {isFullscreen ? "Exit" : "Fullscreen"}
              </span>
            </button>

            {isHls || isMp4 ? (
              <video
                ref={videoRef}
                style={styles.video}
                controls
                playsInline
                webkit-playsinline="true"
                src={isMp4 ? strippedStream : undefined}
                onError={(e) => console.error("Video error:", e)}
              />
            ) : (
              <iframe
                ref={iframeRef}
                src={strippedStream}
                style={styles.iframe}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={show?.title || "player-iframe"}
                loading="eager"
              />
            )}
          </div>
        </div>

        {!isFullscreen && (
          <div style={styles.footer}>
            <Link href="/schedule" style={styles.backLink}>
              ← Back to Full Schedule
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function normalizeSchedule(s) {
  if (!s) return [];
  if (Array.isArray(s)) return s;
  if (s && Array.isArray(s.shows)) return s.shows;
  if (s && Array.isArray(s.default)) return s.default;
  try {
    const vals = Object.values(s);
    if (Array.isArray(vals) && vals.length && typeof vals[0] === "object") return vals;
  } catch {}
  return [];
}

export async function getStaticPaths() {
  const list = normalizeSchedule(schedule);
  const paths = list.map((item) => ({ params: { id: String(item.id) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const list = normalizeSchedule(schedule);
  const show = list.find((item) => String(item.id) === String(params.id));
  if (!show) return { notFound: true };
  return { props: { show }, revalidate: 30 };
}