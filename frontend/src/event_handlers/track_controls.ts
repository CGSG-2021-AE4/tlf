import $ from "jquery";
import { pages } from "../systems/pages";
import { audio } from "../systems/audio";

$(".playStartButton").on("click", function() {
  pages.switchPage("play");
});

$("#audioPlayButton").on("click", function() {
  audio.playTrack();
  $("#audioPlayButton").addClass("hidden");
  $("#audioPauseButton").removeClass("hidden");
});

$("#audioPauseButton").on("click", function() {
  audio.pauseTrack();
  $("#audioPauseButton").addClass("hidden");
  $("#audioPlayButton").removeClass("hidden");
});

// Leave only one button visible
if (audio.trackPlaying()) {
  $("#audioPlayButton").addClass("hidden");
  $("#audioPauseButton").removeClass("hidden");
} else {
  $("#audioPauseButton").addClass("hidden");
  $("#audioPlayButton").removeClass("hidden");
}

$("#trackTimeline").on("input", (e) => {
  var v = Number($("#trackTimeline").val()); // Value from 0 to 1
  $("#trackTimeline").css("background", `linear-gradient(to right, var(--main-color) ${v * 100}%, color-mix(in srgb, var(--main-color), transparent 60%) ${v * 100}%)`);
});
