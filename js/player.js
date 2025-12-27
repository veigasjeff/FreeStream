// Simple video player for movie pages
class VideoPlayer {
    constructor() {
        this.currentStream = 1;
        this.init();
    }
    
    init() {
        console.log('Video Player initialized');
        
        // Handle stream switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('stream-btn')) {
                this.switchStream(e.target.dataset.stream);
            }
        });
    }
    
    switchStream(streamNum) {
        this.currentStream = streamNum;
        
        // Update active button
        document.querySelectorAll('.stream-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Load new stream
        this.loadStream(streamNum);
    }
    
    loadStream(streamNum) {
        const streamUrl = document.getElementById(`stream${streamNum}`)?.dataset.url;
        if (!streamUrl) return;
        
        const player = document.getElementById('videoPlayer');
        if (!player) return;
        
        if (streamUrl.includes('youtube.com') || streamUrl.includes('youtu.be')) {
            const videoId = this.extractYouTubeId(streamUrl);
            if (videoId) {
                player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
        } else {
            player.src = streamUrl;
        }
    }
    
    extractYouTubeId(url) {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
}

// Initialize when page loads
if (document.getElementById('videoPlayer')) {
    window.player = new VideoPlayer();
}