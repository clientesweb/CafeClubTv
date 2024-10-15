const prizes = [
    { name: '$1', color: '#FF69B4' },
    { name: '$5', color: '#FFA500' },
    { name: '$10', color: '#4169E1' },
    { name: '$50', color: '#FFD700' },
    { name: 'Sigue participando', color: '#FF69B4' }
];

let spinning = false;

const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

// Crear la ruleta
function createWheel() {
    wheel.innerHTML = '';
    const totalDegrees = 360;
    const pieceAngle = totalDegrees / prizes.length;

    prizes.forEach((prize, index) => {
        const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const startAngle = index * pieceAngle;
        const endAngle = (index + 1) * pieceAngle;
        const x1 = 50 + 50 * Math.cos(Math.PI * startAngle / 180);
        const y1 = 50 + 50 * Math.sin(Math.PI * startAngle / 180);
        const x2 = 50 + 50 * Math.cos(Math.PI * endAngle / 180);
        const y2 = 50 + 50 * Math.sin(Math.PI * endAngle / 180);
        
        const d = [
            "M", 50, 50,
            "L", x1, y1,
            "A", 50, 50, 0, 0, 1, x2, y2,
            "Z"
        ].join(" ");
        
        slice.setAttribute('d', d);
        slice.setAttribute('fill', prize.color);
        wheel.appendChild(slice);
    });

    const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    center.setAttribute('cx', '50');
    center.setAttribute('cy', '50');
    center.setAttribute('r', '5');
    center.setAttribute('fill', 'white');
    wheel.appendChild(center);
}

function spinWheel() {
    if (spinning) return;

    spinning = true;
    spinButton.disabled = true;
    resultDiv.textContent = '';

    const spins = 5 + Math.random() * 5;
    const degrees = spins * 360 + Math.floor(Math.random() * 360);
    wheel.style.transition = `transform ${spins}s ease`;
    wheel.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
        stopWheel(degrees);
    }, spins * 1000);
}

function stopWheel(degrees) {
    spinning = false;
    spinButton.disabled = false;

    const actualRotation = degrees % 360;
    const prizeIndex = Math.floor(((360 - actualRotation) % 360) / (360  / prizes.length));
    const prize = prizes[prizeIndex];

    resultDiv.textContent = `¡Ganaste ${prize.name}!`;
}

// Inicialización
createWheel();
spinButton.addEventListener('click', spinWheel);