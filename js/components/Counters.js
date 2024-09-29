export default function Counters() {
    return `
        <div class="counters-container">
            <div class="counter">
                <i class="fas fa-eye counter-icon"></i>
                <div class="counter-number" data-type="visitas">4870</div>
                <div class="counter-label">Visitas</div>
            </div>
            <div class="counter">
                <i class="fas fa-download counter-icon"></i>
                <div class="counter-number" data-type="descargas">110</div>
                <div class="counter-label">Descargas</div>
            </div>
            <div class="counter">
                <i class="fas fa-comments counter-icon"></i>
                <div class="counter-number" data-type="interacciones">2340</div>
                <div class="counter-label">Interacciones</div>
            </div>
        </div>
    `;
}

Counters.init = () => {
    const counters = document.querySelectorAll('.counter-number');

    let baseVisitas = 4870;
    let baseDescargas = 110;
    let baseInteracciones = 2340;

    function updateCountersByTime() {
        const now = new Date().getTime();

        const newVisitas = baseVisitas + Math.floor((now / 100000) % 250);
        const newDescargas = baseDescargas + Math.floor((now / 100000) % 25);
        const newInteracciones = baseInteracciones + Math.floor((now / 100000) % 150);

        counters.forEach(counter => {
            const type = counter.getAttribute('data-type');

            let newValue;
            if (type === 'visitas') newValue = newVisitas;
            if (type === 'descargas') newValue = newDescargas;
            if (type === 'interacciones') newValue = newInteracciones;

            counter.setAttribute('data-count', newValue);
            animateCounter(counter);
        });
    }

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-count');
        let count = +counter.innerText;
        const increment = Math.ceil((target - count) / 400);

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = count;
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    }

    updateCountersByTime();
    setInterval(updateCountersByTime, 900000);
};