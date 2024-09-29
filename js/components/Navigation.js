class Navigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/components/Navigation.css">
            <nav>
                <button id="menu-toggle">Menu</button>
                <ul id="nav-menu">
                    <li><a href="#home">Inicio</a></li>
                    <li><a href="#videos">Videos</a></li>
                    <li><a href="#shorts">Shorts</a></li>
                    <li><a href="#sponsors">Patrocinadores</a></li>
                </ul>
            </nav>
        `;
    }

    setupEventListeners() {
        const menuToggle = this.shadowRoot.getElementById('menu-toggle');
        const navMenu = this.shadowRoot.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        } else {
            console.warn('Elementos de navegación no encontrados.');
        }
    }
}

customElements.define('navigation-component', Navigation);
