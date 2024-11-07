import $ from "jquery";
import { config } from "../systems/config";
import { pages } from "../systems/pages";

const passiveModeTimeout = 10 * 1000; // In ms
const checkTimeout = 1000; // In ms
var lastActiveTime = Date.now(); // In ms
var hidden = false;

// Show/hide controls

$("body").on("mousemove", () => {
  if (hidden) {
    showControls();
  }
  lastActiveTime = Date.now();
})

function showControls() {
  $(".playControls").removeClass("transparent");
  hidden = false;
}

function hideControls() {
  $(".playControls").addClass("transparent");
  hidden = true;
}

function checkUpdate() {
  if (config.settings.hidePlayControls && !hidden && Date.now() - lastActiveTime > passiveModeTimeout) {
    hideControls();
  }
}

window.setInterval(checkUpdate, checkTimeout);

// Keyboard
$("body").on("keydown", (e) => {
  if (pages.CurPage?.name == "play") {
    switch (e.key) {
    case "s":
      pages.switchPage("settings");
      break;
    }
  }
});