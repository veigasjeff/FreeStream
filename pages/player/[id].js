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




















// // pages/player/[id].js
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
//     let cleanUrl = String(url);

//     const adParams = [
//       "ads?", "adtag", "adunit", "advertise", "advertising", "adprovider",
//       "adserver", "adnetwork", "adbanner", "adplacement", "adclick", "adid",
//       "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
//       "gclid", "fbclid", "msclkid", "dclid", "irclickid", "irgwc", "irpid",
//       "iradid", "ircid", "trk", "tracking", "ref", "referrer", "clickid", "cid",
//       "pubid", "zoneid", "bannerid", "partnerid", "source", "affid"
//     ];

//     adParams.forEach((param) => {
//       const regex = new RegExp(`([?&])${param}=[^&]*`, "gi");
//       cleanUrl = cleanUrl.replace(regex, (match, p1) => (p1 === "?" ? "?" : ""));
//     });

//     cleanUrl = cleanUrl
//       .replace(/#EXT-X-DISCONTINUITY/gi, "")
//       .replace(/#EXTINF:\d+\.\d+,ad/gi, "")
//       .replace(/#EXT-X-CUE-OUT/gi, "")
//       .replace(/#EXT-X-CUE-IN/gi, "")
//       .replace(/#EXT-X-SPLICEPOINT/gi, "");

//     cleanUrl = cleanUrl.replace(/\?\?/g, "?").replace(/\?\&/g, "?").replace(/\&\&/g, "&").replace(/\?$/, "").replace(/\&$/, "");
//     if (cleanUrl.indexOf("?") === 0 && cleanUrl.indexOf("=") === -1) cleanUrl = cleanUrl.substring(1);
//     return cleanUrl;
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

//   const toggleFullscreen = () => (isFullscreen ? exitFullscreen() : enterFullscreen());

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

//     // Prevent unmute popup ads
//     const unmuteHandler = (e) => {
//       e.stopPropagation();
//       e.preventDefault();
//       video.muted = false;
//       video.volume = 1; // ensure full volume
//       video.play().catch(() => {});
//     };

//     video.addEventListener("click", unmuteHandler);
//     return () => {
//       hls && hls.destroy();
//       video.removeEventListener("click", unmuteHandler);
//     };
//   }, [show]);

//   const rawStream = show?.streamUrl || "";
//   const strippedStream = stripAdParams(rawStream);
//   const isHls = strippedStream.toLowerCase().includes(".m3u8");
//   const isMp4 = strippedStream.toLowerCase().includes(".mp4");

//   const styles = {
//     page: { width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", overflow: "hidden" },
//     header: { height: 56, display: "flex", alignItems: "center", padding: "0 12px", background: "rgba(0,0,0,0.85)", fontWeight: 700 },
//     title: { margin: "0 auto", fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#fff" },
//     playerWrap: { flex: "1 1 auto", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" },
//     playerContainer: { width: "100%", height: "100%", position: "relative", maxWidth: "none" },
//     controlsBtn: { position: "absolute", top: 12, right: 12, zIndex: 9999, background: "rgba(0,0,0,0.7)", color: "#fff", padding: "8px 12px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)" },
//     video: { width: "100%", height: "100%", objectFit: "contain", position: "absolute", top: 0, left: 0, background: "#000", filter: filterStyle },
//     iframe: { width: "100%", height: "100%", border: "none", position: "absolute", top: 0, left: 0, background: "#000", filter: filterStyle },
//     footer: { height: 56, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)" },
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















// // pages/player/[id].js
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

//   const filterStyle =
//     "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // Set viewport height for mobile
//   useEffect(() => {
//     const setVH = () =>
//       document.documentElement.style.setProperty(
//         "--vh",
//         `${window.innerHeight * 0.01}px`
//       );

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

//   // Strip ad parameters from URL
//   const stripAdParams = (url) => {
//     if (!url) return url;
//     let cleanUrl = String(url);

//     const adParams = [
//       "ads?", "adtag", "adunit", "advertise", "advertising", "adprovider", "adserver", "adnetwork", "adbanner",
//       "adplacement", "adclick", "adid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
//       "gclid", "fbclid", "msclkid", "dclid", "irclickid", "irgwc", "irpid", "iradid", "ircid",
//     ];

