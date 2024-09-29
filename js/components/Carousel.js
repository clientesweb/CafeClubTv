export default function Carousel() {
    return `
        <section class="banner">
            <div class="carousel">
                <div class="carousel-images">
                    <img src="image1.jpg" alt="Imagen destacada 1" loading="lazy">
                    <img src="image2 (1).jpg" alt="Imagen destacada 2" loading="lazy">
                    <img src="image3.jpg" alt="Imagen destacada 3" loading="lazy">
                    <img src="image4.jpg" alt="Imagen destacada 4" loading="lazy">
                    <img src="image5.jpg" alt="Imagen destacada 5" loading="lazy">
                    <img src="image6.jpg" alt="Imagen destacada 6" loading="lazy">
                </div>
                <button class="carousel-button prev" aria-label="Imagen anterior">&#10094;</button>
                <button class="carousel-button next" aria-label="Imagen siguiente">&#10095;</button>
            </div>
        </section>
    `;
}

Carousel.init = () => {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselImages = document.querySelector('.carousel-images');
    let index = 0;
    const imageCount = document.querySelectorAll('.carousel-images img').length;

    function updateCarousel() {
        const offset = -index * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : imageCount - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        index = (index < imageCount - 1) ? index + 1 : 0;
        updateCarousel();
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        index = (index < imageCount - 1) ? index + 1 : 0;
        updateCarousel();
    }, 5000);
};