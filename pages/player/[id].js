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
//     footer: {
//       flex: '0 0 auto', // Fixed height
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
// pages/player/[id].js
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import schedule from "../../data/schedules.json";
import { FaExpand, FaCompress, FaArrowLeft, FaVolumeUp } from "react-icons/fa";

export default function PlayerPage({ show }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentStreamUrl, setCurrentStreamUrl] = useState("");
  const [activeVersion, setActiveVersion] = useState("original");
  
  // Audio state only for Native HLS player
  const [isNativeAudioEnabled, setIsNativeAudioEnabled] = useState(false); 

  const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

  // --- 1. POP-UNDER KILLER (Parent Window Level) ---
  useEffect(() => {
    // This attempts to neutralize popups that try to target the top window
    const killPopups = () => {
      window.open = function() { 
        console.log("Popup attempt blocked");
        return { focus: function() {}, close: function() {} }; 
      };
      window.alert = function() { return true; };
      window.confirm = function() { return true; };
      window.prompt = function() { return null; };
    };

    killPopups();
    
    // Re-apply periodically in case the ad script tries to restore it
    const interval = setInterval(killPopups, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. INITIALIZATION ---
  useEffect(() => {
    if (show?.streamUrl) {
      setCurrentStreamUrl(show.streamUrl);
    }
    
    // Viewport Height Fix for Mobile Browsers
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, [show]);

  // --- 3. HLS PLAYER LOGIC (Only for .m3u8/.mp4) ---
  useEffect(() => {
    if (!currentStreamUrl) return;
    
    const isDirect = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');
    if (!isDirect) return; // Stop here if it's an iframe

    let hls = null;
    const video = videoRef.current;
    
    const initHls = async () => {
      if (!video) return;
      
      setIsNativeAudioEnabled(false);
      video.muted = true; // Required for autoplay

      try {
        const HlsModule = (await import("hls.js")).default;
        if (HlsModule.isSupported()) {
          hls = new HlsModule({ enableWorker: true, lowLatencyMode: true });
          hls.loadSource(currentStreamUrl);
          hls.attachMedia(video);
          hls.on(HlsModule.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = currentStreamUrl;
          video.addEventListener("loadedmetadata", () => {
            video.play().catch(() => {});
          });
        }
      } catch (err) {
        video.src = currentStreamUrl;
      }
    };
    initHls();
    return () => hls && hls.destroy();
  }, [currentStreamUrl]);

  // --- 4. HANDLERS ---
  const handleNativeUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      setIsNativeAudioEnabled(true);
    }
  };

  const handleVersionClick = (version, url) => {
    if (url) {
      setActiveVersion(version);
      setCurrentStreamUrl(url);
      setIsNativeAudioEnabled(false);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) await container.requestFullscreen();
      else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
      else if (container.mozRequestFullScreen) await container.mozRequestFullScreen();
      else if (container.msRequestFullscreen) await container.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) await document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Determine if we render <video> or <iframe>
  const isDirectFile = currentStreamUrl.includes('.m3u8') || currentStreamUrl.includes('.mp4');

  // --- STYLES ---
  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      height: 'calc(var(--vh, 1vh) * 100)',
      backgroundColor: '#000',
      overflow: 'hidden'
    },
    header: {
      flex: '0 0 auto',
      padding: '10px 15px',
      backgroundColor: '#111',
      zIndex: 100,
      display: isFullscreen ? 'none' : 'block',
      borderBottom: '1px solid #333'
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    btnContainer: {
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '5px',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none'
    },
    serverBtn: (active) => ({
      padding: '8px 15px',
      backgroundColor: active ? '#e50914' : '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }),
    playerSection: {
      flex: '1 1 auto',
      position: 'relative',
      backgroundColor: '#000',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'hidden'
    },
    playerContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    // Overlay for NATIVE video only
    unmuteOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      cursor: 'pointer'
    },
    unmuteButton: {
      backgroundColor: '#e50914',
      color: '#fff',
      border: '2px solid #fff',
      padding: '12px 24px',
      borderRadius: '30px',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      pointerEvents: 'none'
    },
    fullscreenBtn: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      zIndex: 60,
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    footer: {
      flex: '0 0 auto',
      padding: '15px',
      backgroundColor: '#111',
      display: isFullscreen ? 'none' : 'flex',
      justifyContent: 'center',
      zIndex: 100,
      borderTop: '1px solid #333'
    },
    backLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#fff',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      backgroundColor: '#222',
      padding: '10px 20px',
      borderRadius: '5px',
      border: '1px solid #333'
    }
  };

  return (
    <>
      <Head>
        <title>Player | {show?.title || "Live"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div style={styles.page}>
        <header style={styles.header}>
          <div style={styles.topBar}>
            <span style={{color: '#fff', fontWeight: 'bold'}}>{show?.title}</span>
          </div>
          <div style={styles.btnContainer}>
            <button style={styles.serverBtn(activeVersion === 'original')} onClick={() => handleVersionClick('original', show?.streamUrl)}>Original</button>
            {show?.dubbedUrl && <button style={styles.serverBtn(activeVersion === 'dubbed')} onClick={() => handleVersionClick('dubbed', show?.dubbedUrl)}>Hindi Dubbed</button>}
            {show?.englishUrl && <button style={styles.serverBtn(activeVersion === 'english')} onClick={() => handleVersionClick('english', show?.englishUrl)}>Server 1</button>}
            {show?.standardhUrl && <button style={styles.serverBtn(activeVersion === 'standard')} onClick={() => handleVersionClick('standard', show?.standardhUrl)}>Server 2</button>}
          </div>
        </header>

        <main style={styles.playerSection} ref={containerRef}>
          <div style={styles.playerContainer}>
            
            {/* LOGIC SPLIT: IF DIRECT FILE -> VIDEO TAG. IF EMBED -> IFRAME TAG */}
            {isDirectFile ? (
              <>
                <video 
                  ref={videoRef} 
                  style={{width: '100%', height: '100%', objectFit: 'contain', filter: filterStyle}} 
                  controls 
                  autoPlay 
                  muted={!isNativeAudioEnabled} 
                  playsInline
                />
                {/* Custom Unmute Button ONLY for HLS Video */}
                {!isNativeAudioEnabled && (
                  <div style={styles.unmuteOverlay} onClick={handleNativeUnmute}>
                    <button style={styles.unmuteButton}>
                      <FaVolumeUp size={20} /> CLICK TO UNMUTE
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* PURE IFRAME FOR EMBEDS (DaddyHD, Vidsrc) - NO OVERLAY */
              <iframe
                ref={iframeRef}
                src={currentStreamUrl}
                style={{width: '100%', height: '100%', border: 'none', filter: filterStyle}}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                key={currentStreamUrl}
              />
            )}

            {/* External Fullscreen Button (Works for both) */}
            <button style={styles.fullscreenBtn} onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
            </button>
          </div>
        </main>

        <footer style={styles.footer}>
          <Link href="/schedule" style={styles.backLink}>
            <FaArrowLeft /> BACK TO FULL SCHEDULE
          </Link>
        </footer>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = schedule.shows.map((show) => ({ params: { id: String(show.id) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find((item) => String(item.id) === String(params.id));
  if (!show) return { notFound: true };
  return { props: { show }, revalidate: 60 };
}