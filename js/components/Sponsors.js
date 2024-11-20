export default function Sponsors() {
    const sponsors = document.getElementById('sponsors');
    const sponsorsData = [
        { id: 1, name: 'Sponsor 1', logo: 'https://www.cafeclubtv.com/images/logo1.png' },
        { id: 2, name: 'Sponsor 2', logo: 'https://www.cafeclubtv.com/images/logo2.png' },
        { id: 3, name: 'Sponsor 3', logo: 'https://www.cafeclubtv.com/images/logo3.png' },
        { id: 4, name: 'Sponsor 4', logo: 'https://www.cafeclubtv.com/images/logo4.png' },
        { id: 5, name: 'Sponsor 5', logo: 'https://www.cafeclubtv.com/images/DOC-20240908-WA0020.-removebg-preview.png' },
        { id: 6, name: 'Sponsor 6', logo: 'https://www.cafeclubtv.com/images/LOGO%20MONO%20COMICS%20NEGRO%20(1).png' },
    ];

    sponsors.innerHTML = `
        <section class="my-12 bg-gradient-to-r from-red-800 via-gray-300 to-white p-6 rounded-lg shadow-lg relative overflow-hidden">
            <h2 class="text-2xl font-bold mb-6 text-white text-center">Nuestros Patrocinadores</h2>
            <div class="overflow-hidden relative">
                <div class="flex items-center justify-start space-x-4 transition-transform duration-300" id="sponsorSlider">
                    ${sponsorsData.map(sponsor => `
                        <div class="min-w-[120px] h-24 bg-white rounded-full shadow-md flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 cursor-pointer" data-sponsor-id="${sponsor.id}">
                            <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-w-full max-h-full object-contain">
                        </div>
                    `).join('')}
                </div>
                <button id="prevButton" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button id="nextButton" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    `;

    const sponsorSlider = document.getElementById('sponsorSlider');
    let currentPosition = 0;
    const slideWidth = 120 + 16; // Ancho de los logos + espacio entre ellos
    const intervalTime = 3000; // Cambiar cada 3 segundos

    function slideNext() {
        currentPosition += slideWidth;
        if (currentPosition >= sponsorSlider.scrollWidth - sponsorSlider.clientWidth) {
            currentPosition = 0; // Reinicia al comienzo cuando llega al final
        }
        sponsorSlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    function slidePrev() {
        currentPosition -= slideWidth;
        if (currentPosition < 0) {
            currentPosition = sponsorSlider.scrollWidth - sponsorSlider.clientWidth; // Regresa al final
        }
        sponsorSlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            requestAnimationFrame(slideNext);
        }, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Controladores de eventos para los botones
    document.getElementById('prevButton').addEventListener('click', () => {
        stopAutoSlide();
        requestAnimationFrame(slidePrev);
        startAutoSlide();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        stopAutoSlide();
        requestAnimationFrame(slideNext);
        startAutoSlide();
    });

    // Pausar el desplazamiento automático al pasar el mouse por encima
    sponsorSlider.addEventListener('mouseenter', stopAutoSlide);
    sponsorSlider.addEventListener('mouseleave', startAutoSlide);

    // Añadir interactividad a los logos de los patrocinadores
    sponsorSlider.querySelectorAll('[data-sponsor-id]').forEach(sponsorElement => {
        sponsorElement.addEventListener('click', () => {
            const sponsorId = sponsorElement.getAttribute('data-sponsor-id');
            const sponsor = sponsorsData.find(s => s.id === parseInt(sponsorId));
            if (sponsor) {
                alert(`Has hecho clic en ${sponsor.name}. Aquí puedes añadir más información o redirigir a la página del patrocinador.`);
            }
        });
    });

    // Iniciar el desplazamiento automático
    startAutoSlide();
}