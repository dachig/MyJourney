const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }

    });
});
const hiddenElements = document.querySelectorAll('.invisible');
hiddenElements.forEach((el) => observer.observe(el));

var video = document.getElementById("r8");
var btn = document.getElementById("pausePlay");
function pausePlay() {
    if (video.paused) {
      video.play();
      btn.innerHTML = "Pause";
    } else {
      video.pause();
      btn.innerHTML = "Play";
    }
  }
/*
var audio = $("#r8")[0];
$(".Os").mouseenter(function(){
    audio.play();
});
*/