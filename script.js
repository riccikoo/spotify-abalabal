const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const lyricsEl = document.getElementById("lyrics");

let isPlaying = false;

// Lirik sinkron: [waktu_detik, 'lirik']
const syncedLyrics = [
  [5, "Well, when you go"],
  [10, "Don't ever think I'll make you try to stay"],
  [15, "And maybe when you get back"],
  [18, "I'll be off to find another way"],
  [25, "And after all this time that you still owe"],
  [30, "You're still the good-for-nothing I don't know"],
  [35, "So take your gloves and get out"],
  [39, "Better get out while you can"],
  [45, "When you go, would you even turn to say"],
  [50, "I don't love you like I did yesterday"],
  [60, "(pause instrumental...)"],
  [75, "Sometimes I cry so hard from pleading"],
  [80, "So sick and tired of all the needless beating"],
  [85, "But baby when they knock you down and out"],
  [89, "It's where you oughta stay"],
  [95, "And after all the blood that you still owe"],
  [100, "Another dollar's just another blow"],
  [105, "So fix your eyes and get up"],
  [110, "Better get up while you can"],
  [115, "Whoa-oh-oh..."],
  [120, "When you go, would you even turn to say"],
  [125, "I don't love you like I did yesterday"],
];

let currentLyricIndex = 0;

// Play/pause
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "Play";
  } else {
    audio.play();
    playPauseBtn.textContent = "Pause";
  }
  isPlaying = !isPlaying;
});

// Update progress bar dan lirik
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  // Update progress bar
  progressBar.value = (currentTime / duration) * 100;

  // Update lirik
  if (
    currentLyricIndex < syncedLyrics.length &&
    currentTime >= syncedLyrics[currentLyricIndex][0]
  ) {
    const line = syncedLyrics[currentLyricIndex][1];
    lyricsEl.textContent += line + "\n";
    currentLyricIndex++;
    lyricsEl.scrollTop = lyricsEl.scrollHeight;
  }
});

// Klik pada progress bar untuk seek
progressBar.addEventListener("input", () => {
  const percent = progressBar.value;
  audio.currentTime = (percent / 100) * audio.duration;

  // Reset lirik dan index
  lyricsEl.textContent = "";
  currentLyricIndex = 0;
});
