export default function Footer() {
    return `
        <footer>
            <div class="footer-content">
                <div class="footer-section about">
                    <img src="images/logi.svg" alt="Logo de Cafe Club Tv" class="footer-logo">
                    <p>Estamos comprometidos con ofrecerte la mejor experiencia en entretenimiento y servicios en línea.</p>
                </div>
                <div class="footer-section socials">
                    <h3>Conéctate con Nosotros</h3>
                    <div class="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener" class="social-icon" aria-label="Síguenos en Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener" class="social-icon" aria-label="Síguenos en Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/cafeclubtv?igsh=MWoweXVncDAybWczOA==" target="_blank" rel="noopener" class="social-icon" aria-label="Síguenos en Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://youtube.com/@cafeclubtv?si=CU6eFZyXOhqATtbR" target="_blank" rel="noopener" class="social-icon" aria-label="Suscríbete a nuestro canal de YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div class="footer-section map">
                    <h3>Encuéntranos</h3>
                    <div class="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.877027213511!2d-80.12933468429243!3d25.95361138391963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9acefaf2880f9%3A0xd11aa38e4d4d73f0!2sMystic%20Pointe%20Dr%2C%20Aventura%2C%20FL%2033180%2C%20EE.%20UU.!5e0!3m2!1ses!2sar!4v1694503364387!5m2!1ses!2sar"
                            width="100%" 
                            height="300" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            title="Ubicación de Cafe Club Tv">
                        </iframe>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Powered by <a href="https://dualitydomain.github.io/Dualitydomain/" target="_blank" rel="noopener">Duality Domain</a> | &copy; 2024 Todos los derechos reservados.</p>
            </div>
        </footer>
    `;
}