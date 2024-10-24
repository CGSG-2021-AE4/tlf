import $ from "jquery";
import { config } from "../utils/config";
import { audio } from "../utils/audio";

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
  audio.setVolume(config.soundVolume * Number(config.soundEnabled));

  if (!config.soundEnabled || config.soundVolume == 0) {
    if (curIcon != "#noSound") {
      ChangeSoundIcon("#noSound");
    }
    return;
  }
  if (config.soundVolume < 0.5) {
    if (curIcon != "#lowVolume") {
      ChangeSoundIcon("#lowVolume");
    }
  } else if (curIcon != "#highVolume") {
    ChangeSoundIcon("#highVolume");
  }
}

$("#soundRange").on("input", (e) => {
  config.soundEnabled = true;
  config.soundVolume = Number($("#soundRange").val());
  UpdateSoundIcon();
});

$("#soundRange").on("change", (e) => {
  config.soundVolume = Number($("#soundRange").val());
  if (config.soundVolume == 0) {
    config.soundVolume = 0.1;
    config.soundEnabled = false;
  }
  UpdateSoundIcon();
});

$("#soundButton").on("click", (e) => {
  config.soundEnabled = !config.soundEnabled;
  if (config.soundEnabled) {
    $("#soundRange").val(config.soundVolume);
  } else {
    $("#soundRange").val(0);
  }
  UpdateSoundIcon();
});


// Initialization
$("#soundRange").val(config.soundVolume);
UpdateSoundIcon();
audio.setVolume(config.soundVolume * Number(config.soundEnabled));