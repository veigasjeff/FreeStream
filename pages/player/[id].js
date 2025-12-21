// import { useEffect, useRef, useState, useCallback } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import {
//   FaExpand,
//   FaCompress,
//   FaArrowLeft,
//   FaVolumeUp,
//   FaVolumeMute,
//   FaExclamationTriangle,
//   FaCog,
//   FaCheck,
//   FaPlay,
//   FaPause,
//   FaForward,
//   FaBackward,
//   FaRedo
// } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const hlsRef = useRef(null);
//   const controlsTimeoutRef = useRef(null);

//   const [currentUrl, setCurrentUrl] = useState(show.streamUrl);
//   const [activeServer, setActiveServer] = useState("original");
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [adBlocked, setAdBlocked] = useState(false);
//   const [showVpnNote, setShowVpnNote] = useState(true);
//   const [showUnmutePrompt, setShowUnmutePrompt] = useState(true);
//   const [videoError, setVideoError] = useState(false);
//   const [qualityLevels, setQualityLevels] = useState([]);
//   const [currentQuality, setCurrentQuality] = useState(-1);
//   const [showQualityMenu, setShowQualityMenu] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [buffering, setBuffering] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [showControls, setShowControls] = useState(true);

//   const isDirect = currentUrl.includes(".m3u8") || currentUrl.includes(".mp4");
//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   /* ---------------- AD BLOCK DETECTION ---------------- */
//   useEffect(() => {
//     const bait = document.createElement("div");
//     bait.className = "adsbox ad-banner ad-container ad-placement adsbygoogle";
//     bait.style.cssText = "position:absolute;left:-9999px;height:1px;width:1px;";
//     document.body.appendChild(bait);
//     setTimeout(() => {
//       if (bait.offsetHeight === 0 || window.getComputedStyle(bait).display === "none") {
//         setAdBlocked(true);
//       }
//       document.body.removeChild(bait);
//     }, 150);
//   }, []);

//   /* ---------------- AUTO HIDE CONTROLS ---------------- */
//   const hideControls = useCallback(() => {
//     if (isPlaying && !showQualityMenu) setShowControls(false);
//   }, [isPlaying, showQualityMenu]);

//   const triggerControls = useCallback(() => {
//     setShowControls(true);
//     if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
//     controlsTimeoutRef.current = setTimeout(hideControls, 3000);
//   }, [hideControls]);

//   useEffect(() => {
//     if (isPlaying) triggerControls();
//     return () => clearTimeout(controlsTimeoutRef.current);
//   }, [isPlaying, triggerControls]);

//   /* ---------------- HLS INIT ---------------- */
//   useEffect(() => {
//     if (!isDirect || !videoRef.current) return;
//     let hls;
//     const video = videoRef.current;
//     setVideoError(false);

//     const init = async () => {
//       try {
//         const Hls = (await import("hls.js")).default;
//         if (Hls.isSupported()) {
//           hls = new Hls({ enableWorker: true, lowLatencyMode: true });
//           hlsRef.current = hls;
//           hls.loadSource(currentUrl);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             const lvls = hls.levels.map((l, i) => ({ id: i, name: l.height ? `${l.height}p` : "Auto" }));
//             setQualityLevels([{ id: -1, name: "Auto" }, ...lvls]);
//             setBuffering(false);
//             video.play().catch(() => {});
//           });
//           hls.on(Hls.Events.LEVEL_SWITCHED, (e, data) => setCurrentQuality(data.level));
//           hls.on(Hls.Events.ERROR, (e, data) => { if (data.fatal) hls.recoverMediaError(); });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           video.src = currentUrl;
//         }
//       } catch (error) { setVideoError(true); }
//     };

//     init();
//     const onTime = () => setCurrentTime(video.currentTime);
//     const onMeta = () => setDuration(video.duration);
//     video.addEventListener("timeupdate", onTime);
//     video.addEventListener("loadedmetadata", onMeta);
//     video.addEventListener("waiting", () => setBuffering(true));
//     video.addEventListener("playing", () => setBuffering(false));
//     return () => {
//       if (hls) hls.destroy();
//       video.removeEventListener("timeupdate", onTime);
//       video.removeEventListener("loadedmetadata", onMeta);
//     };
//   }, [currentUrl, isDirect]);

//   /* ---------------- INTERACTION ---------------- */
//   const togglePlay = (e) => {
//     e?.stopPropagation();
//     if (!videoRef.current) return;
//     videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
//     setIsPlaying(!videoRef.current.paused);
//   };

//   const handleSeek = (e) => {
//     const time = parseFloat(e.target.value);
//     videoRef.current.currentTime = time;
//     setCurrentTime(time);
//   };

//   const toggleFullscreen = async () => {
//     const el = containerRef.current;
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

//   const switchServer = (key, url) => {
//     setActiveServer(key);
//     setCurrentUrl(url);
//     setIsMuted(true);
//     setQualityLevels([]);
//     setBuffering(true);
//     setVideoError(false);
//     setIsPlaying(false);
//   };

//   const formatTime = (s) => {
//     const mins = Math.floor(s / 60) || 0;
//     const secs = Math.floor(s % 60) || 0;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div ref={containerRef} className="player-wrapper" onMouseMove={triggerControls}>
//       <Head>
//         <title>{show.title} | Streaming</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
//       </Head>

//       <style jsx global>{`
//         .player-wrapper {
//           background: #000; height: 100vh; width: 100vw;
//           display: flex; flex-direction: column; overflow: hidden; position: relative;
//           color: white; font-family: 'Inter', sans-serif;
//         }
        
//         /* --- MODERN RED DOT SLIDER --- */
//         input[type="range"].red-dot-slider {
//           -webkit-appearance: none; width: 100%; background: transparent; cursor: pointer;
//         }
//         input[type="range"].red-dot-slider::-webkit-slider-runnable-track {
//           width: 100%; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px;
//         }
//         input[type="range"].red-dot-slider::-webkit-slider-thumb {
//           -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%;
//           background: #e50914; margin-top: -5px; border: 2px solid white;
//           box-shadow: 0 0 10px rgba(0,0,0,0.5); transition: 0.2s ease;
//         }
//         input[type="range"].red-dot-slider:active::-webkit-slider-thumb { transform: scale(1.3); }

//         /* --- UI COMPONENTS --- */
//         .header-box { padding: 12px 15px; background: #111; border-bottom: 1px solid #222; flex-shrink: 0; z-index: 10; }
//         .server-list { display: flex; gap: 8px; margin-top: 8px; overflow-x: auto; scrollbar-width: none; }
//         .server-btn { padding: 8px 16px; background: #333; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; }
//         .server-btn.active { background: #e50914; }

