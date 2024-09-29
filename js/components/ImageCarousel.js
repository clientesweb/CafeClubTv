class ImageCarousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupCarousel();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/components/ImageCarousel.css">
            <div class="carousel">
                <button class="carousel-button prev">&lt;</button>
                <div class="carousel-images">
                    <!-- Agrega aquí tus imágenes del carrusel -->
                </div>
                <button class="carousel-button next">&gt;</button>
            </div>
        `;
    }

    setupCarousel() {
        const prevButton = this.shadowRoot.querySelector('.carousel-button.prev');
        const nextButton = this.shadowRoot.querySelector('.carousel-button.next');
        const carouselImages = this.shadowRoot.querySelector('.carousel-images');
        let index = 0;
        const imageCount = this.shadowRoot.querySelectorAll('.carousel-images img').length;

        const updateCarousel = () => {
            const offset = -index * 100;
            carouselImages.style.transform = `translateX(${offset}%)`;
        };

        prevButton.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : imageCount - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            index = (index < imageCount - 1) ? index + 1 : 0;
            updateCarousel();
        });

        setInterval(() => {
            nextButton.click();
        }, 5000);
    }
}

customElements.define('image-carousel-component', ImageCarousel);
