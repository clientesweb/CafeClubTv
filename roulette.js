document.addEventListener('DOMContentLoaded', function() {
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
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const resultDiv = document.getElementById('result');

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

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            const textAngle = startAngle + pieceAngle / 2;
            const textX = 50 + 40 * Math.cos(Math.PI * textAngle / 180);
            const textY = 50 + 40 * Math.sin(Math.PI * textAngle / 180);
            text.setAttribute('x', textX);
            text.setAttribute('y', textY);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'white');
            text.setAttribute('font-size', '4');
            text.setAttribute('transform', `rotate(${textAngle}, ${textX}, ${textY})`);
            text.textContent = prize.name;
            wheel.appendChild(text);
        });
    }

    function spinWheel() {
        if (spinning) return;
        spinning = true;
        spinButton.disabled = true;
        resultDiv.textContent = '';
        resultDiv.className = '';

        const spins = 5 + Math.random() * 5;
        const degrees = spins * 360 + Math.floor(Math.random() * 360);
        wheel.style.transition = `transform ${spins}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
        wheel.style.transform = `rotate(${degrees}deg)`;

        setTimeout(() => {
            stopWheel(degrees);
        }, spins * 1000);
    }

    function stopWh