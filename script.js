const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const lyricsContainer = document.getElementById("lyrics-container");

let isPlaying = false;

// Lirik: [waktu (detik), "teks"]
const lyrics = [
  [9, "Well, when you go"], // 6 + 3 = 9
  [14, "Don't ever think I'll make you try to stay"], // 11 + 3 = 14
  [21, "And maybe when you get back"], // 18 + 3 = 21
  [25, "I'll be off to find another way"], // 22 + 3 = 25

  [31, "And after all this time that you still owe"], // 28 + 3 = 31
  [37, "You're still a good-for-nothing I don't know"], // 34 + 3 = 37
  [43, "So take your gloves and get out"], // 40 + 3 = 43
  [47, "Better get out while you can"], // 44 + 3 = 47

  [52, "When you go"], // 49 + 3 = 52
  [55, "Would you even turn to say"], // 52 + 3 = 55
  [59, "I don't love you like I did yesterday"], // 56 + 3 = 59

  [70, "Sometimes I cry so hard from pleading"], // 67 + 3 = 70
  [75, "So sick and tired of all the needless beating"], // 72 + 3 = 75
  [82, "But baby, when they knock you down and out"], // 79 + 3 = 82
  [87, "It's where you ought to stay"], // 84 + 3 = 87

  [93, "And after all the blood that you still owe"], // 90 + 3 = 93
  [98, "Another dollar's just another blow"], // 95 + 3 = 98
  [105, "So fix your eyes and get up"], // 102 + 3 = 105
  [109, "Better get up while you can"], // 106 + 3 = 109

  [114, "Whoa, whoa"], // 111 + 3 = 114

  [119, "When you go"], // 116 + 3 = 119
  [123, "Would you even turn to say"], // 120 + 3 = 123
  [128, "I don't love you like I did yesterday"], // 125 + 3 = 128

  [138, "Well come on, come on"], // 135 + 3 = 138
  [143, "When you go"], // 140 + 3 = 143
  [147, "Would you have the guts to say"], // 144 + 3 = 147
  [152, "I don't love you like I loved you yesterday"], // 149 + 3 = 152

  [160, "I don't love you like I loved you yesterday"], // 157 + 3 = 160
  [168, "I don't love you like I loved you yesterday"] // 165 + 3 = 168
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
