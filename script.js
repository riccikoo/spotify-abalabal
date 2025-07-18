const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const lyricsEl = document.getElementById("lyrics");

let isPlaying = false;

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

// Kosongkan lirik
const lyrics = `Well, when you go
Don't ever think I'll make you try to stay
And maybe when you get back
I'll be off to find another way
And after all this time that you still owe
You're still a good-for-nothing, I don't know
So take your gloves and get out
Better get out while you can
When you go, and would you even turn to say
"I don't love you like I did yesterday"?
Sometimes I cry so hard from pleading
So sick and tired of all the needless beating
But baby, when they knock you down and out
Is where you oughta stay
And after all the blood that you still owe
Another dollar's just another blow
So fix your eyes and get up
Better get up while you can
Whoa, whoa, whoa-whoa, whoa-whoa
When you go, and would you even turn to say
"I don't love you like I did yesterday"?
Well, come on, come on
When you go, would you have the guts to say
"I don't love you like I loved you yesterday"?
I don't love you like I loved you yesterday
I don't love you like I loved you yesterday`;
lyricsEl.textContent = lyrics;
