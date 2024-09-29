export default function Sponsors() {
    const sponsors = document.getElementById('sponsors');
    const sponsorsData = [
        { id: 1, name: 'Sponsor 1', logo: 'https://clientesweb.github.io/CafeClubTv/images/logo1.png' },
        { id: 2, name: 'Sponsor 2', logo: 'https://clientesweb.github.io/CafeClubTv/images/logo2.png' },
        { id: 3, name: 'Sponsor 3', logo: 'https://clientesweb.github.io/CafeClubTv/images/logo3.png' },
        { id: 4, name: 'Sponsor 4', logo: 'https://clientesweb.github.io/CafeClubTv/images/logo4.png' },
        { id: 5, name: 'Sponsor 5', logo: 'https://clientesweb.github.io/CafeClubTv/images/LOGO%20MONO%20COMICS%20NEGRO%20(1).png' },
    ];

    sponsors.innerHTML = `
        <section class="my-12 bg-gradient-to-r from-red-800 via-gray-300 to-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-white">Nuestros Patrocinadores</h2>
            <div class="relative overflow-hidden">
                <div class="flex items-center justify-start space-x-4 transition-transform duration-300 ease-in-out" id="sponsorSlider">
                    ${sponsorsData.map(sponsor => `
                        <div class="min-w-[120px] h-24 bg-white rounded-full shadow-md flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110">
                            <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-w-full max-h-full object-contain">
                        </div>
                    `).join('')}
                </div>
                <button class="prev absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all">&#10094;</button>
                <button class="next absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all">&#10095;</button>
            </div>
        </section>
    `;

    const sponsorSlider = document.getElementById('sponsorSlider');
    const prevButton = sponsors.querySelector('.prev');
    const nextButton = sponsors.querySelector('.next');

    let currentPosition = 0;
    const slideWidth = 120 + 16; // Ancho de los logos + espacio entre ellos

    function slideNext() {
        currentPosition += slideWidth;
        if (currentPosition >= sponsorSlider.scrollWidth) {
            currentPosition = 0;
        }
        sponsorSlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    function slidePrev() {
        currentPosition -= slideWidth;
        if (currentPosition < 0) {
            currentPosition = sponsorSlider.scrollWidth - slideWidth;
        }
        sponsorSlider.style.transform = `translateX(-${currentPosition}px)`;
    }

    nextButton.addEventListener('click', slideNext);
    prevButton.addEventListener('click', slidePrev);

    setInterval(slideNext, 5000); // Desplazamiento automático cada 5 segundos
}