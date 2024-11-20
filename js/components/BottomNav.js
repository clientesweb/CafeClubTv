export default function BottomNav() {
    const bottomNav = document.getElementById('bottom-nav');

    if (bottomNav) {
        bottomNav.innerHTML = `
            <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
                <div class="max-w-screen-xl mx-auto px-4">
                    <ul class="flex justify-between items-center py-2">
                        <li>
                            <a href="#playlists" class="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors duration-300">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                <span class="text-xs mt-1">Inicio</span>
                            </a>
                        </li>
                <li>
                            <a href="#features" class="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors duration-300">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span class="text-xs mt-1">Eventos</span>
                            </a>
                        </li>
                        <li>
                            <a href="#shorts-section" class="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors duration-300 relative">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                <span class="text-xs mt-1">Shorts</span>
                                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                            </a>
                        </li>
                        <li>
                            <a href="#sponsors-section" class="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors duration-300">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                <span class="text-xs mt-1">Sponsors</span>
                            </a>
                        </li>
                        <li>
                            <a href="#cta" class="flex flex-col items-center text-gray-600 hover:text-red-600 transition-colors duration-300">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span class="text-xs mt-1">Contacto</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        `;

        // Añadir efecto de hover y active
        const navItems = bottomNav.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.querySelector('svg').classList.add('animate-bounce');
            });
            item.addEventListener('mouseleave', () => {
                item.querySelector('svg').classList.remove('animate-bounce');
            });
            item.addEventListener('click', (e) => {
                navItems.forEach(i => i.classList.remove('text-red-600'));
                item.classList.add('text-red-600');
            });
        });
    }
}