class ShortsPlayer {
  constructor() {
    this.videoIds = [];
    this.currentVideoIndex = 0;
    this.container = null;
  }

  init() {
    this.container = document.getElementById('shorts-container');
    this.loadPlaylistVideos();
    this.setupEventListeners();
  }

  
  async loadPlaylistVideos() {
    
    this.videoIds = [
     'SYwzghE8MYo',
      'gdnyqFwe44M',
      '08GCDzokLFY',
      'JhgYDYkdtKA',
      'ATIE1nnaMzg',
      'lNM7TRH7xUQ',
      'o64PTIEEp64',
      '-E6u67SiuAo',
    ];

    this.createVideoContainers();
  }

 
  createVideoContainers() {
    this.container.innerHTML = '';
    
    this.videoIds.forEach((videoId, index) => {
      const container = this.createVideoContainer(videoId, index);
      this.container.appendChild(container);
    });

   
    setTimeout(() => {
      this.playVideo(0);
    }, 1000);
  }

  createVideoContainer(videoId, index) {
    const container = document.createElement('div');
    container.className = 'video-container flex items-center justify-center relative bg-black';
    container.id = `video-${index}`;
    
    // Crear a unique iframe ID to avoid conflicts
    const iframeId = `player-${index}-${Date.now()}`;
    
    container.innerHTML = `
      <iframe
        id="${iframeId}"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&iv_load_policy=3&start=0"
        title="Marshall Bits Short ${index + 1}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="w-full h-full max-w-sm mx-auto rounded-lg shadow-2xl"
        data-video-id="${videoId}"
        data-index="${index}"
      ></iframe>
      <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white">
        <div class="bg-gradient-to-r w-96 from-[#fe634e]/80 to-[#d01264]/80 backdrop-blur-sm p-3 rounded-lg">
          <p class="text-sm font-medium">Video ${index + 1} de ${this.videoIds.length}</p>
          <p class="text-xs opacity-90">Desliza o usa las flechas para navegar</p>
        </div>
      </div>
     
    `;
    
    return container;
  }

  playVideo(index) {
    if (index < 0 || index >= this.videoIds.length) return;
    
    this.currentVideoIndex = index;
    
    this.pauseAllVideos();
    
    const videoElement = document.getElementById(`video-${index}`);
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        this.activateVideo(index);
      }, 300);
    }
  }

  activateVideo(index) {
    const iframe = document.querySelector(`iframe[data-index="${index}"]`);
    if (iframe) {
      const videoId = iframe.getAttribute('data-video-id');
      // Recharge the iframe src to trigger autoplay
      iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&iv_load_policy=3&start=0`;
    }
  }

  pauseAllVideos() {
    const iframes = document.querySelectorAll('iframe[data-video-id]');
    iframes.forEach((iframe, idx) => {
      const videoId = iframe.getAttribute('data-video-id');
      const index = iframe.getAttribute('data-index');
      
      iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&iv_load_policy=3&start=0`;
    });
  }

  setupEventListeners() {
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      
      if (Math.abs(delta) > 50) {
        if (delta > 0 && this.currentVideoIndex < this.videoIds.length - 1) {
          this.playVideo(this.currentVideoIndex + 1);
        } else if (delta < 0 && this.currentVideoIndex > 0) {
          this.playVideo(this.currentVideoIndex - 1);
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          if (this.currentVideoIndex < this.videoIds.length - 1) {
            this.playVideo(this.currentVideoIndex + 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (this.currentVideoIndex > 0) {
            this.playVideo(this.currentVideoIndex - 1);
          }
          break;
        case 'Escape':
          window.location.href = './index.html';
          break;
      }
    });

    // Touch/swipe for mobile
    let startY = 0;
    let endY = 0;

    this.container.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    this.container.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });

    this.container.addEventListener('touchend', (e) => {
      endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && this.currentVideoIndex < this.videoIds.length - 1) {
          // Swipe up - next video
          this.playVideo(this.currentVideoIndex + 1);
        } else if (deltaY < 0 && this.currentVideoIndex > 0) {
          // Swipe down - previous video
          this.playVideo(this.currentVideoIndex - 1);
        }
      }
    });

    // This observer will monitor which video is mostly in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
          const videoIndex = parseInt(entry.target.id.split('-')[1]);
          if (videoIndex !== this.currentVideoIndex) {
            // Pause previous video and play the new one
            this.pauseAllVideos();
            setTimeout(() => {
              this.currentVideoIndex = videoIndex;
              this.activateVideo(videoIndex);
            }, 100);
          }
        }
      });
    }, {
      threshold: [0.7], // Only when 70% of the video is visible
      rootMargin: '-10% 0px -10% 0px' // Margin to improve detection
    });

    // Wait a bit to ensure all videos are rendered
    setTimeout(() => {
      this.videoIds.forEach((_, index) => {
        const videoElement = document.getElementById(`video-${index}`);
        if (videoElement) {
          observer.observe(videoElement);
        }
      });
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const shortsPlayer = new ShortsPlayer();
  shortsPlayer.init();
});

