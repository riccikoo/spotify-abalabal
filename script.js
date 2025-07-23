const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const lyricsContainer = document.getElementById("lyrics-container");

let isPlaying = false;

// Lirik: [waktu (detik), "teks"]
const lyrics = [
  [24, "Well, when you go"],
  [29, "Don't ever think I'll make you try to stay"],
  [36, "And maybe when you get back"],
  [40, "I'll be off to find another way"],

  [46, "And after all this time that you still owe"],
  [52, "You're still a good-for-nothing I don't know"],
  [58, "So take your gloves and get out"],
  [62, "Better get out while you can"],

  [67, "When you go"],
  [70, "Would you even turn to say"],
  [74, "I don't love you like I did yesterday"],

  [85, "Sometimes I cry so hard from pleading"],
  [90, "So sick and tired of all the needless beating"],
  [97, "But baby, when they knock you down and out"],
  [102, "It's where you ought to stay"],

  [108, "And after all the blood that you still owe"],
  [113, "Another dollar's just another blow"],
  [120, "So fix your eyes and get up"],
  [124, "Better get up while you can"],

  [129, "Whoa, whoa"],

  [134, "When you go"],
  [138, "Would you even turn to say"],
  [143, "I don't love you like I did yesterday"],

  [153, "Well come on, come on"],
  [158, "When you go"],
  [162, "Would you have the guts to say"],
  [167, "I don't love you like I loved you yesterday"],

  [175, "I don't love you like I loved you yesterday"],
  [183, "I don't love you like I loved you yesterday"]
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
