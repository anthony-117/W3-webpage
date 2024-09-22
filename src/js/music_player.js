let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
const music_list = JSON.parse(`
[
  {
    "img": "مقدمة مسرحية صيف mp3.840",
    "name": "مقدمة مسرحية صيف",
    "artist": "Unknown",
    "music": "../../public/music/مقدمة مسرحية صيف 840.mp3"
  },
  {
    "img": "باسم العامية - مسرحية صيف 840.mp3",
    "name": "باسم العامية",
    "artist": "Unknown",
    "music": "../../public/music/بإسم العامية - مسرحية صيف 840.mp3"
  },
  {
    "img": "يا ما الله صار وصار - مسرحية صيف 840.mp3",
    "name": "يا حيا الله صار وصار",
    "artist": "Unknown",
    "music": "../../public/music/يا حيا الله صار وصار - مسرحية صيف 840.mp3"
  },
  {
    "img": "وقفت الثورة - هدى حداد - مسرحية صيف 840.mp3",
    "name": "يا ام الياس مافيي احكي قدام الناس",
    "artist": "هدى حداد",
    "music": "../../public/music/يا ام الياس مافيي احكي قدام الناس - مسرحية صيف 840.mp3"
  },
  {
    "img": "قووالك يا صبايا - مسرحية صيف 840.mp3",
    "name": "قولولي يا صبايا",
    "artist": "Unknown",
    "music": "../../public/music/قولولي يا صبايا - مسرحية صيف 840.mp3"
  },
  {
    "img": "عريفين وليل - مسرحية صيف mp3.840",
    "name": "غريبين وليل",
    "artist": "غسان صليبا",
    "music": "../../public/music/غريبين وليل - مسرحية صيف 840.mp3"
  },
  {
    "img": "صرخ الذيب البحري - مسرحية صيف 840.mp3",
    "name": "صرخ الذيب البحري",
    "artist": "Unknown",
    "music": "../../public/music/صرخ الذيب البحري - مسرحية صيف 840.mp3"
  },
  {
    "img": "لقاء الفيصل القريس - مسرحية صيف 840.mp3",
    "name": "لقاء القنصل الفرنسي",
    "artist": "Unknown",
    "music": "../../public/music/لقاء القنصل الفرنسي - مسرحية صيف 840.mp3"
  },
  {
    "img": "سألك يا امي - هدى حداد - مسرحية صيف 840.mp3",
    "name": "سألك يا امي",
    "artist": "هدى حداد",
    "music": "../../public/music/بسألك يا إمي - هدى حداد - مسرحية صيف 840.mp3"
  },
  {
    "img": "من ليلة الساحة - مسرحية صيف 840.mp3",
    "name": "من ليلة الساحة",
    "artist": "Unknown",
    "music": "../../public/music/من ليلة الساحة - مسرحية صيف 840.mp3"
  },
  {
    "img": "اهلا وسهلا بمندوب العامية - مسرحية صيف 840.mp3",
    "name": "اهلا وسهلا بمندوب العامية",
    "artist": "Unknown",
    "music": "../../public/music/اهلا وسهلا بمندوب العامية - مسرحية صيف 840.mp3"
  },
  {
    "img": "يا سيف الجرح رح بالعرض الحلوى علي 84 مسرحية صيف 840.mp3",
    "name": "يا ام الياس مافيي احكي قدام الناس",
    "artist": "Unknown",
    "music": "../../public/music/يا ام الياس مافيي احكي قدام الناس - مسرحية صيف 840.mp3"
  },
  {
    "img": "يا ام الناس علميني احكي بدم الناس - مسرحية صيف 840.mp3",
    "name": "يا سيف البحر رح ياخدو الحلوي على الميل التاني",
    "artist": "Unknown",
    "music": "../../public/music/يا سيف البحر رح ياخدو الحلوي على الميل التاني - مسرحية صيف 84.mp3"
  },
  {
    "img": "يا هلا يا هلا يا هدوالي - مسرحية صيف 840.mp3",
    "name": "يا هلا يا هلا يا هويدلك",
    "artist": "Unknown",
    "music": "../../public/music/يا هلا يا هلا يا هويدلك - مسرحية صيف 840.mp3"
  },
  {
    "img": "زعتوا الساحة - غسان صليبا - مسرحية صيف 840.mp3",
    "name": "زينوا الساحة",
    "artist": "غسان صليبا",
    "music": "../../public/music/زينوا الساحة - غسان صليبا - مسرحية صيف 840.mp3"
  },
  {
    "img": "ليلة الساحة بطرابلس - مسرحية صيف 840.mp3",
    "name": "ليلة الساحة بانطلياس",
    "artist": "Unknown",
    "music": "../../public/music/ليلة الساحة بانطلياس - مسرحية صيف 840.mp3"
  },
  {
    "img": "بردية العصنبي بالجزر الوطني - هدى - مسرحية صيف 840.mp3",
    "name": "بيروت المبنية بالحجر الرملي",
    "artist": "هدى",
    "music": "../../public/music/بيروت المبنية بالحجر الرملي - هدى حداد - مسرحية صيف 840.mp3"
  },
  {
    "img": "يا ضيع فرنسيس - مسرحية صيف 840.mp3",
    "name": "يا شيخ فرنسيس",
    "artist": "Unknown",
    "music": "../../public/music/يا شيخ فرنسيس - مسرحية صيف 840.mp3"
  },
  {
    "img": "من ما اخد امي بصير عمي - مسرحية صيف 840.mp3",
    "name": "مين ما اخد امي بصير عمي",
    "artist": "Unknown",
    "music": "../../public/music/مين ما اخذ إمي بصير عمي - مسرحية صيف 840.mp3"
  },
  {
    "img": "تدهوك تدهوك وسرقتني ليالي صبيه - هدى حداد - مسرحية صيف 840.mp3",
    "name": "ندهوك ندهوك وسرقتني ليالي صعبه",
    "artist": "هدى حداد",
    "music": "../../public/music/ندهوك ندهوك وسرقتني ليالي صعبه - هدى حداد - مسرحية صيف 840.mp3"
  },
  {
    "img": "قول يا نور راسي - مسرحية صيف 840.mp3",
    "name": "قول يا يوز باشا ",
    "artist": "Unknown",
    "music": "../../public/music/قول يا يوز باشا - مسرحية صيف 840.mp3"
  },
  {
    "img": "انا هون وهني بوطن الجوز - هدى - مسرحية صيف 840.mp3",
    "name": "انا هون وهني بوطن الجوز",
    "artist": "هدى",
    "music": "../../public/music/انا هون وهني بوطن الجوز - هدى حداد - مسرحية صيف 840.mp3"
  },
  {
    "img": "نورت الليالي يا قمر العيد مسرحية صيف 840.mp3",
    "name": "نورت الليالي يا قمر العيد",
    "artist": "Unknown",
    "music": "../../public/music/نورت الليالي يا قمر العيد مسرحية صيف 840.mp3"
  },
  {
    "img": "طولوا علينا طولوا - مسرحية صيف 840.mp3",
    "name": "طولوا علينا طولوا",
    "artist": "Unknown",
    "music": "../../public/music/طولوا علينا طولوا - مسرحية صيف 840.mp3"
  },
  {
    "img": "منك تنزال دول + وضاع اللي راحوا - مسرحية صيف 840.mp3",
    "name": "فيك تقاتل دول + وحياة اللي راحوا",
    "artist": "Unknown",
    "music": "../../public/music/فيك تقاتل دول + وحياة اللي راحوا - مسرحية صيف 840.mp3"
  }
]
`);

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
