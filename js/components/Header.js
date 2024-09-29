export default function Header() {
    return `
        <header>
            <div class="logo">
                <img src="images/logi.svg" alt="Logo de Cafe Club Tv">
            </div>
            <div class="install-container">
                <button id="install-button" class="install-button" style="display: none;">
                    <i class="fas fa-download"></i> Instalar CafeClubTV App
                </button>
            </div>
        </header>
    `;
}

// Lógica para el botón de instalación
document.addEventListener('DOMContentLoaded', () => {
    let deferredPrompt;
    const installButton = document.getElementById('install-button');

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

    // Verifica si la app ya está instalada
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;

    // Verifica si se accede desde Instagram
    const isInstagram = /Instagram/.test(navigator.userAgent);

    // Muestra el botón si no está instalada y se accede desde Instagram
    if (!isInstalled || isInstagram) {
        installButton.style.display = 'block';
    }
});