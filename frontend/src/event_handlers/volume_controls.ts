import { config } from "../systems/config";
import { player } from "../systems/player";
import { pages } from "../systems/pages";

// Sound volume icon id will speed up check
type SoundIcon = "#noSound" | "#lowVolume" | "#highVolume";
var curIcon: SoundIcon = "#noSound"; // In HTML !!! it is set to #noSound so as here

// Function without check
function ChangeSoundIcon(newIcon: SoundIcon) {
  $(curIcon).addClass("hidden");
  curIcon = newIcon;
  $(curIcon).removeClass("hidden");
}

// Checks and then changes
function SetSoundVolume(v: number, isChanged: boolean) {
  config.state.soundVolume = v;
  if (isChanged && v == 0) {
    config.state.soundVolume = 0.1;
    config.state.soundEnabled = false;
  }

  player.setVolume(config.state.soundVolume * Number(config.state.soundEnabled));

  if (!config.state.soundEnabled || config.state.soundVolume == 0) {
    if (curIcon != "#noSound") {
      ChangeSoundIcon("#noSound");
    }
    return;
  }
  if (config.state.soundVolume < 0.5) {
    if (curIcon != "#lowVolume") {
      ChangeSoundIcon("#lowVolume");
    }
  } else if (curIcon != "#highVolume") {
    ChangeSoundIcon("#highVolume");
  }
}

$("#soundRange").on("input", (e) => {
  config.state.soundEnabled = true;
  SetSoundVolume(Number($("#soundRange").val()), false);
});

$("#soundRange").on("change", (e) => {
  SetSoundVolume(Number($("#soundRange").val()), true);
});

$("#soundRange").on("wheel", (e) => {
  if (e.originalEvent as WheelEvent) {
    var value = config.state.soundVolume + (e.originalEvent as WheelEvent).deltaY / 100 * -0.07;
    value = Math.max(Math.min(value, 1), 0);
    $("#soundRange").val(value);
    SetSoundVolume(value, true);
  }
});

function onMute() {
  config.state.soundEnabled = !config.state.soundEnabled;
  if (config.state.soundEnabled) {
    $("#soundRange").val(config.state.soundVolume);
  } else {
    $("#soundRange").val(0);
  }
  SetSoundVolume(config.state.soundVolume, false);
}

$("#soundButton").on("click", onMute);

// Keyboard
$("body").on("keydown", (e) => {
  if (pages.CurPage?.name == "play") {
    switch (e.key) {
    case "m":
      onMute();
      break;
    case "ArrowUp":
      var v = Math.max(Math.min(config.state.soundVolume + 0.1, 1), 0);
      $("#soundRange").val(v);
      SetSoundVolume(v, true);
      break;
    case "ArrowDown":
      v = Math.max(Math.min(config.state.soundVolume - 0.1, 1), 0);
      $("#soundRange").val(v);
      SetSoundVolume(v, true);
      break;
    }
  }
});

// Initialization
$("#soundRange").val(config.state.soundVolume * Number(config.state.soundEnabled));
SetSoundVolume(config.state.soundVolume, false);