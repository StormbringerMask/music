const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const nextSongButton = document.getElementById('next-song');
const progressBar = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');

const playlist = [
  { title: "Clair de Lune", artist: "Claude Debussy", src: "https://cdn.glitch.me/aa1c10f1-1ca3-4e5b-87cc-1bcc94173e1a/The%20Evil%20Within%20-%20Clair%20De%20Lune.wav?v=1732850380206" },
  { title: "ETA", artist: "NewJeans", src: "https://cdn.glitch.me/aa1c10f1-1ca3-4e5b-87cc-1bcc94173e1a/ETA.wav?v=1733025187268" },
  { title: "I'll Like You", artist: "ILLIT", src: "https://cdn.glitch.me/aa1c10f1-1ca3-4e5b-87cc-1bcc94173e1a/I%E2%80%99ll%20Like%20You.wav?v=1733097740905" },
];

let currentSongIndex = 0;

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  audio.play();
}

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.innerHTML = '<span>&#10074;&#10074;</span>';
  } else {
    audio.pause();
    playPauseButton.innerHTML = '<span>&#9658;</span>';
  }
});

audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  progressBar.style.setProperty('--progress', `${progress}%`);
  currentTimeElement.textContent = formatTime(currentTime);
  durationElement.textContent = formatTime(duration);
});

progressBar.addEventListener('input', () => {
  const duration = audio.duration;
  audio.currentTime = (progressBar.value / 100) * duration;
});

nextSongButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
});

audio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

loadSong(currentSongIndex);