//         .main-stage { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
//         .back-pill { 
//           position: absolute; top: 12px; left: 50%; transform: translateX(-50%); z-index: 50;
//           background: rgba(0,0,0,0.85); color: white; padding: 10px 22px; border-radius: 25px;
//           text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: bold; border: 1px solid #333;
//         }

//         .controls-overlay {
//           position: absolute; bottom: 0; left: 0; right: 0;
//           background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
//           padding: 20px 30px; z-index: 40; transition: opacity 0.4s;
//         }
//         .ctrl-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
//         .ctrl-group { display: flex; align-items: center; gap: 20px; }
//         .ctrl-icon { background: none; border: none; color: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; }
//         .play-btn { background: #e50914; width: 45px; height: 45px; border-radius: 50%; justify-content: center; }

//         .quality-menu {
//           position: absolute; bottom: 90px; right: 30px; background: rgba(20,20,20,0.95);
//           border: 1px solid #333; border-radius: 8px; width: 150px; overflow: hidden; z-index: 60;
//         }
//         .q-item { width: 100%; padding: 12px 15px; background: none; border: none; color: white; text-align: left; cursor: pointer; font-size: 13px; display: flex; justify-content: space-between; }
//         .q-item:hover { background: #e50914; }

//         .loading-spin { width: 50px; height: 50px; border: 5px solid #222; border-top-color: #e50914; border-radius: 50%; animation: spin 1s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         @media (max-width: 768px) {
//           .controls-overlay { padding: 15px 20px; }
//           .ctrl-group { gap: 15px; }
//           .back-pill { font-size: 12px; padding: 8px 18px; }
//         }
//       `}</style>

//       {/* HEADER WITH SERVERS */}
//       {!isFullscreen && (
//         <header className="header-box">
//           <div style={{ fontWeight: "bold", fontSize: "16px" }}>{show.title}</div>
//           <div className="server-list">
//             <button className={`server-btn ${activeServer === "original" ? "active" : ""}`} onClick={() => switchServer("original", show.streamUrl)}>Original</button>
//             {show.dubbedUrl && <button className={`server-btn ${activeServer === "dubbed" ? "active" : ""}`} onClick={() => switchServer("dubbed", show.dubbedUrl)}>Hindi</button>}
//             {show.englishUrl && <button className={`server-btn ${activeServer === "english" ? "active" : ""}`} onClick={() => switchServer("english", show.englishUrl)}>Server 1</button>}
//             {show.standardhUrl && <button className={`server-btn ${activeServer === "standard" ? "active" : ""}`} onClick={() => switchServer("standard", show.standardhUrl)}>Server 2</button>}
//           </div>
//         </header>
//       )}

//       {/* PLAYER CONTENT */}
//       <main className="main-stage">
//         <Link href="/schedule" className="back-pill"><FaArrowLeft /> Back</Link>

//         {adBlocked && (
//           <div style={{ zIndex: 100, textAlign: "center", position: "absolute" }}>
//             <FaExclamationTriangle size={40} color="#e50914" /><p>Please disable Ad-Blocker</p>
//           </div>
//         )}

//         {isDirect ? (
//           <>
//             <video ref={videoRef} className="video-player" onClick={togglePlay} playsInline style={{ width: "100%", height: "100%", objectFit: "contain", filter: filterStyle }} />
//             {buffering && <div className="loading-spin" style={{ position: "absolute" }}></div>}

//             {/* MODERN CONTROLS */}
//             <div className="controls-overlay" style={{ opacity: showControls ? 1 : 0, pointerEvents: showControls ? "auto" : "none" }} onClick={(e) => e.stopPropagation()}>
//               <div style={{ marginBottom: "10px" }}>
//                 <input type="range" className="red-dot-slider" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} />
//                 <div className="ctrl-row" style={{ fontSize: "12px", marginTop: "-5px", color: "#ccc" }}>
//                   <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
//                 </div>
//               </div>

//               <div className="ctrl-row">
//                 <div className="ctrl-group">
//                   <button className="ctrl-icon play-btn" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
//                   <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime -= 10)}><FaBackward /></button>
//                   <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime += 10)}><FaForward /></button>
//                   <div className="ctrl-group" style={{ background: "rgba(255,255,255,0.1)", padding: "5px 12px", borderRadius: "20px" }}>
//                     <FaVolumeUp size={14} />
//                     <input type="range" className="red-dot-slider" style={{ width: "60px", height: "4px" }} min="0" max="1" step="0.1" value={volume} onChange={(e) => {
//                       const v = parseFloat(e.target.value); setVolume(v); videoRef.current.volume = v;
//                     }} />
//                   </div>
//                 </div>

//                 <div className="ctrl-group">
//                   {/* ICON ONLY SETTINGS - OPPOSITE SIDE */}
//                   <button className="ctrl-icon" onClick={() => setShowQualityMenu(!showQualityMenu)}><FaCog /></button>
//                   <button className="ctrl-icon" onClick={toggleFullscreen}>{isFullscreen ? <FaCompress /> : <FaExpand />}</button>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <iframe src={currentUrl} style={{ width: "100%", height: "100%", border: "none", filter: filterStyle }} allowFullScreen />
//         )}

//         {/* QUALITY OVERLAY */}
//         {showQualityMenu && (
//           <div className="quality-menu">
//             {qualityLevels.map((q) => (
//               <button key={q.id} className="q-item" onClick={() => { hlsRef.current.currentLevel = q.id; setShowQualityMenu(false); }}>
//                 {q.name} {currentQuality === q.id && <FaCheck size={10} />}
//               </button>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   return { paths: schedule.shows.map((s) => ({ params: { id: String(s.id) } })), fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => String(s.id) === String(params.id));
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }






//60 SEC OPTION MISSING 

// import { useEffect, useRef, useState, useCallback } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import {
//   FaExpand,
//   FaCompress,
//   FaArrowLeft,
//   FaVolumeUp,
//   FaVolumeMute,
//   FaExclamationTriangle,
//   FaCog,
//   FaCheck,
//   FaPlay,
//   FaPause,
//   FaForward,
//   FaBackward,
// } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const hlsRef = useRef(null);
//   const controlsTimeoutRef = useRef(null);

//   const [currentUrl, setCurrentUrl] = useState(show.streamUrl);
//   const [activeServer, setActiveServer] = useState("original");
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [adBlocked, setAdBlocked] = useState(false);
//   const [showVpnNote, setShowVpnNote] = useState(true);
//   const [showUnmutePrompt, setShowUnmutePrompt] = useState(true);
//   const [videoError, setVideoError] = useState(false);
//   const [qualityLevels, setQualityLevels] = useState([]);
//   const [currentQuality, setCurrentQuality] = useState(-1);
//   const [showQualityMenu, setShowQualityMenu] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [buffering, setBuffering] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [showControls, setShowControls] = useState(true);

