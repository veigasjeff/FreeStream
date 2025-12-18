// // pages/player/[id].js
// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import Script from "next/script";
// import schedule from "../../data/schedules.json";
// import { FaExpand, FaCompress, FaArrowLeft } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const iframeRef = useRef(null);

//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [currentStreamUrl, setCurrentStreamUrl] = useState("");
//   const [activeVersion, setActiveVersion] = useState("original");

//   // --- RESTORED FILTER STYLE ---
//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // --- AGGRESSIVE AD & POP-UNDER BLOCKER ---
//   useEffect(() => {
//     const killPopups = () => {
//       // 1. Neuter window.open to prevent new tabs/windows
//       window.open = function() { 
//         console.log("Blocked Popup Attempt");
//         return { focus: function() {}, close: function() {} }; 
//       };
//       // 2. Silence alerts/confirms
//       window.alert = function() { return true; };
//       window.confirm = function() { return true; };
//       window.prompt = function() { return null; };
//     };

//     const interceptClicks = (e) => {
//       // 3. Block simulated clicks often used by ad scripts
//       if (e.isTrusted === false) {
//         e.preventDefault();
//         e.stopImmediatePropagation();
//       }
//     };

//     // Apply initial blocks
//     killPopups();
//     window.addEventListener('click', interceptClicks, true);
    
//     // 4. Continuous enforcement loop
//     const shieldInterval = setInterval(() => {
//       killPopups();
//       try {
//         // Attempt to block popups from within the iframe (works if same-origin)
//         if (iframeRef.current && iframeRef.current.contentWindow) {
//           iframeRef.current.contentWindow.open = function() { return null; };
//         }
//       } catch (e) { /* Cross-origin security block expected */ }
//     }, 500);

//     return () => {
//       clearInterval(shieldInterval);
//       window.removeEventListener('click', interceptClicks, true);
//     };
//   }, [currentStreamUrl]);

//   // --- INITIALIZATION ---
//   useEffect(() => {
//     if (show?.streamUrl) {
//       setCurrentStreamUrl(show.streamUrl);
//     }
    
//     // Mobile viewport height fix
//     const setVH = () => {
//       let vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };
//     setVH();
//     window.addEventListener("resize", setVH);
//     return () => window.removeEventListener("resize", setVH);
//   }, [show]);

//   // --- HLS PLAYER LOGIC ---
//   useEffect(() => {
//     if (!currentStreamUrl) return;
//     const isDirect = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');
//     if (!isDirect) return;

//     let hls = null;
//     const video = videoRef.current;
    
//     const initHls = async () => {
//       if (!video) return;
//       try {
//         const HlsModule = (await import("hls.js")).default;
//         if (HlsModule.isSupported()) {
//           hls = new HlsModule({ enableWorker: true, lowLatencyMode: true });
//           hls.loadSource(currentStreamUrl);
//           hls.attachMedia(video);
//           hls.on(HlsModule.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => console.log("Browser blocked autoplay"));
//           });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           // Native support (Safari/iOS)
//           video.src = currentStreamUrl;
//         }
//       } catch (err) {
//         // Fallback
//         video.src = currentStreamUrl;
//       }
//     };
//     initHls();
//     return () => hls && hls.destroy();
//   }, [currentStreamUrl]);

//   // --- HANDLERS ---
//   const handleVersionClick = (version, url) => {
//     if (url) {
//       setActiveVersion(version);
//       setCurrentStreamUrl(url);
//     }
//   };

//   const toggleFullscreen = async () => {
//     const container = containerRef.current;
//     if (!container) return;

//     if (!document.fullscreenElement) {
//       if (container.requestFullscreen) await container.requestFullscreen();
//       else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
//       else if (container.mozRequestFullScreen) await container.mozRequestFullScreen();
//       else if (container.msRequestFullscreen) await container.msRequestFullscreen();
//     } else {
//       if (document.exitFullscreen) await document.exitFullscreen();
//     }
//   };

//   useEffect(() => {
//     const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", handleFsChange);
//     document.addEventListener("webkitfullscreenchange", handleFsChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFsChange);
//       document.removeEventListener("webkitfullscreenchange", handleFsChange);
//     };
//   }, []);

//   const isDirectFile = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');

//   // --- STYLES ---
//   const styles = {
//     page: {
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       height: 'calc(var(--vh, 1vh) * 100)',
//       backgroundColor: '#000',
//       overflow: 'hidden'
//     },
//     header: {
//       flex: '0 0 auto',
//       padding: '10px 15px',
//       backgroundColor: '#111',
//       zIndex: 100,
//       display: isFullscreen ? 'none' : 'block',
//       borderBottom: '1px solid #333'
//     },
//     topBar: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '10px'
//     },
//     btnContainer: {
//       display: 'flex',
//       gap: '8px',
//       overflowX: 'auto',
//       paddingBottom: '5px',
//       WebkitOverflowScrolling: 'touch',
//       scrollbarWidth: 'none'
//     },
//     serverBtn: (active) => ({
//       padding: '8px 15px',
//       backgroundColor: active ? '#e50914' : '#333',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       whiteSpace: 'nowrap',
//       flexShrink: 0
//     }),
//     playerSection: {
//       flex: '1 1 auto',
//       position: 'relative',
//       backgroundColor: '#000',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: 0,
//       overflow: 'hidden'
//     },
//     playerContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     fullscreenBtn: {
//       position: 'absolute',
//       bottom: '20px',
//       right: '20px',
//       zIndex: 200,
//       backgroundColor: 'rgba(0,0,0,0.7)',
//       color: '#fff',
//       border: '1px solid #555',
//       borderRadius: '50%',
//       width: '45px',
//       height: '45px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer'
//     },
//     footer: {
//       flex: '0 0 auto',
//       padding: '15px',
//       backgroundColor: '#111',
//       display: isFullscreen ? 'none' : 'flex',
//       justifyContent: 'center',
//       zIndex: 100,
//       borderTop: '1px solid #333'
//     },
//     backLink: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       color: '#fff',
//       textDecoration: 'none',
//       fontSize: '14px',
//       fontWeight: 'bold',
//       backgroundColor: '#222',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       border: '1px solid #333'
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Player | {show?.title || "Live"}</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//       </Head>
//       <Script
//         async
//         data-id="101498160"
//         src="//static.getclicky.com/js"
//         strategy="afterInteractive"
//       />
//       <div style={styles.page}>
//         <header style={styles.header}>
//           <div style={styles.topBar}>
//             <span style={{color: '#fff', fontWeight: 'bold'}}>{show?.title}</span>
//           </div>
//           <div style={styles.btnContainer}>
//             <button style={styles.serverBtn(activeVersion === 'original')} onClick={() => handleVersionClick('original', show?.streamUrl)}>Original</button>
//             {show?.dubbedUrl && <button style={styles.serverBtn(activeVersion === 'dubbed')} onClick={() => handleVersionClick('dubbed', show?.dubbedUrl)}>Hindi Dubbed</button>}
//             {show?.englishUrl && <button style={styles.serverBtn(activeVersion === 'english')} onClick={() => handleVersionClick('english', show?.englishUrl)}>Server 1</button>}
//             {show?.standardhUrl && <button style={styles.serverBtn(activeVersion === 'standard')} onClick={() => handleVersionClick('standard', show?.standardhUrl)}>Server 2</button>}
//           </div>
//         </header>

//         <main style={styles.playerSection} ref={containerRef}>
//           <div style={styles.playerContainer}>
//             {isDirectFile ? (
//               <video 
//                 ref={videoRef} 
//                 style={{width: '100%', height: '100%', objectFit: 'contain', filter: filterStyle}} 
//                 controls 
//                 autoPlay 
//                 playsInline
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={currentStreamUrl}
//                 style={{width: '100%', height: '100%', border: 'none', filter: filterStyle}}
//                 allow="autoplay; fullscreen"
//                 allowFullScreen
//                 key={currentStreamUrl}
//               />
//             )}

//             <button style={styles.fullscreenBtn} onClick={toggleFullscreen}>
//               {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
//             </button>
//           </div>
//         </main>

//         <footer style={styles.footer}>
//           <Link href="/schedule" style={styles.backLink}>
//             <FaArrowLeft /> BACK TO FULL SCHEDULE
//           </Link>
//         </footer>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({ params: { id: String(show.id) } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((item) => String(item.id) === String(params.id));
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }









