const songs = [
  {
    title: "I Don't Love You.mp3",
    file: "songs/My Chemical Romance - I Don't Love You.mp3",
  }
];

const songList = document.getElementById("song-list");
const nowPlaying = document.getElementById("now-playing");
const nowTitle = document.getElementById("now-title");
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");

let currentSong = null;
let isPlaying = false;

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    playSong(index);
  });
  songList.appendChild(li);
});

function playSong(index) {
  const song = songs[index];
  audio.src = song.file;
  audio.play();
  currentSong = song;
  nowTitle.textContent = "Now Playing: " + song.title;
  nowPlaying.classList.remove("hidden");
  playPauseBtn.textContent = "Pause";
  isPlaying = true;
}

playPauseBtn.addEventListener("click", () => {
  if (!currentSong) return;
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "Play";
  } else {
    audio.play();
    playPauseBtn.textContent = "Pause";
  }
  isPlaying = !isPlaying;
});
