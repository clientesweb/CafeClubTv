const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
const PLAYLIST_ID = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL';
const MAX_RESULTS = 5;
const CACHE_KEY = 'playlistData';
const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes

export default function Playlists() {
    return `
        <section id="playlists">
            <div class="playlist-slider" id="playlist-slider">
                <!-- Los videos se cargarán aquí dinámicamente -->
            </div>
            <div id="youtube-live-chat" style="display: none;">
                <!-- El chat de YouTube se cargará aquí si hay un video en vivo -->
            </div>
        </section>
    `;
}

Playlists.init = async () => {
    const playlistSlider = document.getElementById('playlist-slider');

    function getCachedData() {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const data = JSON.parse(cached);
            const now = new Date().getTime();
            if (now - data.timestamp < CACHE_EXPIRY) {
                return data.items;
            }
        }
        return null;
    }

    function setCachedData(items) {
        const data = {
            items: items,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    }

    async function fetchPlaylistItems() {
        const cachedData = getCachedData();
        if (cachedData) {
            return cachedData;
        }

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=${MAX_RESULTS}`;
        const response = await fetch(url);
        const data = await response.json();
        const items = data.items;

        setCachedData(items);
        return items;
    }

    function createVideoElement(video) {
        const videoId = video.snippet.resourceId.videoId;
        const iframe = document.createElement('iframe');
        iframe.dataset.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;
        iframe.className = 'playlist-item lazy';
        return iframe;
    }

    function lazyLoadIframes() {
        const iframes = document.querySelectorAll('iframe.lazy');
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

    const videos = await fetchPlaylistItems();
    videos.forEach(video => {
        const videoElement = createVideoElement(video);
        playlistSlider.appendChild(videoElement);
    });

    lazyLoadIframes();
};