//   const isDirect = currentUrl.includes(".m3u8") || currentUrl.includes(".mp4");
  
//   /* 🔥 FILTERS APPLIED TO BOTH VIDEO AND IFRAME */
//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   /* ---------------- QUALITY LABEL MAPPING ---------------- */
//   const getQualityLabel = (height) => {
//     if (height >= 1080) return `Full HD (${height}p)`;
//     if (height >= 720) return `HD (${height}p)`;
//     if (height > 0) return `SD (${height}p)`;
//     return "Auto";
//   };

//   /* ---------------- AD BLOCK DETECTION ---------------- */
//   useEffect(() => {
//     const bait = document.createElement("div");
//     bait.className = "adsbox ad-banner ad-container ad-placement adsbygoogle";
//     bait.style.cssText = "position:absolute;left:-9999px;height:1px;width:1px;";
//     document.body.appendChild(bait);
//     setTimeout(() => {
//       if (bait.offsetHeight === 0 || window.getComputedStyle(bait).display === "none") {
//         setAdBlocked(true);
//       }
//       document.body.removeChild(bait);
//     }, 150);
//   }, []);

//   /* ---------------- AUTO HIDE CONTROLS ---------------- */
//   const hideControls = useCallback(() => {
//     if (isPlaying && !showQualityMenu) setShowControls(false);
//   }, [isPlaying, showQualityMenu]);

//   const triggerControls = useCallback(() => {
//     setShowControls(true);
//     if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
//     controlsTimeoutRef.current = setTimeout(hideControls, 3000);
//   }, [hideControls]);

//   useEffect(() => {
//     if (isPlaying) triggerControls();
//     return () => clearTimeout(controlsTimeoutRef.current);
//   }, [isPlaying, triggerControls]);

//   /* ---------------- HLS INIT ---------------- */
//   useEffect(() => {
//     if (!isDirect || !videoRef.current) return;
//     let hls;
//     const video = videoRef.current;
//     setVideoError(false);

//     const init = async () => {
//       try {
//         const Hls = (await import("hls.js")).default;
//         if (Hls.isSupported()) {
//           hls = new Hls({ enableWorker: true, lowLatencyMode: true });
//           hlsRef.current = hls;
//           hls.loadSource(currentUrl);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             const lvls = hls.levels.map((l, i) => ({ id: i, label: getQualityLabel(l.height) }));
//             setQualityLevels([{ id: -1, label: "Auto" }, ...lvls]);
//             setBuffering(false);
//             video.play().catch(() => {});
//           });
//           hls.on(Hls.Events.LEVEL_SWITCHED, (e, data) => setCurrentQuality(data.level));
//           hls.on(Hls.Events.ERROR, (e, data) => { if (data.fatal) hls.recoverMediaError(); });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           video.src = currentUrl;
//         }
//       } catch (error) { setVideoError(true); }
//     };

//     init();
//     const onTime = () => setCurrentTime(video.currentTime);
//     const onMeta = () => setDuration(video.duration);
//     video.addEventListener("timeupdate", onTime);
//     video.addEventListener("loadedmetadata", onMeta);
//     video.addEventListener("waiting", () => setBuffering(true));
//     video.addEventListener("playing", () => setBuffering(false));
//     return () => {
//       if (hls) hls.destroy();
//       video.removeEventListener("timeupdate", onTime);
//       video.removeEventListener("loadedmetadata", onMeta);
//     };
//   }, [currentUrl, isDirect]);

//   /* ---------------- PLAYER ACTIONS ---------------- */
//   const togglePlay = (e) => {
//     e?.stopPropagation();
//     if (!videoRef.current) return;
//     videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
//     setIsPlaying(!videoRef.current.paused);
//   };

//   const handleSeek = (e) => {
//     const time = parseFloat(e.target.value);
//     videoRef.current.currentTime = time;
//     setCurrentTime(time);
//   };

//   const toggleFullscreen = async () => {
//     const el = containerRef.current;
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

//   const switchServer = (key, url) => {
//     setActiveServer(key);
//     setCurrentUrl(url);
//     setIsMuted(true);
//     setQualityLevels([]);
//     setBuffering(true);
//     setVideoError(false);
//     setIsPlaying(false);
//   };

//   const formatTime = (s) => {
//     const mins = Math.floor(s / 60) || 0;
//     const secs = Math.floor(s % 60) || 0;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div ref={containerRef} className="player-wrapper" onMouseMove={triggerControls}>
//       <Head>
//         <title>{show.title} | Player</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
//       </Head>

//       <style jsx global>{`
//         .player-wrapper {
//           background: #000; height: 100vh; width: 100vw;
//           display: flex; flex-direction: column; overflow: hidden; position: relative;
//           color: white; font-family: 'Inter', sans-serif;
//         }
        
//         /* --- PREMIUM RED DOT SLIDER --- */
//         input[type="range"].red-dot-slider {
//           -webkit-appearance: none; width: 100%; background: transparent; cursor: pointer;
//         }
//         input[type="range"].red-dot-slider::-webkit-slider-runnable-track {
//           width: 100%; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px;
//         }
//         input[type="range"].red-dot-slider::-webkit-slider-thumb {
//           -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%;
//           background: #e50914; margin-top: -5px; border: 2px solid white;
//           box-shadow: 0 0 10px rgba(0,0,0,0.5); transition: 0.2s ease;
//         }
//         input[type="range"].red-dot-slider:active::-webkit-slider-thumb { transform: scale(1.3); }

//         /* --- UI ELEMENTS --- */
//         .header-box { padding: 12px 15px; background: #111; border-bottom: 1px solid #222; flex-shrink: 0; z-index: 10; }
//         .server-list { display: flex; gap: 8px; margin-top: 8px; overflow-x: auto; scrollbar-width: none; }
//         .server-btn { padding: 8px 16px; background: #333; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; }
//         .server-btn.active { background: #e50914; }

//         .main-stage { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        
//         /* PILL BACK BUTTON */
//         .back-pill { 
//           position: absolute; top: 12px; left: 50%; transform: translateX(-50%); z-index: 50;
//           background: rgba(0,0,0,0.85); color: white; padding: 10px 22px; border-radius: 25px;
//           text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: bold; border: 1px solid #333; transition: 0.2s;
//         }
//         .back-pill:hover { background: #e50914; }

//         .controls-overlay {
//           position: absolute; bottom: 0; left: 0; right: 0;
//           background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
//           padding: 20px 30px; z-index: 40; transition: opacity 0.4s;
//         }
//         .ctrl-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
//         .ctrl-group { display: flex; align-items: center; gap: 20px; }
//         .ctrl-icon { background: none; border: none; color: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; }
//         .play-btn { background: #e50914; width: 45px; height: 45px; border-radius: 50%; justify-content: center; transition: 0.2s; }
//         .play-btn:hover { transform: scale(1.1); }

