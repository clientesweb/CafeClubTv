class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/components/Header.css">
            <header>
                <div class="logo">
                    <img src="images/logo.svg" alt="Logo de Cafe Club TV">
                </div>
                <div class="install-container">
                    <button class="install-button">
                        <i class="fas fa-download"></i> Instalar CafeClubTV App
                    </button>
                </div>
            </header>
        `;
    }
}

customElements.define('header-component', Header);