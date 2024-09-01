let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const hand = document.getElementById('hand');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
        updateDial(elapsedTime);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    laps.innerHTML = '';
    hand.style.transform = 'rotate(0deg)';
}

function updateDial(time) {
    const milliseconds = time % 60000; // 60,000ms = 1 minute
    const rotation = (milliseconds / 60000) * 360; // Calculate rotation in degrees
    hand.style.transform = `rotate(${rotation}deg)`;
}

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.textContent === 'Start') {
        startTimer();
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;
    } else {
        stopTimer();
        startStopBtn.textContent = 'Start';
    }
});

resetBtn.addEventListener('click', resetTimer);

lapBtn.addEventListener('click', () => {
    const lapTime = document.createElement('div');
    lapTime.textContent = formatTime(elapsedTime);
    lapTime.className = 'lap-time';
    laps.appendChild(lapTime);
});
