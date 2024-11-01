import $ from "jquery";
import { pages } from "../systems/pages";
import { player } from "../systems/player";

// Start button

$(".playStartButton").on("click", function() {
  pages.switchPage("play");
});

// Play/Pause buttons

$("#audioPlayButton").on("click", function() {
  player.play();
  $("#audioPlayButton").addClass("hidden");
  $("#audioPauseButton").removeClass("hidden");
});

$("#audioPauseButton").on("click", function() {
  player.pause();
  $("#audioPauseButton").addClass("hidden");
  $("#audioPlayButton").removeClass("hidden");
});

// Leave only one button visible
if (player.playing()) {
  $("#audioPlayButton").addClass("hidden");
  $("#audioPauseButton").removeClass("hidden");
} else {
  $("#audioPauseButton").addClass("hidden");
  $("#audioPlayButton").removeClass("hidden");
}

// Next/Prev
$("#audioPrevButton").on("click", function() {
  player.prev();
});

$("#audioNextButton").on("click", function() {
  player.next();
});

// Timeline
$("#trackTimeline").on("input", (e) => {
  var v = Number($("#trackTimeline").val()); // Value from 0 to 1
  player.seek(v * player.duration());
});