//         .quality-menu {
//           position: absolute; bottom: 90px; right: 30px; background: rgba(20,20,20,0.95);
//           border: 1px solid #333; border-radius: 8px; width: 190px; overflow: hidden; z-index: 60;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.5);
//         }
//         .q-item { width: 100%; padding: 12px 15px; background: none; border: none; color: white; text-align: left; cursor: pointer; font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
//         .q-item:hover { background: #e50914; }
//         .q-active { color: #e50914; font-weight: bold; }

//         /* FLOATING FULLSCREEN FOR IFRAME */
//         .iframe-fs-btn {
//           position: absolute; bottom: 20px; right: 20px; z-index: 45;
//           background: rgba(0,0,0,0.7); border: 1px solid #444; color: #fff;
//           width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
//         }

//         .loading-spin { width: 50px; height: 50px; border: 5px solid #222; border-top-color: #e50914; border-radius: 50%; animation: spin 1s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         @media (max-width: 768px) {
//           .controls-overlay { padding: 15px 20px; }
//           .ctrl-group { gap: 15px; }
//           .back-pill { font-size: 12px; padding: 8px 18px; }
//           .quality-menu { right: 10px; width: 170px; }
//         }
//       `}</style>

//       {/* HEADER WITH SERVERS */}
//       {!isFullscreen && (
//         <header className="header-box">
//           <div style={{ fontWeight: "bold", fontSize: "16px" }}>{show.title}</div>
//           <div className="server-list">
//             <button className={`server-btn ${activeServer === "original" ? "active" : ""}`} onClick={() => switchServer("original", show.streamUrl)}>Original</button>
//             {show.dubbedUrl && <button className={`server-btn ${activeServer === "dubbed" ? "active" : ""}`} onClick={() => switchServer("dubbed", show.dubbedUrl)}>Hindi</button>}
//             {show.englishUrl && <button className={`server-btn ${activeServer === "english" ? "active" : ""}`} onClick={() => switchServer("english", show.englishUrl)}>Server 1</button>}
//             {show.standardhUrl && <button className={`server-btn ${activeServer === "standard" ? "active" : ""}`} onClick={() => switchServer("standard", show.standardhUrl)}>Server 2</button>}
//           </div>
//         </header>
//       )}

//       {/* MAIN VIEWPORT */}
//       <main className="main-stage">
//         <Link href="/schedule" className="back-pill"><FaArrowLeft /> Back to Schedule</Link>

//         {adBlocked && (
//           <div style={{ zIndex: 100, textAlign: "center", position: "absolute" }}>
//             <FaExclamationTriangle size={40} color="#e50914" /><p>Please disable Ad-Blocker to continue</p>
//           </div>
//         )}

//         {isDirect ? (
//           <>
//             <video ref={videoRef} className="video-player" onClick={togglePlay} playsInline style={{ width: "100%", height: "100%", objectFit: "contain", filter: filterStyle }} />
            
//             {buffering && <div className="loading-spin" style={{ position: "absolute" }}></div>}

//             {/* PLAYER UI */}
//             <div className="controls-overlay" style={{ opacity: showControls ? 1 : 0, pointerEvents: showControls ? "auto" : "none" }} onClick={(e) => e.stopPropagation()}>
//               <div style={{ marginBottom: "10px" }}>
//                 <input type="range" className="red-dot-slider" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} />
//                 <div className="ctrl-row" style={{ fontSize: "12px", marginTop: "-5px", color: "#ccc" }}>
//                   <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
//                 </div>
//               </div>

//               <div className="ctrl-row">
//                 <div className="ctrl-group">
//                   <button className="ctrl-icon play-btn" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
//                   <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime -= 10)}><FaBackward /></button>
//                   <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime += 10)}><FaForward /></button>
                  
//                   <div className="ctrl-group" style={{ background: "rgba(255,255,255,0.1)", padding: "5px 12px", borderRadius: "20px" }}>
//                     <FaVolumeUp size={14} />
//                     <input type="range" className="red-dot-slider" style={{ width: "60px", height: "4px" }} min="0" max="1" step="0.1" value={volume} onChange={(e) => {
//                       const v = parseFloat(e.target.value); setVolume(v); videoRef.current.volume = v;
//                     }} />
//                   </div>
//                 </div>

//                 <div className="ctrl-group">
//                   {/* ICON ONLY SETTINGS - BOTTOM RIGHT */}
//                   <button className="ctrl-icon" onClick={() => setShowQualityMenu(!showQualityMenu)}>
//                     <FaCog />
//                   </button>
//                   <button className="ctrl-icon" onClick={toggleFullscreen}>
//                     {isFullscreen ? <FaCompress /> : <FaExpand />}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div style={{ width: "100%", height: "100%", position: "relative" }}>
//              {show.note && showVpnNote && (
//               <div className="back-pill" style={{ top: "85px", background: "#e50914" }}>
//                 <FaExclamationTriangle /> {show.note}
//               </div>
//             )}
//             <iframe src={currentUrl} style={{ width: "100%", height: "100%", border: "none", filter: filterStyle }} allowFullScreen frameBorder="0" />
            
//             {/* RESTORED FULLSCREEN FOR IFRAME */}
//             <button className="iframe-fs-btn" onClick={toggleFullscreen}>
//                 {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
//             </button>
//           </div>
//         )}

//         {/* QUALITY SETTINGS MENU (SD, HD, FULL HD) */}
//         {showQualityMenu && (
//           <div className="quality-menu">
//             <div style={{ padding: "10px", fontSize: "11px", color: "#888", borderBottom: "1px solid #333" }}>SELECT QUALITY</div>
//             {qualityLevels.map((q) => (
//               <button key={q.id} className="q-item" onClick={() => { hlsRef.current.currentLevel = q.id; setShowQualityMenu(false); }}>
//                 <span className={currentQuality === q.id ? "q-active" : ""}>{q.label}</span>
//                 {currentQuality === q.id && <FaCheck size={10} color="#e50914" />}
//               </button>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   return { paths: schedule.shows.map((s) => ({ params: { id: String(s.id) } })), fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => String(s.id) === String(params.id));
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }













// IFRAME FILTER WAS NOT ADDED 

// import { useEffect, useRef, useState, useCallback } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import schedule from "../../data/schedules.json";
// import {
//   FaExpand,
//   FaCompress,
//   FaArrowLeft,
//   FaVolumeUp,
//   FaVolumeMute,
//   FaExclamationTriangle,
//   FaCog,
//   FaCheck,
//   FaPlay,
//   FaPause,
//   FaForward,
//   FaBackward,
// } from "react-icons/fa";

