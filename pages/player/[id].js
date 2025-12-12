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
//  *  - Iframe-only (external players)
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

//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

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

//   // Persistent popup blocker for iframe content
//   useEffect(() => {
//     const originalOpen = window.open;
//     const originalAlert = window.alert;
//     const originalConfirm = window.confirm;
//     window.open = () => null;
//     window.alert = () => undefined;
//     window.confirm = () => false;

//     const blockIframePopups = () => {
//       if (iframeRef.current?.contentWindow) {
//         try {
//           iframeRef.current.contentWindow.open = () => null;
//           iframeRef.current.contentWindow.alert = () => undefined;
//           iframeRef.current.contentWindow.confirm = () => false;
//         } catch {}
//       }
//     };

//     blockIframePopups();
//     const intervalId = setInterval(blockIframePopups, 1000);
//     return () => {
//       clearInterval(intervalId);
//       window.open = originalOpen;
//       window.alert = originalAlert;
//       window.confirm = originalConfirm;
//     };
//   }, []);

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
//       // ignore failures (some webviews block fullscreen)
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
//     if (videoRef.current) {
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

//     // Fallback to container
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
//     // don't set state here — fullscreenchange event will update it
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
//       // space/arrow shortcuts can be added here if desired
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
//   }, [currentStreamUrl]);

//   const cleaned = stripAdParams(currentStreamUrl || "");
//   const isHls = cleaned.toLowerCase().includes(".m3u8");
//   const isMp4 = cleaned.toLowerCase().includes(".mp4");

//   const getFontSize = (base, mobile, tablet) => {
//     if (isMobile) return mobile;
//     if (isTablet) return tablet;
//     return base;
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
//             <div style={styles.title}>{show?.title || "Untitled"}</div>

//             <div style={styles.headerControls}>
//               {/* Enter / Exit fullscreen in header (desktop + mobile) */}
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

//           {show?.category === "TvSeries" && (
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
//           )}
//         </header>

//         <div ref={containerRef} style={styles.playerWrap} onDoubleClick={toggleFullscreen}>
//           <div style={styles.playerContainer}>
//             {(isHls || isMp4) && (
//               <button style={styles.unmuteBtn} onClick={enableAudio}>
//                 {isAudioEnabled ? "🔊 Audio ON" : "🔇 Enable Audio"}
//               </button>
//             )}

//             {/* Floating exit overlay shown whenever fullscreen is active (desktop + mobile) */}
//             {isFullscreen && (
//               <button style={styles.exitFullscreenOverlayBtn} onClick={toggleFullscreen}>
//                 <FaCompress />
//                 <span style={{ marginLeft: 8 }}>Exit Fullscreen</span>
//               </button>
//             )}

//             {/* Choose video (mp4 / hls) or iframe depending on URL */}
//             {isHls || isMp4 ? (
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
//             ) : (
//               <iframe
//                 ref={iframeRef}
//                 src={cleaned}
//                 style={styles.iframe}
//                 allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
//                 allowFullScreen
//                 title={show?.title || "player-iframe"}
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

  // Selective popup blocker - less aggressive for daddyhd.com
  useEffect(() => {
    if (isDaddyHD) {
      // For daddyhd.com, use less aggressive blocking to allow volume controls
      const blockNonDaddyPopups = () => {
        if (iframeRef.current?.contentWindow) {
          try {
            const iframeWindow = iframeRef.current.contentWindow;
            const iframeDoc = iframeRef.current.contentDocument;
            
            // Only block if we detect non-daddyhd domains within iframe
            if (!iframeRef.current.src.includes('daddyhd.com')) {
              iframeWindow.open = () => null;
              iframeWindow.alert = () => undefined;
              iframeWindow.confirm = () => false;
              
              // Also block onload popups
              if (iframeDoc) {
                const scripts = iframeDoc.querySelectorAll('script');
                scripts.forEach(script => {
                  if (script.textContent.includes('window.open') && 
                      !script.textContent.includes('player')) {
                    script.textContent = script.textContent.replace(
                      /window\.open\([^)]*\)/g, 
                      'null'
                    );
                  }
                });
              }
            }
          } catch {}
        }
      };

      const intervalId = setInterval(blockNonDaddyPopups, 2000);
      return () => clearInterval(intervalId);
    } else {
      // Original aggressive blocking for other sites
      const originalOpen = window.open;
      const originalAlert = window.alert;
      const originalConfirm = window.confirm;
      window.open = () => null;
      window.alert = () => undefined;
      window.confirm = () => false;

      const blockIframePopups = () => {
        if (iframeRef.current?.contentWindow) {
          try {
            iframeRef.current.contentWindow.open = () => null;
            iframeRef.current.contentWindow.alert = () => undefined;
            iframeRef.current.contentWindow.confirm = () => false;
          } catch {}
        }
      };

      blockIframePopups();
      const intervalId = setInterval(blockIframePopups, 1000);
      return () => {
        clearInterval(intervalId);
        window.open = originalOpen;
        window.alert = originalAlert;
        window.confirm = originalConfirm;
      };
    }
  }, [isDaddyHD]);

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
    
    // For daddyhd.com, keep essential parameters but remove obvious ads
    if (url.includes('daddyhd.com')) {
      let cleanUrl = String(url);
      
      // Remove specific ad parameters but keep player parameters
      const badParams = [
        'popads', 'popunder', 'redirect', 'banner', 'click', 
        'promo', 'sponsor', 'affiliate', 'ref=', 'utm_'
      ];
      
      badParams.forEach(param => {
        const regex = new RegExp(`([?&])${param}[^&]*`, "gi");
        cleanUrl = cleanUrl.replace(regex, (match, p1) => (p1 === "?" ? "?" : ""));
      });
      
      // Clean up double characters
      cleanUrl = cleanUrl
        .replace(/\?\?/g, "?")
        .replace(/\?\&/g, "?")
        .replace(/\&\&/g, "&")
        .replace(/\?$/, "")
        .replace(/\&$/, "");
      
      return cleanUrl;
    }
    
    // Original cleaning for other URLs
    let cleanUrl = String(url);
    const adParams = [
      "adtag", "adunit", "advertise", "advertising", "adserver", "adnetwork",
      "adbanner", "adplacement", "adclick", "adid", "utm_source", "utm_medium",
      "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid",
      "dclid", "irclickid", "irgwc", "irpid", "iradid", "ircid",
    ];
    adParams.forEach((param) => {
      const regex = new RegExp(`([?&])${param}=[^&]*`, "gi");
      cleanUrl = cleanUrl.replace(regex, (match, p1) => (p1 === "?" ? "?" : ""));
    });

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
      visibility: iframeLoaded ? "visible" : "hidden",
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
    console.log("Iframe loaded successfully");
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
            <div style={styles.title}>{show?.title || "Untitled"}</div>

            <div style={styles.headerControls}>
              {/* Enter / Exit fullscreen in header (desktop + mobile) */}
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

          {show?.category === "TvSeries" && (
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
          )}
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
                {!iframeLoaded && (
                  <div style={styles.iframeLoading}>
                    Loading player...
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={cleaned}
                  style={styles.iframe}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  title={show?.title || "player-iframe"}
                  key={currentStreamUrl}
                  onLoad={handleIframeLoad}
                 
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