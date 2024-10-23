import $ from "jquery";

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


// Get config from cookies
var newConfig: GlobalConfig = defaultConfig;

try {
  newConfig = JSON.parse(document.cookie);
} catch(e) {
  console.log("failed to load config from cookies - use default")
}

export var config: GlobalConfig = newConfig;


// Save config to cockies before unload
$(window).on("beforeunload", () => { 
  document.cookie = JSON.stringify(config);
})