// export default function PlayerPage({ show }) {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const hlsRef = useRef(null);
//   const controlsTimeoutRef = useRef(null);

//   const [currentUrl, setCurrentUrl] = useState(show.streamUrl);
//   const [activeServer, setActiveServer] = useState("original");
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [adBlocked, setAdBlocked] = useState(false);
//   const [showVpnNote, setShowVpnNote] = useState(true);
//   const [showUnmutePrompt, setShowUnmutePrompt] = useState(true);
//   const [videoError, setVideoError] = useState(false);
//   const [qualityLevels, setQualityLevels] = useState([]);
//   const [currentQuality, setCurrentQuality] = useState(-1);
//   const [showQualityMenu, setShowQualityMenu] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [buffering, setBuffering] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [showControls, setShowControls] = useState(true);

//   const isDirect = currentUrl.includes(".m3u8") || currentUrl.includes(".mp4");
  
//   /* 🔥 FILTERS APPLIED TO BOTH VIDEO AND IFRAME */
//   const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

//   /* ---------------- QUALITY LABEL MAPPING ---------------- */
//   const getQualityLabel = (height) => {
//     if (height >= 1080) return `Full HD (${height}p)`;
//     if (height >= 720) return `HD (${height}p)`;
//     if (height > 0) return `SD (${height}p)`;
//     return "Auto";
//   };

//   /* ---------------- AD BLOCK DETECTION ---------------- */
//   useEffect(() => {
//     const bait = document.createElement("div");
//     bait.className = "adsbox ad-banner ad-container ad-placement adsbygoogle";
//     bait.style.cssText = "position:absolute;left:-9999px;height:1px;width:1px;";
//     document.body.appendChild(bait);
//     setTimeout(() => {
//       if (bait.offsetHeight === 0 || window.getComputedStyle(bait).display === "none") {
//         setAdBlocked(true);
//       }
//       document.body.removeChild(bait);
//     }, 150);
//   }, []);

//   /* ---------------- VPN NOTE TIMER (AUTO-HIDE AFTER 60s) ---------------- */
//   useEffect(() => {
//     if (!show.note || isDirect) return;
    
//     setShowVpnNote(true);
//     const timer = setTimeout(() => {
//       setShowVpnNote(false);
//     }, 60000); // 60 Seconds strict

//     return () => clearTimeout(timer);
//   }, [show.note, currentUrl, isDirect]);

//   /* ---------------- AUTO HIDE CONTROLS ---------------- */
//   const hideControls = useCallback(() => {
//     if (isPlaying && !showQualityMenu) setShowControls(false);
//   }, [isPlaying, showQualityMenu]);

//   const triggerControls = useCallback(() => {
//     setShowControls(true);
//     if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
//     controlsTimeoutRef.current = setTimeout(hideControls, 3000);
//   }, [hideControls]);

//   useEffect(() => {
//     if (isPlaying) triggerControls();
//     return () => clearTimeout(controlsTimeoutRef.current);
//   }, [isPlaying, triggerControls]);

//   /* ---------------- HLS INIT ---------------- */
//   useEffect(() => {
//     if (!isDirect || !videoRef.current) return;
//     let hls;
//     const video = videoRef.current;
//     setVideoError(false);

//     const init = async () => {
//       try {
//         const Hls = (await import("hls.js")).default;
//         if (Hls.isSupported()) {
//           hls = new Hls({ enableWorker: true, lowLatencyMode: true });
//           hlsRef.current = hls;
//           hls.loadSource(currentUrl);
//           hls.attachMedia(video);
//           hls.on(Hls.Events.MANIFEST_PARSED, () => {
//             const lvls = hls.levels.map((l, i) => ({ id: i, label: getQualityLabel(l.height) }));
//             setQualityLevels([{ id: -1, label: "Auto" }, ...lvls]);
//             setBuffering(false);
//             video.play().catch(() => {});
//           });
//           hls.on(Hls.Events.LEVEL_SWITCHED, (e, data) => setCurrentQuality(data.level));
//           hls.on(Hls.Events.ERROR, (e, data) => { if (data.fatal) hls.recoverMediaError(); });
//         } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//           video.src = currentUrl;
//         }
//       } catch (error) { setVideoError(true); }
//     };

//     init();
//     const onTime = () => setCurrentTime(video.currentTime);
//     const onMeta = () => setDuration(video.duration);
//     video.addEventListener("timeupdate", onTime);
//     video.addEventListener("loadedmetadata", onMeta);
//     video.addEventListener("waiting", () => setBuffering(true));
//     video.addEventListener("playing", () => setBuffering(false));
//     return () => {
//       if (hls) hls.destroy();
//       video.removeEventListener("timeupdate", onTime);
//       video.removeEventListener("loadedmetadata", onMeta);
//     };
//   }, [currentUrl, isDirect]);

//   /* ---------------- PLAYER ACTIONS ---------------- */
//   const togglePlay = (e) => {
//     e?.stopPropagation();
//     if (!videoRef.current) return;
//     videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
//     setIsPlaying(!videoRef.current.paused);
//   };

//   const handleSeek = (e) => {
//     const time = parseFloat(e.target.value);
//     videoRef.current.currentTime = time;
//     setCurrentTime(time);
//   };

//   const toggleFullscreen = async () => {
//     const el = containerRef.current;
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

//   const switchServer = (key, url) => {
//     setActiveServer(key);
//     setCurrentUrl(url);
//     setIsMuted(true);
//     setQualityLevels([]);
//     setBuffering(true);
//     setVideoError(false);
//     setIsPlaying(false);
//     setShowVpnNote(true);
//   };

//   const formatTime = (s) => {
//     const mins = Math.floor(s / 60) || 0;
//     const secs = Math.floor(s % 60) || 0;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <div ref={containerRef} className="player-wrapper" onMouseMove={triggerControls}>
//       <Head>
//         <title>{show.title} | Player</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
//       </Head>

//       <style jsx global>{`
//         .player-wrapper {
//           background: #000; height: 100vh; width: 100vw;
//           display: flex; flex-direction: column; overflow: hidden; position: relative;
//           color: white; font-family: 'Inter', sans-serif;
//         }
        
//         /* --- PREMIUM RED DOT SLIDER --- */
//         input[type="range"].red-dot-slider {
//           -webkit-appearance: none; width: 100%; background: transparent; cursor: pointer;
//         }
//         input[type="range"].red-dot-slider::-webkit-slider-runnable-track {
//           width: 100%; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px;
//         }
//         input[type="range"].red-dot-slider::-webkit-slider-thumb {
//           -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%;
//           background: #e50914; margin-top: -5px; border: 2px solid white;
//           box-shadow: 0 0 10px rgba(0,0,0,0.5); transition: 0.2s ease;
//         }
//         input[type="range"].red-dot-slider:active::-webkit-slider-thumb { transform: scale(1.3); }

