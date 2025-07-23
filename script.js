const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const lyricsContainer = document.getElementById("lyrics-container");

let isPlaying = false;

// Lirik: [waktu (detik), "teks"]
const lyrics = [
  [27, "Well, when you go"],
  [32, "Don't ever think I'll make you try to stay"],
  [39, "And maybe when you get back"],
  [43, "I'll be off to find another way"],

  [49, "And after all this time that you still owe"],
  [55, "You're still a good-for-nothing I don't know"],
  [61, "So take your gloves and get out"],
  [65, "Better get out while you can"],

  [70, "When you go"],
  [73, "Would you even turn to say"],
  [77, "I don't love you like I did yesterday"],

  [88, "Sometimes I cry so hard from pleading"],
  [93, "So sick and tired of all the needless beating"],
  [100, "But baby, when they knock you down and out"],
  [105, "It's where you ought to stay"],

  [111, "And after all the blood that you still owe"],
  [116, "Another dollar's just another blow"],
  [123, "So fix your eyes and get up"],
  [127, "Better get up while you can"],

  [132, "Whoa, whoa"],

  [137, "When you go"],
  [141, "Would you even turn to say"],
  [146, "I don't love you like I did yesterday"],

  [156, "Well come on, come on"],
  [161, "When you go"],
  [165, "Would you have the guts to say"],
  [170, "I don't love you like I loved you yesterday"],

  [178, "I don't love you like I loved you yesterday"],
  [186, "I don't love you like I loved you yesterday"]
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
