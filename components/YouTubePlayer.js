import { useEffect, useRef } from 'react'

export default function YouTubePlayer({ videoId, title, autoplay = false }) {
  const playerRef = useRef(null)
  const playerInstanceRef = useRef(null)

  useEffect(() => {
    if (!videoId) {
      console.error('YouTubePlayer: No videoId provided')
      return
    }

    // Clean video ID
    const cleanVideoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 11)
    
    if (!cleanVideoId) {
      console.error('YouTubePlayer: Invalid videoId after cleaning:', videoId)
      return
    }

    // Load the IFrame Player API code asynchronously
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    // Function to initialize player
    const initializePlayer = () => {
      if (!playerRef.current || !window.YT || !window.YT.Player) return
      
      try {
        if (playerInstanceRef.current) {
          playerInstanceRef.current.destroy();
        }

        playerInstanceRef.current = new window.YT.Player(playerRef.current, {
          height: '100%',
          width: '100%',
          filter: 'url(#ultraSharp) brightness(1.25) contrast(1.15) saturate(1.5) hue-rotate(5deg)',
          videoId: cleanVideoId,
          playerVars: {
            // 'autoplay': autoplay ? 1 : 0,
            // 'controls': 1,
            // 'rel': 0,
            // 'showinfo': 0,
            // 'modestbranding': 1,
            // 'playsinline': 1,
            // 'origin': window.location.origin
           
            'autoplay': 1,
            'controls': 1,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'playsinline': 1,
            'loop': 1, // Enable looping
            'playlist': cleanVideoId // Required for loop to work with single video
          },
          events: {
            'onReady': function(event) {
              console.log('YouTube Player Ready for video:', cleanVideoId)
            },
            'onError': function(event) {
              console.error('YouTube Player Error:', event.data)
            }
          }
        })
      } catch (error) {
        console.error('Failed to initialize YouTube player:', error)
      }
    }

    // If API is already loaded, initialize immediately
    if (window.YT && window.YT.Player) {
      initializePlayer()
    } else {
      // Wait for API to load
      window.onYouTubeIframeAPIReady = initializePlayer
    }

    return () => {
      // Cleanup
      if (playerInstanceRef.current && playerInstanceRef.current.destroy) {
        playerInstanceRef.current.destroy()
      }
      window.onYouTubeIframeAPIReady = null
    }
  }, [videoId, autoplay])

  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-black flex items-center justify-center text-white rounded-lg">
        <div className="text-center">
          <p>No trailer available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <div 
        ref={playerRef}
        className="w-full h-full"
      />
    </div>
  )
}