//         /* --- UI ELEMENTS --- */
//         .header-box { padding: 12px 15px; background: #111; border-bottom: 1px solid #222; flex-shrink: 0; z-index: 10; }
//         .server-list { display: flex; gap: 8px; margin-top: 8px; overflow-x: auto; scrollbar-width: none; }
//         .server-btn { padding: 8px 16px; background: #333; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; }
//         .server-btn.active { background: #e50914; }

//         .main-stage { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        
//         /* PILL BACK BUTTON */
//         .back-pill { 
//           position: absolute; top: 12px; left: 50%; transform: translateX(-50%); z-index: 50;
//           background: rgba(0,0,0,0.85); color: white; padding: 10px 22px; border-radius: 25px;
//           text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: bold; border: 1px solid #333; transition: 0.2s;
//         }
//         .back-pill:hover { background: #e50914; }

//         .controls-overlay {
//           position: absolute; bottom: 0; left: 0; right: 0;
//           background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
//           padding: 20px 30px; z-index: 40; transition: opacity 0.4s;
//         }
//         .ctrl-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
//         .ctrl-group { display: flex; align-items: center; gap: 20px; }
//         .ctrl-icon { background: none; border: none; color: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; }
//         .play-btn { background: #e50914; width: 45px; height: 45px; border-radius: 50%; justify-content: center; transition: 0.2s; }
//         .play-btn:hover { transform: scale(1.1); }

//         .quality-menu {
//           position: absolute; bottom: 90px; right: 30px; background: rgba(20,20,20,0.95);
//           border: 1px solid #333; border-radius: 8px; width: 200px; overflow: hidden; z-index: 60;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.5);
//         }
//         .q-item { width: 100%; padding: 12px 15px; background: none; border: none; color: white; text-align: left; cursor: pointer; font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
//         .q-item:hover { background: #e50914; }
//         .q-active { color: #e50914; font-weight: bold; }

//         /* FLOATING FULLSCREEN FOR IFRAME */
//         .iframe-fs-btn {
//           position: absolute; bottom: 20px; right: 20px; z-index: 45;
//           background: rgba(0,0,0,0.7); border: 1px solid #444; color: #fff;
//           width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
//         }

//         .loading-spin { width: 50px; height: 50px; border: 5px solid #222; border-top-color: #e50914; border-radius: 50%; animation: spin 1s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         @media (max-width: 768px) {
//           .controls-overlay { padding: 15px 20px; }
//           .ctrl-group { gap: 15px; }
//           .back-pill { font-size: 12px; padding: 8px 18px; }
//           .quality-menu { right: 10px; width: 180px; }
//         }
//       `}</style>

//       {/* HEADER WITH SERVERS */}
//       {!isFullscreen && (
//         <header className="header-box">
//           <div style={{ fontWeight: "bold", fontSize: "16px" }}>{show.title}</div>
//           <div className="server-list">
//             <button className={`server-btn ${activeServer === "original" ? "active" : ""}`} onClick={() => switchServer("original", show.streamUrl)}>Original</button>
//             {show.dubbedUrl && <button className={`server-btn ${activeServer === "dubbed" ? "active" : ""}`} onClick={() => switchServer("dubbed", show.dubbedUrl)}>Hindi</button>}
//             {show.englishUrl && <button className={`server-btn ${activeServer === "english" ? "active" : ""}`} onClick={() => switchServer("english", show.englishUrl)}>Server 1</button>}
//             {show.standardhUrl && <button className={`server-btn ${activeServer === "standard" ? "active" : ""}`} onClick={() => switchServer("standard", show.standardhUrl)}>Server 2</button>}
//           </div>
//         </header>
//       )}

//       {/* MAIN VIEWPORT */}
//       <main className="main-stage">
//         <Link href="/schedule" className="back-pill"><FaArrowLeft /> Back to Schedule</Link>

//         {adBlocked && (
//           <div style={{ zIndex: 100, textAlign: "center", position: "absolute" }}>
//             <FaExclamationTriangle size={40} color="#e50914" /><p>Please disable Ad-Blocker to continue</p>
//           </div>
//         )}

//         {isDirect ? (
//           <>
//             <video ref={videoRef} className="video-player" onClick={togglePlay} playsInline style={{ width: "100%", height: "100%", objectFit: "contain", filter: filterStyle }} />
            
//             {buffering && <div className="loading-spin" style={{ position: "absolute" }}></div>}

//             {/* PLAYER UI */}
//             <div className="controls-overlay" style={{ opacity: showControls ? 1 : 0, pointerEvents: showControls ? "auto" : "none" }} onClick={(e) => e.stopPropagation()}>
//               <div style={{ marginBottom: "10px" }}>
//                 <input type="range" className="red-dot-slider" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} />
//                 <div className="ctrl-row" style={{ fontSize: "12px", marginTop: "-5px", color: "#ccc" }}>
//                   <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
//                 </div>
//               </div>

//               <div className="ctrl-row">
//                 <div className="ctrl-group">
//                   <button className="ctrl-icon play-btn" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
//                   <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime -= 10)}><FaBackward /></button>
//                   <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime += 10)}><FaForward /></button>
                  
//                   <div className="ctrl-group" style={{ background: "rgba(255,255,255,0.1)", padding: "5px 12px", borderRadius: "20px" }}>
//                     <FaVolumeUp size={14} />
//                     <input type="range" className="red-dot-slider" style={{ width: "60px", height: "4px" }} min="0" max="1" step="0.1" value={volume} onChange={(e) => {
//                       const v = parseFloat(e.target.value); setVolume(v); videoRef.current.volume = v;
//                     }} />
//                   </div>
//                 </div>

//                 <div className="ctrl-group">
//                   {/* ICON ONLY SETTINGS - BOTTOM RIGHT */}
//                   <button className="ctrl-icon" onClick={() => setShowQualityMenu(!showQualityMenu)}>
//                     <FaCog />
//                   </button>
//                   <button className="ctrl-icon" onClick={toggleFullscreen}>
//                     {isFullscreen ? <FaCompress /> : <FaExpand />}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div style={{ width: "100%", height: "100%", position: "relative" }}>
//              {/* VPN NOTE: STRICT 60s TIMER LOGIC */}
//              {show.note && showVpnNote && (
//               <div className="back-pill" style={{ top: "85px", background: "#e50914" }}>
//                 <FaExclamationTriangle /> {show.note}
//               </div>
//             )}
//             <iframe src={currentUrl} style={{ width: "100%", height: "100%", border: "none", filter: filterStyle }} allowFullScreen frameBorder="0" />
            
