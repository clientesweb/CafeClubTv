export default function Header() {
    const header = document.getElementById('header');
    
    function checkInstallable() {
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
        const isInstagram = /Instagram/.test(navigator.userAgent);
        return !isInstalled || isInstagram;
    }

    const isInstallable = checkInstallable();

    header.innerHTML = `
        <header class="bg-gray-200 bg-opacity-80 backdrop-blur-md text-gray-800 p-4 flex items-center justify-between shadow-md z-50">
            <div class="logo">
                <img src="https://clientesweb.github.io/CafeClubTv/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-12 transition-transform duration-300 hover:scale-105">
            </div>
            ${isInstallable ? `
                <button class="bg-gradient-to-r from-red-800 via-red-600 to-gray-300 text-white rounded-full px-6 py-2 text-sm font-medium transition-transform duration-200 hover:scale-105 shadow-lg">
                    <i class="fas fa-download mr-2"></i> Instalar CafeClubTV App
                </button>
            ` : ''}
        </header>
    `;

    if (isInstallable) {
        const installButton = header.querySelector('button');
        installButton.addEventListener('click', () => {
            // Lógica para instalar la PWA
            console.log('Instalando CafeClubTV App');
        });
    }
}