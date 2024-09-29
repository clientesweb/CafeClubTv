export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    // Verificar si el elemento existe antes de proceder
    if (bottomNav) {
        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-gray-200 bg-opacity-80 backdrop-blur-md shadow-lg rounded-t-2xl z-40">
                <div class="flex justify-around items-center py-2">
                    <a href="#playlists" class="text-center text-gray-600 hover:text-red-800 transition-colors">
                        <i class="fas fa-home text-xl mb-1"></i>
                        <span class="block text-xs">Inicio</span>
                    </a>
                    <a href="#features" class="text-center text-gray-600 hover:text-red-800 transition-colors">
                        <i class="fas fa-calendar-alt text-xl mb-1"></i>
                        <span class="block text-xs">Eventos</span>
                    </a>
                    <a href="#shorts-section" class="text-center text-gray-600 hover:text-red-800 transition-colors">
                        <i class="fas fa-tags text-xl mb-1"></i>
                        <span class="block text-xs">Ofertas</span>
                    </a>
                    <a href="#sponsors-section" class="text-center text-gray-600 hover:text-red-800 transition-colors">
                        <i class="fas fa-star text-xl mb-1"></i>
                        <span class="block text-xs">Patrocinadores</span>
                    </a>
                    <a href="#cta" class="text-center text-gray-600 hover:text-red-800 transition-colors">
                        <i class="fas fa-envelope text-xl mb-1"></i>
                        <span class="block text-xs">Contacto</span>
                    </a>
                </div>
            </nav>
        `;
    }
}