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

    // Simular una llamada a la API
    setTimeout(() => {
        const shortsData = [
            { id: 's1', title: 'Short 1' },
            { id: 's2', title: 'Short 2' },
            { id: 's3', title: 'Short 3' },
            { id: 's4', title: 'Short 4' },
            { id: 's5', title: 'Short 5' },
        ];

        const shortsContainer = document.getElementById('shorts-container');
        shortsContainer.innerHTML = shortsData.map(short => `
            <div class="flex-none w-48 h-80 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <iframe
                    src="https://www.youtube.com/embed/${short.id}"
                    title="${short.title}"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        `).join('');
    }, 1000);
}