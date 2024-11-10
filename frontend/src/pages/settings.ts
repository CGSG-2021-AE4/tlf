import { Page } from "./page";

export function CreateSettingsPage(): Page {
  return {
    name: "settings",
    title: "TLF Settings",
    path: "/settings",
    element: $(".pageSettings"),
    needBlur: true,
    onEnable: () => {
      //console.log("Settings page on enable");
    },
    onDisable: () => {
      //console.log("Settings page on disable");
    },
  };
}