//             {/* FULLSCREEN FOR IFRAME */}
//             <button className="iframe-fs-btn" onClick={toggleFullscreen}>
//                 {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
//             </button>
//           </div>
//         )}

//         {/* QUALITY SETTINGS MENU (SD, HD, FULL HD) */}
//         {showQualityMenu && (
//           <div className="quality-menu">
//             <div style={{ padding: "10px", fontSize: "11px", color: "#888", borderBottom: "1px solid #333" }}>SELECT QUALITY</div>
//             {qualityLevels.map((q) => (
//               <button key={q.id} className="q-item" onClick={() => { hlsRef.current.currentLevel = q.id; setShowQualityMenu(false); }}>
//                 <span className={currentQuality === q.id ? "q-active" : ""}>{q.label}</span>
//                 {currentQuality === q.id && <FaCheck size={10} color="#e50914" />}
//               </button>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   return { paths: schedule.shows.map((s) => ({ params: { id: String(s.id) } })), fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find((s) => String(s.id) === String(params.id));
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }
















import { useEffect, useRef, useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import schedule from "../../data/schedules.json";
import {
  FaExpand,
  FaCompress,
  FaArrowLeft,
  FaVolumeUp,
  FaVolumeMute,
  FaExclamationTriangle,
  FaCog,
  FaCheck,
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
} from "react-icons/fa";

export default function PlayerPage({ show }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [currentUrl, setCurrentUrl] = useState(show.streamUrl);
  const [activeServer, setActiveServer] = useState("original");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [adBlocked, setAdBlocked] = useState(false);
  const [showVpnNote, setShowVpnNote] = useState(true);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [currentQuality, setCurrentQuality] = useState(-1);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const isDirect = currentUrl.includes(".m3u8") || currentUrl.includes(".mp4");
  
  /* 🔥 STRICT VISUAL FILTERS */
  const filterStyle = "brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)";

  /* ---------------- QUALITY LABEL MAPPING ---------------- */
  const getQualityLabel = (height) => {
    if (height >= 1080) return `Full HD (${height}p)`;
    if (height >= 720) return `HD (${height}p)`;
    if (height > 0) return `SD (${height}p)`;
    return "Auto";
  };

  /* ---------------- AD BLOCK DETECTION ---------------- */
  useEffect(() => {
    const bait = document.createElement("div");
    bait.className = "adsbox ad-banner ad-container ad-placement adsbygoogle";
    bait.style.cssText = "position:absolute;left:-9999px;height:1px;width:1px;";
    document.body.appendChild(bait);
    setTimeout(() => {
      if (bait.offsetHeight === 0 || window.getComputedStyle(bait).display === "none") {
        setAdBlocked(true);
      }
      document.body.removeChild(bait);
    }, 150);
  }, []);

  /* ---------------- VPN NOTE TIMER (AUTO-HIDE AFTER 60s) ---------------- */
  useEffect(() => {
    if (!show.note || isDirect) return;
    
    setShowVpnNote(true);
    const timer = setTimeout(() => {
      setShowVpnNote(false);
    }, 60000); 

    return () => clearTimeout(timer);
  }, [show.note, currentUrl, isDirect]);

  /* ---------------- AUTO HIDE CONTROLS ---------------- */
  const hideControls = useCallback(() => {
    if (isPlaying && !showQualityMenu) setShowControls(false);
  }, [isPlaying, showQualityMenu]);

  const triggerControls = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(hideControls, 3000);
  }, [hideControls]);

  useEffect(() => {
    if (isPlaying) triggerControls();
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying, triggerControls]);

  /* ---------------- HLS INIT ---------------- */
  useEffect(() => {
    if (!isDirect || !videoRef.current) return;
    let hls;
    const video = videoRef.current;
    setVideoError(false);

    const init = async () => {
      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          hlsRef.current = hls;
          hls.loadSource(currentUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            const lvls = hls.levels.map((l, i) => ({ id: i, label: getQualityLabel(l.height) }));
            setQualityLevels([{ id: -1, label: "Auto" }, ...lvls]);
            setBuffering(false);
            video.play().catch(() => {});
          });
          hls.on(Hls.Events.LEVEL_SWITCHED, (e, data) => setCurrentQuality(data.level));
          hls.on(Hls.Events.ERROR, (e, data) => { if (data.fatal) hls.recoverMediaError(); });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = currentUrl;
        }
      } catch (error) { setVideoError(true); }
    };

    init();
    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("waiting", () => setBuffering(true));
    video.addEventListener("playing", () => setBuffering(false));
    return () => {
      if (hls) hls.destroy();
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [currentUrl, isDirect]);

  /* ---------------- PLAYER ACTIONS ---------------- */
  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    setIsPlaying(!videoRef.current.paused);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
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

  const switchServer = (key, url) => {
    setActiveServer(key);
    setCurrentUrl(url);
    setIsMuted(true);
    setQualityLevels([]);
    setBuffering(true);
    setVideoError(false);
    setIsPlaying(false);
    setShowVpnNote(true);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60) || 0;
    const secs = Math.floor(s % 60) || 0;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div ref={containerRef} className="player-wrapper" onMouseMove={triggerControls}>
      <Head>
        <title>{show.title} | Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>

      <style jsx global>{`
        .player-wrapper {
          background: #000; height: 100vh; width: 100vw;
          display: flex; flex-direction: column; overflow: hidden; position: relative;
          color: white; font-family: 'Inter', sans-serif;
        }
        
        /* --- PREMIUM RED DOT SLIDER --- */
        input[type="range"].red-dot-slider {
          -webkit-appearance: none; width: 100%; background: transparent; cursor: pointer;
        }
        input[type="range"].red-dot-slider::-webkit-slider-runnable-track {
          width: 100%; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px;
        }
        input[type="range"].red-dot-slider::-webkit-slider-thumb {
          -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%;
          background: #e50914; margin-top: -5px; border: 2px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.5); transition: 0.2s ease;
        }
        input[type="range"].red-dot-slider:active::-webkit-slider-thumb { transform: scale(1.3); }

        /* --- UI ELEMENTS --- */
        .header-box { padding: 12px 15px; background: #111; border-bottom: 1px solid #222; flex-shrink: 0; z-index: 10; }
        .server-list { display: flex; gap: 8px; margin-top: 8px; overflow-x: auto; scrollbar-width: none; }
        .server-btn { padding: 8px 16px; background: #333; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; white-space: nowrap; }
        .server-btn.active { background: #e50914; }

        .main-stage { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        
        /* PILL BACK BUTTON */
        .back-pill { 
          position: absolute; top: 12px; left: 50%; transform: translateX(-50%); z-index: 50;
          background: rgba(0, 0, 0, 0.85); color: white; padding: 10px 22px; border-radius: 25px;
          text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: bold; border: 1px solid #333; transition: 0.2s;
        }
        .back-pill:hover { background: #e50914; }

        .controls-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          padding: 20px 30px; z-index: 40; transition: opacity 0.4s;
        }
        .ctrl-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .ctrl-group { display: flex; align-items: center; gap: 20px; }
        .ctrl-icon { background: none; border: none; color: white; cursor: pointer; font-size: 20px; display: flex; align-items: center; }
        .play-btn { background: #e50914; width: 45px; height: 45px; border-radius: 50%; justify-content: center; transition: 0.2s; }
        .play-btn:hover { transform: scale(1.1); }

        .quality-menu {
          position: absolute; bottom: 90px; right: 30px; background: rgba(20,20,20,0.95);
          border: 1px solid #333; border-radius: 8px; width: 200px; overflow: hidden; z-index: 60;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .q-item { width: 100%; padding: 12px 15px; background: none; border: none; color: white; text-align: left; cursor: pointer; font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
        .q-item:hover { background: #e50914; }
        .q-active { color: #e50914; font-weight: bold; }

        /* FLOATING FULLSCREEN FOR IFRAME */
        .iframe-fs-btn {
          position: absolute; bottom: 20px; right: 20px; z-index: 45;
          background: rgba(0,0,0,0.7); border: 1px solid #444; color: #fff;
          width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
        }

        .loading-spin { width: 50px; height: 50px; border: 5px solid #222; border-top-color: #e50914; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
          .controls-overlay { padding: 15px 20px; }
          .ctrl-group { gap: 15px; }
          .back-pill { font-size: 12px; padding: 8px 18px; }
          .quality-menu { right: 10px; width: 180px; }
        }
      `}</style>

      {/* HEADER WITH SERVERS */}
      {!isFullscreen && (
        <header className="header-box">
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>{show.title}</div>
          <div className="server-list">
            <button className={`server-btn ${activeServer === "original" ? "active" : ""}`} onClick={() => switchServer("original", show.streamUrl)}>Original</button>
            {show.dubbedUrl && <button className={`server-btn ${activeServer === "dubbed" ? "active" : ""}`} onClick={() => switchServer("dubbed", show.dubbedUrl)}>Hindi</button>}
            {show.englishUrl && <button className={`server-btn ${activeServer === "english" ? "active" : ""}`} onClick={() => switchServer("english", show.englishUrl)}>Server 1</button>}
            {show.standardhUrl && <button className={`server-btn ${activeServer === "standard" ? "active" : ""}`} onClick={() => switchServer("standard", show.standardhUrl)}>Server 2</button>}
          </div>
        </header>
      )}

      {/* MAIN VIEWPORT */}
      <main className="main-stage">
        <Link href="/schedule" className="back-pill"><FaArrowLeft /> Back to Schedule</Link>

        {adBlocked && (
          <div style={{ zIndex: 100, textAlign: "center", position: "absolute" }}>
            <FaExclamationTriangle size={40} color="#e50914" /><p>Please disable Ad-Blocker to continue</p>
          </div>
        )}

        {isDirect ? (
          <>
            <video ref={videoRef} className="video-player" onClick={togglePlay} playsInline style={{ width: "100%", height: "100%", objectFit: "contain", filter: filterStyle }} />
            
            {buffering && <div className="loading-spin" style={{ position: "absolute" }}></div>}

            {/* PLAYER UI */}
            <div className="controls-overlay" style={{ opacity: showControls ? 1 : 0, pointerEvents: showControls ? "auto" : "none" }} onClick={(e) => e.stopPropagation()}>
              <div style={{ marginBottom: "10px" }}>
                <input type="range" className="red-dot-slider" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} />
                <div className="ctrl-row" style={{ fontSize: "12px", marginTop: "-5px", color: "#ccc" }}>
                  <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="ctrl-row">
                <div className="ctrl-group">
                  <button className="ctrl-icon play-btn" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
                  <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime -= 10)}><FaBackward /></button>
                  <button className="ctrl-icon" onClick={() => (videoRef.current.currentTime += 10)}><FaForward /></button>
                  
                  <div className="ctrl-group" style={{ background: "rgba(255,255,255,0.1)", padding: "5px 12px", borderRadius: "20px" }}>
                    <FaVolumeUp size={14} />
                    <input type="range" className="red-dot-slider" style={{ width: "60px", height: "4px" }} min="0" max="1" step="0.1" value={volume} onChange={(e) => {
                      const v = parseFloat(e.target.value); setVolume(v); videoRef.current.volume = v;
                    }} />
                  </div>
                </div>

                <div className="ctrl-group">
                  {/* ICON ONLY SETTINGS - BOTTOM RIGHT */}
                  <button className="ctrl-icon" onClick={() => setShowQualityMenu(!showQualityMenu)}>
                    <FaCog />
                  </button>
                  <button className="ctrl-icon" onClick={toggleFullscreen}>
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
             {/* VPN NOTE: STRICT 60s TIMER LOGIC */}
             {show.note && showVpnNote && (
              <div className="back-pill" style={{ top: "85px", background: "#e50914" }}>
                <FaExclamationTriangle /> {show.note}
              </div>
            )}
            {/* FIXED: FILTERSTYLE APPLIED TO IFRAME */}
            <iframe 
              src={currentUrl} 
              style={{ width: "100%", height: "100%", border: "none", filter: filterStyle }} 
              allowFullScreen 
              frameBorder="0" 
            />
            
            {/* FULLSCREEN FOR IFRAME */}
            <button className="iframe-fs-btn" onClick={toggleFullscreen}>
                {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
            </button>
          </div>
        )}

        {/* QUALITY SETTINGS MENU (SD, HD, FULL HD) */}
        {showQualityMenu && (
          <div className="quality-menu">
            <div style={{ padding: "10px", fontSize: "11px", color: "#888", borderBottom: "1px solid #333" }}>SELECT QUALITY</div>
            {qualityLevels.map((q) => (
              <button key={q.id} className="q-item" onClick={() => { hlsRef.current.currentLevel = q.id; setShowQualityMenu(false); }}>
                <span className={currentQuality === q.id ? "q-active" : ""}>{q.label}</span>
                {currentQuality === q.id && <FaCheck size={10} color="#e50914" />}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  return { paths: schedule.shows.map((s) => ({ params: { id: String(s.id) } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find((s) => String(s.id) === String(params.id));
  if (!show) return { notFound: true };
  return { props: { show }, revalidate: 60 };
}