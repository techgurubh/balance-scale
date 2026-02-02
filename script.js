// Initialize sound effects using the relative path from your GitHub structure
const plusSound = new Audio('sounds/plusclick.mp3');
const minusSound = new Audio('sounds/minclick.mp3');

let lW = 0, rW = 0;

// Elements
const lMassDisplay = document.getElementById('l-mass');
const rMassDisplay = document.getElementById('r-mass');
const beam1 = document.getElementById("beam1");
const beam2 = document.getElementById('beam2');
const lH2 = document.getElementById('left-hang2');
const rH2 = document.getElementById('right-hang2');

// Tab Logic
document.getElementById('tab1').addEventListener('click', () => switchScale(1));
document.getElementById('tab2').addEventListener('click', () => switchScale(2));

function switchScale(num) {
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i + 1 === num);
    });
    document.querySelectorAll('.scale-view').forEach((view, i) => {
        view.classList.toggle('active', i + 1 === num);
    });
    updateVisuals();
}

// Weight Logic
document.getElementById('addL').addEventListener('click', () => changeWeight('L', 1));
document.getElementById('subL').addEventListener('click', () => changeWeight('L', -1));
document.getElementById('addR').addEventListener('click', () => changeWeight('R', 1));
document.getElementById('subR').addEventListener('click', () => changeWeight('R', -1));

function changeWeight(side, val) {
    // Play sound based on the action
    if (val > 0) {
        playSound(plusSound);
    } else {
        playSound(minusSound);
    }

    if (side === 'L') lW = Math.max(0, lW + val);
    else rW = Math.max(0, rW + val);
    
    lMassDisplay.innerText = lW;
    rMassDisplay.innerText = rW;
    updateVisuals();
}

// Helper function to handle overlapping clicks
function playSound(audio) {
    audio.currentTime = 0; // Reset to start if already playing
    audio.play().catch(error => console.log("Audio playback failed:", error));
}

function updateVisuals() {
    const diff = rW - lW;
    
    // Simple Scale Rotation
    const angle1 = Math.max(Math.min(diff * 5, 20), -20);
    beam1.style.transform = `rotate(${angle1}deg)`;

    // 3D Scale Rotation
    const angle2 = Math.max(Math.min(diff * 2, 15), -15);
    beam2.style.transform = `rotate(${angle2}deg)`;
    lH2.style.transform = `rotate(${-angle2}deg)`;
    rH2.style.transform = `rotate(${-angle2}deg)`;
}

