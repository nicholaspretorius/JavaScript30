// https://dev.w3.org/html5/html-author/charref
// Get elements on page
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

console.log(video.paused);
// Build out functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // video.paused ? video.play() : video.pause();
}

function updateButton() {
  if (video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "◼";
  }
}

function skip() {
  console.log(this.dataset.skip && this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  console.log(this.name + " : " + this.value);
  video[this.name] = this.value;
  // this.name === "volume" ? handleVolumeChange(this.value) : handleTimeChange(this.value);
}

function updateProgress() {
  const percentComplete = (video.currentTime / video.duration) * 100;
  console.log(`${percentComplete}%`);
  progressBar.style.flexBasis = `${percentComplete}%`;
}

function scrub(event) {
  console.log(event);
  console.log(progress);
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// function handleVolumeChange(value) {
//   video.volume = parseFloat(value);
// }

// function handleRateChange(value) {
//   video.playbackRate = parseFloat(value);
// }

// Hook up event listeners
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("click", togglePlay);
skipButtons.forEach(button => {
  button.addEventListener("click", skip);
});
ranges.forEach(range => {
  range.addEventListener("change", handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
video.addEventListener("timeupdate", updateProgress);
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
