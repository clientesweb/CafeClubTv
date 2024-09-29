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
    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0'; // Reemplaza esto con tu clave API
    const PLAYLIST_ID = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s'; // Reemplaza esto con la ID de tu playlist

    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const shortsContainer = document.getElementById('shorts-container');
            const shortsData = data.items;

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
            // Puedes manejar el error aquí (mostrar un mensaje al usuario, etc.)
        });
}