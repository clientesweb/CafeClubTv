class InstallButton extends HTMLElement {
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
            <link rel="stylesheet" href="css/components/InstallButton.css">
            <button id="install-button" style="display: none;">Instalar App</button>
        `;
    }

    setupEventListeners() {
        const installButton = this.shadowRoot.getElementById('install-button');

        const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
        const isInstagram = /Instagram/.test(navigator.userAgent);

        if (!isInstalled || isInstagram) {
            installButton.style.display = 'block';
        }

        installButton.addEventListener('click', () => {
            // Lógica para instalar la app
            installButton.style.display = 'none';
        });
    }
}

customElements.define('install-button-component', InstallButton);
