
// // pages/player/[id].js
// import { useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import { FaExpand, FaCompress } from "react-icons/fa";

// /**
//  * PlayerPage
//  * Supports:
//  *  - Video-only (mp4 / .m3u8)
//  *  - Iframe-only (external players like daddyhd.com)
//  *  - Mixed (switches based on stream URL)
//  *
//  * Fullscreen:
//  *  - Desktop/Tablet -> container fullscreen (best for iframe)
//  *  - Mobile -> attempt element (video) fullscreen for native behavior
//  *  - Exit controls rendered in header and overlay in fullscreen
//  */
// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const iframeRef = useRef(null);

//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isAudioEnabled, setIsAudioEnabled] = useState(false);
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);

//   const [selectedSeason, setSelectedSeason] = useState(1);
//   const [selectedEpisode, setSelectedEpisode] = useState(1);
//   const [currentStreamUrl, setCurrentStreamUrl] = useState(show?.streamUrl || "");
//   const [seasons, setSeasons] = useState([1]);
//   const [episodes, setEpisodes] = useState([1]);
//   const [iframeLoaded, setIframeLoaded] = useState(false);
//   const [activeVersion, setActiveVersion] = useState("original");

//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   // Check if URL is from daddyhd.com
//   const isDaddyHD = currentStreamUrl?.includes('daddyhd.com');

//   // Responsive device detection
//   useEffect(() => {
//     const updateWindowSize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       setWindowSize({ width, height });
//       setIsMobile(width <= 768);
//       setIsTablet(width > 768 && width <= 1024);
//     };

//     updateWindowSize();
//     window.addEventListener("resize", updateWindowSize);
//     window.addEventListener("orientationchange", updateWindowSize);
//     return () => {
//       window.removeEventListener("resize", updateWindowSize);
//       window.removeEventListener("orientationchange", updateWindowSize);
//     };
//   }, []);

//   // Parse season/episode from initial URL if TvSeries
//   useEffect(() => {
//     if (show?.category === "TvSeries" && show?.streamUrl) {
//       try {
//         const url = new URL(show.streamUrl);
//         const season = parseInt(url.searchParams.get("s")) || 1;
//         const episode = parseInt(url.searchParams.get("e")) || 1;
//         setSelectedSeason(season);
//         setSelectedEpisode(episode);
//         setSeasons(Array.from({ length: 10 }, (_, i) => i + 1));
//         setEpisodes(Array.from({ length: 20 }, (_, i) => i + 1));
//         setCurrentStreamUrl(show.streamUrl);
//       } catch (e) {
//         console.error("Error parsing season/episode:", e);
//       }
//     } else {
//       setCurrentStreamUrl(show?.streamUrl || "");
//     }
//   }, [show]);

//   // Update stream when season/episode change
//   const updateStreamUrl = (season, episode) => {
//     if (!show?.streamUrl) return;
//     try {
//       const baseUrl = show.streamUrl.split("?")[0];
//       const urlParams = new URLSearchParams(show.streamUrl.split("?")[1] || "");
//       urlParams.set("s", season);
//       urlParams.set("e", episode);
//       const newUrl = `${baseUrl}?${urlParams.toString()}`;
//       setCurrentStreamUrl(newUrl);
//       setIframeLoaded(false);

//       // update media elements if present
//       if (videoRef.current) {
//         videoRef.current.src = stripAdParams(newUrl);
//         videoRef.current.load();
//         videoRef.current.play().catch(() => {});
//       }
//       if (iframeRef.current) {
//         iframeRef.current.src = stripAdParams(newUrl);
//       }
//     } catch (e) {
//       console.error("Error updating stream URL:", e);
//     }
//   };

//   // Handle version button clicks
//   const handleVersionClick = (version) => {
//     let url = "";
    
//     switch(version) {
//       case "original":
//         url = show?.streamUrl || "";
//         break;
//       case "dubbed":
//         url = show?.dubbedUrl || "";
//         break;
//       case "english":
//         url = show?.englishUrl || "";
//         break;
//       case "standard":
//         url = show?.standardhUrl || "";
//         break;
//       default:
//         url = show?.streamUrl || "";
//     }

//     if (url) {
//       setCurrentStreamUrl(url);
//       setActiveVersion(version);
//       setIframeLoaded(false);
//     }
//   };

//   // Modified popup blocking - less aggressive for daddyhd.com
//   useEffect(() => {
//     if (isDaddyHD) {
//       // For daddyhd.com, use minimal blocking
//       const handleDaddyHDPopups = () => {
//         // Only block popups that open in new windows/tabs
//         const originalOpen = window.open;
//         window.open = function(url, target, features) {
//           // Allow player-related popups
//           if (target === '_self' || target === 'player' || !target) {
//             return originalOpen.call(window, url, target, features);
//           }
//           // Block new window/tab popups
//           return null;
//         };
//       };

//       handleDaddyHDPopups();
      
//       // Clean up
//       return () => {
//         window.open = window.open;
//       };
//     } else {
//       // Original aggressive blocking for other sites
//       const originalOpen = window.open;
//       const originalAlert = window.alert;
//       const originalConfirm = window.confirm;
//       window.open = () => null;
//       window.alert = () => undefined;
//       window.confirm = () => false;

//       const blockIframePopups = () => {
//         if (iframeRef.current?.contentWindow) {
//           try {
//             iframeRef.current.contentWindow.open = () => null;
//             iframeRef.current.contentWindow.alert = () => undefined;
//             iframeRef.current.contentWindow.confirm = () => false;
//           } catch {}
//         }
//       };

//       blockIframePopups();
//       const intervalId = setInterval(blockIframePopups, 1000);
//       return () => {
//         clearInterval(intervalId);
//         window.open = originalOpen;
//         window.alert = originalAlert;
//         window.confirm = originalConfirm;
//       };
//     }
//   }, [isDaddyHD]);

//   const enableAudio = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     v.muted = false;
//     v.volume = 1.0;
//     setIsAudioEnabled(true);
//     v.play().catch(() => {});
//   };

//   // Set CSS --vh value for mobile browsers
//   useEffect(() => {
//     const setVH = () => {
//       const vh = window.innerHeight * 0.01;
//       document.documentElement.style.setProperty("--vh", `${vh}px`);
//     };
//     setVH();
//     window.addEventListener("resize", setVH);
//     window.addEventListener("orientationchange", setVH);
//     return () => {
//       window.removeEventListener("resize", setVH);
//       window.removeEventListener("orientationchange", setVH);
//     };
//   }, []);

//   // Clean ad-like query params and hacky playlist strings
//   const stripAdParams = (url) => {
//     if (!url) return url;
    
