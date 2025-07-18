const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress-bar");
const lyricsContainer = document.getElementById("lyrics-container");

let isPlaying = false;

// Lirik: [waktu (detik), "teks"]
const lyrics = [
  [6,"Well, when you go" ],
  [11,"Don't ever think I'll make you try to stay" ],
  [18,"And maybe when you get back" ],
  [22,"I'll be off to find another way" ],

  [28,"And after all this time that you still owe" ],
  [34,"You're still a good-for-nothing I don't know" ],
  [40,"So take your gloves and get out" ],
  [44,"Better get out while you can" ],

  [49,"When you go" ],
  [52,"Would you even turn to say" ],
  [56,"I don't love you like I did yesterday" ],

  [67,"Sometimes I cry so hard from pleading" ],
  [72,"So sick and tired of all the needless beating" ],
  [79,"But baby, when they knock you down and out" ],
  [84,"It's where you ought to stay" ],

  [90,"And after all the blood that you still owe" ],
  [95,"Another dollar's just another blow" ],
  [102,"So fix your eyes and get up" ],
  [106,"Better get up while you can" ],

  [111,"Whoa, whoa" ],

  [116,"When you go" ],
  [120,"Would you even turn to say" ],
  [125,"I don't love you like I did yesterday" ],

  [135,"Well come on, come on" ],
  [140,"When you go" ],
  [144,"Would you have the guts to say" ],
  [149,"I don't love you like I loved you yesterday" ],

  [157,"I don't love you like I loved you yesterday" ],
  [165,"I don't love you like I loved you yesterday" ]
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