// // pages/player/[id].js
// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import { FaExpand, FaCompress, FaArrowLeft } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const iframeRef = useRef(null);

//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [currentStreamUrl, setCurrentStreamUrl] = useState("");
//   const [activeVersion, setActiveVersion] = useState("original");
//   const [isMobile, setIsMobile] = useState(false);

//   // --- 1. ROBUST AD-BLOCKING UTILITIES ---

//   // Helper: Strips malicious ad/tracking parameters from the URL before loading
//   const stripAdParams = (url) => {
//     if (!url) return "";
//     let cleanUrl = String(url);
    
//     // Comprehensive list of ad/tracking parameters to remove
//     const adParams = [
//       "adtag", "adunit", "advertise", "advertising", "adserver", "adnetwork",
//       "adbanner", "adplacement", "adclick", "adid", "utm_source", "utm_medium",
//       "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid",
//       "dclid", "irclickid", "irgwc", "irpid", "iradid", "ircid", "popunder",
//       "popup", "redirect", "banner", "promo", "sponsor", "affiliate", "ref",
//       "click", "track", "campaign", "source", "medium", "fb_ref", "fb_source",
//       "yclid", "_openstat", "from", "via", "shared", "recommended", "widget",
//       "advertiser", "sponsored", "promoted", "placement", "slot", "zone"
//     ];

//     // Remove specific params
//     adParams.forEach(param => {
//       const regex = new RegExp(`([?&])${param}(=[^&]*)?`, "gi");
//       cleanUrl = cleanUrl.replace(regex, (match, p1) => (p1 === "?" ? "?" : ""));
//     });

//     // Clean up specific HLS/Playlist garbage often injected by ad networks
//     cleanUrl = cleanUrl
//       .replace(/#EXT-X-DISCONTINUITY/gi, "")
//       .replace(/#EXTINF:\d+\.\d+,ad/gi, "")
//       .replace(/#EXT-X-CUE-OUT/gi, "")
//       .replace(/#EXT-X-CUE-IN/gi, "")
//       .replace(/#EXT-X-SPLICEPOINT/gi, "")
//       .replace(/\?\?/g, "?")
//       .replace(/\?\&/g, "?")
//       .replace(/\&\&/g, "&")
//       .replace(/\?$/, "")
//       .replace(/\&$/, "");

//     if (cleanUrl.indexOf("?") === 0 && cleanUrl.indexOf("=") === -1) cleanUrl = cleanUrl.substring(1);
    
//     return cleanUrl;
//   };

//   // --- 2. POP-UNDER & WINDOW BLOCKER ---
//   useEffect(() => {
//     // A. Override Window Functions (The "Shim")
//     const originalOpen = window.open;
//     const originalAlert = window.alert;
//     const originalConfirm = window.confirm;

//     // Neutering window.open to prevent new tabs/windows (Pop-unders)
//     window.open = function(url, target, features) {
//       // Allow internal navigation if necessary, block everything else
//       if (target === '_self' || !target) {
//         return originalOpen.call(window, url, target, features);
//       }
//       console.log("Blocked Popup:", url);
//       return null;
//     };
//     window.alert = () => undefined;
//     window.confirm = () => false;

//     // B. Aggressive Iframe Monitoring
//     const blockIframePopups = () => {
//       if (iframeRef.current && iframeRef.current.contentWindow) {
//         try {
//           // Attempt to inject blocker into iframe (works on same-origin)
//           iframeRef.current.contentWindow.open = function() { return null; };
//           iframeRef.current.contentWindow.alert = function() { return null; };
//           iframeRef.current.contentWindow.confirm = function() { return false; };
//         } catch (e) {
//           // Cross-origin restriction expected, cannot block inside cross-origin iframe directly via JS
//         }
//       }
//     };

//     // Run blocker constantly to fight ad-script re-injection
//     const intervalId = setInterval(blockIframePopups, 1000);

//     return () => {
//       clearInterval(intervalId);
//       window.open = originalOpen;
//       window.alert = originalAlert;
//       window.confirm = originalConfirm;
//     };
//   }, [currentStreamUrl]);

//   // --- 3. RESPONSIVE & INIT ---
//   useEffect(() => {
//     if (show?.streamUrl) {
//       setCurrentStreamUrl(stripAdParams(show.streamUrl));
//     }
    
//     const updateSize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       // CSS Variable for real 100vh on mobile
//       const vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, [show]);

//   // --- 4. HLS PLAYER LOGIC ---
//   useEffect(() => {
//     if (!currentStreamUrl) return;
//     const isDirect = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');
//     if (!isDirect) return;

//     let hls = null;
//     const video = videoRef.current;
    
//     const initHls = async () => {
//       if (!video) return;
//       try {
//         // Dynamic import to avoid SSR errors
//         const HlsModule = (await import("hls.js")).default;
//         if (HlsModule.isSupported()) {
//           hls = new HlsModule({ enableWorker: true, lowLatencyMode: true });
//           hls.loadSource(currentStreamUrl);
//           hls.attachMedia(video);
//           hls.on(HlsModule.Events.MANIFEST_PARSED, () => {
//             // Standard autoplay
//             video.play().catch(() => {});
//           });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           // Native Safari Support
//           video.src = currentStreamUrl;
//           video.addEventListener("loadedmetadata", () => {
//             video.play().catch(() => {});
//           });
//         }
//       } catch (err) {
//         // Fallback
//         video.src = currentStreamUrl;
//       }
//     };
//     initHls();
//     return () => hls && hls.destroy();
//   }, [currentStreamUrl]);

//   // --- HANDLERS ---
//   const handleVersionClick = (version, url) => {
//     if (url) {
//       setActiveVersion(version);
//       setCurrentStreamUrl(stripAdParams(url));
//     }
//   };

//   const toggleFullscreen = async () => {
//     const container = containerRef.current;
//     if (!container) return;

//     if (!document.fullscreenElement) {
//       if (container.requestFullscreen) await container.requestFullscreen();
//       else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
//       else if (container.mozRequestFullScreen) await container.mozRequestFullScreen();
//       else if (container.msRequestFullscreen) await container.msRequestFullscreen();
//     } else {
//       if (document.exitFullscreen) await document.exitFullscreen();
//     }
//   };

//   useEffect(() => {
//     const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", handleFsChange);
//     return () => document.removeEventListener("fullscreenchange", handleFsChange);
//   }, []);

//   const isDirectFile = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');
//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // --- STYLES ---
//   const styles = {
//     page: {
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       height: 'calc(var(--vh, 1vh) * 100)',
//       backgroundColor: '#000',
//       overflow: 'hidden'
//     },
//     header: {
//       flex: '0 0 auto',
//       padding: isMobile ? '10px' : '15px',
//       backgroundColor: '#111',
//       zIndex: 100,
//       display: isFullscreen ? 'none' : 'block',
//       borderBottom: '1px solid #333'
//     },
//     topBar: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '10px'
//     },
//     btnContainer: {
//       display: 'flex',
//       gap: '8px',
//       overflowX: 'auto',
//       paddingBottom: '5px',
//       WebkitOverflowScrolling: 'touch',
//       scrollbarWidth: 'none'
//     },
//     serverBtn: (active) => ({
//       padding: '8px 15px',
//       backgroundColor: active ? '#e50914' : '#333',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       whiteSpace: 'nowrap',
//       flexShrink: 0
//     }),
//     playerSection: {
//       flex: '1 1 auto', // Takes up remaining space
//       position: 'relative',
//       backgroundColor: '#000',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: 0, // CRITICAL for Flexbox scrolling/resizing
//       overflow: 'hidden'
//     },
//     playerContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     fullscreenBtn: {
//       position: 'absolute',
//       bottom: '20px',
//       right: '20px',
//       zIndex: 200,
//       backgroundColor: 'rgba(0,0,0,0.7)',
//       color: '#fff',
//       border: '1px solid #555',
//       borderRadius: '50%',
//       width: '45px',
//       height: '45px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer'
//     },
    // footer: {
    //   flex: '0 0 auto', // Fixed height
    //   padding: '15px',
    //   backgroundColor: '#111',
    //   display: isFullscreen ? 'none' : 'flex',
    //   justifyContent: 'center',
    //   zIndex: 100,
    //   borderTop: '1px solid #333'
    // },
