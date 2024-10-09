const stripe = Stripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');

const prizes = [
    { name: '$1', color: '#FFB3BA' },
    { name: '$1', color: '#BAFFC9' },
    { name: '$5', color: '#BAE1FF' },
    { name: '$50', color: '#FFFFBA' },
    { name: 'Sigue participando', color: '#FFD9BA' },
    { name: 'Sigue participando', color: '#E0BBE4' },
    { name: 'Sigue participando', color: '#D4F0F0' },
    { name: 'Sigue participando', color: '#FFC6FF' }
];

let spinning = false;
let balance = 0;
let participationMethod = 'views';

const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const stopButton = document.getElementById('stopButton');
const resultDiv = document.getElementById('result');
const balanceSpan = document.getElementById('balance');
const addFundsButton = document.getElementById('addFunds');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Crear la ruleta
prizes.forEach((prize, index) => {
    const slice = document.createElement('div');
    slice.className = 'prize';
    slice.style.transform = `rotate(${index * 45}deg)`;
    slice.style.backgroundColor = prize.color;
    slice.innerHTML = `<span style="transform: rotate(${-index * 45}deg)">${prize.name}</span>`;
    wheel.appendChild(slice);
});

// Funciones de la ruleta
function spinWheel() {
    if (participationMethod === 'direct' && balance < 1) {
        alert('Saldo insuficiente. Por favor, agrega fondos.');
        return;
    }

    spinning = true;
    spinButton.disabled = true;
    stopButton.disabled = false;
    resultDiv.textContent = '';

    if (participationMethod === 'direct') {
        balance -= 1;
        updateBalance();
    }

    const spins = Math.floor(5 + Math.random() * 5);
    const degrees = spins * 360 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
        if (spinning) {
            stopWheel();
        }
    }, 5000);
}

function stopWheel() {
    spinning = false;
    spinButton.disabled = false;
    stopButton.disabled = true;

    const actualRotation = getRotationDegrees(wheel);
    const prizeIndex = Math.floor(((360 - (actualRotation % 360)) % 360) / 45);
    const prize = prizes[prizeIndex];

    resultDiv.textContent = prize.name === 'Sigue participando' 
        ? '¡Sigue participando!' 
        : `¡Ganaste ${prize.name}!`;

    if (prize.name !== 'Sigue participando') {
        const claimButton = document.createElement('button');
        claimButton.textContent = 'Reclamar Premio';
        claimButton.className = 'button';
        claimButton.onclick = () => handlePayment(parseInt(prize.name.slice(1)));
        resultDiv.appendChild(claimButton);
    }
}

function getRotationDegrees(element) {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    return Math.round(Math.atan2(matrix.m12, matrix.m11) * (180/Math.PI));
}

function updateBalance() {
    balanceSpan.textContent = balance;
}

async function handlePayment(amount) {
    try {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
    }
}

// Event Listeners
spinButton.addEventListener('click', spinWheel);
stopButton.addEventListener('click', stopWheel);
addFundsButton.addEventListener('click', () => {
    balance += 1;
    updateBalance();
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        participationMethod = tab.dataset.tab;
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${participationMethod}Content`).classList.add('active');
    });
});

// Inicialización
updateBalance();
