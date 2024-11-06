import $ from "jquery";

const passiveModeTimeout = 10 * 1000; // In ms
const checkTimeout = 1000; // In ms
var lastActiveTime = Date.now(); // In ms
var hidden = false;

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
  if (!hidden && Date.now() - lastActiveTime > passiveModeTimeout) {
    hideControls();
  }
}

window.setInterval(checkUpdate, checkTimeout);

