const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = '<span>&#10074;&#10074;</span>'; // Pause icon
  } else {
    audio.pause();
    playPauseButton.innerHTML = '<span>&#9658;</span>'; // Play icon
  }
});

audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progressBar.value = (currentTime / duration) * 100;
  currentTimeElement.textContent = formatTime(currentTime);
  durationElement.textContent = formatTime(duration);
});

progressBar.addEventListener('input', () => {
  const duration = audio.duration;
  audio.currentTime = (progressBar.value / 100) * duration;
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

audio.addEventListener('loadedmetadata', () => {
  durationElement.textContent = formatTime(audio.duration);
});

audio.addEventListener('error', (e) => {
  console.error('Error loading audio:', e);
});
