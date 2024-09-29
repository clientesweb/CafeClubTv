class Counters extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.baseVisitas = 4870;
        this.baseDescargas = 110;
        this.baseInteracciones = 2340;
    }

    connectedCallback() {
        this.render();
        this.updateCountersByTime();
        setInterval(() => this.updateCountersByTime(), 900000);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/components/Counters.css">
            <div class="counters-container">
                <div class="counter">
                    <i class="fas fa-eye counter-icon"></i>
                    <span class="counter-number" data-type="visitas">0</span>
                    <span class="counter-label">Visitas</span>
                </div>
                <div class="counter">
                    <i class="fas fa-download counter-icon"></i>
                    <span class="counter-number" data-type="descargas">0</span>
                    <span class="counter-label">Descargas</span>
                </div>
                <div class="counter">
                    <i class="fas fa-comments counter-icon"></i>
                    <span class="counter-number" data-type="interacciones">0</span>
                    <span class="counter-label">Interacciones</span>
                </div>
            </div>
        `;
    }

    updateCountersByTime() {
        const now = new Date().getTime();
        const newVisitas = this.baseVisitas + Math.floor((now / 100000) % 250);
        const newDescargas = this.baseDescargas + Math.floor((now / 100000) % 25);
        const newInteracciones = this.baseInteracciones + Math.floor((now / 100000) % 150);

        const counters = this.shadowRoot.querySelectorAll('.counter-number');
        counters.forEach(counter => {
            const type = counter.getAttribute('data-type');
            let newValue;
            if (type === 'visitas') newValue = newVisitas;
            if (type === 'descargas') newValue = newDescargas;
            if (type === 'interacciones') newValue = newInteracciones;

            counter.setAttribute('data-count', newValue);
            this.animateCounter(counter);
        });
    }

    animateCounter(counter) {
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
}

customElements.define('counters-component', Counters);
