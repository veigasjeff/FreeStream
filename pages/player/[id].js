import { useEffect, useRef, useState } from "react";
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
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(true);
  const [videoError, setVideoError] = useState(false);

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
    }, 60000);

    return () => clearTimeout(timer);
  }, [show.note, isDirect]);

  /* ---------------- AUTO HIDE UNMUTE PROMPT ---------------- */
  useEffect(() => {
    if (!isDirect || !isMuted) return;

    const timer = setTimeout(() => {
      setShowUnmutePrompt(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isDirect, isMuted]);

  /* ---------------- HLS INIT ---------------- */
  useEffect(() => {
    if (!isDirect || !videoRef.current) return;

    let hls;
    const video = videoRef.current;
    video.muted = true;
    video.playsInline = true;
    video.controls = true;
    setVideoError(false);

    const init = async () => {
      try {
        const Hls = (await import("hls.js")).default;
        if (Hls.isSupported()) {
          hls = new Hls({ 
            enableWorker: true,
            maxBufferLength: 30,
            maxMaxBufferLength: 600,
            maxBufferSize: 60 * 1000 * 1000,
            liveSyncDurationCount: 3
          });
          
          hls.loadSource(currentUrl);
          hls.attachMedia(video);
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(e => {
              console.log("Autoplay error:", e);
            });
          });
          
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              setVideoError(true);
            }
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = currentUrl;
          video.addEventListener('loadedmetadata', () => {
            video.play().catch(e => {
              console.log("Autoplay error:", e);
            });
          });
        }
      } catch (error) {
        console.error("HLS init error:", error);
        video.src = currentUrl;
        video.load();
        setVideoError(true);
      }
    };

    init();
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [currentUrl, isDirect]);

  /* ---------------- FULLSCREEN ---------------- */
  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    document.addEventListener("mozfullscreenchange", handler);
    document.addEventListener("MSFullscreenChange", handler);
    
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
      document.removeEventListener("mozfullscreenchange", handler);
      document.removeEventListener("MSFullscreenChange", handler);
    };
  }, []);

  /* ---------------- AUDIO ---------------- */
  const unmute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.volume = 1;
    setIsMuted(false);
    setShowUnmutePrompt(false);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  /* ---------------- SERVER SWITCH ---------------- */
  const switchServer = (key, url) => {
    if (!url) return;
    setActiveServer(key);
    setCurrentUrl(url);
    setIsMuted(true);
    setShowUnmutePrompt(true);
    setShowVpnNote(true);
    setVideoError(false);
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
          overflow: "hidden",
        }}
      >
        {!isFullscreen && (
          <header style={headerStyle}>
            <div style={{ fontWeight: "bold", fontSize: "16px", color: "#fff" }}>
              {show.title}
            </div>
            <div style={serverRow}>
              <button 
                onClick={() => switchServer("original", show.streamUrl)} 
                style={serverBtn(activeServer === "original")}
              >
                Original
              </button>
              {show.dubbedUrl && (
                <button 
                  onClick={() => switchServer("dubbed", show.dubbedUrl)} 
                  style={serverBtn(activeServer === "dubbed")}
                >
                  Hindi
                </button>
              )}
              {show.englishUrl && (
                <button 
                  onClick={() => switchServer("english", show.englishUrl)} 
                  style={serverBtn(activeServer === "english")}
                >
                  Server 1
                </button>
              )}
              {show.standardhUrl && (
                <button 
                  onClick={() => switchServer("standard", show.standardhUrl)} 
                  style={serverBtn(activeServer === "standard")}
                >
                  Server 2
                </button>
              )}
            </div>
          </header>
        )}

        <main style={{ 
          flex: 1, 
          position: "relative",
          backgroundColor: "#000",
          overflow: "hidden"
        }}>
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
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: filterStyle,
                      backgroundColor: "#000"
                    }}
                    onError={() => setVideoError(true)}
                    onPlay={() => setShowUnmutePrompt(false)}
                  />

                  {videoError && (
                    <div style={errorOverlay}>
                      <FaExclamationTriangle size={32} />
                      <p>Video failed to load. Try switching to a different server.</p>
                      <button 
                        onClick={() => switchServer("original", show.streamUrl)}
                        style={retryBtn}
                      >
                        Switch to Original Server
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

              <button 
                onClick={toggleFullscreen} 
                style={fsBtn}
              >
                {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
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
  flexShrink: 0,
};

const serverRow = {
  display: "flex",
  gap: 8,
  marginTop: 8,
  overflowX: "auto",
  paddingBottom: "4px",
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
  transition: "background 0.2s",
  minWidth: "80px",
  textAlign: "center",
});

const backBtnTopCenter = {
  position: "absolute",
  top: 12,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 30,
  background: "rgba(0,0,0,.85)",
  color: "#fff",
  padding: "8px 18px",
  borderRadius: 20,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontWeight: "bold",
  fontSize: "14px",
  border: "1px solid #333",
  transition: "all 0.2s",
};

const fsBtn = {
  position: "absolute",
  bottom: 20,
  right: 20,
  background: "rgba(0,0,0,0.8)",
  color: "#fff",
  border: "1px solid #444",
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s",
  zIndex: 40,
};

const adblockOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
  padding: "20px",
};

const errorOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.9)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 45,
  gap: "20px",
  padding: "20px",
  textAlign: "center",
};

const retryBtn = {
  background: "#e50914",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "5px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  marginTop: "10px",
};

const vpnNote = {
  position: "absolute",
  top: 55,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 25,
  background: "rgba(229,9,20,0.95)",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 20,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: 8,
  animation: "blink 1s infinite",
  fontSize: "14px",
  whiteSpace: "nowrap",
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