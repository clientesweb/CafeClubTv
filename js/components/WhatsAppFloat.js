class WhatsAppFloat extends HTMLElement {
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
            <link rel="stylesheet" href="css/components/WhatsAppFloat.css">
            <div class="whatsapp-float">
                <button id="whatsappBtn" class="whatsapp-button">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </div>
            <div id="whatsappModal" class="whatsapp-modal">
                <div class="whatsapp-modal-content">
                    <span class="whatsapp-close">&times;</span>
                    <h2>Chatea con CaféClubTV en WhatsApp</h2>
                    <textarea id="whatsappMessage" placeholder="Escribe tu mensaje aquí..."></textarea>
                    <button id="sendMessageBtn" class="send-btn">
                        <i class="fab fa-whatsapp"></i> Enviar mensaje
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const whatsappBtn = this.shadowRoot.getElementById('whatsappBtn');
        const whatsappModal = this.shadowRoot.getElementById('whatsappModal');
        const whatsappClose = this.shadowRoot.querySelector('.whatsapp-close');
        const sendMessageBtn = this.shadowRoot.getElementById('sendMessageBtn');
        const whatsappMessage = this.shadowRoot.getElementById('whatsappMessage');

        whatsappBtn.addEventListener('click', () => {
            whatsappModal.classList.add('show');
        });

        whatsappClose.addEventListener('click', () => {
            whatsappModal.classList.remove('show');
        });

        sendMessageBtn.addEventListener('click', () => {
            const message = whatsappMessage.value.trim();
            if (message) {
                const phoneNumber = '+593978606269';
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
                whatsappModal.classList.remove('show');
                whatsappMessage.value = '';
            } else {
                alert('Por favor, escribe un mensaje antes de enviar.');
            }
        });

        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target === whatsappModal) {
                whatsappModal.classList.remove('show');
            }
        });
    }
}

customElements.define('whatsapp-float-component', WhatsAppFloat);
