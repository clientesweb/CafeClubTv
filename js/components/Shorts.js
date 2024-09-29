const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
const PLAYLIST_ID = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s';
const MAX_RESULTS = 5;
const FETCH_RESULTS = 35;

export default function Shorts() {
    return `
        <section id="shorts-section">
            <!-- Los Shorts se cargarán aquí dinámicamente -->
        </section>
    `;
}

Shorts.init = () => {
    const shortsSection = document.getElementById('shorts-section');

    function showLoader() {
        for (let i = 0; i < MAX_RESULTS; i++) {
            const shortItem = document.createElement('div');
            shortItem.className = 'short-item loader';
            shortsSection.appendChild(shortItem);
        }
    }

    function removeLoader() {
        const loaders = document.querySelectorAll('.loader');
        loaders.forEach(loader => loader.remove());
    }

    function fetchPlaylistVideos(pageToken = '') {
        const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${FETCH_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}&pageToken=${pageToken}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                removeLoader();
                const itemsToShow = data.items.reverse().slice(0, MAX_RESULTS);
                itemsToShow.forEach(item => {
                    const videoId = item.snippet.resourceId.videoId;
                    const shortElement = createShortElement(videoId);
                    shortsSection.appendChild(shortElement);
                });
            })
            .catch(error => {
                console.error('Error al cargar la playlist de YouTube:', error);
                removeLoader();
            });
    }

    function createShortElement(videoId) {
        const shortItem = document.createElement('div');
        shortItem.className = 'short-item';
        shortItem.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?rel=0"
                    loading="lazy"
                    frameborder="0"
                    allowfullscreen>
            </iframe>
        `;
        return shortItem;
    }

    showLoader();
    fetchPlaylistVideos();
};