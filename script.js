const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const lyricsContainer = document.getElementById("lyrics-container");

let isPlaying = false;

// Lirik: [waktu (detik), "teks"]
const lyrics = [
  { time: 6, text: "Well, when you go" },
  { time: 11, text: "Don't ever think I'll make you try to stay" },
  { time: 18, text: "And maybe when you get back" },
  { time: 22, text: "I'll be off to find another way" },

  { time: 28, text: "And after all this time that you still owe" },
  { time: 34, text: "You're still a good-for-nothing I don't know" },
  { time: 40, text: "So take your gloves and get out" },
  { time: 44, text: "Better get out while you can" },

  { time: 49, text: "When you go" },
  { time: 52, text: "Would you even turn to say" },
  { time: 56, text: "I don't love you like I did yesterday" },

  { time: 67, text: "Sometimes I cry so hard from pleading" },
  { time: 72, text: "So sick and tired of all the needless beating" },
  { time: 79, text: "But baby, when they knock you down and out" },
  { time: 84, text: "It's where you ought to stay" },

  { time: 90, text: "And after all the blood that you still owe" },
  { time: 95, text: "Another dollar's just another blow" },
  { time: 102, text: "So fix your eyes and get up" },
  { time: 106, text: "Better get up while you can" },

  { time: 111, text: "Whoa, whoa" },

  { time: 116, text: "When you go" },
  { time: 120, text: "Would you even turn to say" },
  { time: 125, text: "I don't love you like I did yesterday" },

  { time: 135, text: "Well come on, come on" },
  { time: 140, text: "When you go" },
  { time: 144, text: "Would you have the guts to say" },
  { time: 149, text: "I don't love you like I loved you yesterday" },

  { time: 157, text: "I don't love you like I loved you yesterday" },
  { time: 165, text: "I don't love you like I loved you yesterday" }
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
