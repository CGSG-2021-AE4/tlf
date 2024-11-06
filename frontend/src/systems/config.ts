import $ from "jquery";
import Cookies from "js-cookie";

// Static settings that can be changed by user
interface SettingsConfig {
  // Play page
  playPageBlur: boolean;
  showTitleOnPlayPage: boolean;
  hidePlayControls: boolean;

  // Colors
  colorSchemeIndex: number;

}

// More temporary values like sound volume
interface StateConfig {
  // Audio
  soundVolume: number; // Value from 0 to 1
  soundEnabled: boolean;

  // Background
  lastImageFilename: string;
}


// Separate values so settings can be dynamicly reset

export const defaultSettings: SettingsConfig = {
  // Play page
  playPageBlur: false,
  showTitleOnPlayPage: true,
  hidePlayControls: true,

  // Colors
  colorSchemeIndex: 1,
};

export const defaultState: StateConfig = {
  // Audio
  soundVolume: 0.5,
  soundEnabled: true,

  // Background
  lastImageFilename: "",
};

const settingsName = "tlf-settings";
const stateName = "tlf-state";

class ConfigSystem {
  public settings: SettingsConfig = defaultSettings;
  public state: StateConfig = defaultState;

  constructor() {
    // Load config from cookies

    // Settings
    var newSettings = Cookies.get(settingsName);
    if (newSettings == undefined) {
      console.log("failed to load settings from cookies - use default")
    } else {
      this.settings = JSON.parse(newSettings); // Without try/catch because I assume that if settings field exists it already has right structure
    }
    
    // State
    var newState = Cookies.get(stateName);
    if (newState == undefined) {
      console.log("failed to load settings from cookies - use default")
    } else {
      this.state = JSON.parse(newState); // Without try/catch because I assume that if settings field exists it already has right structure
    }

    // Save config to cookies before unload
    $(window).on("beforeunload", () => { 
      Cookies.set(settingsName, JSON.stringify(this.settings));
      Cookies.set(stateName, JSON.stringify(this.state));
    })
  }

  resetSettings() {
    this.settings = defaultSettings;
  }
  
  resetState() {
    this.state = defaultState;
  }
}

export var config = new ConfigSystem();