//     adParams.forEach((param) => {
//       const regex = new RegExp(`([?&])${param}=[^&]*`, "gi");
//       cleanUrl = cleanUrl.replace(regex, (match, p1) =>
//         p1 === "?" ? "?" : ""
//       );
//     });

//     cleanUrl = cleanUrl
//       .replace(/#EXT-X-DISCONTINUITY/gi, "")
//       .replace(/#EXTINF:\d+\.\d+,ad/gi, "")
//       .replace(/#EXT-X-CUE-OUT/gi, "")
//       .replace(/#EXT-X-CUE-IN/gi, "")
//       .replace(/#EXT-X-SPLICEPOINT/gi, "");

//     cleanUrl = cleanUrl
//       .replace(/\?\?/g, "?")
//       .replace(/\?\&/g, "?")
//       .replace(/\&\&/g, "&")
//       .replace(/\?$/, "")
//       .replace(/\&$/, "");

//     if (cleanUrl.indexOf("?") === 0 && cleanUrl.indexOf("=") === -1)
//       cleanUrl = cleanUrl.substring(1);

//     return cleanUrl;
//   };

//   // FULLSCREEN
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

//   const toggleFullscreen = () =>
//     isFullscreen ? exitFullscreen() : enterFullscreen();

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
//     document.addEventListener("keydown", (e) => {
//       if (e.key === "Escape") setTimeout(handler, 50);
//     });

//     return () => {
//       document.removeEventListener("fullscreenchange", handler);
//       document.removeEventListener("webkitfullscreenchange", handler);
//       document.removeEventListener("mozfullscreenchange", handler);
//       document.removeEventListener("MSFullscreenChange", handler);
//     };
//   }, []);

//   // HLS/MP4 SETUP + POPUP BLOCK FOR UNMUTE CLICK
//   useEffect(() => {
//     let hls = null;
//     const src = stripAdParams(show?.streamUrl || "");
//     const video = videoRef.current;
//     if (!video || !src) return;

//     const isHls = src.toLowerCase().includes(".m3u8");
//     const isMp4 = src.toLowerCase().includes(".mp4");

//     const init = async () => {
//       if (!isHls) {
//         if (isMp4) {
//           video.src = src;
//           await video.play().catch(() => {});
//         }
//         return;
//       }

//       const canPlayNative =
//         video.canPlayType("application/vnd.apple.mpegurl") !== "";

//       if (canPlayNative) {
//         video.src = src;
//         await video.play().catch(() => {});
//         return;
//       }

//       try {
//         const Hls = (await import("hls.js")).default;

//         if (Hls.isSupported()) {
//           hls = new Hls({
//             enableWorker: true,
//             lowLatencyMode: true,
//           });

//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, async () => {
//             await video.play().catch(() => {});
//           });
//         } else {
//           video.src = src;
//           await video.play().catch(() => {});
//         }
//       } catch {
//         video.src = src;
//         await video.play().catch(() => {});
//       }
//     };

//     init();

//     // POPUP BLOCKER FOR UNMUTE CLICK
//     const unmuteClick = (e) => {
//       e.preventDefault();
//       e.stopPropagation();

//       const original = window.open;
//       window.open = () => null;

//       setTimeout(() => {
//         window.open = original;
//       }, 400);

//       video.muted = false;
//       video.volume = 1;

//       video.play().catch(() => {});
//     };

//     video.addEventListener("click", unmuteClick);

//     return () => {
//       if (hls) hls.destroy();
//       video.removeEventListener("click", unmuteClick);
//     };
//   }, [show]);

//   const raw = show?.streamUrl || "";
//   const cleaned = stripAdParams(raw);
//   const isHls = cleaned.toLowerCase().includes(".m3u8");
//   const isMp4 = cleaned.toLowerCase().includes(".mp4");

