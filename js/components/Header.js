export default function Header() {
    const header = document.getElementById('header');

    function checkInstallable() {
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
        const isInstagram = /Instagram/.test(navigator.userAgent);
        return !isInstalled && !isInstagram;
    }

    const isInstallable = checkInstallable();

    header.innerHTML = `
        <div class="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium" id="top-banner">
            ¿Te sientes con suerte? Premiamos tu fidelidad, gana dinero en efectivo en nuestra Ruleta!
            <button class="ml-2 underline hover:text-yellow-300 transition-colors duration-200">Saber más</button>
        </div>
        <header class="bg-white text-gray-800 shadow-md z-50">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <button id="mobile-menu-button" class="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2 md:hidden">
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <div class="hidden md:flex items-center space-x-4">
                            <a href="#" class="text-gray-600 hover:text-red-600 transition-colors duration-200">
                                <i class="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-600 hover:text-red-600 transition-colors duration-200">
                                <i class="fab fa-facebook text-xl"></i>
                            </a>
                            <a href="#" class="text-gray-600 hover:text-red-600 transition-colors duration-200">
                                <i class="fab fa-youtube text-xl"></i>
                            </a>
                        </div>
                    </div>
                    <div class="flex-1 flex justify-center">
                        <div class="logo flex items-center">
                            <img src="https://clientesweb.github.io/CafeClubTv/images/logi.svg" alt="Logo de Cafe Club Tv" class="h-12 w-auto transition-all duration-300 hover:scale-110">
                        </div>
                    </div>
                    <div class="flex items-center">
                        <nav class="hidden md:flex items-center space-x-6 mr-4">
                            <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors duration-200">Inicio</a>
                            <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors duration-200">Programas</a>
                            <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors duration-200">Playlists</a>
                            <a href="#" class="text-sm font-medium hover:text-red-600 transition-colors duration-200">Contacto</a>
                        </nav>
                        ${isInstallable ? `
                            <button id="install-button" class="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center">
                                <i class="fas fa-download mr-2"></i>
                                <span class="hidden md:inline">Instalar App</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200">
                <nav class="px-4 pt-2 pb-4 space-y-2">
                    <a href="#" class="block text-sm font-medium hover:text-red-600 transition-colors duration-200">Inicio</a>
                    <a href="#" class="block text-sm font-medium hover:text-red-600 transition-colors duration-200">Programas</a>
                    <a href="#" class="block text-sm font-medium hover:text-red-600 transition-colors duration-200">Playlists</a>
                    <a href="#" class="block text-sm font-medium hover:text-red-600 transition-colors duration-200">Contacto</a>
                    <div class="flex items-center space-x-4 mt-4">
                        <a href="#" class="text-gray-600 hover:text-red-600 transition-colors duration-200">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-red-600 transition-colors duration-200">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-red-600 transition-colors duration-200">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                    </div>
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

    // Manejar el menú móvil
    const mobileMenuButton = header.querySelector('#mobile-menu-button');
    const mobileMenu = header.querySelector('#mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Añadir efecto de scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerElement = header.querySelector('header');
        const topBanner = header.querySelector('#top-banner');
        
        if (scrollPosition > 50) {
            headerElement.classList.add('shadow-md');
            topBanner.classList.add('hidden');
        } else {
            headerElement.classList.remove('shadow-md');
            topBanner.classList.remove('hidden');
        }
    });
}