//     backLink: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       color: '#fff',
//       textDecoration: 'none',
//       fontSize: '14px',
//       fontWeight: 'bold',
//       backgroundColor: '#222',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       border: '1px solid #333'
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Player | {show?.title || "Live"}</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//       </Head>

//       <div style={styles.page}>
//         <header style={styles.header}>
//           <div style={styles.topBar}>
//             <span style={{color: '#fff', fontWeight: 'bold'}}>{show?.title}</span>
//           </div>
//           <div style={styles.btnContainer}>
//             <button style={styles.serverBtn(activeVersion === 'original')} onClick={() => handleVersionClick('original', show?.streamUrl)}>Original</button>
//             {show?.dubbedUrl && <button style={styles.serverBtn(activeVersion === 'dubbed')} onClick={() => handleVersionClick('dubbed', show?.dubbedUrl)}>Hindi Dubbed</button>}
//             {show?.englishUrl && <button style={styles.serverBtn(activeVersion === 'english')} onClick={() => handleVersionClick('english', show?.englishUrl)}>Server 1</button>}
//             {show?.standardhUrl && <button style={styles.serverBtn(activeVersion === 'standard')} onClick={() => handleVersionClick('standard', show?.standardhUrl)}>Server 2</button>}
//           </div>
//         </header>

//         <main style={styles.playerSection} ref={containerRef}>
//           <div style={styles.playerContainer}>
//             {isDirectFile ? (
//               <video 
//                 ref={videoRef} 
//                 style={{width: '100%', height: '100%', objectFit: 'contain', filter: filterStyle}} 
//                 controls 
//                 autoPlay 
//                 playsInline
//               />
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={currentStreamUrl}
//                 style={{width: '100%', height: '100%', border: 'none', filter: filterStyle}}
//                 allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
//                 allowFullScreen
//                 key={currentStreamUrl}
//               />
//             )}

//             <button style={styles.fullscreenBtn} onClick={toggleFullscreen}>
//               {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
//             </button>
//           </div>
//         </main>

//         <footer style={styles.footer}>
//           <Link href="/schedule" style={styles.backLink}>
//             <FaArrowLeft /> BACK TO FULL SCHEDULE
//           </Link>
//         </footer>
//       </div>
//     </>
//   );
// }

// // Helpers
// function normalizeSchedule(s) {
//   if (!s) return [];
//   if (Array.isArray(s)) return s;
//   if (s?.shows) return s.shows;
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
//   return { props: { show }, revalidate: 60 };
// }



























// // pages/player/[id].js
// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import { FaExpand, FaCompress, FaArrowLeft, FaVolumeUp } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const iframeRef = useRef(null);

//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [currentStreamUrl, setCurrentStreamUrl] = useState("");
//   const [activeVersion, setActiveVersion] = useState("original");
  
//   // Audio state only for Native HLS player
//   const [isNativeAudioEnabled, setIsNativeAudioEnabled] = useState(false); 

//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // --- 1. POP-UNDER KILLER (Parent Window Level) ---
//   useEffect(() => {
//     // This attempts to neutralize popups that try to target the top window
//     const killPopups = () => {
//       window.open = function() { 
//         console.log("Popup attempt blocked");
//         return { focus: function() {}, close: function() {} }; 
//       };
//       window.alert = function() { return true; };
//       window.confirm = function() { return true; };
//       window.prompt = function() { return null; };
//     };

//     killPopups();
    
//     // Re-apply periodically in case the ad script tries to restore it
//     const interval = setInterval(killPopups, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // --- 2. INITIALIZATION ---
//   useEffect(() => {
//     if (show?.streamUrl) {
//       setCurrentStreamUrl(show.streamUrl);
//     }
    
//     // Viewport Height Fix for Mobile Browsers
//     const setVH = () => {
//       let vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };
//     setVH();
//     window.addEventListener("resize", setVH);
//     return () => window.removeEventListener("resize", setVH);
//   }, [show]);

//   // --- 3. HLS PLAYER LOGIC (Only for .m3u8/.mp4) ---
//   useEffect(() => {
//     if (!currentStreamUrl) return;
    
//     const isDirect = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');
//     if (!isDirect) return; // Stop here if it's an iframe

//     let hls = null;
//     const video = videoRef.current;
    
//     const initHls = async () => {
//       if (!video) return;
      
//       setIsNativeAudioEnabled(false);
//       video.muted = true; // Required for autoplay

//       try {
//         const HlsModule = (await import("hls.js")).default;
//         if (HlsModule.isSupported()) {
//           hls = new HlsModule({ enableWorker: true, lowLatencyMode: true });
//           hls.loadSource(currentStreamUrl);
//           hls.attachMedia(video);
//           hls.on(HlsModule.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           video.src = currentStreamUrl;
//           video.addEventListener("loadedmetadata", () => {
//             video.play().catch(() => {});
//           });
//         }
//       } catch (err) {
//         video.src = currentStreamUrl;
//       }
//     };
//     initHls();
//     return () => hls && hls.destroy();
//   }, [currentStreamUrl]);

//   // --- 4. HANDLERS ---
//   const handleNativeUnmute = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = false;
//       video.volume = 1.0;
//       setIsNativeAudioEnabled(true);
//     }
//   };

//   const handleVersionClick = (version, url) => {
//     if (url) {
//       setActiveVersion(version);
//       setCurrentStreamUrl(url);
//       setIsNativeAudioEnabled(false);
//     }
//   };

//   const toggleFullscreen = async () => {
//     const container = containerRef.current;
//     if (!container) return;

//     if (!document.fullscreenElement) {
//       if (container.requestFullscreen) await container.requestFullscreen();
//       else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
//       else if (container.mozRequestFullScreen) await container.mozRequestFullScreen();
//       else if (container.msRequestFullscreen) await container.msRequestFullscreen();
//     } else {
//       if (document.exitFullscreen) await document.exitFullscreen();
//     }
//   };

//   useEffect(() => {
//     const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", handleFsChange);
//     return () => document.removeEventListener("fullscreenchange", handleFsChange);
//   }, []);

//   // Determine if we render <video> or <iframe>
//   const isDirectFile = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');

//   // --- STYLES ---
//   const styles = {
//     page: {
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       height: 'calc(var(--vh, 1vh) * 100)',
//       backgroundColor: '#000',
//       overflow: 'hidden'
//     },
//     header: {
//       flex: '0 0 auto',
//       padding: '10px 15px',
      
//       backgroundColor: '#111',
//       zIndex: 100,
//       display: isFullscreen ? 'none' : 'block',
//       borderBottom: '1px solid #333'
//     },
//     topBar: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginTop: "50px",
//       marginBottom: '10px'
//     },
//     btnContainer: {
//       display: 'flex',
//       gap: '8px',
//       overflowX: 'auto',
//       paddingBottom: '5px',
//       WebkitOverflowScrolling: 'touch',
//       scrollbarWidth: 'none'
//     },
//     serverBtn: (active) => ({
//       padding: '8px 15px',
//       backgroundColor: active ? '#e50914' : '#333',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       whiteSpace: 'nowrap',
//       flexShrink: 0
//     }),
//     playerSection: {
//       flex: '1 1 auto',
//       position: 'relative',
//       backgroundColor: '#000',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: 0,
//       overflow: 'hidden'
//     },
//     playerContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     // Overlay for NATIVE video only
//     unmuteOverlay: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 50,
//       cursor: 'pointer'
//     },
//     unmuteButton: {
//       backgroundColor: '#e50914',
//       color: '#fff',
//       border: '2px solid #fff',
//       padding: '12px 24px',
//       borderRadius: '30px',
//       fontSize: '16px',
//       fontWeight: 'bold',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       pointerEvents: 'none'
//     },
//     fullscreenBtn: {
//       position: 'absolute',
//       bottom: '10px',
//       right: '10px',
//       zIndex: 60,
//       backgroundColor: 'rgba(0,0,0,0.6)',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       width: '30px',
//       height: '30px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer'
//     },
//     footer: {
//       flex: '0 0 auto',
//       padding: '15px',
//       backgroundColor: '#111',
//       display: isFullscreen ? 'none' : 'flex',
//       justifyContent: 'center',
//       zIndex: 100,
//       borderTop: '1px solid #333'
//     },
//     backLink: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       color: '#fff',
//       textDecoration: 'none',
//       fontSize: '14px',
//       fontWeight: 'bold',
//       backgroundColor: '#222',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       border: '1px solid #333'
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Player | {show?.title || "Live"}</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//       </Head>