//   const styles = {
//     page: {
//       width: "100vw",
//       height: "100vh",
//       background: "#000",
//       display: "flex",
//       flexDirection: "column",
//       overflow: "hidden",
//     },
//     header: {
//       height: 56,
//       display: "flex",
//       alignItems: "center",
//       padding: "0 12px",
//       background: "rgba(0,0,0,0.85)",
//       fontWeight: 700,
//     },
//     title: {
//       margin: "0 auto",
//       fontSize: 16,
//       whiteSpace: "nowrap",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       color: "#fff",
//     },
//     playerWrap: {
//       flex: "1 1 auto",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       position: "relative",
//     },
//     playerContainer: {
//       width: "100%",
//       height: "100%",
//       position: "relative",
//       maxWidth: "none",
//     },
//     controlsBtn: {
//       position: "absolute",
//       top: 12,
//       right: 12,
//       zIndex: 9999,
//       background: "rgba(0,0,0,0.7)",
//       color: "#fff",
//       padding: "8px 12px",
//       borderRadius: 8,
//       display: "flex",
//       alignItems: "center",
//       gap: 8,
//       fontSize: 14,
//       cursor: "pointer",
//       border: "1px solid rgba(255,255,255,0.1)",
//     },
//     video: {
//       width: "100%",
//       height: "100%",
//       objectFit: "contain",
//       position: "absolute",
//       top: 0,
//       left: 0,
//       background: "#000",
//       filter: filterStyle,
//     },
//     iframe: {
//       width: "100%",
//       height: "100%",
//       border: "none",
//       position: "absolute",
//       top: 0,
//       left: 0,
//       background: "#000",
//       filter: filterStyle,
//     },
//     footer: {
//       height: 56,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "rgba(0,0,0,0.85)",
//     },
//     backLink: {
//       color: "#fff",
//       padding: "8px 12px",
//       borderRadius: 6,
//       textDecoration: "none",
//       background: "rgba(255,255,255,0.04)",
//     },
//   };

//   return (
//     <>
//       <Head>
//         <title>{show?.title || "Player"}</title>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, viewport-fit=cover"
//         />
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
//                 unmuted
//                 src={isMp4 ? cleaned : undefined}
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={cleaned}
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
//     if (Array.isArray(vals) && vals.length && typeof vals[0] === "object")
//       return vals;
//   } catch {}
//   return [];
// }

// export async function getStaticPaths() {
//   const list = normalizeSchedule(schedule);
//   const paths = list.map((item) => ({
//     params: { id: String(item.id) },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const list = normalizeSchedule(schedule);
//   const show = list.find(
//     (item) => String(item.id) === String(params.id)
//   );
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 30 };
// }









// FINAL VERSION

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
//   const [isAudioEnabled, setIsAudioEnabled] = useState(false);

//   const filterStyle =
//     "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // Persistent popup blocker - active for entire component lifecycle
//   useEffect(() => {
//     // Store original functions
//     const originalOpen = window.open;
//     const originalAlert = window.alert;
//     const originalConfirm = window.confirm;
//     const originalBeforeUnload = window.onbeforeunload;
    
//     // Block all popup methods
//     window.open = function() {
//       console.log("Popup blocked by player");
//       return null;
//     };
    
//     window.alert = function() {
//       console.log("Alert blocked by player");
//       return undefined;
//     };
    
//     window.confirm = function() {
//       console.log("Confirm dialog blocked by player");
//       return false;
//     };
    
//     // Prevent beforeunload popups
//     window.onbeforeunload = null;
    
//     // Also block iframe contentWindow methods
//     const blockIframePopups = () => {
//       if (iframeRef.current && iframeRef.current.contentWindow) {
//         try {
//           iframeRef.current.contentWindow.open = function() { return null; };
//           iframeRef.current.contentWindow.alert = function() { return undefined; };
//           iframeRef.current.contentWindow.confirm = function() { return false; };
//         } catch (e) {
//           // Cross-origin restrictions may prevent this
//         }
//       }
//     };
    
//     // Cleanup on unmount
//     return () => {
//       window.open = originalOpen;
//       window.alert = originalAlert;
//       window.confirm = originalConfirm;
//       window.onbeforeunload = originalBeforeUnload;
//     };
//   }, []);

//   // Enhanced unmute function with comprehensive popup blocking
//   const enableAudio = () => {
//     const video = videoRef.current;
//     if (!video) return;
    
