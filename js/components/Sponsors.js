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
            <div class="flex items-center justify-around">
                ${sponsorsData.map(sponsor => `
                    <div class="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110">
                        <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-w-full max-h-full object-contain">
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}