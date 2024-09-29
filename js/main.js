import Header from './components/Header.js';
import Carousel from './components/Carousel.js';
import Playlists from './components/Playlists.js';
import Shorts from './components/Shorts.js';
import Sponsors from './components/Sponsors.js';
import Counters from './components/Counters.js';
import Footer from './components/Footer.js';
import WhatsAppFloat from './components/WhatsAppFloat.js';
import BottomNav from './components/BottomNav.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${Header()}
        <main class="background-container">
            <div class="main-container">
                ${Carousel()}
                ${Playlists()}
                ${Shorts()}
                ${Sponsors()}
            </div>
        </main>
        ${Counters()}
        ${Footer()}
        ${WhatsAppFloat()}
        ${BottomNav()}
    `;

    // Inicializar componentes que requieren JavaScript después de que el DOM esté listo
    Carousel.init();
    Playlists.init();
    Shorts.init();
    Sponsors.init();
    Counters.init();
    WhatsAppFloat.init();
});