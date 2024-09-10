let startTime;
let elapsedTime = 0;
let timerInterval;

document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('stop-button').addEventListener('click', stopTimer);

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTime() {
    elapsedTime = new Date().getTime() - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor(elapsedTime % 1000);
    const centiseconds = Math.floor(milliseconds / 10); // Calculate centiseconds

    document.getElementById('time-display').innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}