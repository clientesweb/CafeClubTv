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
    Header();
    Carousel();
    Playlists();
    Shorts();
    Sponsors();
    Counters();
    Footer();
    WhatsAppFloat();
    BottomNav();
});