//     // Force mute state off and volume up
//     video.muted = false;
//     video.volume = 1.0;
//     setIsAudioEnabled(true);
    
//     // Try to play
//     video.play().catch(err => {
//       console.log("Auto-play prevented, user interaction required:", err);
//     });
//   };

//   // Set viewport height for mobile
//   useEffect(() => {
//     const setVH = () =>
//       document.documentElement.style.setProperty(
//         "--vh",
//         `${window.innerHeight * 0.01}px`
//       );

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

//   // Strip ad parameters from URL
//   const stripAdParams = (url) => {
//     if (!url) return url;
//     let cleanUrl = String(url);

//     const adParams = [
//       "ads?", "adtag", "adunit", "advertise", "advertising", "adprovider", "adserver", "adnetwork", "adbanner",
//       "adplacement", "adclick", "adid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
//       "gclid", "fbclid", "msclkid", "dclid", "irclickid", "irgwc", "irpid", "iradid", "ircid",
//     ];

//     adParams.forEach((param) => {
//       const regex = new RegExp(`([?&])${param}=[^&]*`, "gi");
//       cleanUrl = cleanUrl.replace(regex, (match, p1) =>
//         p1 === "?" ? "?" : ""
//       );
//     });

//     cleanUrl = cleanUrl
//       .replace(/#EXT-X-DISCONTINUITY/gi, "")
//       .replace(/#EXTINF:\d+\.\d+,ad/gi, "")
//       .replace(/#EXT-X-CUE-OUT/gi, "")
//       .replace(/#EXT-X-CUE-IN/gi, "")
//       .replace(/#EXT-X-SPLICEPOINT/gi, "");

//     cleanUrl = cleanUrl
//       .replace(/\?\?/g, "?")
//       .replace(/\?\&/g, "?")
//       .replace(/\&\&/g, "&")
//       .replace(/\?$/, "")
//       .replace(/\&$/, "");

//     if (cleanUrl.indexOf("?") === 0 && cleanUrl.indexOf("=") === -1)
//       cleanUrl = cleanUrl.substring(1);

//     return cleanUrl;
//   };

//   // FULLSCREEN
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

//   const toggleFullscreen = () =>
//     isFullscreen ? exitFullscreen() : enterFullscreen();

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
//     document.addEventListener("keydown", (e) => {
//       if (e.key === "Escape") setTimeout(handler, 50);
//     });

//     return () => {
//       document.removeEventListener("fullscreenchange", handler);
//       document.removeEventListener("webkitfullscreenchange", handler);
//       document.removeEventListener("mozfullscreenchange", handler);
//       document.removeEventListener("MSFullscreenChange", handler);
//     };
//   }, []);

//   // HLS/MP4 SETUP
//   useEffect(() => {
//     let hls = null;
//     const src = stripAdParams(show?.streamUrl || "");
//     const video = videoRef.current;
//     if (!video || !src) return;

//     const isHls = src.toLowerCase().includes(".m3u8");
//     const isMp4 = src.toLowerCase().includes(".mp4");

//     const init = async () => {
//       if (!isHls) {
//         if (isMp4) {
//           video.src = src;
//           await video.play().catch(() => {});
//         }
//         return;
//       }

//       const canPlayNative =
//         video.canPlayType("application/vnd.apple.mpegurl") !== "";

//       if (canPlayNative) {
//         video.src = src;
//         await video.play().catch(() => {});
//         return;
//       }

//       try {
//         const Hls = (await import("hls.js")).default;

//         if (Hls.isSupported()) {
//           hls = new Hls({
//             enableWorker: true,
//             lowLatencyMode: true,
//           });

//           hls.loadSource(src);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, async () => {
//             await video.play().catch(() => {});
//           });
//         } else {
//           video.src = src;
//           await video.play().catch(() => {});
//         }
//       } catch {
//         video.src = src;
//         await video.play().catch(() => {});
//       }
//     };

//     init();

//     return () => {
//       if (hls) hls.destroy();
//     };
//   }, [show]);

//   const raw = show?.streamUrl || "";
//   const cleaned = stripAdParams(raw);
//   const isHls = cleaned.toLowerCase().includes(".m3u8");
//   const isMp4 = cleaned.toLowerCase().includes(".mp4");

