export default function Counters() {
    const counters = document.getElementById('counters');
    
    // Inicialización de los contadores
    let counts = {
        visitas: 7592,
        descargas: 143,
        interacciones: 4342
    };

    // Función para animar el conteo
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            element.textContent = currentCount.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Función para actualizar los contadores en el DOM
    function updateCounters() {
        counters.innerHTML = `
            <section class="my-12 bg-gradient-to-br from-red-800 to-gray-900 p-6 rounded-lg shadow-lg text-white">
                <h2 class="text-2xl font-bold mb-6 text-center">Estadísticas de CafeClubTV</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${Object.entries(counts).map(([key, value]) => `
                        <div class="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
                            <i class="fas fa-${key === 'visitas' ? 'eye' : key === 'descargas' ? 'download' : 'comments'} text-4xl text-red-400 mb-4"></i>
                            <div class="text-3xl font-bold mb-2" data-count="${key}">${value.toLocaleString()}</div>
                            <div class="text-sm text-gray-300 capitalize">${key}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;

        // Animar los contadores
        Object.entries(counts).forEach(([key, value]) => {
            const element = document.querySelector(`[data-count="${key}"]`);
            animateCount(element, 0, value, 2000);
        });
    }

    // Llamada inicial para mostrar los contadores
    updateCounters();

    // Función para actualizar los contadores con animación
    function updateCountersWithAnimation() {
        const newCounts = {
            visitas: counts.visitas + Math.floor(Math.random() * 3),
            descargas: counts.descargas + Math.floor(Math.random() * 2),
            interacciones: counts.interacciones + Math.floor(Math.random() * 5)
        };

        Object.entries(newCounts).forEach(([key, newValue]) => {
            const element = document.querySelector(`[data-count="${key}"]`);
            const oldValue = counts[key];
            animateCount(element, oldValue, newValue, 1000);
        });

        counts = newCounts;
    }

    // Intervalo para actualizar los contadores cada 5 segundos
    setInterval(updateCountersWithAnimation, 5000);

    // Observador de intersección para animar los contadores cuando estén visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counters);
}