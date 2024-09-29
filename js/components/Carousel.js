export default function Carousel() {
    const carousel = document.getElementById('carousel');
    const images = [
        'https://clientesweb.github.io/CafeClubTv/images/image1.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image2%20(1).jpg', // Codificado
        'https://clientesweb.github.io/CafeClubTv/images/image3.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image4.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image5.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image6.jpg'
    ];

    let currentSlide = 0;
    let isTransitioning = false;

    // Crear HTML del carrusel
    carousel.innerHTML = `
        <div class="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl">
            <div class="flex transition-transform duration-700 ease-in-out will-change-transform">
                ${images.map(src => `
                    <img 
                        data-src="${src}" 
                        alt="Slide" 
                        class="w-full h-full object-cover flex-shrink-0 lazy-load opacity-0 transition-opacity duration-500"
                    >`).join('')}
            </div>
            <button class="prev absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all">&#10094;</button>
            <button class="next absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all">&#10095;</button>
        </div>
    `;

    const slideContainer = carousel.querySelector('.flex');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const slides = carousel.querySelectorAll('.lazy-load');

    // Función para cargar imágenes con lazy loading
    function loadSlideImage(index) {
        const img = slides[index];
        if (!img.src) {
            img.src = img.getAttribute('data-src');
            img.onload = () => {
                img.classList.remove('opacity-0');
            };
        }
    }

    // Mostrar slide actual
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        loadSlideImage(currentSlide);
        
        requestAnimationFrame(() => {
            isTransitioning = false;
        });
    }

    prevButton.addEventListener('click', () => {
        showSlide((currentSlide - 1 + images.length) % images.length);
    });

    nextButton.addEventListener('click', () => {
        showSlide((currentSlide + 1) % images.length);
    });

    // Auto-desplazamiento cada 5 segundos
    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 5000);

    // Cargar la primera imagen al iniciar
    loadSlideImage(0);
}