//   const styles = {
//     page: {
//       width: "100vw",
//       height: "100vh",
//       background: "#000",
//       display: "flex",
//       flexDirection: "column",
//       overflow: "hidden",
//     },
//     header: {
//       height: 56,
//       display: "flex",
//       alignItems: "center",
//       padding: "0 12px",
//       background: "rgba(0,0,0,0.85)",
//       fontWeight: 700,
//     },
//     title: {
//       margin: "0 auto",
//       fontSize: 16,
//       whiteSpace: "nowrap",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       color: "#fff",
//     },
//     playerWrap: {
//       flex: "1 1 auto",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       position: "relative",
//     },
//     playerContainer: {
//       width: "100%",
//       height: "100%",
//       position: "relative",
//       maxWidth: "none",
//     },
//     controlsBtn: {
//       position: "absolute",
//       top: 12,
//       right: 12,
//       zIndex: 9999,
//       background: "rgba(0,0,0,0.7)",
//       color: "#fff",
//       padding: "8px 12px",
//       borderRadius: 8,
//       display: "flex",
//       alignItems: "center",
//       gap: 8,
//       fontSize: 14,
//       cursor: "pointer",
//       border: "1px solid rgba(255,255,255,0.1)",
//     },
//     unmuteBtn: {
//       position: "absolute",
//       top: 12,
//       left: 12,
//       zIndex: 9999,
//       background: isAudioEnabled ? "#4CAF50" : "#f44336",
//       color: "#fff",
//       padding: "8px 12px",
//       borderRadius: 8,
//       display: "flex",
//       alignItems: "center",
//       gap: 8,
//       fontSize: 14,
//       cursor: "pointer",
//       border: "none",
//       fontWeight: "bold",
//     },
//     video: {
//       width: "100%",
//       height: "100%",
//       objectFit: "contain",
//       position: "absolute",
//       top: 0,
//       left: 0,
//       background: "#000",
//       filter: filterStyle,
//     },
//     iframe: {
//       width: "100%",
//       height: "100%",
//       border: "none",
//       position: "absolute",
//       top: 0,
//       left: 0,
//       background: "#000",
//       filter: filterStyle,
//     },
//     footer: {
//       height: 56,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "rgba(0,0,0,0.85)",
//     },
//     backLink: {
//       color: "#fff",
//       padding: "8px 12px",
//       borderRadius: 6,
//       textDecoration: "none",
//       background: "rgba(255,255,255,0.04)",
//     },
//   };

//   return (
//     <>
//       <Head>
//         <title>{show?.title || "Player"}</title>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, viewport-fit=cover"
//         />
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

//             {(isHls || isMp4) && (
//               <button style={styles.unmuteBtn} onClick={enableAudio}>
//                 {isAudioEnabled ? "🔊 Audio ON" : "🔇 Enable Audio"}
//               </button>
//             )}

//             {isHls || isMp4 ? (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 webkit-playsinline="true"
//                 muted={!isAudioEnabled}
//                 src={isMp4 ? cleaned : undefined}
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={cleaned}
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
//     if (Array.isArray(vals) && vals.length && typeof vals[0] === "object")
//       return vals;
//   } catch {}
//   return [];
// }

// export async function getStaticPaths() {
//   const list = normalizeSchedule(schedule);
//   const paths = list.map((item) => ({
//     params: { id: String(item.id) },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const list = normalizeSchedule(schedule);
//   const show = list.find(
//     (item) => String(item.id) === String(params.id)
//   );
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 30 };
// }











// pages/player/[id].js
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import schedule from "../../data/schedules.json";
import { FaExpand, FaCompress } from "react-icons/fa";

