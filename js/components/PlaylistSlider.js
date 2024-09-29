class PlaylistSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
        this.PLAYLIST_ID = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL';
        this.MAX_RESULTS = 5;
        this.CACHE_KEY = 'playlistData';
        this.CACHE_EXPIRY = 10 * 60 * 1000;
    }

    connectedCallback() {
        this.render();
        this.loadVideos();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/components/PlaylistSlider.css">
            <div id="playlist-slider"></div>
        `;
    }

    getCachedData() {
        const cached = localStorage.getItem(this.CACHE_KEY);
        if (cached) {
            const data = JSON.parse(cached);
            const now = new Date().getTime();
            if (now - data.timestamp < this.CACHE_EXPIRY) {
                return data.items;
            }
        }
        return null;
    }

    setCachedData(items) {
        const data = {
            items: items,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    }

    async fetchPlaylistItems() {
        const cachedData = this.getCachedData();
        if (cachedData) {
            return cachedData;
        }

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${this.PLAYLIST_ID}&key=${this.API_KEY}&maxResults=${this.MAX_RESULTS}`;
        const response = await fetch(url);
        const data = await response.json();
        const items = data.items;

        this.setCachedData(items);

        return items;
    }

    createVideoElement(video) {
        const videoId = video.snippet.resourceId.videoId;
        const iframe = document.createElement('iframe');
        iframe.dataset.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;
        iframe.className = 'playlist-item lazy';

        return iframe;
    }

    async loadVideos() {
        const videos = await this.fetchPlaylistItems();
        const playlistSlider = this.shadowRoot.getElementById('playlist-slider');
        videos.forEach(video => {
            const videoElement = this.createVideoElement(video);
            playlistSlider.appendChild(videoElement);
        });

        this.lazyLoadIframes();
    }

    lazyLoadIframes() {
        const iframes = this.shadowRoot.querySelectorAll('iframe.lazy');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.dataset.src;
                    iframe.classList.remove('lazy');
                    observer.unobserve(iframe);
                }
            });
        });

        iframes.forEach(iframe => observer.observe(iframe));
    }
}

customElements.define('playlist-slider-component', PlaylistSlider);
