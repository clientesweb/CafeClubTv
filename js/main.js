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

// Función para cargar un componente de forma asíncrona
const loadComponent = async (component, elementId) => {
  try {
    await component();
    console.log(`${elementId} cargado correctamente`);
  } catch (error) {
    console.error(`Error al cargar ${elementId}:`, error);
  }
};

// Función para ocultar el preloader
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500); // Transición suave
};

document.addEventListener('DOMContentLoaded', async () => {
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

  try {
    // Cargar todos los componentes de forma asíncrona
    await Promise.all(componentsToLoad.map(({ component, id }) => loadComponent(component, id)));
    
    // Esperar a que las imágenes se carguen
    await new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });

    // Ocultar el preloader una vez que todo esté cargado
    hidePreloader();
  } catch (error) {
    console.error('Error durante la carga de la página:', error);
    // Asegurarse de que el preloader se oculte incluso si hay un error
    hidePreloader();
  }
});