//       <div style={styles.page}>
//         <header style={styles.header}>
//           <div style={styles.topBar}>
//             <span style={{color: '#fff', fontWeight: 'bold'}}>{show?.title}</span>
//           </div>
//           <div style={styles.btnContainer}>
//             <button style={styles.serverBtn(activeVersion === 'original')} onClick={() => handleVersionClick('original', show?.streamUrl)}>Original</button>
//             {show?.dubbedUrl && <button style={styles.serverBtn(activeVersion === 'dubbed')} onClick={() => handleVersionClick('dubbed', show?.dubbedUrl)}>Hindi Dubbed</button>}
//             {show?.englishUrl && <button style={styles.serverBtn(activeVersion === 'english')} onClick={() => handleVersionClick('english', show?.englishUrl)}>Server 1</button>}
//             {show?.standardhUrl && <button style={styles.serverBtn(activeVersion === 'standard')} onClick={() => handleVersionClick('standard', show?.standardhUrl)}>Server 2</button>}
//           </div>
//         </header>

//         <main style={styles.playerSection} ref={containerRef}>
//           <div style={styles.playerContainer}>
            
//             {/* LOGIC SPLIT: IF DIRECT FILE -> VIDEO TAG. IF EMBED -> IFRAME TAG */}
//             {isDirectFile ? (
//               <>
//                 <video 
//                   ref={videoRef} 
//                   style={{width: '100%', height: '100%', objectFit: 'contain', filter: filterStyle}} 
//                   controls 
//                   autoPlay 
//                   muted={!isNativeAudioEnabled} 
//                   playsInline
//                 />
//                 {/* Custom Unmute Button ONLY for HLS Video */}
//                 {!isNativeAudioEnabled && (
//                   <div style={styles.unmuteOverlay} onClick={handleNativeUnmute}>
//                     <button style={styles.unmuteButton}>
//                       <FaVolumeUp size={20} /> CLICK TO UNMUTE
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               /* PURE IFRAME FOR EMBEDS (DaddyHD, Vidsrc) - NO OVERLAY */
//               <iframe
//                 ref={iframeRef}
//                 src={currentStreamUrl}
//                 style={{width: '100%', height: '100%', border: 'none', filter: filterStyle}}
//                 allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
//                 allowFullScreen
//                 key={currentStreamUrl}
//               />
//             )}

//             {/* External Fullscreen Button (Works for both) */}
//             <button style={styles.fullscreenBtn} onClick={toggleFullscreen}>
//               {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
//             </button>
//           </div>
//         </main>

//         <footer style={styles.footer}>
//           <Link href="/schedule" style={styles.backLink}>
//             <FaArrowLeft /> BACK TO FULL SCHEDULE
//           </Link>
//         </footer>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({ params: { id: String(show.id) } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((item) => String(item.id) === String(params.id));
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }























// // pages/player/[id].js
// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import { FaExpand, FaCompress, FaArrowLeft, FaVolumeUp } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const iframeRef = useRef(null);

//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [currentStreamUrl, setCurrentStreamUrl] = useState("");
//   const [activeVersion, setActiveVersion] = useState("original");
  
//   // Audio state only for Native HLS player
//   const [isNativeAudioEnabled, setIsNativeAudioEnabled] = useState(false); 

//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // --- 1. DEEP URL CLEANING (Restored) ---
//   const stripAdParams = (url) => {
//     if (!url) return "";
//     let cleanUrl = String(url);
    
//     // Massive list of ad/tracking parameters to strip
//     const adParams = [
//       "adtag", "adunit", "advertise", "advertising", "adserver", "adnetwork",
//       "adbanner", "adplacement", "adclick", "adid", "utm_source", "utm_medium",
//       "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid",
//       "dclid", "irclickid", "irgwc", "irpid", "iradid", "ircid", "popunder",
//       "popup", "redirect", "banner", "promo", "sponsor", "affiliate", "ref",
//       "click", "track", "campaign", "source", "medium", "fb_ref", "fb_source",
//       "yclid", "_openstat", "from", "via", "shared", "recommended", "widget",
//       "advertiser", "sponsored", "promoted", "placement", "slot", "zone",
//       "ad_position", "ad_size", "ad_type", "ad_format", "ad_creative", "ad_group",
//       "ad_campaign", "ad_channel", "ad_target", "ad_keyword", "ad_matchtype",
//       "ad_device", "ad_network", "ad_publisher", "ad_subscriber", "ad_vendor",
//       "ad_provider", "ad_exchange", "ad_bid", "ad_auction", "ad_impression",
//       "ad_view", "ad_click", "ad_conversion", "ad_revenue", "ad_earnings",
//       "ad_income", "ad_profit", "ad_money", "ad_cash", "ad_payment", "ad_billing",
//       "ad_invoice", "ad_receipt", "ad_transaction", "ad_order", "ad_purchase",
//       "ad_sale", "ad_deal", "ad_offer", "ad_discount", "ad_coupon", "ad_voucher",
//       "ad_code", "ad_token", "ad_key", "ad_secret", "ad_signature", "ad_hash",
//       "ad_md5", "ad_sha", "ad_encrypted", "ad_encoded", "ad_decoded", "ad_parsed",
//       "ad_analyzed", "ad_tracked", "ad_logged", "ad_recorded", "ad_stored",
//       "ad_saved", "ad_cached", "ad_buffered", "ad_queued", "ad_pending",
//       "ad_processing", "ad_executing", "ad_running", "ad_loading", "ad_streaming",
//       "ad_playing", "ad_showing", "ad_displaying", "ad_rendering", "ad_painting",
//       "ad_drawing", "ad_writing", "ad_reading", "ad_listening", "ad_watching",
//       "ad_viewing", "ad_browsing", "ad_navigating", "ad_scrolling", "ad_clicking",
//       "ad_tapping", "ad_pressing", "ad_holding", "ad_releasing", "ad_dragging",
//       "ad_dropping", "ad_swiping", "ad_pinching", "ad_zooming", "ad_rotating",
//       "ad_tilting", "ad_shaking", "ad_moving", "ad_stopping", "ad_starting",
//       "ad_pausing", "ad_resuming", "ad_restarting", "ad_reloading", "ad_refreshing",
//       "ad_updating", "ad_downloading", "ad_uploading", "ad_syncing", "ad_backup",
//       "ad_restore", "ad_import", "ad_export", "ad_migrate", "ad_transfer",
//       "ad_copy", "ad_paste", "ad_cut", "ad_delete", "ad_remove", "ad_add",
//       "ad_insert", "ad_append", "ad_prepend", "ad_attach", "ad_detach",
//       "ad_connect", "ad_disconnect", "ad_join", "ad_leave", "ad_enter",
//       "ad_exit", "ad_escape", "ad_cancel", "ad_submit", "ad_reset", "ad_clear",
//       "ad_fill", "ad_empty", "ad_load", "ad_unload", "ad_mount", "ad_unmount",
//       "ad_install", "ad_uninstall", "ad_setup", "ad_teardown", "ad_init",
//       "ad_destroy", "ad_create", "ad_delete", "ad_update", "ad_patch",
//       "ad_merge", "ad_split", "ad_combine", "ad_separate", "ad_filter",
//       "ad_sort", "ad_group", "ad_count", "ad_sum", "ad_avg", "ad_min",
//       "ad_max", "ad_std", "ad_var", "ad_dev", "ad_range", "ad_median",
//       "ad_mode", "ad_percentile", "ad_quantile", "ad_correlation", "ad_regression",
//       "ad_classification", "ad_clustering", "ad_anomaly", "ad_outlier",
//       "ad_trend", "ad_pattern", "ad_cycle", "ad_season", "ad_noise", "ad_signal",
//       "ad_feature", "ad_attribute", "ad_property", "ad_field", "ad_column",
//       "ad_row", "ad_cell", "ad_table", "ad_database", "ad_index", "ad_query",
//       "ad_search", "ad_find", "ad_replace", "ad_match", "ad_extract",
//       "ad_parse", "ad_scan", "ad_read", "ad_write", "ad_execute", "ad_run",
//       "ad_call", "ad_invoke", "ad_return", "ad_throw", "ad_catch", "ad_finally",
//       "ad_try", "ad_catch", "ad_else", "ad_then", "ad_if", "ad_while", "ad_for",
//       "ad_do", "ad_switch", "ad_case", "ad_default", "ad_break", "ad_continue",
//       "ad_goto", "ad_label", "ad_function", "ad_class", "ad_object", "ad_array",
//       "ad_string", "ad_number", "ad_boolean", "ad_null", "ad_undefined",
//       "ad_nan", "ad_infinity", "ad_date", "ad_time", "ad_datetime", "ad_timestamp",
//       "ad_interval", "ad_duration", "ad_period", "ad_frequency", "ad_rate",
//       "ad_speed", "ad_velocity", "ad_acceleration", "ad_force", "ad_energy",
//       "ad_power", "ad_work", "ad_heat", "ad_temperature", "ad_pressure",
//       "ad_volume", "ad_density", "ad_mass", "ad_weight", "ad_length", "ad_width",
//       "ad_height", "ad_depth", "ad_area", "ad_volume", "ad_capacity", "ad_angle",
//       "ad_direction", "ad_position", "ad_location", "ad_coordinate", "ad_distance",
//       "ad_proximity", "ad_radius", "ad_diameter", "ad_circumference", "ad_perimeter",
//       "ad_surface", "ad_face", "ad_edge", "ad_vertex", "ad_point", "ad_line",
//       "ad_curve", "ad_plane", "ad_solid", "ad_fluid", "ad_gas", "ad_liquid",
//       "ad_solid", "ad_plasma", "ad_vacuum", "ad_atmosphere", "ad_environment",
//       "ad_climate", "ad_weather", "ad_season", "ad_month", "ad_week", "ad_day",
//       "ad_hour", "ad_minute", "ad_second", "ad_millisecond", "ad_microsecond",
//       "ad_nanosecond", "ad_picosecond", "ad_femtosecond", "ad_attosecond",
//       "ad_zeptosecond", "ad_yoctosecond", "ad_planck", "ad_lightyear", "ad_parsec",
//       "ad_astronomical", "ad_galactic", "ad_cosmic", "ad_universal", "ad_eternal"
//     ];

