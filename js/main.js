@import 'components/header.css';
@import 'components/carousel.css';
@import 'components/playlists.css';
@import 'components/shorts.css';
@import 'components/sponsors.css';
@import 'components/counters.css';
@import 'components/footer.css';
@import 'components/whatsapp-float.css';
@import 'components/bottom-nav.css';

/* Estilos globales */
:root {
    --primary-color: #ff0000;
    --secondary-color: #ffff00;
    --text-color: #333333;
    --background-color: #f5f5f5;
}

html {
    --window-controls-overlay-height: env(titlebar-area-height, 0px);
    padding-top: var(--window-controls-overlay-height);
}

body {
    padding-bottom: 60px; /* Espacio para el menú inferior */
    color: var(--text-color);
    background-color: var(--background-color);
}

/* Estilos para el botón flotante */
#ganacash-float {
    transition: all 0.3s ease;
}

#ganacash-float:hover {
    transform: scale(1.1);
}

#push-notification {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    opacity: 0;
    transform: translateY(10px);
}

#push-notification.show {
    opacity: 1;
    transform: translateY(0);
}

/* Estilos para la sección de descarga de la aplicación */
#app-download {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

#app-download h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

#app-download .flex {
    margin-bottom: 1rem;
}

#app-download img {
    transition: transform 0.3s ease;
}

#app-download img:hover {
    transform: scale(1.05);
}

/* Estilos para la grilla de programas */
#program-grid {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

#program-grid h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.program-slider {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Para Firefox */
    -ms-overflow-style: none; /* Para Internet Explorer y Edge */
}

.program-slider::-webkit-scrollbar {
    display: none; /* Para Chrome, Safari y Opera */
}

.program-item {
    flex: 0 0 auto;
    width: 250px;
    margin-right: 1rem;
    scroll-snap-align: start;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.program-item:hover {
    transform: translateY(-5px);
}

.program-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.program-item .content {
    padding: 1rem;
}

.program-item h3 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.program-item p {
    color: var(--text-color);
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

/* Estilos para el menú inferior */
#bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    padding: 0 1rem;
    background-color: var(--primary-color);
}

#bottom-nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: white;
    font-size: 0.8rem;
    transition: color 0.3s ease;
}

#bottom-nav a:hover {
    color: var(--secondary-color);
}

#bottom-nav i {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
}

/* Responsive */
@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    #program-grid .program-slider {
        scroll-snap-type: x mandatory;
    }

    #program-grid .program-item {
        scroll-snap-align: start;
    }
}