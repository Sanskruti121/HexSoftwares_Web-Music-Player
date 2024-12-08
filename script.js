const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const trackNameElem = document.getElementById('track-name');
const trackArtistElem = document.getElementById('track-artist');
const currentTrackElem = document.getElementById('current-track');
const totalTracksElem = document.getElementById('total-tracks');


const tracks = [
    { name: 'Lag Ja Gale', artist: 'Lata Mangeshkar', src: 'Lag Ja Gale Se Phir.mp3', cover: 'ljg.jpg', duration: '3:45' },
    { name: 'Kadallale', artist: 'Aishwarya Ravichandran', src: 'kadalalle.mp3', cover: 'kad.jpg', duration: '4:20' },
    { name: 'Chaleya', artist: 'Arjit Singh', src: 'Chaleya.mp3', cover: 'chaleya.jpg', duration: '5:10' },
    { name: 'Sooseki', artist: 'Shreya Ghoshal', src: 'Sooseki.mp3', cover: 'soo.jpg', duration: '2:30' },
  ];
  

let currentTrack = 0;
let isPlaying = false;
const audio = new Audio(tracks[currentTrack].src);

const loadTrack = (index) => {
  const track = tracks[index];
  audio.src = track.src;
  trackNameElem.textContent = track.name;
  trackArtistElem.textContent = track.artist;
  document.querySelector('.cover img').src = track.cover;
  currentTrackElem.textContent = index + 1;
};

const playPause = () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶';
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
};

const nextTrack = () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
};

const prevTrack = () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
};

audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const duration = audio.duration || 0;
  progressBar.value = (current / duration) * 100 || 0;

  currentTimeElem.textContent = formatTime(current);
  durationElem.textContent = formatTime(duration);
});

progressBar.addEventListener('input', (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

volumeBar.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
};

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

loadTrack(currentTrack);
totalTracksElem.textContent = tracks.length;

const songListElem = document.getElementById('song-list');


const populateSongList = () => {
  tracks.forEach((track, index) => {
    const songItem = document.createElement('li');
    songItem.classList.add('song-item');
    songItem.setAttribute('data-index', index); 

    songItem.innerHTML = `
      <img src="${track.cover}" alt="${track.name}" class="song-cover">
      <div class="song-details">
        <span class="song-title">${track.name}</span>
        <span class="song-artist">${track.artist}</span>
      </div>
      <span class="song-duration">${track.duration}</span>
    `;

    songListElem.appendChild(songItem);
  });
};

songListElem.addEventListener('click', (e) => {
  const songItem = e.target.closest('.song-item');
  if (songItem) {
    const index = parseInt(songItem.dataset.index); 
    currentTrack = index;
    loadTrack(currentTrack); 
    if (isPlaying) audio.play(); 
  }
});

populateSongList();