//     adParams.forEach(param => {
//       const regex = new RegExp(`([?&])${param}(=[^&]*)?`, "gi");
//       cleanUrl = cleanUrl.replace(regex, (match, p1) => (p1 === "?" ? "?" : ""));
//     });

//     cleanUrl = cleanUrl
//       .replace(/#EXT-X-DISCONTINUITY/gi, "")
//       .replace(/#EXTINF:\d+\.\d+,ad/gi, "")
//       .replace(/#EXT-X-CUE-OUT/gi, "")
//       .replace(/#EXT-X-CUE-IN/gi, "")
//       .replace(/#EXT-X-SPLICEPOINT/gi, "")
//       .replace(/\?\?/g, "?")
//       .replace(/\?\&/g, "?")
//       .replace(/\&\&/g, "&")
//       .replace(/\?$/, "")
//       .replace(/\&$/, "");

//     if (cleanUrl.indexOf("?") === 0 && cleanUrl.indexOf("=") === -1) cleanUrl = cleanUrl.substring(1);
//     return cleanUrl;
//   };

//   // --- 2. POP-UNDER KILLER (Parent Window Level) ---
//   useEffect(() => {
//     const killPopups = () => {
//       window.open = function() { 
//         console.log("AdBlock: Popup Prevented");
//         return { focus: function() {}, close: function() {} }; 
//       };
//       window.alert = function() { return true; };
//       window.confirm = function() { return true; };
//       window.prompt = function() { return null; };
//     };

//     const interceptClicks = (e) => {
//       if (e.isTrusted === false) {
//         e.preventDefault();
//         e.stopImmediatePropagation();
//       }
//     };

//     killPopups();
//     window.addEventListener('click', interceptClicks, true);
    
//     // Constant enforcement
//     const shieldInterval = setInterval(() => {
//       killPopups();
//       try {
//         if (iframeRef.current && iframeRef.current.contentWindow) {
//           iframeRef.current.contentWindow.open = function() { return null; };
//         }
//       } catch (e) { /* Ignore Cross-Origin errors */ }
//     }, 500);

//     return () => {
//       clearInterval(shieldInterval);
//       window.removeEventListener('click', interceptClicks, true);
//     };
//   }, [currentStreamUrl]);

//   // --- 3. INITIALIZATION ---
//   useEffect(() => {
//     if (show?.streamUrl) {
//       // USE CLEANING FUNCTION HERE
//       setCurrentStreamUrl(stripAdParams(show.streamUrl));
//     }
    
//     const setVH = () => {
//       let vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };
//     setVH();
//     window.addEventListener("resize", setVH);
//     return () => window.removeEventListener("resize", setVH);
//   }, [show]);

//   // --- 4. HLS PLAYER LOGIC ---
//   useEffect(() => {
//     if (!currentStreamUrl) return;
//     const isDirect = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');
    
//     // Only run HLS logic if it's a direct file
//     if (!isDirect) return;

//     let hls = null;
//     const video = videoRef.current;
    
//     const initHls = async () => {
//       if (!video) return;
      
//       setIsNativeAudioEnabled(false);
//       video.muted = true; // Required for autoplay

//       try {
//         const HlsModule = (await import("hls.js")).default;
//         if (HlsModule.isSupported()) {
//           hls = new HlsModule({ enableWorker: true, lowLatencyMode: true });
//           hls.loadSource(currentStreamUrl);
//           hls.attachMedia(video);
//           hls.on(HlsModule.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           video.src = currentStreamUrl;
//           video.addEventListener("loadedmetadata", () => {
//             video.play().catch(() => {});
//           });
//         }
//       } catch (err) {
//         video.src = currentStreamUrl;
//       }
//     };
//     initHls();
//     return () => hls && hls.destroy();
//   }, [currentStreamUrl]);

//   // --- 5. HANDLERS ---
//   const handleNativeUnmute = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = false;
//       video.volume = 1.0;
//       setIsNativeAudioEnabled(true);
//     }
//   };

//   const handleVersionClick = (version, url) => {
//     if (url) {
//       setActiveVersion(version);
//       // USE CLEANING FUNCTION HERE
//       setCurrentStreamUrl(stripAdParams(url));
//       setIsNativeAudioEnabled(false);
//     }
//   };

//   const toggleFullscreen = async () => {
//     const container = containerRef.current;
//     if (!container) return;

//     if (!document.fullscreenElement) {
//       if (container.requestFullscreen) await container.requestFullscreen();
//       else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
//       else if (container.mozRequestFullScreen) await container.mozRequestFullScreen();
//       else if (container.msRequestFullscreen) await container.msRequestFullscreen();
//     } else {
//       if (document.exitFullscreen) await document.exitFullscreen();
//     }
//   };

//   useEffect(() => {
//     const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", handleFsChange);
//     return () => document.removeEventListener("fullscreenchange", handleFsChange);
//   }, []);

//   // Determine if we render <video> or <iframe>
//   const isDirectFile = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');

//   // --- STYLES ---
//   const styles = {
//     page: {
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       height: 'calc(var(--vh, 1vh) * 100)',
//       backgroundColor: '#000',
//       overflow: 'hidden'
//     },
//     header: {
//       flex: '0 0 auto',
//       padding: '10px 15px',
//       backgroundColor: '#111',
//       zIndex: 100,
      
