export default function WhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsapp-float');

    if (whatsappFloat) {
        whatsappFloat.innerHTML = `
            <div class="fixed bottom-20 right-6 z-50">
                <button id="open-whatsapp-modal" class="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50" aria-label="Abrir chat de WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2.87 22l4.14-1.07C8.58 21.62 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.63 0-3.18-.4-4.53-1.11l-2.07.53.53-2.07C4.98 15.18 4 13.63 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm-1-3h2v-2h-2v2zm0-4h2V7h-2v6z"/>
                    </svg>
                </button>
            </div>
            <div id="whatsapp-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 hidden opacity-0 transition-opacity duration-300">
                <div id="whatsapp-modal-content" class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform scale-95 transition-transform duration-300">
                    <h2 class="text-2xl font-bold mb-4 text-green-600">Chatea con CaféClubTV en WhatsApp</h2>
                    <textarea 
                        id="whatsapp-message"
                        placeholder="Escribe tu mensaje aquí..."
                        class="w-full p-2 border border-gray-300 rounded mb-4 h-32 resize-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        aria-label="Mensaje para WhatsApp"
                    ></textarea>
                    <div class="flex justify-end space-x-2">
                        <button id="close-whatsapp-modal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400">Cancelar</button>
                        <button id="send-whatsapp-message" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">Enviar mensaje</button>
                    </div>
                </div>
            </div>
        `;

        const openModalButton = document.getElementById('open-whatsapp-modal');
        const closeModalButton = document.getElementById('close-whatsapp-modal');
        const sendMessageButton = document.getElementById('send-whatsapp-message');
        const modal = document.getElementById('whatsapp-modal');
        const modalContent = document.getElementById('whatsapp-modal-content');
        const messageTextarea = document.getElementById('whatsapp-message');

        function openModal() {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('opacity-100');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);
            messageTextarea.focus();
        }

        function closeModal() {
            modal.classList.remove('opacity-100');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }

        openModalButton.addEventListener('click', openModal);
        closeModalButton.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (!modalContent.contains(e.target)) {
                closeModal();
            }
        });

        sendMessageButton.addEventListener('click', () => {
            const message = messageTextarea.value.trim();
            if (message) {
                const phoneNumber = '+593978606269';
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                messageTextarea.value = '';
                closeModal();
            } else {
                alert('Por favor, escribe un mensaje antes de enviar.');
            }
        });

        // Cerrar modal con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
}