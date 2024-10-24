import $ from "jquery";
import { pages } from "../systems/pages";
import { audio } from "../systems/audio";
import { background } from "../systems/background";

$(".playStartButton").on("click", function() {
  pages.switchPage("play");
});

$("#playAudioButton").on("click", function() {
  
  if (audio.trackPlaying())
    audio.pauseTrack();
  else
    audio.playTrack();
});

$("#setBackground").on("click", function() {
  const images = [
    "static/imgs/back1.jpg",
    "static/imgs/back2.png",
    "static/imgs/back3.png",
    "static/imgs/back4.jpg",
    "static/imgs/back5.jpg",
    "static/imgs/back6.jpg",
    "static/imgs/back7.png",
  ]
  background.setImage(images[Math.floor(Math.random() * (images.length - 1))]);
});

audio.loadTrack("static/audio/Indigo Jam Unit Sepia.mp3");