//     // For daddyhd.com, keep all parameters but remove obvious malware ads
//     if (url.includes('daddyhd.com')) {
//       let cleanUrl = String(url);
      
//       // Only remove extreme ad parameters
//       const badParams = [
//         'popunder', 'redirect', 'banner', 'promo', 
//         'sponsor', 'affiliate', 'ref=', 'utm_'
//       ];
      
//       badParams.forEach(param => {
//         const regex = new RegExp(`([?&])${param}[^&]*`, "gi");
//         cleanUrl = cleanUrl.replace(regex, (match, p1) => (p1 === "?" ? "?" : ""));
//       });
      
//       // Clean up double characters
//       cleanUrl = cleanUrl
//         .replace(/\?\?/g, "?")
//         .replace(/\?\&/g, "?")
//         .replace(/\&\&/g, "&")
//         .replace(/\?$/, "")
//         .replace(/\&$/, "");
      
//       return cleanUrl;
//     }
    
//     // Original cleaning for other URLs
//     let cleanUrl = String(url);
//     const adParams = [
//       "adtag", "adunit", "advertise", "advertising", "adserver", "adnetwork",
//       "adbanner", "adplacement", "adclick", "adid", "utm_source", "utm_medium",
//       "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid",
//       "dclid", "irclickid", "irgwc", "irpid", "iradid", "ircid",
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
//       .replace(/#EXT-X-SPLICEPOINT/gi, "")
//       .replace(/\?\?/g, "?")
//       .replace(/\?\&/g, "?")
//       .replace(/\&\&/g, "&")
//       .replace(/\?$/, "")
//       .replace(/\&$/, "");

//     if (cleanUrl.indexOf("?") === 0 && cleanUrl.indexOf("=") === -1) cleanUrl = cleanUrl.substring(1);
//     return cleanUrl;
//   };

//   // Fullscreen helpers
//   const requestFullscreen = async (el) => {
//     if (!el) return;
//     try {
//       if (el.requestFullscreen) await el.requestFullscreen();
//       else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) await el.msRequestFullscreen();
//     } catch (err) {
//       console.warn("requestFullscreen failed:", err);
//     }
//   };

//   const exitFullscreenInternal = async () => {
//     try {
//       if (document.exitFullscreen) await document.exitFullscreen();
//       else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
//       else if (document.mozCancelFullScreen) await document.mozCancelFullScreen();
//       else if (document.msExitFullscreen) await document.msExitFullscreen();
//     } catch (err) {
//       console.warn("exitFullscreen failed:", err);
//     }
//   };

//   const enterFullscreen = async () => {
//     const container = containerRef.current;
//     // Desktop/Tablet: prefer container fullscreen (works for iframe)
//     if (!isMobile) {
//       await requestFullscreen(container);
//       return;
//     }

//     // Mobile: prefer element fullscreen (video) to get native controls where possible
//     if (videoRef.current && !isDaddyHD) {
//       try {
//         const v = videoRef.current;
//         if (v.requestFullscreen) {
//           await v.requestFullscreen();
//           return;
//         } else if (v.webkitRequestFullscreen) {
//           await v.webkitRequestFullscreen();
//           return;
//         }
//       } catch (err) {
//         console.warn("element fullscreen failed on mobile, falling back to container", err);
//       }
//     }

//     // Fallback to container (especially for iframes)
//     await requestFullscreen(container);
//   };

//   const exitFullscreen = async () => {
//     await exitFullscreenInternal();
//   };

//   const toggleFullscreen = async () => {
//     if (isFullscreen) {
//       await exitFullscreen();
//     } else {
//       await enterFullscreen();
//     }
//   };

//   // Detect fullscreen change across browsers
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       const fullscreenElement =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.mozFullScreenElement ||
//         document.msFullscreenElement;
//       setIsFullscreen(!!fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//     document.addEventListener("mozfullscreenchange", handleFullscreenChange);
//     document.addEventListener("MSFullscreenChange", handleFullscreenChange);

//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
//       document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
//       document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
//     };
//   }, []);

//   // ESC key to exit fullscreen
//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (e.key === "Escape" || e.key === "Esc") {
//         exitFullscreen();
//       }
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, []);

//   // Double-click on container toggles fullscreen
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const onDblClick = () => toggleFullscreen();
//     el.addEventListener("dblclick", onDblClick);
//     return () => el.removeEventListener("dblclick", onDblClick);
//   }, [containerRef, isFullscreen]);

//   // Init HLS or plain mp4
//   useEffect(() => {
//     if (isDaddyHD) return; // Skip video init for daddyhd.com
    
//     let hls = null;
//     const src = stripAdParams(currentStreamUrl);
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
//           hls.on(Hls.Events.MANIFEST_PARSED, async () => {
//             await video.play().catch(() => {});
//           });
//         } else {
//           video.src = src;
//           await video.play().catch(() => {});
//         }
//       } catch (err) {
//         console.warn("HLS init failed, falling back to src:", err);
//         video.src = src;
//         await video.play().catch(() => {});
//       }
//     };

//     init();
//     return () => hls && hls.destroy();
//   }, [currentStreamUrl, isDaddyHD]);

//   const cleaned = stripAdParams(currentStreamUrl || "");
//   const isHls = cleaned.toLowerCase().includes(".m3u8");
//   const isMp4 = cleaned.toLowerCase().includes(".mp4");

//   // Force iframe for daddyhd.com, otherwise use normal logic
//   const useIframe = isDaddyHD || (!isHls && !isMp4);

//   const getFontSize = (base, mobile, tablet) => {
//     if (isMobile) return mobile;
//     if (isTablet) return tablet;
//     return base;
//   };

//   const getButtonStyle = (version) => {
//     const isActive = activeVersion === version;
//     return {
//       background: isActive ? "#4CAF50" : "#FF9800",
//       color: "#fff",
//       padding: isMobile ? "8px 12px" : "10px 16px",
//       borderRadius: "6px",
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//       fontSize: getFontSize("14px", "12px", "13px"),
//       cursor: "pointer",
//       border: `1px solid ${isActive ? "#fff" : "rgba(255,255,255,0.2)"}`,
//       whiteSpace: "nowrap",
//       transition: "all 0.2s ease",
//       fontWeight: "600",
//       minWidth: isMobile ? "110px" : "120px",
//     };
//   };

