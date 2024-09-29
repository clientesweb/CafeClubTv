export default function WhatsAppFloat() {
    return `
        <div class="whatsapp-float">
            <a href="javascript:void(0);" id="whatsappBtn" class="whatsapp-button" aria-label="Chatea con CaféClubTV en WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>
        </div>
        <div id="whatsappModal" class="whatsapp-modal">
            <div class="whatsapp-modal-content">
                <button class="whatsapp-close" aria-label="Cerrar modal">&times;</button>
                <h2>Chatea con CaféClubTV en WhatsApp</h2>
                <p>Escribe tu mensaje:</p>
                <textarea id="whatsappMessage" placeholder="Escribe tu mensaje aquí..." rows="4" style="width: 100%;"></textarea>
                <button id="sendMessageBtn" class="send-btn">Enviar mensaje</button>
            </div>
        </div>
    `;
}

WhatsAppFloat.init = () => {
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappModal = document.getElementById('whatsappModal');
    const whatsappClose = document.querySelector('.whatsapp-close');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const whatsappMessage = document.getElementById('whatsappMessage');

    whatsappBtn.addEventListener('click', function() {
        whatsappModal.classList.add('show');
    });

    whatsappClose.addEventListener('click', function() {
        whatsappModal.classList.remove('show');
    });

    sendMessageBtn.addEventListener('click', function() {
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

    window.addEventListener('click', function(event) {
        if (event.target == whatsappModal) {
            whatsappModal.classList.remove('show');
        }
    });
};