//       display: isFullscreen ? 'none' : 'block',
//       borderBottom: '1px solid #333'
//     },
//     topBar: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginTop: "50px",
//       marginBottom: '10px'
//     },
//     btnContainer: {
//       display: 'flex',
//       gap: '8px',
//       overflowX: 'auto',
//       paddingBottom: '5px',
//       WebkitOverflowScrolling: 'touch',
//       scrollbarWidth: 'none'
//     },
//     serverBtn: (active) => ({
//       padding: '8px 15px',
//       backgroundColor: active ? '#e50914' : '#333',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       whiteSpace: 'nowrap',
//       flexShrink: 0
//     }),
//     playerSection: {
//       flex: '1 1 auto',
//       position: 'relative',
//       backgroundColor: '#000',
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: 0,
//       overflow: 'hidden'
//     },
//     playerContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     // Overlay for NATIVE video only
//     unmuteOverlay: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 50,
//       cursor: 'pointer'
//     },
//     unmuteButton: {
//       backgroundColor: '#e50914',
//       color: '#fff',
//       border: '2px solid #fff',
//       padding: '12px 24px',
//       borderRadius: '30px',
//       fontSize: '16px',
//       fontWeight: 'bold',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       pointerEvents: 'none'
//     },
//     fullscreenBtn: {
//       position: 'absolute',
//       bottom: '10px',
//       right: '10px',
//       zIndex: 60,
//       backgroundColor: 'rgba(0,0,0,0.6)',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       width: '30px',
//       height: '30px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer'
//     },
//     footer: {
//       flex: '0 0 auto',
//       padding: '15px',
//       backgroundColor: '#111',
//       display: isFullscreen ? 'none' : 'flex',
//       justifyContent: 'center',
//       zIndex: 100,
//       borderTop: '1px solid #333'
//     },
//     backLink: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       color: '#fff',
//       textDecoration: 'none',
//       fontSize: '14px',
//       fontWeight: 'bold',
//       backgroundColor: '#222',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       border: '1px solid #333'
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Player | {show?.title || "Live"}</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//         <meta name="robots" content="noindex, nofollow" />
//         <style>{`
//           @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.05); }
//             100% { transform: scale(1); }
//           }
//         `}</style>
//       </Head>

//       <div style={styles.page}>
//         <header style={styles.header}>
//           <div style={styles.topBar}>
//             <span style={{color: '#fff', fontWeight: 'bold'}}>{show?.title}</span>
//           </div>
//           <div style={styles.btnContainer}>
//             <button style={styles.serverBtn(activeVersion === 'original')} onClick={() => handleVersionClick('original', show?.streamUrl)}>Original</button>
//             {show?.dubbedUrl && <button style={styles.serverBtn(activeVersion === 'dubbed')} onClick={() => handleVersionClick('dubbed', show?.dubbedUrl)}>Hindi Dubbed</button>}
//             {show?.englishUrl && <button style={styles.serverBtn(activeVersion === 'english')} onClick={() => handleVersionClick('english', show?.englishUrl)}>Server 1</button>}
//             {show?.standardhUrl && <button style={styles.serverBtn(activeVersion === 'standard')} onClick={() => handleVersionClick('standard', show?.standardhUrl)}>Server 2</button>}
//           </div>
//         </header>

//         <main style={styles.playerSection} ref={containerRef}>
//           <div style={styles.playerContainer}>
            
//             {/* LOGIC SPLIT: IF DIRECT FILE -> VIDEO TAG. IF EMBED -> IFRAME TAG */}
//             {isDirectFile ? (
//               <>
//                 <video 
//                   ref={videoRef} 
//                   style={{width: '100%', height: '100%', objectFit: 'contain', filter: filterStyle}} 
//                   controls 
//                   autoPlay 
//                   muted={!isNativeAudioEnabled} 
//                   playsInline
//                 />
//                 {/* Custom Unmute Button ONLY for HLS Video */}
//                 {!isNativeAudioEnabled && (
//                   <div style={styles.unmuteOverlay} onClick={handleNativeUnmute}>
//                     <button style={styles.unmuteButton}>
//                       <FaVolumeUp size={20} /> CLICK TO UNMUTE
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               /* PURE IFRAME FOR EMBEDS (DaddyHD, Vidsrc) - NO OVERLAY so you can use internal controls */
//               <iframe
//                 ref={iframeRef}
//                 src={currentStreamUrl}
//                 style={{width: '100%', height: '100%', border: 'none', filter: filterStyle}}
//                 allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
//                 allowFullScreen
//                 key={currentStreamUrl}
//               />
//             )}

//             {/* External Fullscreen Button (Works for both) */}
//             <button style={styles.fullscreenBtn} onClick={toggleFullscreen}>
//               {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
//             </button>
//           </div>
//         </main>

//         <footer style={styles.footer}>
//           <Link href="/schedule" style={styles.backLink}>
//             <FaArrowLeft /> BACK TO FULL SCHEDULE
//           </Link>
//         </footer>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({ params: { id: String(show.id) } }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((item) => String(item.id) === String(params.id));
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }
































// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import { FaExpand, FaCompress, FaArrowLeft, FaVolumeUp } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);

//   const [currentUrl, setCurrentUrl] = useState(show.streamUrl);
//   const [activeServer, setActiveServer] = useState("original");
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);

//   const isDirect =
//     currentUrl.includes(".m3u8") || currentUrl.includes(".mp4");

//   /* ---------------- HLS INITIALIZATION ---------------- */
//   useEffect(() => {
//     if (!isDirect || !videoRef.current) return;

//     let hls;
//     const video = videoRef.current;

//     video.muted = true;
//     video.playsInline = true;

//     const init = async () => {
//       try {
//         const Hls = (await import("hls.js")).default;

//         if (Hls.isSupported()) {
//           hls = new Hls({ enableWorker: true });
//           hls.loadSource(currentUrl);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           video.src = currentUrl;
//           video.play().catch(() => {});
//         }
//       } catch {
//         video.src = currentUrl;
//       }
//     };

//     init();
//     return () => hls && hls.destroy();
//   }, [currentUrl, isDirect]);

//   /* ---------------- FULLSCREEN ---------------- */
//   const toggleFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;

//     if (!document.fullscreenElement) {
//       if (el.requestFullscreen) await el.requestFullscreen();
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//     } else {
//       if (document.exitFullscreen) await document.exitFullscreen();
//     }
//   };

//   useEffect(() => {
//     const handler = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", handler);
//     return () => document.removeEventListener("fullscreenchange", handler);
//   }, []);

//   /* ---------------- AUDIO ---------------- */
//   const unmute = () => {
//     if (!videoRef.current) return;
//     videoRef.current.muted = false;
//     videoRef.current.volume = 1;
//     setIsMuted(false);
//   };

//   /* ---------------- SERVER SWITCH ---------------- */
//   const switchServer = (key, url) => {
//     if (!url) return;
//     setActiveServer(key);
//     setCurrentUrl(url);
//     setIsMuted(true);
//   };

//   return (
//     <>
//       <Head>
//         <title>{show.title} | Player</title>
//         <meta name="robots" content="noindex,nofollow" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=1"
//         />
//       </Head>

//       <div
//         ref={containerRef}
//         style={{
//           height: "100vh",
//           background: "#000",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* HEADER (NON-FULLSCREEN ONLY) */}
//         {!isFullscreen && (
//           <header style={headerStyle}>
//             <div style={{ fontWeight: "bold" }}>{show.title}</div>
//             <div style={serverRow}>
//               <button onClick={() => switchServer("original", show.streamUrl)} style={serverBtn(activeServer === "original")}>Original</button>
//               {show.dubbedUrl && <button onClick={() => switchServer("dubbed", show.dubbedUrl)} style={serverBtn(activeServer === "dubbed")}>Hindi</button>}
//               {show.englishUrl && <button onClick={() => switchServer("english", show.englishUrl)} style={serverBtn(activeServer === "english")}>Server 1</button>}
//               {show.standardhUrl && <button onClick={() => switchServer("standard", show.standardhUrl)} style={serverBtn(activeServer === "standard")}>Server 2</button>}
//             </div>
//           </header>
//         )}

//         {/* PLAYER */}
//         <main style={{ flex: 1, position: "relative" }}>
//           {/* ✅ ONE GLOBAL BACK BUTTON — FOR BOTH HLS + IFRAME */}
//           <Link href="/schedule" style={backBtn}>
//             <FaArrowLeft /> Back
//           </Link>

//           {isDirect ? (
//             <>
//               <video
//                 ref={videoRef}
//                 controls
//                 autoPlay
//                 muted={isMuted}
//                 style={{ width: "100%", height: "100%", objectFit: "contain" }}
//               />

//               {isMuted && (
//                 <div onClick={unmute} style={unmuteOverlay}>
//                   <button style={unmuteBtn}>
//                     <FaVolumeUp /> TAP TO UNMUTE
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <iframe
//               src={currentUrl}
//               allow="autoplay; fullscreen; picture-in-picture"
//               allowFullScreen
//               referrerPolicy="no-referrer"
//               style={{ width: "100%", height: "100%", border: "none" }}
//             />
//           )}

