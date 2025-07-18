const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const lyricsContainer = document.getElementById("lyrics-container");

let isPlaying = false;

// Lirik: [waktu (detik), "teks"]
const lyrics = [
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
  [75, "Sometimes I cry so hard from pleading"],
  [80, "So sick and tired of all the needless beating"],
  [85, "But baby when they knock you down and out"],
  [89, "It's where you oughta stay"],
  [95, "And after all the blood that you still owe"],
  [100, "Another dollar's just another blow"],
  [105, "So fix your eyes and get up"],
  [110, "Better get up while you can"],
  [120, "When you go, would you even turn to say"],
  [125, "I don't love you like I did yesterday"],
];

// Render lirik ke dalam container
lyrics.forEach(([time, text], index) => {
  const line = document.createElement("div");
  line.classList.add("lyrics-line");
  line.dataset.time = time;
  line.textContent = text;
  lyricsContainer.appendChild(line);
});

// Mainkan atau pause lagu
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

// Update progress bar dan lirik aktif
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  // Progress bar
  progressBar.value = (currentTime / duration) * 100;

  // Highlight lirik
  const lines = document.querySelectorAll(".lyrics-line");
  let currentIndex = lyrics.findIndex(([time], i) =>
    i === lyrics.length - 1 || (currentTime >= time && currentTime < lyrics[i + 1][0])
  );

  lines.forEach((line, index) => {
    line.classList.toggle("active", index === currentIndex);
    if (index === currentIndex) {
      line.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

// Seek dari progress bar
progressBar.addEventListener("input", () => {
  const percent = progressBar.value;
  audio.currentTime = (percent / 100) * audio.duration;
});
