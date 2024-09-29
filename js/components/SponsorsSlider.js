class SponsorsSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupSlider();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/components/SponsorsSlider.css">
            <div class="sponsors-slider">
                <!-- Agrega aquí los elementos del slider de patrocinadores -->
            </div>
        `;
    }

    setupSlider() {
        const slider = this.shadowRoot.querySelector('.sponsors-slider');
        const items = slider.children;
        const totalItems = items.length;
        
        // Clonar los primeros elementos para el efecto infinito
        for (let i = 0; i < totalItems; i++) {
            const clone = items[i].cloneNode(true);
            slider.appendChild(clone);
        }

        let itemWidth = items[0].offsetWidth;
        let totalWidth = itemWidth * totalItems;
        slider.style.width = `${totalWidth * 2}px`;

        let currentIndex = 0;
        const transitionDuration = 2;
        const slideInterval = 5000;
        
        slider.style.transition = `transform ${transitionDuration}s ease-in-out`;

        const slideToNext = () => {
            currentIndex++;
            if (currentIndex >= totalItems) {
                currentIndex = 0;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(0px)`;
                setTimeout(() => {
                    slider.style.transition = `transform ${transitionDuration}s ease-in-out`;
                    currentIndex = totalItems;
                    slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                }, 20);
            } else {
                slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            }
        };

        setInterval(slideToNext, slideInterval);

        this.setupTouchEvents(slider);
        this.setupResizeEvent(slider, items);
    }

    setupTouchEvents(slider) {
        slider.addEventListener('touchstart', (e) => {
            const touchStartX = e.touches[0].clientX;
            slider.addEventListener('touchmove', (e) => {
                const touchMoveX = e.touches[0].clientX;
                if (touchMoveX - touchStartX < -50) {
                    this.slideToNext();
                    slider.removeEventListener('touchmove', arguments.callee);
                }
            }, { passive: true });
        }, { passive: true });
    }

    setupResizeEvent(slider, items) {
        const updateItemWidth = () => {
            const itemWidth = items[0].offsetWidth;
            const totalWidth = itemWidth * items.length;
            slider.style.width = `${totalWidth * 2}px`;
        };
        window.addEventListener('resize', updateItemWidth);
        updateItemWidth();
    }
}

customElements.define('sponsors-slider-component', SponsorsSlider);
