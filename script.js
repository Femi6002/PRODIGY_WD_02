let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let isRunning = false;
let intervalId = null;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const centisecondsElement = document.getElementById('centiseconds')
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapbutton = document.getElementById('lap-button');
const lapTimesList = document.getElementById('lap-times');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapbutton.addEventListener('click', addLapTime)

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        intervalId = setInterval(updateStopwatch, 10);
        isRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        const currentTimeElapsed = new Date().getTime() - startTime;
        startTime = startTime + currentTimeElapsed; // update startTim
        clearInterval(intervalId);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetStopwatch() {
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    isRunning = false;
    clearInterval(intervalId);
    startButton.disabled = false;
    pauseButton.disabled = true;
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    centisecondsElement.textContent = '00';
    lapTimesList.innerHTML = '';
}

function updateStopwatch() {
    currentTime = new Date().getTime() - startTime;
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor(currentTime % 1000);
    const centiseconds = Math.floor(milliseconds / 10);
    hoursElement.textContent = padTime(hours);
    minutesElement.textContent = padTime(minutes);
    secondsElement.textContent = padTime(seconds);
    centisecondsElement.textContent = padTime(centiseconds);
}

function padTime(time) {
    return (time < 10 ? '0' : '') + time;
}

function addLapTime() {
    const lapTime = `${padTime(hoursElement.textContent)}:${padTime(minutesElement.textContent)}:${padTime(secondsElement.textContent)}:${padTime(centisecondsElement.textContent)}`;
    lapTimes.push(lapTime);
    const lapTimeListItem = document.createElement('li');
    lapTimeListItem.textContent = lapTime;
    lapTimesList.appendChild(lapTimeListItem);
}