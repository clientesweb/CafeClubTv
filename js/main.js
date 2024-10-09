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

const loadComponent = async (component, elementId) => {
    try {
        const element = document.getElementById(elementId);
        if (element) {
            await component(element);
            console.log(`${elementId} cargado correctamente`);
        } else {
            console.warn(`Elemento con id ${elementId} no encontrado`);
        }
    } catch (error) {
        console.error(`Error al cargar ${elementId}:`, error);
    }
};

const componentsToLoad = [
    { component: Header, id: 'header' },
    { component: Carousel, id: 'carousel' },
    { component: Playlists, id: 'playlists' },
    { component: Shorts, id: 'shorts' },
    { component: Sponsors, id: 'sponsors' },
    { component: Counters, id: 'counters' },
    { component: Footer, id: 'footer' },
    { component: WhatsAppFloat, id: 'whatsapp-float' },
    { component: BottomNav, id: 'bottom-nav' },
    { component: Roulette, id: 'roulette' }
];

const initApp = async () => {
    try {
        await Promise.all(componentsToLoad.map(({ component, id }) => loadComponent(component, id)));
        console.log('Todos los componentes cargados correctamente');
    } catch (error) {
        console.error('Error durante la inicialización de la aplicación:', error);
    } finally {
        // Asegurarse de que el preloader se oculte incluso si hay errores
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
};

// Iniciar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}