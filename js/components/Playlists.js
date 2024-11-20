export default async function Playlists() {
    const playlists = document.getElementById('playlists');

    playlists.innerHTML = `
        <section class="my-12 px-4 max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Nuestras Playlists</h2>
            <div class="mb-6 flex justify-center space-x-2" id="category-filters">
                <button class="px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-300 active" data-category="all">Todos</button>
                <button class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300" data-category="music">Música</button>
                <button class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300" data-category="talk-shows">Talk Shows</button>
                <button class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300" data-category="interviews">Entrevistas</button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="playlist-container">
                ${Array(6).fill().map(() => `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div class="h-48 bg-gray-300"></div>
                        <div class="p-4">
                            <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
    const PLAYLIST_ID = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL';

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=12&key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const playlistContainer = document.getElementById('playlist-container');
        const videosData = data.items;

        if (videosData.length === 0) {
            playlistContainer.innerHTML = '<p class="text-center text-gray-600 col-span-full">No se encontraron videos en esta playlist.</p>';
            return;
        }

        playlistContainer.innerHTML = videosData.map(video => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl" data-category="${getRandomCategory()}">
                <div class="relative">
                    <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" class="w-full h-48 object-cover">
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                        <button class="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300" onclick="playVideo('${video.snippet.resourceId.videoId}')">
                            Reproducir
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-lg mb-2 line-clamp-2">${video.snippet.title}</h3>
                    <p class="text-gray-600 text-sm line-clamp-3">${video.snippet.description}</p>
                </div>
            </div>
        `).join('');

        // Implementar filtrado por categorías
        const categoryFilters = document.getElementById('category-filters');
        categoryFilters.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const category = e.target.dataset.category;
                filterVideos(category);
                
                // Actualizar estilos de botones
                categoryFilters.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('bg-red-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                });
                e.target.classList.remove('bg-gray-200', 'text-gray-700');
                e.target.classList.add('bg-red-600', 'text-white');
            }
        });

    } catch (error) {
        console.error('Error fetching the playlist:', error);
        const playlistContainer = document.getElementById('playlist-container');
        playlistContainer.innerHTML = '<p class="text-center text-red-600 col-span-full">Error al cargar los videos. Por favor, intenta de nuevo más tarde.</p>';
    }

    // Función para reproducir el video
    window.playVideo = (videoId) => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-4 max-w-3xl w-full mx-4">
                <div class="aspect-w-16 aspect-h-9 mb-4">
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="w-full h-full"></iframe>
                </div>
                <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('button').onclick = () => modal.remove();
    };

    // Función para filtrar videos
    function filterVideos(category) {
        const videos = document.querySelectorAll('#playlist-container > div');
        videos.forEach(video => {
            if (category === 'all' || video.dataset.category === category) {
                video.style.display = 'block';
            } else {
                video.style.display = 'none';
            }
        });
    }

    // Función para asignar categorías aleatorias (para demostración)
    function getRandomCategory() {
        const categories = ['music', 'talk-shows', 'interviews'];
        return categories[Math.floor(Math.random() * categories.length)];
    }
}