import { pages } from "../systems/pages";
import { player } from "../systems/player";

// Start button

$(".playStartButton").on("click", function() {
  pages.switchPage("play");
});

// Play/Pause buttons

$("#audioPlayButton").on("click", function() {
  player.play();
});

$("#audioPauseButton").on("click", function() {
  player.pause();
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

$("body").on("keydown", (e) => {
  if (pages.CurPage?.name == "play") {
    switch (e.key) {
    case " ":
      if (player.playing()) {
        player.pause();
      } else {
        player.play();
      }
      break;
    case "ArrowRight":
      if (e.ctrlKey) {
        player.next();
      } else {
        player.seek(player.curTime() + 5);
      }
      break;
    case "ArrowLeft":
      if (e.ctrlKey) {
        player.prev()
      } else {
        player.seek(player.curTime() - 5);
      }
      break;
    }
  }
});