//   const styles = {
//     page: {
//       width: "100vw",
//       height: "100vh",
//       maxHeight: "100vh",
//       background: "#000",
//       display: "flex",
//       flexDirection: "column",
//       overflow: "hidden",
//       position: "relative",
//     },
//     header: {
//       minHeight: isMobile ? "auto" : "56px",
//       padding: isMobile ? "12px 12px 8px" : "12px 16px",
//       display: isFullscreen && isMobile ? "none" : "flex",
//       flexDirection: isMobile ? "column" : "row",
//       alignItems: isMobile ? "flex-start" : "center",
//       justifyContent: "space-between",
//       background: "rgba(0,0,0,0.9)",
//       borderBottom: "1px solid rgba(255,255,255,0.15)",
//       gap: isMobile ? "8px" : "12px",
//       marginTop: "50px",
//       flexWrap: "wrap",
//       position: "relative",
//       zIndex: 100,
//     },
//     titleRow: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       width: "100%",
//       gap: "12px",
//       flexWrap: isMobile ? "wrap" : "nowrap",
//     },
//     titleSection: {
//       display: "flex",
//       alignItems: "center",
//       gap: isMobile ? "8px" : "16px",
//       flexWrap: "wrap",
//       flex: "1",
//     },
//     title: {
//       fontSize: getFontSize("16px", "14px", "15px"),
//       fontWeight: "bold",
//       color: "#fff",
//       whiteSpace: "nowrap",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       flex: isMobile ? "1" : "0 0 auto",
//       maxWidth: isMobile ? "100%" : "300px",
//       textAlign: isMobile ? "left" : "left",
//     },
//     versionButtons: {
//       display: "flex",
//       alignItems: "center",
//       gap: isMobile ? "8px" : "12px",
//       flexWrap: "wrap",
//       marginTop: isMobile ? "8px" : "0",
//       width: "100%",
//     },
//     tvSeriesControls: {
//       display: isFullscreen && isMobile ? "none" : "flex",
//       alignItems: "center",
//       gap: isMobile ? "8px" : "16px",
//       flexWrap: "wrap",
//       width: isMobile ? "100%" : "auto",
//       marginTop: isMobile ? "4px" : "0",
//       justifyContent: isMobile ? "space-between" : "flex-start",
//     },
//     selectorGroup: {
//       display: "flex",
//       alignItems: "center",
//       gap: isMobile ? "4px" : "8px",
//       flex: isMobile ? "1" : "0 0 auto",
//       minWidth: isMobile ? "calc(50% - 4px)" : "auto",
//     },
//     selectorLabel: {
//       color: "#fff",
//       fontSize: getFontSize("14px", "12px", "13px"),
//       fontWeight: "600",
//       whiteSpace: "nowrap",
//       display: "block",
//       minWidth: isMobile ? "50px" : "auto",
//     },
//     select: {
//       background: "#222",
//       color: "#fff",
//       border: "1px solid #444",
//       borderRadius: "6px",
//       padding: isMobile ? "6px 8px" : "8px 12px",
//       fontSize: getFontSize("14px", "12px", "13px"),
//       cursor: "pointer",
//       width: isMobile ? "100%" : "auto",
//       minWidth: isMobile ? "100px" : "100px",
//       outline: "none",
//       flex: "1",
//       transition: "all 0.2s ease",
//     },
//     headerControls: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       flex: isMobile ? "0 0 auto" : "0 0 auto",
//       justifyContent: isMobile ? "flex-end" : "flex-end",
//       width: isMobile ? "100%" : "auto",
//       marginTop: isMobile ? "8px" : "0",
//     },
//     fullscreenBtn: {
//       background: "rgba(255,255,255,0.1)",
//       color: "#fff",
//       padding: isMobile ? "8px 12px" : "10px 16px",
//       borderRadius: "6px",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       fontSize: getFontSize("14px", "12px", "13px"),
//       cursor: "pointer",
//       border: "1px solid rgba(255,255,255,0.2)",
//       whiteSpace: "nowrap",
//       transition: "all 0.2s ease",
//       fontWeight: "600",
//       minWidth: isMobile ? "120px" : "120px",
//     },
//     playerWrap: {
//       flex: "1",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "#000",
//       position: "relative",
//       width: "100%",
//       height: isFullscreen && isMobile ? "100vh" : isMobile ? "calc(100vh - 120px)" : "calc(100vh - 112px)",
//       minHeight: isMobile ? "200px" : "300px",
//       cursor: "default",
//     },
//     playerContainer: {
//       width: "100%",
//       height: "100%",
//       position: "relative",
//       overflow: "hidden",
//       background: "#000",
//     },
//     unmuteBtn: {
//       position: "absolute",
//       top: isMobile ? "12px" : "16px",
//       left: isMobile ? "12px" : "16px",
//       zIndex: 1000,
//       background: isAudioEnabled ? "#4CAF50" : "#f44336",
//       color: "#fff",
//       padding: isMobile ? "8px 12px" : "10px 16px",
//       borderRadius: "6px",
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//       fontSize: getFontSize("14px", "12px", "13px"),
//       cursor: "pointer",
//       border: "none",
//       fontWeight: "600",
//       whiteSpace: "nowrap",
//       transition: "all 0.2s ease",
//     },
//     exitFullscreenOverlayBtn: {
//       position: "fixed",
//       top: "16px",
//       right: "16px",
//       zIndex: 9999,
//       background: "rgba(0,0,0,0.8)",
//       color: "#fff",
//       padding: isMobile ? "10px 14px" : "12px 18px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       fontSize: getFontSize("14px", "13px", "14px"),
//       cursor: "pointer",
//       border: "2px solid rgba(255,255,255,0.3)",
//       whiteSpace: "nowrap",
//       fontWeight: "bold",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
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
//       display: "block",
//       visibility: "visible",
//     },
//     iframeLoading: {
//       width: "100%",
//       height: "100%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "#000",
//       color: "#fff",
//       fontSize: "16px",
//       position: "absolute",
//       top: 0,
//       left: 0,
//       zIndex: 10,
//     },
//     footer: {
//       height: isMobile ? "48px" : "56px",
//       minHeight: "48px",
//       display: isFullscreen && isMobile ? "none" : "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "rgba(0,0,0,0.9)",
//       borderTop: "1px solid rgba(255,255,255,0.15)",
//       padding: isMobile ? "0 12px" : "0 16px",
//       flexShrink: 0,
//     },
//     backLink: {
//       color: "#fff",
//       padding: isMobile ? "8px 16px" : "10px 20px",
//       borderRadius: "6px",
//       textDecoration: "none",
//       background: "rgba(255,255,255,0.05)",
//       fontSize: getFontSize("14px", "12px", "13px"),
//       whiteSpace: "nowrap",
//       fontWeight: "500",
//       transition: "all 0.2s ease",
//       border: "1px solid rgba(255,255,255,0.1)",
//     },
//   };

