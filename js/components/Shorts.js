export default async function Shorts() {
    const shorts = document.getElementById('shorts');

    shorts.innerHTML = `
        <section class="my-12 px-4">
            <h2 class="text-3xl font-bold mb-6 text-center text-red-600">Shorts Destacados</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" id="shorts-container">
                ${Array(5).fill().map(() => `
                    <div class="aspect-[9/16] bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                `).join('')}
            </div>
            <div class="text-center mt-8">
                <button id="load-more-shorts" class="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition duration-300">
                    Cargar más
                </button>
            </div>
        </section>
    `;

    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
    const PLAYLIST_ID = 'PLZ_v3bWMqpjFa0xI11mahmOCxPk_1TK2s';
    let nextPageToken = '';

    const fetchShorts = async (pageToken = '') => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=10&key=${API_KEY}&pageToken=${pageToken}`);

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            nextPageToken = data.nextPageToken || '';
            return data.items;
        } catch (error) {
            console.error('Error fetching the playlist:', error);
            return null;
        }
    };

    const renderShorts = (shortsData) => {
        const shortsContainer = document.getElementById('shorts-container');
        
        if (!shortsData || shortsData.length === 0) {
            shortsContainer.innerHTML = '<p class="text-center text-gray-600 col-span-full">No se encontraron shorts en esta lista de reproducción.</p>';
            return;
        }

        const shortsHTML = shortsData.map(short => `
            <div class="aspect-[9/16] rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <iframe
                    src="https://www.youtube.com/embed/${short.snippet.resourceId.videoId}"
                    title="${short.snippet.title}"
                    class="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        `).join('');

        shortsContainer.innerHTML += shortsHTML;
    };

    const loadMoreShorts = async () => {
        const loadMoreButton = document.getElementById('load-more-shorts');
        loadMoreButton.textContent = 'Cargando...';
        loadMoreButton.disabled = true;

        const newShorts = await fetchShorts(nextPageToken);
        if (newShorts) {
            renderShorts(newShorts);
        }

        loadMoreButton.textContent = 'Cargar más';
        loadMoreButton.disabled = false;

        if (!nextPageToken) {
            loadMoreButton.style.display = 'none';
        }
    };

    document.getElementById('load-more-shorts').addEventListener('click', loadMoreShorts);

    // Inicializar con los primeros shorts
    const initialShorts = await fetchShorts();
    if (initialShorts) {
        renderShorts(initialShorts);
    } else {
        document.getElementById('shorts-container').innerHTML = '<p class="text-center text-red-600 col-span-full">Error al cargar los shorts. Por favor, intenta de nuevo más tarde.</p>';
    }

    // Implementar carrusel para dispositivos móviles
    if (window.innerWidth < 640) {
        const shortsContainer = document.getElementById('shorts-container');
        shortsContainer.classList.remove('grid');
        shortsContainer.classList.add('flex', 'overflow-x-auto', 'snap-x', 'snap-mandatory', 'space-x-4', 'pb-4');
        shortsContainer.querySelectorAll('.aspect-[9/16]').forEach(short => {
            short.classList.add('snap-center', 'flex-shrink-0', 'w-3/4');
        });
    }

    // Observador de intersección para lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                const src = iframe.getAttribute('data-src');
                if (src) {
                    iframe.src = src;
                    iframe.removeAttribute('data-src');
                }
                observer.unobserve(iframe);
            }
        });
    }, observerOptions);

    document.querySelectorAll('#shorts-container iframe').forEach(iframe => {
        const src = iframe.src;
        iframe.removeAttribute('src');
        iframe.setAttribute('data-src', src);
        observer.observe(iframe);
    });
}