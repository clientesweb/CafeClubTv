import Header from './components/Header.js';
import Carousel from './components/Carousel.js';
import Playlists from './components/Playlists.js';
import Shorts from './components/Shorts.js';
import Sponsors from './components/Sponsors.js';
import Counters from './components/Counters.js';
import Footer from './components/Footer.js';
import WhatsAppFloat from './components/WhatsAppFloat.js';
import BottomNav from './components/BottomNav.js';

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
    { component: BottomNav, id: 'bottom-nav' }
];

const initProgramSlider = () => {
    const programData = [
        { title: 'Café Mañanero', schedule: 'Lunes a Viernes, 7:00 AM', image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
        { title: 'Noticias al Día', schedule: 'Lunes a Viernes, 12:00 PM', image: 'https://images.unsplash.com/photo-1588600878108-578307a3cc9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
        { title: 'Cocina con Sabor', schedule: 'Sábados y Domingos, 2:00 PM', image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
        { title: 'Cine Club', schedule: 'Viernes, 9:00 PM', image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
        // Agrega más programas aquí
    ];

    const sliderContainer = document.querySelector('.program-slider');
    
    programData.forEach(program => {
        const programElement = document.createElement('div');
        programElement.className = 'program-item bg-white rounded-lg shadow-md overflow-hidden';
        programElement.innerHTML = `
            <img src="${program.image}" alt="${program.title}" class="w-full h-32 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg mb-2">${program.title}</h3>
                <p class="text-sm text-gray-600">${program.schedule}</p>
            </div>
        `;
        programElement.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para redirigir a la playlist del programa
            console.log(`Redirigiendo a la playlist de ${program.title}`);
        });
        sliderContainer.appendChild(programElement);
    });

    // Implementar desplazamiento automático
    let scrollPosition = 0;
    const scrollSpeed = 1; // Ajusta la velocidad de desplazamiento

    const autoScroll = () => {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= sliderContainer.scrollWidth - sliderContainer.clientWidth) {
            scrollPosition = 0;
        }
        sliderContainer.scrollTo(scrollPosition, 0);
        requestAnimationFrame(autoScroll);
    };

    autoScroll();
};

const initApp = async () => {
    try {
        await Promise.all(componentsToLoad.map(({ component, id }) => loadComponent(component, id)));
        console.log('Todos los componentes cargados correctamente');
        initProgramSlider();
    } catch (error) {
        console.error('Error durante la inicialización de la aplicación:', error);
    } finally {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

if ('windowControlsOverlay' in navigator) {
    const overlayHeight = navigator.windowControlsOverlay.getTitlebarAreaRect().height;
    document.documentElement.style.setProperty('--window-controls-overlay-height', `${overlayHeight}px`);

    navigator.windowControlsOverlay.addEventListener('geometrychange', () => {
        const newOverlayHeight = navigator.windowControlsOverlay.getTitlebarAreaRect().height;
        document.documentElement.style.setProperty('--window-controls-overlay-height', `${newOverlayHeight}px`);
    });
}