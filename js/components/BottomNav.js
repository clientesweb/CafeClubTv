export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    // Verificar si el elemento existe antes de proceder
    if (bottomNav) {
        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-400 to-red-600 shadow-lg rounded-t-2xl z-40">
                <div class="flex justify-around items-center py-3">
                    <a href="#playlists" class="text-center text-white transition-all duration-300 transform hover:scale-110" aria-label="Ir a Inicio">
                        <i class="fas fa-home text-2xl mb-1"></i>
                        <span class="block text-sm">Inicio</span>
                    </a>
                    <a href="#features" class="text-center text-white transition-all duration-300 transform hover:scale-110" aria-label="Ir a Eventos">
                        <i class="fas fa-calendar-alt text-2xl mb-1"></i>
                        <span class="block text-sm">Eventos</span>
                    </a>
                    <a href="#shorts-section" class="text-center text-white transition-all duration-300 transform hover:scale-110" aria-label="Ir a Ofertas">
                        <i class="fas fa-tags text-2xl mb-1"></i>
                        <span class="block text-sm">Ofertas</span>
                    </a>
                    <a href="#sponsors-section" class="text-center text-white transition-all duration-300 transform hover:scale-110" aria-label="Ir a Patrocinadores">
                        <i class="fas fa-star text-2xl mb-1"></i>
                        <span class="block text-sm">Patrocinadores</span>
                    </a>
                    <a href="#cta" class="text-center text-white transition-all duration-300 transform hover:scale-110" aria-label="Ir a Contacto">
                        <i class="fas fa-envelope text-2xl mb-1"></i>
                        <span class="block text-sm">Contacto</span>
                    </a>
                </div>
            </nav>
        `;
    }
}