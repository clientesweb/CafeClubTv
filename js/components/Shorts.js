export default function Shorts() {
    const shorts = document.getElementById('shorts');

    shorts.innerHTML = `
        <section class="my-12">
            <h2 class="text-2xl font-bold mb-6">Shorts</h2>
            <div class="flex overflow-x-auto space-x-4 pb-4" id="shorts-container">
                <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
            </div>
        </section>
    `;

    // Llamada a la API de YouTube
    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0'; // Considera usar variables de entorno en producción
    const PLAYLIST_ID = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s'; // Asegúrate de que sea la ID correcta

    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const shortsContainer = document.getElementById('shorts-container');
            const shortsData = data.items;

            if (shortsData.length === 0) {
                shortsContainer.innerHTML = '<p>No shorts found in this playlist.</p>';
                return;
            }

            shortsContainer.innerHTML = shortsData.map(short => `
                <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                    <iframe
                        src="https://www.youtube.com/embed/${short.snippet.resourceId.videoId}"
                        title="${short.snippet.title}"
                        class="w-full h-full"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching the playlist:', error);
            const shortsContainer = document.getElementById('shorts-container');
            shortsContainer.innerHTML = '<p>Error fetching the shorts. Please try again later.</p>';
        });
}