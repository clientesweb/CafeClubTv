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
        this.segments = 12;
        this.isRigged = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const style = document.createElement('style');
        style.textContent = `
            .roulette-container {
                width: 300px;
                height: 300px;
                position: relative;
                margin: 0 auto;
            }
            .roulette-wheel {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #f0f0f0;
                position: relative;
                overflow: hidden;
                transition: transform 5s cubic-bezier(0.25, 0.1, 0.25, 1);
            }
            .roulette-segment {
                position: absolute;
                width: 50%;
                height: 50%;
                transform-origin: bottom right;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                color: white;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }
            .roulette-segment:nth-child(odd) {
                background: #ff6b6b;
            }
            .roulette-segment:nth-child(even) {
                background: #4ecdc4;
            }
            .roulette-arrow {
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 20px solid #333;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10;
            }
            #spin-button {
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 16px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            #spin-button:disabled {
                background-color: #cccccc;
                cursor: not-allowed;
            }
            #result {
                margin-top: 20px;
                font-size: 18px;
                font-weight: bold;
            }
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
        return this.prizes.map((prize, index) => `
            <div class="roulette-segment" style="transform: rotate(${index * (360 / this.prizes.length)}deg) skew(${90 - (360 / this.prizes.length)}deg);">
                <span style="transform: skew(${-90 + (360 / this.prizes.length)}deg) rotate(${(360 / this.prizes.length) / 2}deg);">${prize.label}</span>
            </div>
        `).join('');
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

        const prize = this.isRigged ? this.prizes.find(p => p.value === 0) : this.getRandomPrize();

        const prizeIndex = this.prizes.indexOf(prize);
        const rotations = 5;
        const segmentAngle = 360 / this.prizes.length;
        const extraAngle = Math.floor(Math.random() * segmentAngle);
        const totalAngle = rotations * 360 + prizeIndex * segmentAngle + extraAngle;

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

    setRigged(rigged) {
        this.isRigged = rigged;
    }
}

customElements.define('roulette-component', Roulette);

export default function(element) {
    if (!element) {
        console.error('Element not found for Roulette component');
        return;
    }
    const roulette = document.createElement('roulette-component');
    element.appendChild(roulette);
}