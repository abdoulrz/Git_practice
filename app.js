const timer = document.querySelector('.timer');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const workDurationInput = document.querySelector('#work-duration');
const breakDurationInput = document.querySelector('#break-duration');
const longBreakDurationInput = document.querySelector('#long-break-duration');
const sessionsInput = document.querySelector('#sessions');
const sound = new Audio('tick-tock.mp3');

let interval;
let isPaused = true;
let isBreak = false;
let isLongBreak = false;
let time = 0;
let currentSession = 0;
let totalSessions = sessionsInput.value;

function startTimer() {
  isPaused = false;
  interval = setInterval(() => {
    time--;
    displayTime();
    if (time === 0) {
      clearInterval(interval);
      sound.play();
      if (isBreak) {
        if (currentSession < totalSessions) {
          startTimerWithDuration(workDurationInput.value * 60);
          isBreak = false;
          currentSession++;
        } else {
          startTimerWithDuration(longBreakDurationInput.value * 60);
          isLongBreak = true;
          isBreak = false;
          currentSession = 0;
        }
      } else {
        startTimerWithDuration(breakDurationInput.value * 60);
        isBreak = true;
      }
    }
  }, 1000);
}

function startTimerWithDuration(duration) {
  time = duration;
  displayTime();
  startTimer();
}

function displayTime() {
  minutes.textContent = Math.floor(time / 60).toString().padStart(2, '0');
  seconds.textContent = (time % 60).toString().padStart(2, '0');
}

function pauseTimer() {
  isPaused = true;
  clearInterval(interval);
}

function resetTimer() {
  isPaused = true;
  isBreak = false;
  isLongBreak = false;
  currentSession = 0;
  totalSessions = sessionsInput.value;
  clearInterval(interval);
  time = workDurationInput.value * 60;
  displayTime();
}

startBtn.addEventListener('click', () => {
  if (isPaused) {
    if (isLongBreak) {
      time = longBreakDurationInput.value * 60;
    } else {
      time = workDurationInput.value * 60;
    }
    displayTime();
    startTimer();
  }
});

pauseBtn.addEventListener('click', pauseTimer);

resetBtn.addEventListener('click', resetTimer);

workDurationInput.addEventListener('change', () => {
  resetTimer();
});

breakDurationInput.addEventListener('change', () => {
  resetTimer();
});

longBreakDurationInput.addEventListener('change', () => {
  resetTimer();
});

sessionsInput.addEventListener('change', () => {
  resetTimer();
});