//   const handleIframeLoad = () => {
//     setIframeLoaded(true);
//     console.log("Iframe loaded successfully for:", cleaned);
//   };

//   return (
//     <>
//       <Head>
//         <title>{show?.title || "Player"}</title>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, orientation=landscape"
//         />
//         <meta name="theme-color" content="#000000" />
//       </Head>

//       <div style={styles.page}>
//         <header style={styles.header}>
//           <div style={styles.titleRow}>
//             <div style={styles.titleSection}>
//               <div style={styles.title}>{show?.title || "Untitled"}</div>
              
//               <div style={styles.versionButtons}>
//                 {/* Original button (always show if we have alternatives) */}
//                 {(show?.dubbedUrl || show?.englishUrl || show?.standardhUrl) && (
//                   <button 
//                     style={getButtonStyle("original")} 
//                     onClick={() => handleVersionClick("original")}
//                   >
//                     Original
//                   </button>
//                 )}
                
//                 {/* Hindi Dubbed button */}
//                 {show?.dubbedUrl && (
//                   <button 
//                     style={getButtonStyle("dubbed")} 
//                     onClick={() => handleVersionClick("dubbed")}
//                   >
//                     Hindi Dubbed
//                   </button>
//                 )}
                
//                 {/* English Version button */}
//                 {show?.englishUrl && (
//                   <button 
//                     style={getButtonStyle("english")} 
//                     onClick={() => handleVersionClick("english")}
//                   >
//                     Server 1
//                   </button>
//                 )}
                
