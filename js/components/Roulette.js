// js/components/Roulette.js
class Roulette extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.prizes = [
            { label: '$1', probability: 0.2, value: 1 },
            { label: '$5', probability: 0.1, value: 5 },
            { label: '$50', probability: 0.05, value: 50 },
            { label: 'Intenta de nuevo', probability: 0.65, value: 0 }
        ];
        this.segments = 12; // Número total de segmentos en la ruleta
        this.isRigged = false; // Controla si la ruleta está arreglada para no ganar
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const style = document.createElement('style');
        style.textContent = `
            @import url('css/components/Roulette.css');
        `;

        this.shadowRoot.innerHTML = `
            <div class="roulette-container">
                <div class="roulette-wheel">
                    ${this.createSegments()}
                </div>
                <div class="roulette-arrow"></div>
                <button id="spin-button">Girar</button>
                <div id="result"></div>
            </div>
        `;
        this.shadowRoot.appendChild(style);
    }

    createSegments() {
        let segmentsHTML = '';
        for (let i = 0; i < this.segments; i++) {
            const prize = this.prizes[i % this.prizes.length];
            segmentsHTML += `
                <div class="roulette-segment" style="--i:${i};">
                    <span>${prize.label}</span>
                </div>
            `;
        }
        return segmentsHTML;
    }

    setupEventListeners() {
        const spinButton = this.shadowRoot.getElementById('spin-button');
        spinButton.addEventListener('click', () => this.spin());
    }

    spin() {
        const wheel = this.shadowRoot.querySelector('.roulette-wheel');
        const result = this.shadowRoot.getElementById('result');
        const spinButton = this.shadowRoot.getElementById('spin-button');

        spinButton.disabled = true;
        result.textContent = '';

        let prize;
        if (this.isRigged) {
            prize = this.prizes.find(p => p.value === 0);
        } else {
            prize = this.getRandomPrize();
        }

        const segmentAngle = 360 / this.segments;
        const prizeIndex = this.prizes.indexOf(prize);
        const rotations = 5; // Número de rotaciones completas
        const extraAngle = Math.floor(Math.random() * segmentAngle);
        const totalAngle = rotations * 360 + prizeIndex * segmentAngle + extraAngle;

        wheel.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        wheel.style.transform = `rotate(${totalAngle}deg)`;

        setTimeout(() => {
            result.textContent = `¡${prize.value > 0 ? 'Ganaste' : 'No ganaste'}! ${prize.label}`;
            spinButton.disabled = false;
        }, 5000);
    }

    getRandomPrize() {
        const random = Math.random();
        let cumulativeProbability = 0;
        for (const prize of this.prizes) {
            cumulativeProbability += prize.probability;
            if (random < cumulativeProbability) {
                return prize;
            }
        }
        return this.prizes[this.prizes.length - 1];
    }

    // Método público para controlar si la ruleta está arreglada
    setRigged(rigged) {
        this.isRigged = rigged;
    }
}

customElements.define('roulette-component', Roulette);
