export default function Carousel() {
    const carousel = document.getElementById('carousel');
    const images = [
        'https://clientesweb.github.io/CafeClubTv/images/image1.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image2%20(1).jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image3.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image4.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image5.jpg',
        'https://clientesweb.github.io/CafeClubTv/images/image6.jpg'
    ];

    let currentSlide = 0;
    let isTransitioning = false;
    let autoplayInterval;

    const carouselInner = carousel.querySelector('.carousel-inner');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    function createCarouselItems() {
        carouselInner.innerHTML = images.map((src, index) => `
            <div class="carousel-item w-full flex-shrink-0">
                <img 
                    src="${src}" 
                    alt="Slide ${index + 1}" 
                    class="w-full h-full object-cover"
                    loading="${index === 0 ? 'eager' : 'lazy'}"
                >
            </div>
        `).join('');

        indicatorsContainer.innerHTML = images.map((_, index) => `
            <button class="indicator w-3 h-3 bg-white/50 rounded-full focus:outline-none transition-all duration-300 ${index === 0 ? 'bg-white' : ''}" data-index="${index}"></button>
        `).join('');
    }

    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentSlide = (index + images.length) % images.length;
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        updateIndicators();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-white', index === currentSlide);
            indicator.classList.toggle('bg-white/50', index !== currentSlide);
        });
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    createCarouselItems();

    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        stopAutoplay();
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        stopAutoplay();
    });

    indicatorsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicator')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            showSlide(index);
            stopAutoplay();
        }
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Iniciar el autoplay
    startAutoplay();

    // Añadir soporte para gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            showSlide(currentSlide + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            showSlide(currentSlide - 1);
        }
    }
}