export default function PlayerPage({ show }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const [lastError, setLastError] = useState(null);

  const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

  // Utility: sanitize and short-validate a URL
  const normalizeUrl = (u) => {
    if (!u) return "";
    try {
      const url = new URL(String(u));
      if (url.protocol !== "http:" && url.protocol !== "https:") return "";
      return url.toString();
    } catch (e) {
      return "";
    }
  };

  // Attempt to remove sandbox attribute (fast attempt; may fail if injected natively)
  useEffect(() => {
    const id = setInterval(() => {
      const iframe = iframeRef.current;
      if (iframe) {
        try {
          iframe.removeAttribute("sandbox");
          iframe.setAttribute("allow", "*");
          iframe.setAttribute("referrerPolicy", "no-referrer");
        } catch (e) {}
      }
    }, 200);
    return () => clearInterval(id);
  }, []);

  // Force-block common popup methods (safety)
  useEffect(() => {
    const originalOpen = window.open;
    const originalAlert = window.alert;
    const originalConfirm = window.confirm;
    window.open = () => null;
    window.alert = () => undefined;
    window.confirm = () => false;
    return () => {
      window.open = originalOpen;
      window.alert = originalAlert;
      window.confirm = originalConfirm;
    };
  }, []);

  // Mobile viewport CSS variable
  useEffect(() => {
    const setVH = () =>
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    const handle = () => setVH();
    handle();
    window.addEventListener("resize", handle);
    window.addEventListener("orientationchange", handle);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("orientationchange", handle);
    };
  }, []);

  // HLS/MP4 playback support
  useEffect(() => {
    let hls = null;
    const src = normalizeUrl(show?.streamUrl || "");
    const video = videoRef.current;
    if (!video || !src) return;

    const isHls = src.toLowerCase().includes(".m3u8");
    const isMp4 = src.toLowerCase().includes(".mp4");

    const init = async () => {
      if (!isHls) {
        if (isMp4) {
          video.src = src;
          await video.play().catch(() => {});
        }
        return;
      }

      const canPlayNative = video.canPlayType("application/vnd.apple.mpegurl") !== "";
      if (canPlayNative) {
        video.src = src;
        await video.play().catch(() => {});
        return;
      }

      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
        } else {
          video.src = src;
          await video.play().catch(() => {});
        }
      } catch (e) {
        video.src = src;
        await video.play().catch(() => {});
      }
    };

    init();

    return () => {
      if (hls) hls.destroy();
    };
  }, [show]);

  const enableAudio = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1.0;
    setIsAudioEnabled(true);
    v.play().catch(() => {});
  };

  const enterFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: "hide" });
    } catch {}
  };
  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
    } catch {}
  };
  const toggleFullscreen = () => (isFullscreen ? exitFullscreen() : enterFullscreen());

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // If iframe fails to load or reports sandbox issue, swap to proxied URL
  // We'll detect iframe load errors and message events
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onIframeLoad = () => {
      // If the iframe has a sandbox attribute still present -> use proxy
      try {
        if (iframe.hasAttribute && iframe.hasAttribute("sandbox")) {
          setLastError("iframe_sandbox_present");
          setUseProxy(true);
        } else {
          setLastError(null);
        }
      } catch (e) {
        // cross-origin access may throw; if we cannot access contentWindow we still check visually
      }
    };

    const onIframeError = () => {
      setLastError("iframe_load_error");
      setUseProxy(true);
    };

    iframe.addEventListener("load", onIframeLoad);
    iframe.addEventListener("error", onIframeError);

    // Also set a timeout: if iframe hasn't loaded in 3 seconds, attempt proxy
    const t = setTimeout(() => {
      try {
        // If iframe contentWindow location is about:blank or not updated, use proxy
        if (iframe && iframe.getAttribute && (!iframe.src || iframe.src === "about:blank")) {
          setLastError("iframe_timeout");
          setUseProxy(true);
        }
      } catch (e) {
        setUseProxy(true);
      }
    }, 3000);

    return () => {
      iframe.removeEventListener("load", onIframeLoad);
      iframe.removeEventListener("error", onIframeError);
      clearTimeout(t);
    };
  }, [useProxy, show]);

  // Helper: proxied URL path on this host
  const proxiedUrlFor = (sourceUrl) => {
    const u = normalizeUrl(sourceUrl);
    if (!u) return "";
    return `/api/proxy?url=${encodeURIComponent(u)}`;
  };

  const raw = show?.streamUrl || "";
  const cleaned = normalizeUrl(raw);
  const isHls = cleaned.toLowerCase().includes(".m3u8");
  const isMp4 = cleaned.toLowerCase().includes(".mp4");

  const styles = {
    page: { width: "100vw", height: "100vh", background: "#000", display: "flex", flexDirection: "column", overflow: "hidden" },
    header: { height: 56, display: "flex", alignItems: "center", padding: "0 12px", background: "rgba(0,0,0,0.85)", fontWeight: 700 },
    title: { margin: "0 auto", fontSize: 16, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    playerWrap: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" },
    playerContainer: { width: "100%", height: "100%", position: "relative" },
    controlsBtn: { position: "absolute", top: 12, right: 12, zIndex: 99, background: "rgba(0,0,0,0.7)", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 14, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
    unmuteBtn: { position: "absolute", top: 12, left: 12, zIndex: 99, background: isAudioEnabled ? "#4CAF50" : "#f44336", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 14, cursor: "pointer", border: "none", fontWeight: "bold" },
    video: { width: "100%", height: "100%", objectFit: "contain", background: "#000", filter: filterStyle },
    iframe: { width: "100%", height: "100%", border: "none", background: "#000", filter: filterStyle },
    footer: { height: 56, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,0.85)" },
    backLink: { color: "#fff", padding: "8px 12px", borderRadius: 6, textDecoration: "none", background: "rgba(255,255,255,0.04)" },
    debug: { position: "absolute", bottom: 70, left: 12, zIndex: 9999, color: "#fff", background: "rgba(0,0,0,0.5)", padding: "6px 8px", borderRadius: 6, fontSize: 12 }
  };

  // If an iframe is blocked by native sandbox injection, switching to proxy should fix it.
  // If proxy also faces blocking (rare), open proxied URL in top window.
  useEffect(() => {
    if (useProxy && cleaned) {
      const p = proxiedUrlFor(cleaned);
      // attempt to set iframe src to proxied url
      try {
        if (iframeRef.current) {
          iframeRef.current.src = p;
        }
      } catch (e) {}
      // final fallback: after 2.5s, if still error, open top window
      const t = setTimeout(() => {
        if (!iframeRef.current) {
          window.location.href = p;
        }
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [useProxy, cleaned]);

  return (
    <>
      <Head>
        <title>{show?.title || "Player"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div style={styles.page}>
        <div style={styles.header}>
          <div style={styles.title}>{show?.title || "Untitled"}</div>
        </div>

        <div style={styles.playerWrap}>
          <div ref={containerRef} style={styles.playerContainer}>
            <button style={styles.controlsBtn} onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress /> : <FaExpand />}
              {isFullscreen ? "Exit" : "Fullscreen"}
            </button>

            {(isHls || isMp4) && (
              <button style={styles.unmuteBtn} onClick={enableAudio}>
                {isAudioEnabled ? "🔊 Audio ON" : "🔇 Enable Audio"}
              </button>
            )}

            {isHls || isMp4 ? (
              <video
                ref={videoRef}
                style={styles.video}
                controls
                playsInline
                webkit-playsinline="true"
                muted={!isAudioEnabled}
                src={isMp4 ? cleaned : undefined}
              />
            ) : (
              <iframe
                ref={iframeRef}
                src={useProxy && cleaned ? proxiedUrlFor(cleaned) : cleaned || "about:blank"}
                style={styles.iframe}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={show?.title || "player-iframe"}
              />
            )}

            <div style={styles.debug}>
              {lastError ? `debug: ${lastError}` : `debug: loaded`}
              {useProxy ? " (using proxy)" : ""}
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <Link href="/schedule" style={styles.backLink}>
            ← Back to Full Schedule
          </Link>
        </div>
      </div>
    </>
  );
}

function normalizeSchedule(s) {
  if (!s) return [];
  if (Array.isArray(s)) return s;
  if (s?.shows) return s.shows;
  if (s?.default) return s.default;
  try {
    const vals = Object.values(s);
    if (Array.isArray(vals) && vals.length) return vals;
  } catch {}
  return [];
}

export async function getStaticPaths() {
  const list = normalizeSchedule(schedule);
  return {
    paths: list.map((item) => ({ params: { id: String(item.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const list = normalizeSchedule(schedule);
  const show = list.find((item) => String(item.id) === String(params.id));
  if (!show) return { notFound: true };
  return { props: { show }, revalidate: 30 };
}