//           {/* FULLSCREEN BUTTON */}
//           <button onClick={toggleFullscreen} style={fsBtn}>
//             {isFullscreen ? <FaCompress /> : <FaExpand />}
//           </button>
//         </main>
//       </div>
//     </>
//   );
// }

// /* ---------------- STYLES ---------------- */
// const headerStyle = {
//   padding: "12px 15px",
//   background: "#111",
//   borderBottom: "1px solid #222",
// };

// const serverRow = {
//   display: "flex",
//   gap: 8,
//   marginTop: 8,
//   overflowX: "auto",
// };

// const serverBtn = (active) => ({
//   padding: "8px 14px",
//   background: active ? "#e50914" : "#333",
//   color: "#fff",
//   border: "none",
//   borderRadius: 4,
//   fontSize: 12,
//   fontWeight: "bold",
//   cursor: "pointer",
//   whiteSpace: "nowrap",
// });

// const backBtn = {
//   position: "absolute",
//   top: 12,
//   left: 12,
//   zIndex: 30,
//   background: "rgba(0,0,0,.6)",
//   color: "#fff",
//   padding: "8px 14px",
//   borderRadius: 4,
//   textDecoration: "none",
//   display: "flex",
//   alignItems: "center",
//   gap: 6,
//   fontWeight: "bold",
// };

// const fsBtn = {
//   position: "absolute",
//   bottom: 12,
//   right: 12,
//   background: "rgba(0,0,0,.6)",
//   color: "#fff",
//   border: "none",
//   width: 34,
//   height: 34,
//   borderRadius: 4,
// };

// const unmuteOverlay = {
//   position: "absolute",
//   inset: 0,
//   background: "rgba(0,0,0,.5)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   cursor: "pointer",
//   zIndex: 20,
// };

// const unmuteBtn = {
//   background: "#e50914",
//   color: "#fff",
//   padding: "12px 24px",
//   borderRadius: 30,
//   border: "none",
//   fontWeight: "bold",
//   display: "flex",
//   alignItems: "center",
//   gap: 10,
// };

// /* ---------------- SSG ---------------- */
// export async function getStaticPaths() {
//   return {
//     paths: schedule.shows.map((s) => ({
//       params: { id: String(s.id) },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find(
//     (s) => String(s.id) === String(params.id)
//   );
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }










































// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import {
//   FaExpand,
//   FaCompress,
//   FaArrowLeft,
//   FaVolumeUp,
//   FaExclamationTriangle,
// } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);

//   const [currentUrl, setCurrentUrl] = useState(show.streamUrl);
//   const [activeServer, setActiveServer] = useState("original");
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [adBlocked, setAdBlocked] = useState(false);

//   const isDirect =
//     currentUrl.includes(".m3u8") || currentUrl.includes(".mp4");

//   /* 🔥 VIDEO FILTER */
//   const filterStyle =
//     "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   /* ---------------- AD BLOCK DETECTION (RESTORED) ---------------- */
//   useEffect(() => {
//     const bait = document.createElement("div");
//     bait.className =
//       "adsbox ad-banner ad-container ad-placement adsbygoogle";
//     bait.style.height = "1px";
//     bait.style.position = "absolute";
//     bait.style.left = "-9999px";
//     document.body.appendChild(bait);

//     setTimeout(() => {
//       if (
//         bait.offsetHeight === 0 ||
//         window.getComputedStyle(bait).display === "none"
//       ) {
//         setAdBlocked(true);
//       }
//       document.body.removeChild(bait);
//     }, 100);
//   }, []);

//   /* ---------------- HLS INIT ---------------- */
//   useEffect(() => {
//     if (!isDirect || !videoRef.current) return;

//     let hls;
//     const video = videoRef.current;
//     video.muted = true;
//     video.playsInline = true;

//     const init = async () => {
//       try {
//         const Hls = (await import("hls.js")).default;
//         if (Hls.isSupported()) {
//           hls = new Hls({ enableWorker: true });
//           hls.loadSource(currentUrl);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             video.play().catch(() => {});
//           });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           video.src = currentUrl;
//           video.play().catch(() => {});
//         }
//       } catch {
//         video.src = currentUrl;
//       }
//     };

//     init();
//     return () => hls && hls.destroy();
//   }, [currentUrl, isDirect]);

//   /* ---------------- FULLSCREEN ---------------- */
//   const toggleFullscreen = async () => {
//     const el = containerRef.current;
//     if (!el) return;

//     if (!document.fullscreenElement) {
//       if (el.requestFullscreen) await el.requestFullscreen();
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//     } else {
//       if (document.exitFullscreen) await document.exitFullscreen();
//     }
//   };

//   useEffect(() => {
//     const handler = () => setIsFullscreen(!!document.fullscreenElement);
//     document.addEventListener("fullscreenchange", handler);
//     return () => document.removeEventListener("fullscreenchange", handler);
//   }, []);

//   /* ---------------- AUDIO ---------------- */
//   const unmute = () => {
//     if (!videoRef.current) return;
//     videoRef.current.muted = false;
//     videoRef.current.volume = 1;
//     setIsMuted(false);
//   };

//   /* ---------------- SERVER SWITCH ---------------- */
//   const switchServer = (key, url) => {
//     if (!url) return;
//     setActiveServer(key);
//     setCurrentUrl(url);
//     setIsMuted(true);
//   };

//   return (
//     <>
//       <Head>
//         <title>{show.title} | Player</title>
//         <meta name="robots" content="noindex,nofollow" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=1"
//         />
//       </Head>

//       <div
//         ref={containerRef}
//         style={{
//           height: "100vh",
//           background: "#000",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {!isFullscreen && (
//           <header style={headerStyle}>
//             <div style={{ fontWeight: "bold" }}>{show.title}</div>
//             <div style={serverRow}>
//               <button onClick={() => switchServer("original", show.streamUrl)} style={serverBtn(activeServer === "original")}>Original</button>
//               {show.dubbedUrl && <button onClick={() => switchServer("dubbed", show.dubbedUrl)} style={serverBtn(activeServer === "dubbed")}>Hindi</button>}
//               {show.englishUrl && <button onClick={() => switchServer("english", show.englishUrl)} style={serverBtn(activeServer === "english")}>Server 1</button>}
//               {show.standardhUrl && <button onClick={() => switchServer("standard", show.standardhUrl)} style={serverBtn(activeServer === "standard")}>Server 2</button>}
//             </div>
//           </header>
//         )}

//         <main style={{ flex: 1, position: "relative" }}>
//           {/* BACK BUTTON */}
//           <Link href="/schedule" style={backBtnTopCenter}>
//             <FaArrowLeft /> Back
//           </Link>

//           {/* 🔴 AD BLOCK OVERLAY */}
//           {adBlocked && (
//             <div style={adblockOverlay}>
//               <FaExclamationTriangle size={36} />
//               <p>Please disable your ad blocker to continue watching.</p>
//             </div>
//           )}

//           {!adBlocked && (
//             <>
//               {isDirect ? (
//                 <>
//                   <video
//                     ref={videoRef}
//                     controls
//                     autoPlay
//                     muted={isMuted}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       filter: filterStyle,
//                     }}
//                   />

//                   {isMuted && (
//                     <div onClick={unmute} style={unmuteOverlay}>
//                       <button style={unmuteBtn}>
//                         <FaVolumeUp /> TAP TO UNMUTE
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <iframe
//                   src={currentUrl}
//                   allow="autoplay; fullscreen; picture-in-picture"
//                   allowFullScreen
//                   referrerPolicy="no-referrer"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     border: "none",
//                     filter: filterStyle,
//                   }}
//                 />
//               )}

//               <button onClick={toggleFullscreen} style={fsBtn}>
//                 {isFullscreen ? <FaCompress /> : <FaExpand />}
//               </button>
//             </>
//           )}
//         </main>
//       </div>
//     </>
//   );
// }

// /* ---------------- STYLES ---------------- */
// const headerStyle = {
//   padding: "12px 15px",
//   background: "#111",
//   borderBottom: "1px solid #222",
// };

// const serverRow = {
//   display: "flex",
//   gap: 8,
//   marginTop: 8,
//   overflowX: "auto",
// };

