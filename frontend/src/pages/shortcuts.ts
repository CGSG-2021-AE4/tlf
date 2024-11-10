import { Page } from "./page";

export function CreateShortcutsPage(): Page {
  return {
    name: "shortcuts",
    title: "TLF Shortctus",
    path: "/shortcuts",
    element: $(".pageShortcuts"),
    needBlur: true,
    onEnable: () => {
      //console.log("Settings page on enable");
    },
    onDisable: () => {
      //console.log("Settings page on disable");
    },
  };
}