//                 {/* Standard Version button */}
//                 {show?.standardhUrl && (
//                   <button 
//                     style={getButtonStyle("standard")} 
//                     onClick={() => handleVersionClick("standard")}
//                   >
//                     Server 2
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div style={styles.headerControls}>
//               {!isFullscreen ? (
//                 <button style={styles.fullscreenBtn} onClick={toggleFullscreen}>
//                   <FaExpand />
//                   <span style={{ marginLeft: 8 }}>Fullscreen</span>
//                 </button>
//               ) : (
//                 <button
//                   style={{ ...styles.fullscreenBtn, background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,80,80,0.6)" }}
//                   onClick={toggleFullscreen}
//                 >
//                   <FaCompress />
//                   <span style={{ marginLeft: 8 }}>Exit Fullscreen</span>
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* {show?.category === "TvSeries" && (
//             <div style={styles.tvSeriesControls}>
//               <div style={styles.selectorGroup}>
//                 <span style={styles.selectorLabel}>Season:</span>
//                 <select
//                   style={styles.select}
//                   value={selectedSeason}
//                   onChange={(e) => {
//                     const newSeason = parseInt(e.target.value);
//                     setSelectedSeason(newSeason);
//                     setSelectedEpisode(1);
//                     updateStreamUrl(newSeason, 1);
//                   }}
//                 >
//                   {seasons.map((s) => (
//                     <option key={s} value={s}>
//                       Season {s}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.selectorGroup}>
//                 <span style={styles.selectorLabel}>Episode:</span>
//                 <select
//                   style={styles.select}
//                   value={selectedEpisode}
//                   onChange={(e) => {
//                     const newEpisode = parseInt(e.target.value);
//                     setSelectedEpisode(newEpisode);
//                     updateStreamUrl(selectedSeason, newEpisode);
//                   }}
//                 >
//                   {episodes.map((ep) => (
//                     <option key={ep} value={ep}>
//                       Episode {ep}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )} */}
//         </header>

//         <div ref={containerRef} style={styles.playerWrap} onDoubleClick={toggleFullscreen}>
//           <div style={styles.playerContainer}>
//             {/* Show unmute button only for video (not iframe) */}
//             {(isHls || isMp4) && !useIframe && (
//               <button style={styles.unmuteBtn} onClick={enableAudio}>
//                 {isAudioEnabled ? "🔊 Audio ON" : "🔇 Enable Audio"}
//               </button>
//             )}

//             {/* Floating exit overlay shown whenever fullscreen is active */}
//             {isFullscreen && (
//               <button style={styles.exitFullscreenOverlayBtn} onClick={toggleFullscreen}>
//                 <FaCompress />
//                 <span style={{ marginLeft: 8 }}>Exit Fullscreen</span>
//               </button>
//             )}

//             {/* Show iframe for daddyhd.com and other non-video URLs */}
//             {useIframe ? (
//               <>
//                 <iframe 
//                   ref={iframeRef}
//                   src={cleaned}
//                   style={styles.iframe}
//                   allow="autoplay; encrypted-media; picture-in-picture; fullscreen; accelerometer; gyroscope; microphone; camera"
//                   allowFullScreen
//                   title={show?.title || "player-iframe"}
//                   key={currentStreamUrl}
//                   onLoad={handleIframeLoad}
//                   scrolling="no"
//                   frameBorder="0"
//                   marginWidth="0"
//                   marginHeight="0"
//                 />
//               </>
//             ) : (
//               <video
//                 ref={videoRef}
//                 style={styles.video}
//                 controls
//                 playsInline
//                 webkit-playsinline="true"
//                 muted={!isAudioEnabled}
//                 src={isMp4 ? cleaned : undefined}
//                 key={currentStreamUrl}
//               />
//             )}
//           </div>
//         </div>

//         <div style={styles.footer}>
//           <Link href="/schedule" style={styles.backLink}>
//             ← {isMobile ? "Back to Schedule" : "Back to Full Schedule"}
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// // Helpers for build
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
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import schedule from "../../data/schedules.json";
import { FaExpand, FaCompress } from "react-icons/fa";

/**
 * PlayerPage
 * Supports:
 *  - Video-only (mp4 / .m3u8)
 *  - Iframe-only (external players like daddyhd.com)
 *  - Mixed (switches based on stream URL)
 *
 * Fullscreen:
 *  - Desktop/Tablet -> container fullscreen (best for iframe)
 *  - Mobile -> attempt element (video) fullscreen for native behavior
 *  - Exit controls rendered in header and overlay in fullscreen
 */
export default function PlayerPage({ show }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(show?.streamUrl || "");
  const [seasons, setSeasons] = useState([1]);
  const [episodes, setEpisodes] = useState([1]);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [activeVersion, setActiveVersion] = useState("original");

  const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

  // Check if URL is from daddyhd.com
  const isDaddyHD = currentStreamUrl?.includes('daddyhd.com');

  // Responsive device detection
  useEffect(() => {
    const updateWindowSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    window.addEventListener("orientationchange", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
      window.removeEventListener("orientationchange", updateWindowSize);
    };
  }, []);

  // Parse season/episode from initial URL if TvSeries
  useEffect(() => {
    if (show?.category === "TvSeries" && show?.streamUrl) {
      try {
        const url = new URL(show.streamUrl);
        const season = parseInt(url.searchParams.get("s")) || 1;
        const episode = parseInt(url.searchParams.get("e")) || 1;
        setSelectedSeason(season);
        setSelectedEpisode(episode);
        setSeasons(Array.from({ length: 10 }, (_, i) => i + 1));
        setEpisodes(Array.from({ length: 20 }, (_, i) => i + 1));
        setCurrentStreamUrl(show.streamUrl);
      } catch (e) {
        console.error("Error parsing season/episode:", e);
      }
    } else {
      setCurrentStreamUrl(show?.streamUrl || "");
    }
  }, [show]);

  // Update stream when season/episode change
  const updateStreamUrl = (season, episode) => {
    if (!show?.streamUrl) return;
    try {
      const baseUrl = show.streamUrl.split("?")[0];
      const urlParams = new URLSearchParams(show.streamUrl.split("?")[1] || "");
      urlParams.set("s", season);
      urlParams.set("e", episode);
      const newUrl = `${baseUrl}?${urlParams.toString()}`;
      setCurrentStreamUrl(newUrl);
      setIframeLoaded(false);

      // update media elements if present
      if (videoRef.current) {
        videoRef.current.src = stripAdParams(newUrl);
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
      if (iframeRef.current) {
        iframeRef.current.src = stripAdParams(newUrl);
      }
    } catch (e) {
      console.error("Error updating stream URL:", e);
    }
  };

  // Handle version button clicks
  const handleVersionClick = (version) => {
    let url = "";
    
    switch(version) {
      case "original":
        url = show?.streamUrl || "";
        break;
      case "dubbed":
        url = show?.dubbedUrl || "";
        break;
      case "english":
        url = show?.englishUrl || "";
        break;
      case "standard":
        url = show?.standardhUrl || "";
        break;
      default:
        url = show?.streamUrl || "";
    }

    if (url) {
      setCurrentStreamUrl(url);
      setActiveVersion(version);
      setIframeLoaded(false);
    }
  };

  // AGGRESSIVE POPUP BLOCKER FOR ALL SITES
  useEffect(() => {
    // Save original functions
    const originalOpen = window.open;
    const originalAlert = window.alert;
    const originalConfirm = window.confirm;
    const originalPrompt = window.prompt;
    
    // Override window functions
    window.open = function() {
      console.log("Popup blocked:", arguments[0]);
      return null;
    };
    
    window.alert = function() {
      console.log("Alert blocked:", arguments[0]);
      return undefined;
    };
    
    window.confirm = function() {
      console.log("Confirm blocked");
      return false;
    };
    
    window.prompt = function() {
      console.log("Prompt blocked");
      return null;
    };
    
    // Block iframe popups aggressively
    const blockIframePopups = () => {
      if (iframeRef.current?.contentWindow) {
        try {
          const iframeWindow = iframeRef.current.contentWindow;
          iframeWindow.open = function() {
            console.log("Iframe popup blocked");
            return null;
          };
          iframeWindow.alert = function() { return undefined; };
          iframeWindow.confirm = function() { return false; };
          iframeWindow.prompt = function() { return null; };
          
          // Also block postMessage popups
          const originalPostMessage = iframeWindow.postMessage;
          iframeWindow.postMessage = function(data, target) {
            // Block messages that might trigger popups
            if (typeof data === 'string' && (
              data.includes('popup') || 
              data.includes('open') || 
              data.includes('window') ||
              data.includes('ad') ||
              data.includes('redirect')
            )) {
              console.log("PostMessage popup blocked:", data);
              return;
            }
            return originalPostMessage.apply(this, arguments);
          };
        } catch (error) {
          // Cross-origin errors are expected
        }
      }
    };
    
    // Run initial blocking
    blockIframePopups();
    
    // Set up interval to continuously block iframe popups
    const intervalId = setInterval(blockIframePopups, 500);
    
    // Block beforeunload events that might show popups
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
    
    // Block context menu (right-click) popups
    window.addEventListener('contextmenu', (e) => {
      if (e.target.closest('iframe') || e.target.tagName === 'IFRAME') {
        e.preventDefault();
        e.stopPropagation();
      }
    });
    
    // Clean up
    return () => {
      clearInterval(intervalId);
      window.open = originalOpen;
      window.alert = originalAlert;
      window.confirm = originalConfirm;
      window.prompt = originalPrompt;
      window.removeEventListener('beforeunload', () => {});
      window.removeEventListener('contextmenu', () => {});
    };
  }, []);

  const enableAudio = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1.0;
    setIsAudioEnabled(true);
    v.play().catch(() => {});
  };

  // Set CSS --vh value for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  // Clean ad-like query params and hacky playlist strings
  const stripAdParams = (url) => {
    if (!url) return url;
    
    // For all URLs, aggressively remove ad parameters
    let cleanUrl = String(url);
    
    // Extended list of ad parameters to block
    const adParams = [
      "adtag", "adunit", "advertise", "advertising", "adserver", "adnetwork",
      "adbanner", "adplacement", "adclick", "adid", "utm_source", "utm_medium",
      "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid",
      "dclid", "irclickid", "irgwc", "irpid", "iradid", "ircid", "popunder",
      "popup", "redirect", "banner", "promo", "sponsor", "affiliate", "ref",
      "click", "track", "campaign", "source", "medium", "fb_ref", "fb_source",
      "yclid", "_openstat", "from", "via", "shared", "recommended", "widget",
      "advertiser", "sponsored", "promoted", "placement", "slot", "zone",
      "ad_position", "ad_size", "ad_type", "ad_format", "ad_creative", "ad_group",
      "ad_campaign", "ad_channel", "ad_target", "ad_keyword", "ad_matchtype",
      "ad_device", "ad_network", "ad_publisher", "ad_subscriber", "ad_vendor",
      "ad_provider", "ad_exchange", "ad_bid", "ad_auction", "ad_impression",
      "ad_view", "ad_click", "ad_conversion", "ad_revenue", "ad_earnings",
      "ad_income", "ad_profit", "ad_money", "ad_cash", "ad_payment", "ad_billing",
      "ad_invoice", "ad_receipt", "ad_transaction", "ad_order", "ad_purchase",
      "ad_sale", "ad_deal", "ad_offer", "ad_discount", "ad_coupon", "ad_voucher",
      "ad_code", "ad_token", "ad_key", "ad_secret", "ad_signature", "ad_hash",
      "ad_md5", "ad_sha", "ad_encrypted", "ad_encoded", "ad_decoded", "ad_parsed",
      "ad_analyzed", "ad_tracked", "ad_logged", "ad_recorded", "ad_stored",
      "ad_saved", "ad_cached", "ad_buffered", "ad_queued", "ad_pending",
      "ad_processing", "ad_executing", "ad_running", "ad_loading", "ad_streaming",
      "ad_playing", "ad_showing", "ad_displaying", "ad_rendering", "ad_painting",
      "ad_drawing", "ad_writing", "ad_reading", "ad_listening", "ad_watching",
      "ad_viewing", "ad_browsing", "ad_navigating", "ad_scrolling", "ad_clicking",
      "ad_tapping", "ad_pressing", "ad_holding", "ad_releasing", "ad_dragging",
      "ad_dropping", "ad_swiping", "ad_pinching", "ad_zooming", "ad_rotating",
      "ad_tilting", "ad_shaking", "ad_moving", "ad_stopping", "ad_starting",
      "ad_pausing", "ad_resuming", "ad_restarting", "ad_reloading", "ad_refreshing",
      "ad_updating", "ad_downloading", "ad_uploading", "ad_syncing", "ad_backup",
      "ad_restore", "ad_import", "ad_export", "ad_migrate", "ad_transfer",
      "ad_copy", "ad_paste", "ad_cut", "ad_delete", "ad_remove", "ad_add",
      "ad_insert", "ad_append", "ad_prepend", "ad_attach", "ad_detach",
      "ad_connect", "ad_disconnect", "ad_join", "ad_leave", "ad_enter",
      "ad_exit", "ad_escape", "ad_cancel", "ad_submit", "ad_reset", "ad_clear",
      "ad_fill", "ad_empty", "ad_load", "ad_unload", "ad_mount", "ad_unmount",
      "ad_install", "ad_uninstall", "ad_setup", "ad_teardown", "ad_init",
      "ad_destroy", "ad_create", "ad_delete", "ad_update", "ad_patch",
      "ad_merge", "ad_split", "ad_combine", "ad_separate", "ad_filter",
      "ad_sort", "ad_group", "ad_count", "ad_sum", "ad_avg", "ad_min",
      "ad_max", "ad_std", "ad_var", "ad_dev", "ad_range", "ad_median",
      "ad_mode", "ad_percentile", "ad_quantile", "ad_correlation", "ad_regression",
      "ad_classification", "ad_clustering", "ad_anomaly", "ad_outlier",
      "ad_trend", "ad_pattern", "ad_cycle", "ad_season", "ad_noise", "ad_signal",
      "ad_feature", "ad_attribute", "ad_property", "ad_field", "ad_column",
      "ad_row", "ad_cell", "ad_table", "ad_database", "ad_index", "ad_query",
      "ad_search", "ad_find", "ad_replace", "ad_match", "ad_extract",
      "ad_parse", "ad_scan", "ad_read", "ad_write", "ad_execute", "ad_run",
      "ad_call", "ad_invoke", "ad_return", "ad_throw", "ad_catch", "ad_finally",
      "ad_try", "ad_catch", "ad_else", "ad_then", "ad_if", "ad_while", "ad_for",
      "ad_do", "ad_switch", "ad_case", "ad_default", "ad_break", "ad_continue",
      "ad_goto", "ad_label", "ad_function", "ad_class", "ad_object", "ad_array",
      "ad_string", "ad_number", "ad_boolean", "ad_null", "ad_undefined",
      "ad_nan", "ad_infinity", "ad_date", "ad_time", "ad_datetime", "ad_timestamp",
      "ad_interval", "ad_duration", "ad_period", "ad_frequency", "ad_rate",
      "ad_speed", "ad_velocity", "ad_acceleration", "ad_force", "ad_energy",
      "ad_power", "ad_work", "ad_heat", "ad_temperature", "ad_pressure",
      "ad_volume", "ad_density", "ad_mass", "ad_weight", "ad_length", "ad_width",
      "ad_height", "ad_depth", "ad_area", "ad_volume", "ad_capacity", "ad_angle",
      "ad_direction", "ad_position", "ad_location", "ad_coordinate", "ad_distance",
      "ad_proximity", "ad_radius", "ad_diameter", "ad_circumference", "ad_perimeter",
      "ad_surface", "ad_face", "ad_edge", "ad_vertex", "ad_point", "ad_line",
      "ad_curve", "ad_plane", "ad_solid", "ad_fluid", "ad_gas", "ad_liquid",
      "ad_solid", "ad_plasma", "ad_vacuum", "ad_atmosphere", "ad_environment",
      "ad_climate", "ad_weather", "ad_season", "ad_month", "ad_week", "ad_day",
      "ad_hour", "ad_minute", "ad_second", "ad_millisecond", "ad_microsecond",
      "ad_nanosecond", "ad_picosecond", "ad_femtosecond", "ad_attosecond",
      "ad_zeptosecond", "ad_yoctosecond", "ad_planck", "ad_lightyear", "ad_parsec",
      "ad_astronomical", "ad_galactic", "ad_cosmic", "ad_universal", "ad_eternal"
    ];
    
    adParams.forEach((param) => {
      const regex = new RegExp(`([?&])${param}[^&]*`, "gi");
      cleanUrl = cleanUrl.replace(regex, (match, p1) => (p1 === "?" ? "?" : ""));
    });

    // Remove HLS ad tags
    cleanUrl = cleanUrl
      .replace(/#EXT-X-DISCONTINUITY/gi, "")
      .replace(/#EXTINF:\d+\.\d+,ad/gi, "")
      .replace(/#EXT-X-CUE-OUT/gi, "")
      .replace(/#EXT-X-CUE-IN/gi, "")
      .replace(/#EXT-X-SPLICEPOINT/gi, "")
      .replace(/\?\?/g, "?")
      .replace(/\?\&/g, "?")
      .replace(/\&\&/g, "&")
      .replace(/\?$/, "")
      .replace(/\&$/, "");

    if (cleanUrl.indexOf("?") === 0 && cleanUrl.indexOf("=") === -1) cleanUrl = cleanUrl.substring(1);
    return cleanUrl;
  };

  // Fullscreen helpers
  const requestFullscreen = async (el) => {
    if (!el) return;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    } catch (err) {
      console.warn("requestFullscreen failed:", err);
    }
  };

  const exitFullscreenInternal = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) await document.mozCancelFullScreen();
      else if (document.msExitFullscreen) await document.msExitFullscreen();
    } catch (err) {
      console.warn("exitFullscreen failed:", err);
    }
  };

  const enterFullscreen = async () => {
    const container = containerRef.current;
    // Desktop/Tablet: prefer container fullscreen (works for iframe)
    if (!isMobile) {
      await requestFullscreen(container);
      return;
    }

    // Mobile: prefer element fullscreen (video) to get native controls where possible
    if (videoRef.current && !isDaddyHD) {
      try {
        const v = videoRef.current;
        if (v.requestFullscreen) {
          await v.requestFullscreen();
          return;
        } else if (v.webkitRequestFullscreen) {
          await v.webkitRequestFullscreen();
          return;
        }
      } catch (err) {
        console.warn("element fullscreen failed on mobile, falling back to container", err);
      }
    }

    // Fallback to container (especially for iframes)
    await requestFullscreen(container);
  };

  const exitFullscreen = async () => {
    await exitFullscreenInternal();
  };

  const toggleFullscreen = async () => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen();
    }
  };

  // Detect fullscreen change across browsers
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // ESC key to exit fullscreen
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        exitFullscreen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Double-click on container toggles fullscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onDblClick = () => toggleFullscreen();
    el.addEventListener("dblclick", onDblClick);
    return () => el.removeEventListener("dblclick", onDblClick);
  }, [containerRef, isFullscreen]);

  // Init HLS or plain mp4
  useEffect(() => {
    if (isDaddyHD) return; // Skip video init for daddyhd.com
    
    let hls = null;
    const src = stripAdParams(currentStreamUrl);
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
          hls.on(Hls.Events.MANIFEST_PARSED, async () => {
            await video.play().catch(() => {});
          });
        } else {
          video.src = src;
          await video.play().catch(() => {});
        }
      } catch (err) {
        console.warn("HLS init failed, falling back to src:", err);
        video.src = src;
        await video.play().catch(() => {});
      }
    };

    init();
    return () => hls && hls.destroy();
  }, [currentStreamUrl, isDaddyHD]);

  const cleaned = stripAdParams(currentStreamUrl || "");
  const isHls = cleaned.toLowerCase().includes(".m3u8");
  const isMp4 = cleaned.toLowerCase().includes(".mp4");

  // Force iframe for daddyhd.com, otherwise use normal logic
  const useIframe = isDaddyHD || (!isHls && !isMp4);

  const getFontSize = (base, mobile, tablet) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return base;
  };

  const getButtonStyle = (version) => {
    const isActive = activeVersion === version;
    return {
      background: isActive ? "#4CAF50" : "#FF9800",
      color: "#fff",
      padding: isMobile ? "8px 12px" : "10px 16px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: getFontSize("14px", "12px", "13px"),
      cursor: "pointer",
      border: `1px solid ${isActive ? "#fff" : "rgba(255,255,255,0.2)"}`,
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
      fontWeight: "600",
      minWidth: isMobile ? "110px" : "120px",
    };
  };

  const styles = {
    page: {
      width: "100vw",
      height: "100vh",
      maxHeight: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    },
    header: {
      minHeight: isMobile ? "auto" : "56px",
      padding: isMobile ? "12px 12px 8px" : "12px 16px",
      display: isFullscreen && isMobile ? "none" : "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      background: "rgba(0,0,0,0.9)",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
      gap: isMobile ? "8px" : "12px",
      marginTop: "50px",
      flexWrap: "wrap",
      position: "relative",
      zIndex: 100,
    },
    titleRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      gap: "12px",
      flexWrap: isMobile ? "wrap" : "nowrap",
    },
    titleSection: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : "16px",
      flexWrap: "wrap",
      flex: "1",
    },
    title: {
      fontSize: getFontSize("16px", "14px", "15px"),
      fontWeight: "bold",
      color: "#fff",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      flex: isMobile ? "1" : "0 0 auto",
      maxWidth: isMobile ? "100%" : "300px",
      textAlign: isMobile ? "left" : "left",
    },
    versionButtons: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : "12px",
      flexWrap: "wrap",
      marginTop: isMobile ? "8px" : "0",
      width: "100%",
    },
    tvSeriesControls: {
      display: isFullscreen && isMobile ? "none" : "flex",
      alignItems: "center",
      gap: isMobile ? "8px" : "16px",
      flexWrap: "wrap",
      width: isMobile ? "100%" : "auto",
      marginTop: isMobile ? "4px" : "0",
      justifyContent: isMobile ? "space-between" : "flex-start",
    },
    selectorGroup: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "4px" : "8px",
      flex: isMobile ? "1" : "0 0 auto",
      minWidth: isMobile ? "calc(50% - 4px)" : "auto",
    },
    selectorLabel: {
      color: "#fff",
      fontSize: getFontSize("14px", "12px", "13px"),
      fontWeight: "600",
      whiteSpace: "nowrap",
      display: "block",
      minWidth: isMobile ? "50px" : "auto",
    },
    select: {
      background: "#222",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: isMobile ? "6px 8px" : "8px 12px",
      fontSize: getFontSize("14px", "12px", "13px"),
      cursor: "pointer",
      width: isMobile ? "100%" : "auto",
      minWidth: isMobile ? "100px" : "100px",
      outline: "none",
      flex: "1",
      transition: "all 0.2s ease",
    },
    headerControls: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flex: isMobile ? "0 0 auto" : "0 0 auto",
      justifyContent: isMobile ? "flex-end" : "flex-end",
      width: isMobile ? "100%" : "auto",
      marginTop: isMobile ? "8px" : "0",
    },
    fullscreenBtn: {
      background: "rgba(255,255,255,0.1)",
      color: "#fff",
      padding: isMobile ? "8px 12px" : "10px 16px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: getFontSize("14px", "12px", "13px"),
      cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.2)",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
      fontWeight: "600",
      minWidth: isMobile ? "120px" : "120px",
    },
    playerWrap: {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#000",
      position: "relative",
      width: "100%",
      height: isFullscreen && isMobile ? "100vh" : isMobile ? "calc(100vh - 120px)" : "calc(100vh - 112px)",
      minHeight: isMobile ? "200px" : "300px",
      cursor: "default",
    },
    playerContainer: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      background: "#000",
    },
    unmuteBtn: {
      position: "absolute",
      top: isMobile ? "12px" : "16px",
      left: isMobile ? "12px" : "16px",
      zIndex: 1000,
      background: isAudioEnabled ? "#4CAF50" : "#f44336",
      color: "#fff",
      padding: isMobile ? "8px 12px" : "10px 16px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: getFontSize("14px", "12px", "13px"),
      cursor: "pointer",
      border: "none",
      fontWeight: "600",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
    },
    exitFullscreenOverlayBtn: {
      position: "fixed",
      top: "16px",
      right: "16px",
      zIndex: 9999,
      background: "rgba(0,0,0,0.8)",
      color: "#fff",
      padding: isMobile ? "10px 14px" : "12px 18px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: getFontSize("14px", "13px", "14px"),
      cursor: "pointer",
      border: "2px solid rgba(255,255,255,0.3)",
      whiteSpace: "nowrap",
      fontWeight: "bold",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    },
    video: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      position: "absolute",
      top: 0,
      left: 0,
      background: "#000",
      filter: filterStyle,
    },
    iframe: {
      width: "100%",
      height: "100%",
      border: "none",
      position: "absolute",
      top: 0,
      left: 0,
      background: "#000",
      filter: filterStyle,
      display: "block",
      visibility: "visible",
    },
    iframeLoading: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      color: "#fff",
      fontSize: "16px",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 10,
    },
    footer: {
      height: isMobile ? "48px" : "56px",
      minHeight: "48px",
      display: isFullscreen && isMobile ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.9)",
      borderTop: "1px solid rgba(255,255,255,0.15)",
      padding: isMobile ? "0 12px" : "0 16px",
      flexShrink: 0,
    },
    backLink: {
      color: "#fff",
      padding: isMobile ? "8px 16px" : "10px 20px",
      borderRadius: "6px",
      textDecoration: "none",
      background: "rgba(255,255,255,0.05)",
      fontSize: getFontSize("14px", "12px", "13px"),
      whiteSpace: "nowrap",
      fontWeight: "500",
      transition: "all 0.2s ease",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    console.log("Iframe loaded successfully for:", cleaned);
  };

  return (
    <>
      <Head>
        <title>{show?.title || "Player"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, orientation=landscape"
        />
        <meta name="theme-color" content="#000000" />
      </Head>

      <div style={styles.page}>
        <header style={styles.header}>
          <div style={styles.titleRow}>
            <div style={styles.titleSection}>
              <div style={styles.title}>{show?.title || "Untitled"}</div>
              
              <div style={styles.versionButtons}>
                {/* Original button (always show if we have alternatives) */}
                {(show?.dubbedUrl || show?.englishUrl || show?.standardhUrl) && (
                  <button 
                    style={getButtonStyle("original")} 
                    onClick={() => handleVersionClick("original")}
                  >
                    Original
                  </button>
                )}
                
                {/* Hindi Dubbed button */}
                {show?.dubbedUrl && (
                  <button 
                    style={getButtonStyle("dubbed")} 
                    onClick={() => handleVersionClick("dubbed")}
                  >
                    Hindi Dubbed
                  </button>
                )}
                
                {/* English Version button */}
                {show?.englishUrl && (
                  <button 
                    style={getButtonStyle("english")} 
                    onClick={() => handleVersionClick("english")}
                  >
                    Server 1
                  </button>
                )}
                
                {/* Standard Version button */}
                {show?.standardhUrl && (
                  <button 
                    style={getButtonStyle("standard")} 
                    onClick={() => handleVersionClick("standard")}
                  >
                    Server 2
                  </button>
                )}
              </div>
            </div>

            <div style={styles.headerControls}>
              {!isFullscreen ? (
                <button style={styles.fullscreenBtn} onClick={toggleFullscreen}>
                  <FaExpand />
                  <span style={{ marginLeft: 8 }}>Fullscreen</span>
                </button>
              ) : (
                <button
                  style={{ ...styles.fullscreenBtn, background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,80,80,0.6)" }}
                  onClick={toggleFullscreen}
                >
                  <FaCompress />
                  <span style={{ marginLeft: 8 }}>Exit Fullscreen</span>
                </button>
              )}
            </div>
          </div>

          {/* {show?.category === "TvSeries" && (
            <div style={styles.tvSeriesControls}>
              <div style={styles.selectorGroup}>
                <span style={styles.selectorLabel}>Season:</span>
                <select
                  style={styles.select}
                  value={selectedSeason}
                  onChange={(e) => {
                    const newSeason = parseInt(e.target.value);
                    setSelectedSeason(newSeason);
                    setSelectedEpisode(1);
                    updateStreamUrl(newSeason, 1);
                  }}
                >
                  {seasons.map((s) => (
                    <option key={s} value={s}>
                      Season {s}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.selectorGroup}>
                <span style={styles.selectorLabel}>Episode:</span>
                <select
                  style={styles.select}
                  value={selectedEpisode}
                  onChange={(e) => {
                    const newEpisode = parseInt(e.target.value);
                    setSelectedEpisode(newEpisode);
                    updateStreamUrl(selectedSeason, newEpisode);
                  }}
                >
                  {episodes.map((ep) => (
                    <option key={ep} value={ep}>
                      Episode {ep}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )} */}
        </header>

        <div ref={containerRef} style={styles.playerWrap} onDoubleClick={toggleFullscreen}>
          <div style={styles.playerContainer}>
            {/* Show unmute button only for video (not iframe) */}
            {(isHls || isMp4) && !useIframe && (
              <button style={styles.unmuteBtn} onClick={enableAudio}>
                {isAudioEnabled ? "🔊 Audio ON" : "🔇 Enable Audio"}
              </button>
            )}

            {/* Floating exit overlay shown whenever fullscreen is active */}
            {isFullscreen && (
              <button style={styles.exitFullscreenOverlayBtn} onClick={toggleFullscreen}>
                <FaCompress />
                <span style={{ marginLeft: 8 }}>Exit Fullscreen</span>
              </button>
            )}

            {/* Show iframe for daddyhd.com and other non-video URLs */}
            {useIframe ? (
              <>
                <iframe 
                  ref={iframeRef}
                  src={cleaned}
                  style={styles.iframe}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen; accelerometer; gyroscope; microphone; camera"
                  allowFullScreen
                  title={show?.title || "player-iframe"}
                  key={currentStreamUrl}
                  onLoad={handleIframeLoad}
                  scrolling="no"
                  frameBorder="0"
                  marginWidth="0"
                  marginHeight="0"
                  // sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation"
                />
              </>
            ) : (
              <video
                ref={videoRef}
                style={styles.video}
                controls
                playsInline
                webkit-playsinline="true"
                muted={!isAudioEnabled}
                src={isMp4 ? cleaned : undefined}
                key={currentStreamUrl}
              />
            )}
          </div>
        </div>

        <div style={styles.footer}>
          <Link href="/schedule" style={styles.backLink}>
            ← {isMobile ? "Back to Schedule" : "Back to Full Schedule"}
          </Link>
        </div>
      </div>
    </>
  );
}

// Helpers for build
function normalizeSchedule(s) {
  if (!s) return [];
  if (Array.isArray(s)) return s;
  if (s?.shows) return s.shows;
  if (s?.default) return s.default;
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