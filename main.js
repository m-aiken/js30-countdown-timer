let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const alarm = document.querySelector('.alarm');

function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);
  timerDisplay.classList.remove('time-up');
  const now = Date.now(); // In milliseconds
  const then = now + seconds * 1000; // End time
  displayTimeLeft(seconds);
  displayEndTime(then);
  
  countdown = setInterval(() => {
    // / 1000 brings back to seconds
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // Check if we should stop it - stop with clearInterval(IntervalID)
    // IntervalID is identifier of repeated action to cancel
    if (secondsLeft < 0) {
      clearInterval(countdown);
      // Play sound
      alarm.currentTime = 0;
      alarm.play();
      // Add class for animation
      timerDisplay.classList.add('time-up');
      return;
    }
    // Display it
    displayTimeLeft(secondsLeft);
  }, 1000); // Interval set to 1000 milliseconds (1 second)
}

function displayTimeLeft(seconds) {
  let remainderSeconds = seconds;
  const hours = Math.floor(remainderSeconds / 3600);
  remainderSeconds = remainderSeconds % 3600;
  const minutes = Math.floor(remainderSeconds / 60);
  remainderSeconds = remainderSeconds % 60;
  // Display (Add a zero before single digits) 
  const display = `
    ${hours}:
    ${minutes < 10 ? '0' : ''}${minutes}:
    ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  // Also set document title to display time (window tab displays time)
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = 
    `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function timerPresets() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', timerPresets));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
