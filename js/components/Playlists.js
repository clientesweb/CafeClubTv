export default function Playlists() {
    const playlists = document.getElementById('playlists');

    playlists.innerHTML = `
        <section class="my-12">
            <h2 class="text-2xl font-bold mb-6">Playlists</h2>
            <div class="flex overflow-x-auto space-x-4 pb-4" id="playlist-container">
                <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
            </div>
        </section>
    `;

    // Simular una llamada a la API
    setTimeout(() => {
        const videos = [
            { id: '1', title: 'Video 1' },
            { id: '2', title: 'Video 2' },
            { id: '3', title: 'Video 3' },
            { id: '4', title: 'Video 4' },
            { id: '5', title: 'Video 5' },
        ];

        const playlistContainer = document.getElementById('playlist-container');
        playlistContainer.innerHTML = videos.map(video => `
            <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <iframe
                    src="https://www.youtube.com/embed/${video.id}"
                    title="${video.title}"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        `).join('');
    }, 1000);
}