export interface GlobalConfig {
  playPageBlur: boolean;
}

// Separet value so I can add a button "Reset settings"
export const defaultConfig: GlobalConfig = {
  playPageBlur: false,
};

export var config: GlobalConfig = defaultConfig;