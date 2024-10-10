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
let currentPrize = null;

const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');
const balanceSpan = document.getElementById('balance');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Crear la ruleta
function createWheel() {
    wheel.innerHTML = '';
    const totalDegrees = 360;
    const pieceAngle = totalDegrees / prizes.length;
    prizes.forEach((prize, index) => {
        const slice = document.createElement('div');
        slice.className = 'prize';
        slice.style.transform = `rotate(${index * pieceAngle}deg) skew(${90 - pieceAngle}deg)`;
        slice.style.backgroundColor = prize.color;
        
        const textElement = document.createElement('p');
        textElement.textContent = prize.name;
        textElement.style.transform = `skew(${pieceAngle - 90}deg) rotate(${pieceAngle / 2}deg)`;
        textElement.style.transformOrigin = 'center center';
        textElement.style.textAlign = 'right';
        textElement.style.paddingRight = '20px';
        textElement.style.width = '100%';
        textElement.style.height = '100%';
        textElement.style.display = 'flex';
        textElement.style.alignItems = 'center';
        textElement.style.justifyContent = 'flex-end';
        
        slice.appendChild(textElement);
        wheel.appendChild(slice);
    });
}

// Funciones de la ruleta
function spinWheel() {
    if (spinning) return;
    if (participationMethod === 'direct' && balance < 1) {
        showNotification('Saldo insuficiente. Por favor, agrega fondos.', 'error');
        return;
    }

    spinning = true;
    spinButton.disabled = true;
    resultDiv.textContent = '';
    resultDiv.className = '';

    if (participationMethod === 'direct') {
        balance -= 1;
        updateBalance();
    }

    const spins = Math.floor(5 + Math.random() * 5);
    const degrees = spins * 360 + Math.floor(Math.random() * 360);
    wheel.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
        stopWheel(degrees);
    }, 5000);
}

function stopWheel(degrees) {
    spinning = false;
    spinButton.disabled = false;

    const actualRotation = degrees % 360;
    const prizeIndex = Math.floor(((360 - actualRotation) % 360) / (360 / prizes.length));
    const prize = prizes[prizeIndex];

    if (prize.name === 'Sigue participando') {
        showResult('¡Sigue participando!', 'lose');
    } else {
        showResult(`¡Ganaste ${prize.name}!`,   'win');
        currentPrize = parseInt(prize.name.slice(1));
        
        const claimButton = createButton('Reclamar Premio', claimPrize);
        const doubleButton = createButton('Duplicar', doublePrize);
        
        resultDiv.appendChild(claimButton);
        resultDiv.appendChild(doubleButton);
    }
}

function showResult(message, className) {
    resultDiv.textContent = message;
    resultDiv.className = className + ' fade-in';
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'button fade-in';
    button.onclick = onClick;
    return button;
}

function claimPrize() {
    balance += currentPrize;
    updateBalance();
    currentPrize = null;
    showNotification('¡Premio reclamado!', 'success');
    clearResult();
}

function doublePrize() {
    currentPrize = null;
    clearResult();
    spinWheel();
}

function clearResult() {
    resultDiv.textContent = '';
    resultDiv.className = '';
}

function updateBalance() {
    balanceSpan.textContent = balance;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type} fade-in`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
spinButton.addEventListener('click', spinWheel);

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        participationMethod = tab.dataset.tab;
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${participationMethod}Content`).classList.add('active');
    });
});

// PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '1.00'
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            balance += 1;
            updateBalance();
            showNotification('Transacción completada por ' + details.payer.name.given_name, 'success');
        });
    }
}).render('#paypal-button-container');

// Inicialización
createWheel();
updateBalance();