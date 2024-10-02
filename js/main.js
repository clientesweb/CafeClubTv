import Header from './components/Header.js';
import Carousel from './components/Carousel.js';
import Playlists from './components/Playlists.js';
import Shorts from './components/Shorts.js';
import Sponsors from './components/Sponsors.js';
import Counters from './components/Counters.js';
import Footer from './components/Footer.js';
import WhatsAppFloat from './components/WhatsAppFloat.js';
import BottomNav from './components/BottomNav.js';
import Roulette from './components/Roulette.js';

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    // Inicializar los componentes
    Promise.all([
        Header(),
        Carousel(),
        Playlists(),
        Shorts(),
        Sponsors(),
        Counters(),
        Footer(),
        WhatsAppFloat(),
        BottomNav(),
        Roulette()
    ]).then(() => {
        // Oculta el preloader una vez que todos los componentes están cargados
        preloader.style.display = 'none';
    }).catch(error => {
        console.error('Error al cargar los componentes:', error);
        // Asegúrate de ocultar el preloader incluso si hay un error
        preloader.style.display = 'none';
    });

    // Configuración de la ruleta
    const rouletteComponent = document.querySelector('roulette-component');
    if (rouletteComponent) {
        let isRigged = false;
        
        window.toggleRouletteRigged = () => {
            isRigged = !isRigged;
            rouletteComponent.setRigged(isRigged);
            console.log(`Ruleta ${isRigged ? 'arreglada' : 'normal'}`);
        };
    }
});
