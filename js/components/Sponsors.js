export default function Sponsors() {
    return `
        <section id="sponsors-section">
            <div class="sponsors-slider">
                <div class="sponsor-item"><img src="images/logo1.png" alt="Logo del patrocinador 1" loading="lazy"></div>
                <div class="sponsor-item"><img src="images/logo2.png" alt="Logo del patrocinador 2" loading="lazy"></div>
                <div class="sponsor-item"><img src="images/logo3.png" alt="Logo del patrocinador 3" loading="lazy"></div>
                <div class="sponsor-item"><img src="images/logo4.png" alt="Logo del patrocinador 4" loading="lazy"></div>
                <div class="sponsor-item"><img src="images/LOGO MONO COMICS NEGRO (1).png" alt="Logo del patrocinador 5" loading="lazy"></div>
            </div>
        </section>
    `;
}

Sponsors.init = () => {
    const slider = document.querySelector('.sponsors-slider');
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

    slider.addEventListener('touchstart', (e) => {
        const touchStartX = e.touches[0].clientX;
        slider.addEventListener('touchmove', (e) => {
            const touchMoveX = e.touches[0].clientX;
            if (touchMoveX - touchStartX < -50) {
                slideToNext();
                slider.removeEventListener('touchmove', arguments.callee);
            }
        }, { passive: true });
    }, { passive: true });

    const updateItemWidth = () => {
        itemWidth = items[0].offsetWidth;
        totalWidth = itemWidth * totalItems;
        slider.style.width = `${totalWidth * 2}px`;
    };
    window.addEventListener('resize', updateItemWidth);
    updateItemWidth();
};