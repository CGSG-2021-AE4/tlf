import $ from "jquery";
import Cookies from "js-cookie";

export interface GlobalConfig {
  playPageBlur: boolean;
  soundVolume: number; // Value from 0 to 1
  soundEnabled: boolean;
}

// Separet value so I can add a button "Reset settings"
export const defaultConfig: GlobalConfig = {
  playPageBlur: false,
  soundVolume: 0.5,
  soundEnabled: true,
};

const valueName = "tlf";

// Get config from cookies
var newConfig: GlobalConfig;
var newC = Cookies.get(valueName);
if (newC == undefined) {
  console.log("failed to load config from cookies - use default")
  newConfig = defaultConfig;
} else {
  newConfig = JSON.parse(newC);
}

export var config: GlobalConfig = newConfig;


// Save config to cockies before unload
$(window).on("beforeunload", () => { 
  Cookies.set(valueName, JSON.stringify(config));
  //document.cookie = ;
})