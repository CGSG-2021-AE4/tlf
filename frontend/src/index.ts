import "./systems/pages";
import "./event_handlers/event_handlers"; // !!! This file must be imported ones in program !!!
import { background } from "./systems/background";
import { config } from "./systems/config";
import { player } from "./systems/player";

// This file collects all modules

///////////////// Onload setup and logic /////////////////

// Background smooth appearence:
// window.setTimeout(() => {
//   background.setImage("static/imgs/back3.png");
// }, 1);

// Background instant appearence:
if (config.state.lastImageFilename != undefined && config.state.lastImageFilename != "")
  background.subtitleImage(config.state.lastImageFilename);
else
  background.subtitleImage("static/imgs/back0.png");
