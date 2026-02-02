// Sound initialization
const plusSound = new Audio('sounds/plusclick.mp3');
const minusSound = new Audio('sounds/minclick.mp3');

let lW = 0, rW = 0;

// Update labels and beam rotation
function updateVisuals() {
    const diff = rW - lW;
    
    // Scale 1 (Simple)
    const angle1 = Math.max(Math.min(diff * 5, 20), -20);
    document.getElementById("beam1").style.transform = `rotate(${angle1}deg)`;

    // Scale 2 (3D)
    const angle2 = Math.max(Math.min(diff * 2, 15), -15);
    const beam2 = document.getElementById('beam2');
    const lH2 = document.getElementById('left-hang2');
    const rH2 = document.getElementById('right-hang2');
    
    beam2.style.transform = `rotate(${angle2}deg)`;
    lH2.style.transform = `rotate(${-angle2}deg)`;
    rH2.style.transform = `rotate(${-angle2}deg)`;
}

// Logic for weight buttons
function changeWeight(side, val) {
    // Play sound
    const audio = val > 0 ? plusSound : minusSound;
    audio.currentTime = 0;
    audio.play().catch(() => {});

    if (side === 'L') lW = Math.max(0, lW + val);
    else rW = Math.max(0, rW + val);
    
    document.getElementById('l-mass').innerText = lW;
    document.getElementById('r-mass').innerText = rW;
    updateVisuals();
}

// Tab Switching
function switchScale(num) {
    document.querySelectorAll('.tab-btn').forEach((btn, i) => btn.classList.toggle('active', i + 1 === num));
    document.querySelectorAll('.scale-view').forEach((view, i) => view.classList.toggle('active', i + 1 === num));
    updateVisuals();
}

// Listeners
document.getElementById('addL').addEventListener('click', () => changeWeight('L', 1));
document.getElementById('subL').addEventListener('click', () => changeWeight('L', -1));
document.getElementById('addR').addEventListener('click', () => changeWeight('R', 1));
document.getElementById('subR').addEventListener('click', () => changeWeight('R', -1));
document.getElementById('tab1').addEventListener('click', () => switchScale(1));
document.getElementById('tab2').addEventListener('click', () => switchScale(2));
