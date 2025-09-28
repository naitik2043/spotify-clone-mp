console.log("Welcome to Spotify Clone");

// --------------------
// 1️⃣ Initialize variables
// --------------------
let songIndex = 0;
let songs = [
  { songName: "Let Me Love You", filePath: "song/Let Me Love You - DJ Snake.mp3", coverPath: "cover1.jpg" },
  { songName: "On & On", filePath: "song/On & On.mp3", coverPath: "cover2.jpg" },
  { songName: "Faded", filePath: "song/Faded.mp3", coverPath: "cover3.jpg" },
  { songName: "Alone", filePath: "song/Alone.mp3", coverPath: "cover4.jpg" },
  { songName: "Reality", filePath: "song/Reality.mp3", coverPath: "cover5.jpg" },
  { songName: "New Beginnings", filePath: "song/New Beginnings.mp3", coverPath: "cover6.jpg" },
  { songName: "Dreams", filePath: "song/Dreams.mp3", coverPath: "cover7.jpg" },
  { songName: "Summer", filePath: "song/Summer.mp3", coverPath: "cover8.jpg" },
  { songName: "Glow", filePath: "song/Glow.mp3", coverPath: "cover9.jpg" },
  { songName: "Infinity", filePath: "song/Infinity.mp3", coverPath: "cover10.jpg" },
  { songName: "Pehla Nasha", filePath: "song/Pehla Nasha.mp3", coverPath: "bollywood1.jpg" },
  { songName: "Hum Toh Deewane Hue", filePath: "song/Hum Toh Deewane Hue.mp3", coverPath: "bollywood2.jpg" },
  { songName: "Dil Ye Bekraar Kyun Hai", filePath: "song/Dil Ye Bekraar Kyun Hai.mp3", coverPath: "bollywood3.jpg" },
  { songName: "Ajab Si", filePath: "song/Ajab Si.mp3", coverPath: "bollywood4.jpg" },
  { songName: "Tum Se Hi", filePath: "song/Tum Se Hi.mp3", coverPath: "bollywood5.jpg" },
  { songName: "Raabta", filePath: "song/Raabta.mp3", coverPath: "bollywood6.jpg" },
  { songName: "Chaar Kadam", filePath: "song/Chaar Kadam.mp3", coverPath: "bollywood7.jpg" },
  { songName: "Dekha Hazaro Dafaa", filePath: "song/Dekha Hazaro Dafaa.mp3", coverPath: "bollywood8.jpg" }
];

let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songInfo = document.querySelector(".songInfo");
let nextBtn = document.querySelector(".fa-forward");
let prevBtn = document.querySelector(".fa-backward");
let playButtons = Array.from(document.getElementsByClassName("fa-play-circle"));
let songItems = Array.from(document.getElementsByClassName("songItem"));
let currentTimeEl = document.getElementById("currentTime");
let totalTimeEl = document.getElementById("totalTime");
let volumeBar = document.getElementById("volumeBar");
let volumeIcon = document.getElementById("volumeIcon");

// --------------------
// 2️⃣ Helper Functions
// --------------------
const formatTime = (sec) => {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const resetAllPlays = () => {
  playButtons.forEach(btn => btn.classList.replace("fa-pause-circle", "fa-play-circle"));
};

const setActiveSong = () => {
  songItems.forEach((item, i) => {
    item.classList.remove("active");
    if (i === songIndex) item.classList.add("active");
  });
};

const updateSongInfo = () => {
  songInfo.innerHTML = `<img src="playing.gif" width="42px"> ${songs[songIndex].songName}`;
};

const playSong = () => {
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
  resetAllPlays();
  if (playButtons[songIndex]) playButtons[songIndex].classList.replace("fa-play-circle", "fa-pause-circle");
  setActiveSong();
  updateSongInfo();
};

// --------------------
// 3️⃣ Master Play/Pause
// --------------------
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    setActiveSong();
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
  }
});

// --------------------
// 4️⃣ Update Progress Bar & Time
// --------------------
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) || 0;
  myProgressBar.value = progress;
  currentTimeEl.textContent = formatTime(audioElement.currentTime);
  totalTimeEl.textContent = formatTime(audioElement.duration) || "0:00";
});

// --------------------
// 5️⃣ Seek functionality
// --------------------
myProgressBar.addEventListener("input", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// --------------------
// 6️⃣ Play from Playlist buttons
// --------------------
playButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    songIndex = i;
    playSong();
  });
});

// --------------------
// 7️⃣ Click on songItem
// --------------------
songItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    songIndex = i;
    playSong();
  });
});

// --------------------
// 8️⃣ Next / Previous
// --------------------
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong();
});
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong();
});

// --------------------
// 9️⃣ Auto next song
// --------------------
audioElement.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong();
});

// --------------------
// 🔊 Volume Control
// --------------------
volumeBar.addEventListener("input", () => {
  audioElement.volume = volumeBar.value / 100;
  if (audioElement.volume === 0) {
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute");
  } else {
    volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
  }
});

// Mute / Unmute
volumeIcon.addEventListener("click", () => {
  if (audioElement.volume > 0) {
    audioElement.volume = 0;
    volumeBar.value = 0;
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute");
  } else {
    audioElement.volume = 1;
    volumeBar.value = 100;
    volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
  }
});
