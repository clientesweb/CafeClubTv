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
            <style>
                /* Estilos específicos del componente */
                header {
                    background-color: white;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logo {
                    width: 150px;
                    height: auto;
                }
                .install-btn {
                    background-color: #007bff;
                    color: white;
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .install-btn:hover {
                    background-color: #0056b3;
                }
            </style>
            <header>
                <div class="container">
                    <img src="images/logo.svg" alt="Logo de Cafe Club TV" class="logo">
                    <button class="install-btn">
                        <i class="fas fa-download"></i> Instalar CafeClubTV App
                    </button>
                </div>
            </header>
        `;
    }
}

customElements.define('header-component', Header);
