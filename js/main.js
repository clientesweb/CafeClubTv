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
    // Inicializar los componentes
    Header();
    Carousel();
    Playlists();
    Shorts();
    Sponsors();
    Counters();
    Footer();
    WhatsAppFloat();
    BottomNav();
    Roulette();

    // Manejo del preloader
    const preloader = document.getElementById('preloader');

    // Simula la carga (puedes reemplazar esto con tu lógica de carga)
    setTimeout(() => {
        // Oculta el preloader una vez que el contenido está cargado
        preloader.style.display = 'none';
    }, 2000); // Ajusta el tiempo según tus necesidades

    // Opcional: Configuración de la ruleta
    const rouletteComponent = document.querySelector('roulette-component');
    if (rouletteComponent) {
        // Ejemplo de cómo podrías controlar si la ruleta está arreglada o no
        // Esto podría ser controlado por un botón o cualquier otra lógica en tu aplicación
        let isRigged = false;
        
        // Función para cambiar el estado de la ruleta
        window.toggleRouletteRigged = () => {
            isRigged = !isRigged;
            rouletteComponent.setRigged(isRigged);
            console.log(`Ruleta ${isRigged ? 'arreglada' : 'normal'}`);
        };
    }
});