// const serverBtn = (active) => ({
//   padding: "8px 14px",
//   background: active ? "#e50914" : "#333",
//   color: "#fff",
//   border: "none",
//   borderRadius: 4,
//   fontSize: 12,
//   fontWeight: "bold",
//   cursor: "pointer",
//   whiteSpace: "nowrap",
// });

// const backBtnTopCenter = {
//   position: "absolute",
//   top: 12,
//   left: "50%",
//   transform: "translateX(-50%)",
//   zIndex: 30,
//   background: "rgba(0,0,0,.65)",
//   color: "#fff",
//   padding: "8px 18px",
//   borderRadius: 20,
//   textDecoration: "none",
//   display: "flex",
//   alignItems: "center",
//   gap: 8,
//   fontWeight: "bold",
// };

// const fsBtn = {
//   position: "absolute",
//   bottom: 12,
//   right: 12,
//   background: "rgba(0,0,0,.6)",
//   color: "#fff",
//   border: "none",
//   width: 34,
//   height: 34,
//   borderRadius: 4,
// };

// const unmuteOverlay = {
//   position: "absolute",
//   inset: 0,
//   background: "rgba(0,0,0,.5)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   cursor: "pointer",
//   zIndex: 20,
// };

// const unmuteBtn = {
//   background: "#e50914",
//   color: "#fff",
//   padding: "12px 24px",
//   borderRadius: 30,
//   border: "none",
//   fontWeight: "bold",
//   display: "flex",
//   alignItems: "center",
//   gap: 10,
// };

// const adblockOverlay = {
//   position: "absolute",
//   inset: 0,
//   background: "#000",
//   color: "#fff",
//   zIndex: 50,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: 16,
//   fontSize: 16,
//   textAlign: "center",
// };

// /* ---------------- SSG ---------------- */
// export async function getStaticPaths() {
//   return {
//     paths: schedule.shows.map((s) => ({
//       params: { id: String(s.id) },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find(
//     (s) => String(s.id) === String(params.id)
//   );
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }

















import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import schedule from "../../data/schedules.json";
import {
  FaExpand,
  FaCompress,
  FaArrowLeft,
  FaVolumeUp,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function PlayerPage({ show }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [currentUrl, setCurrentUrl] = useState(show.streamUrl);
  const [activeServer, setActiveServer] = useState("original");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [adBlocked, setAdBlocked] = useState(false);
  const [showVpnNote, setShowVpnNote] = useState(true);

  const isDirect =
    currentUrl.includes(".m3u8") || currentUrl.includes(".mp4");

  /* 🔥 VIDEO FILTER (KEEP FOR BOTH VIDEO + IFRAME) */
  const filterStyle =
    "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

  /* ---------------- AD BLOCK DETECTION ---------------- */
  useEffect(() => {
    const bait = document.createElement("div");
    bait.className =
      "adsbox ad-banner ad-container ad-placement adsbygoogle";
    bait.style.height = "1px";
    bait.style.position = "absolute";
    bait.style.left = "-9999px";
    document.body.appendChild(bait);

    setTimeout(() => {
      if (
        bait.offsetHeight === 0 ||
        window.getComputedStyle(bait).display === "none"
      ) {
        setAdBlocked(true);
      }
      document.body.removeChild(bait);
    }, 100);
  }, []);

  /* 🟡 VPN NOTE — AUTO HIDE AFTER 60 SECONDS */
  useEffect(() => {
    if (!show.note || isDirect) return;

    const timer = setTimeout(() => {
      setShowVpnNote(false);
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, [show.note, isDirect]);

  /* ---------------- HLS INIT ---------------- */
  useEffect(() => {
    if (!isDirect || !videoRef.current) return;

    let hls;
    const video = videoRef.current;
    video.muted = true;
    video.playsInline = true;

    const init = async () => {
      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true });
          hls.loadSource(currentUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = currentUrl;
          video.play().catch(() => {});
        }
      } catch {
        video.src = currentUrl;
      }
    };

    init();
    return () => hls && hls.destroy();
  }, [currentUrl, isDirect]);

  /* ---------------- FULLSCREEN ---------------- */
  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) await document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  /* ---------------- AUDIO ---------------- */
  const unmute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.volume = 1;
    setIsMuted(false);
  };

  /* ---------------- SERVER SWITCH ---------------- */
  const switchServer = (key, url) => {
    if (!url) return;
    setActiveServer(key);
    setCurrentUrl(url);
    setIsMuted(true);
    setShowVpnNote(true); // reset on server change
  };

  return (
    <>
      <Head>
        <title>{show.title} | Player</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div
        ref={containerRef}
        style={{
          height: "100vh",
          background: "#000",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!isFullscreen && (
          <header style={headerStyle}>
            <div style={{ fontWeight: "bold" }}>{show.title}</div>
            <div style={serverRow}>
              <button onClick={() => switchServer("original", show.streamUrl)} style={serverBtn(activeServer === "original")}>Original</button>
              {show.dubbedUrl && <button onClick={() => switchServer("dubbed", show.dubbedUrl)} style={serverBtn(activeServer === "dubbed")}>Hindi</button>}
              {show.englishUrl && <button onClick={() => switchServer("english", show.englishUrl)} style={serverBtn(activeServer === "english")}>Server 1</button>}
              {show.standardhUrl && <button onClick={() => switchServer("standard", show.standardhUrl)} style={serverBtn(activeServer === "standard")}>Server 2</button>}
            </div>
          </header>
        )}

        <main style={{ flex: 1, position: "relative" }}>
          <Link href="/schedule" style={backBtnTopCenter}>
            <FaArrowLeft /> Back
          </Link>

          {adBlocked && (
            <div style={adblockOverlay}>
              <FaExclamationTriangle size={36} />
              <p>Please disable your ad blocker to continue watching.</p>
            </div>
          )}

          {!adBlocked && (
            <>
              {isDirect ? (
                <>
                  <video
                    ref={videoRef}
                    controls
                    autoPlay
                    muted={isMuted}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: filterStyle,
                    }}
                  />

                  {isMuted && (
                    <div onClick={unmute} style={unmuteOverlay}>
                      <button style={unmuteBtn}>
                        <FaVolumeUp /> TAP TO UNMUTE
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {show.note && showVpnNote && (
                    <div style={vpnNote}>
                      <FaExclamationTriangle />
                      {show.note}
                    </div>
                  )}

                  <iframe
                    src={currentUrl}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      filter: filterStyle,
                    }}
                  />
                </>
              )}

              <button onClick={toggleFullscreen} style={fsBtn}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </>
          )}
        </main>
      </div>
    </>
  );
}

/* ---------------- STYLES ---------------- */
const headerStyle = {
  padding: "12px 15px",
  background: "#111",
  borderBottom: "1px solid #222",
};

const serverRow = {
  display: "flex",
  gap: 8,
  marginTop: 8,
  overflowX: "auto",
};

const serverBtn = (active) => ({
  padding: "8px 14px",
  background: active ? "#e50914" : "#333",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: "bold",
  cursor: "pointer",
  whiteSpace: "nowrap",
});

const backBtnTopCenter = {
  position: "absolute",
  top: 12,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 30,
  background: "rgba(0,0,0,.65)",
  color: "#fff",
  padding: "8px 18px",
  borderRadius: 20,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontWeight: "bold",
};

const fsBtn = {
  position: "absolute",
  bottom: 12,
  right: 12,
  background: "rgba(0,0,0,.6)",
  color: "#fff",
  border: "none",
  width: 34,
  height: 34,
  borderRadius: 4,
};

const unmuteOverlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 20,
};

const unmuteBtn = {
  background: "#e50914",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: 30,
  border: "none",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const adblockOverlay = {
  position: "absolute",
  inset: 0,
  background: "#000",
  color: "#fff",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  fontSize: 16,
  textAlign: "center",
};

const vpnNote = {
  position: "absolute",
  top: 55,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 25,
  background: "rgba(229,9,20,.95)",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 20,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: 8,
  animation: "blink 1s infinite",
};

/* ---------------- SSG ---------------- */
export async function getStaticPaths() {
  return {
    paths: schedule.shows.map((s) => ({
      params: { id: String(s.id) },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find(
    (s) => String(s.id) === String(params.id)
  );
  if (!show) return { notFound: true };
  return { props: { show }, revalidate: 60 };
}
