export default function Header() {
    const header = document.getElementById('header');

    function checkInstallable() {
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
        const isInstagram = /Instagram/.test(navigator.userAgent);
        return !isInstalled || isInstagram;
    }

    const isInstallable = checkInstallable();

    header.innerHTML = `
        <header class="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-lg z-50">
            <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div class="logo flex items-center space-x-3 mb-4 sm:mb-0">
                    <img src="https://clientesweb.github.io/CafeClubTv/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-12 w-auto transition-all duration-300 hover:scale-110 filter drop-shadow-lg">
                    <span class="text-2xl font-bold tracking-tight">Cafe Club TV</span>
                </div>
                <nav class="flex items-center space-x-6">
                    <a href="#" class="text-sm font-medium hover:text-red-400 transition-colors duration-200">Inicio</a>
                    <a href="#" class="text-sm font-medium hover:text-red-400 transition-colors duration-200">Programas</a>
                    <a href="#" class="text-sm font-medium hover:text-red-400 transition-colors duration-200">Playlists</a>
                    <a href="#" class="text-sm font-medium hover:text-red-400 transition-colors duration-200">Contacto</a>
                    ${isInstallable ? `
                        <button id="install-button" class="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2 group">
                            <i class="fas fa-download group-hover:animate-bounce"></i>
                            <span>Instalar App</span>
                        </button>
                    ` : ''}
                </nav>
            </div>
        </header>
    `;

    if (isInstallable) {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            const installButton = header.querySelector('#install-button');

            installButton.addEventListener('click', () => {
                installButton.style.display = 'none';
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('El usuario aceptó la instalación');
                    } else {
                        console.log('El usuario rechazó la instalación');
                    }
                    deferredPrompt = null;
                });
            });
        });
    }

    // Añadir efecto de scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerElement = document.querySelector('header');
        
        if (scrollPosition > 50) {
            headerElement.classList.add('bg-opacity-95', 'backdrop-blur-md');
            headerElement.classList.remove('bg-opacity-100');
        } else {
            headerElement.classList.remove('bg-opacity-95', 'backdrop-blur-md');
            headerElement.classList.add('bg-opacity-100');
        }
    });
}