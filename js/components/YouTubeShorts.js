class YouTubeShorts extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.apiKey = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
        this.playlistId = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s';
        this.maxResults = 5;
        this.fetchResults = 35;
    }

    connectedCallback() {
        this.render();
        this.fetchPlaylistVideos();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/components/YouTubeShorts.css">
            <div id="shorts-section"></div>
        `;
    }

    showLoader() {
        const shortsSection = this.shadowRoot.getElementById('shorts-section');
        for (let i = 0; i < this.maxResults; i++) {
            const shortItem = document.createElement('div');
            shortItem.className = 'short-item loader';
            shortsSection.appendChild(shortItem);
        }
    }

    removeLoader() {
        const loaders = this.shadowRoot.querySelectorAll('.loader');
        loaders.forEach(loader => loader.remove());
    }

    fetchPlaylistVideos(pageToken = '') {
        this.showLoader();
        const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${this.fetchResults}&playlistId=${this.playlistId}&key=${this.apiKey}&pageToken=${pageToken}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.removeLoader();
                const itemsToShow = data.items.reverse().slice(0, this.maxResults);
                itemsToShow.forEach(item => {
                    const videoId = item.snippet.resourceId.videoId;
                    const shortElement = this.createShortElement(videoId);
                    this.shadowRoot.getElementById('shorts-section').appendChild(shortElement);
                });
            })
            .catch(error => {
                console.error('Error al cargar la playlist de YouTube:', error);
                this.removeLoader();
            });
    }

    createShortElement(videoId) {
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
}

customElements.define('youtube-shorts-component', YouTubeShorts);
