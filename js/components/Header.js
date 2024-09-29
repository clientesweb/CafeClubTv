// components/Header.js
class Header {
    constructor() {
        this.element = document.createElement('header');
    }

    render() {
        this.element.innerHTML = `
            <div class="logo">
                <img src="images/logi.svg" alt="Logo de Cafe Club Tv">
            </div>
            <div class="install-container">
                <button id="install-button" class="install-button" style="display: none;">
                    <i class="fas fa-download"></i> Instalar CafeClubTV App
                </button>
            </div>
        `;
        return this.element;
    }

    setupInstallButton() {
        let deferredPrompt;
        const installButton = this.element.querySelector('#install-button');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installButton.style.display = 'block';
        });

        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
            }
            installButton.style.display = 'none';
        });
    }
}