import $ from "jquery";
import { pageManager } from "../pages/page_manager";
import { audio } from "../utils/audio";

$(".playStartButton").on("click", function() {
  pageManager.switchPage("play");
});

$("#playAudioButton").on("click", function() {
  
  if (audio.trackPlaying())
    audio.pauseTrack();
  else
    audio.playTrack();
});

audio.loadTrack("static/audio/Indigo Jam Unit Sepia.mp3");