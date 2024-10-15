const prizes = [
    { name: '$1', color: '#FF69B4' },
    { name: '$1', color: '#4169E1' },
    { name: '$5', color: '#FFA500' },
    { name: '$50', color: '#FFD700' },
    { name: 'Sigue participando', color: '#FF69B4' },
    { name: 'Sigue participando', color: '#4169E1' },
    { name: 'Sigue participando', color: '#FFA500' },
    { name: 'Sigue participando', color: '#FFD700' }
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
    console.log("Generando la ruleta...");  // Depuración
    wheel.innerHTML = '';
    const totalDegrees = 360;
    const pieceAngle = totalDegrees / prizes.length;

    prizes.forEach((prize, index) => {
        console.log(`Añadiendo premio: ${prize.name}`);  // Depuración
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

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const textAngle = startAngle + pieceAngle / 2;
        const textX = 50 + 40 * Math.cos(Math.PI * textAngle / 180);
        const textY = 50 + 40 * Math.sin(Math.PI * textAngle / 180);
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '4');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('transform', `rotate(${textAngle}, ${textX}, ${textY})`);
        text.textContent = prize.name;
        wheel.appendChild(text);
    });

    // Add the purple border
    const border = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    border.setAttribute('cx', '50');
    border.setAttribute('cy', '50');
    border.setAttribute('r', '49');
    border.setAttribute('fill', 'none');
    border.setAttribute('stroke', '#800080');
    border.setAttribute('stroke-width', '2');
    wheel.appendChild(border);

    // Add white dots on the border
    for (let i = 0; i < prizes.length; i++) {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const angle = i * pieceAngle;
        const dotX = 50 + 49 * Math.cos(Math.PI * angle / 180);
        const dotY = 50 + 49 * Math.sin(Math.PI * angle / 180);
        dot.setAttribute('cx', dotX);
        dot.setAttribute('cy', dotY);
        dot.setAttribute('r', '1');
        dot.setAttribute('fill', 'white');
        wheel.appendChild(dot);
    }

    // Add the center purple circle
    const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    center.setAttribute('cx', '50');
    center.setAttribute('cy', '50');
    center.setAttribute('r', '5');
    center.setAttribute('fill', '#800080');
    wheel.appendChild(center);
}

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

    const spins = 5 + Math.random() * 5;
    const degrees = spins * 360 + Math.floor(Math.random() * 360);
    wheel.style.transition = `transform ${spins}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
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

    if (prize.name === 'Sigue participando') {
        showResult('¡Sigue participando!', 'lose');
    } else {
        showResult(`¡Ganaste ${prize.name}!`, 'win');
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