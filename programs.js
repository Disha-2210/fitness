let totalReps = 3; // Default value
const repTime = 20000; // 20 seconds in milliseconds
const breakTime = 10000; // 10 seconds in milliseconds

let currentRep = 0;
let intervalId;
let isPaused = false;
let isProgramStarted = false;
let completedReps = 0; // Initialize completed reps to 0

function updateCompletedReps() {
  document.getElementById('reps-completed').textContent = `Reps Completed: ${completedReps}`;
}

function updateTimerDisplay(time) {
  document.getElementById('timer').textContent = time.toString();
}

function performRep() {
  if (currentRep < totalReps && !isPaused) {
    currentRep++;
    updateCompletedReps(); // Update reps completed display
    updateTimerDisplay(20);
    playVideoForDuration(repTime);
  }
}

function playVideoForDuration(duration) {
  const video = document.getElementById('animation-video');
  video.play();

  intervalId = setInterval(() => {
    const timer = parseInt(document.getElementById('timer').textContent);
    if (timer > 1 && !isPaused) {
      updateTimerDisplay(timer - 1);
    } else {
      clearInterval(intervalId);
      video.pause();
      displayBreakImage(); // Display the break image
      completedReps++; // Increase completed reps after video finishes playing
      updateCompletedReps(); // Update reps completed display
    }
  }, 1000);
}

function displayBreakImage() {
  const video = document.getElementById('animation-video');
  video.style.display = 'none';
  
  const image = document.getElementById('break-image');
  image.style.display = 'block';
  updateTimerDisplay(10); // Update timer to 5 seconds for break image
  let breakImageTimer = 10;

  const breakImageInterval = setInterval(() => {
    breakImageTimer--;
    updateTimerDisplay(breakImageTimer);

    if (breakImageTimer === 0) {
      clearInterval(breakImageInterval);
      image.style.display = 'none';
      video.style.display = 'block';
      updateTimerDisplay(20); // Update timer to 10 seconds for video
      performRep(); // Continue to the next rep
    }
  }, 1000);
}

document.getElementById('start-button').addEventListener('click', () => {
  if (!isProgramStarted) {
    totalReps = parseInt(prompt('Enter the number of reps:'));
    if (isNaN(totalReps) || totalReps <= 0) {
      alert('Please enter a valid number of reps.');
      return;
    }
    
    isProgramStarted = true;
    document.getElementById('start-button').disabled = true;
    document.getElementById('pause-button').disabled = false;
    document.getElementById('reset-button').disabled = true;

    performRep(); // Start the program
    document.getElementById('reset-button').disabled = false;
  }
});

document.getElementById('pause-button').addEventListener('click', () => {
  if (isProgramStarted) {
    isPaused = !isPaused;
    const video = document.getElementById('animation-video');
    const pauseButton = document.getElementById('pause-button');

    if (isPaused) {
      video.pause();
      clearInterval(intervalId);
      pauseButton.textContent = 'Resume';
    } else {
      video.play();
      intervalId = setInterval(updateTimer, 1000);
      pauseButton.textContent = 'Pause';
    }
  }
});

document.getElementById('reset-button').addEventListener('click', () => {
  if (isProgramStarted) {
    clearInterval(intervalId);
    currentRep = 0;
    isPaused = false;
    isProgramStarted = false;
    document.getElementById('start-button').disabled = false;
    document.getElementById('pause-button').disabled = true;
    document.getElementById('pause-button').textContent = 'Pause';
    document.getElementById('reset-button').disabled = true;

    const video = document.getElementById('animation-video');
    video.pause();
    video.currentTime = 0;
    updateTimerDisplay(20); // Reset timer display
  }
});

// Initialize state
document.getElementById('pause-button').disabled = true;
document.getElementById('reset-button').disabled = true;
updateTimerDisplay(10);