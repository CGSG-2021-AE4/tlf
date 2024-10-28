import $ from "jquery";
import { config } from "../systems/config";
import { audio } from "../systems/audio";

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
function UpdateSoundIcon() {
  audio.setVolume(config.state.soundVolume * Number(config.state.soundEnabled));

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
  config.state.soundVolume = Number($("#soundRange").val());
  UpdateSoundIcon();
});

$("#soundRange").on("change", (e) => {
  config.state.soundVolume = Number($("#soundRange").val());
  if (config.state.soundVolume == 0) {
    config.state.soundVolume = 0.1;
    config.state.soundEnabled = false;
  }
  UpdateSoundIcon();
});

$("#soundRange").on("wheel", (e) => {
  if (e.originalEvent as WheelEvent) {
    var value = config.state.soundVolume + (e.originalEvent as WheelEvent).deltaY / 100 * -0.07;
    value = Math.max(Math.min(value, 1), 0);
    config.state.soundVolume = value;
    $("#soundRange").val(config.state.soundVolume);
    UpdateSoundIcon();
  }
});

$("#soundButton").on("click", (e) => {
  config.state.soundEnabled = !config.state.soundEnabled;
  if (config.state.soundEnabled) {
    $("#soundRange").val(config.state.soundVolume);
  } else {
    $("#soundRange").val(0);
  }
  UpdateSoundIcon();
});


// Initialization
$("#soundRange").val(config.state.soundVolume);
UpdateSoundIcon();
audio.setVolume(config.state.soundVolume * Number(config.state.soundEnabled));