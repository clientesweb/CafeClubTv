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
        { title: 'Hola GUTIS!', schedule: 'Todos los miercoles, 12:00 PM', image: 'images/gutiss.png' },
        { title: 'Consultorio para el Alma', schedule: 'Todos los martes con Juan Borja, 10:00 AM', image: 'images/juan.png' },
        { title: 'OM TAlKS', schedule: 'Miércoles, 22:00 PM', image: 'images/omtalks.png' },
        { title: 'CAFETEROS', schedule: 'Lunes y Miércoles, 10:00 AM', image: 'images/cafeteros.png' },
        { title: 'Música en Vivo', schedule: 'Sábados, 8:00 PM', image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
    ];

    const sliderContainer = document.querySelector('.program-slider');
    const viewAllButton = document.getElementById('view-all-programs');

    const createProgramElement = (program) => {
        const programElement = document.createElement('div');
        programElement.className = 'program-item';
        programElement.innerHTML = `
            <img src="${program.image}" alt="${program.title}" class="w-full h-32 object-cover">
            <div class="content">
                <h3 class="text-lg font-semibold">${program.title}</h3>
                <p class="text-sm text-gray-600">${program.schedule}</p>
                <a href="#" class="btn-ver mt-2 inline-block">Ver más</a>
            </div>
        `;
        return programElement;
    };

    programData.forEach(program => {
        const programElement = createProgramElement(program);
        sliderContainer.appendChild(programElement);
    });

    viewAllButton.addEventListener('click', () => {
        // Implementa la lógica para mostrar todos los programas
        console.log('Mostrar todos los programas');
    });
};

const initFloatingButton = () => {
    const floatingButton = document.getElementById('ganacash-float');
    const pushNotification = document.getElementById('push-notification');

    floatingButton.addEventListener('mouseenter', () => {
        pushNotification.classList.add('show');
        setTimeout(() => {
            pushNotification.classList.remove('show');
        }, 3000);
    });
};

const initApp = async () => {
    try {
        await Promise.all(componentsToLoad.map(({ component, id }) => loadComponent(component, id)));
        console.log('Todos los componentes cargados correctamente');
        initProgramSlider();
        initFloatingButton();
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