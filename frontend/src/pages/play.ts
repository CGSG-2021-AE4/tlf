import { Page } from "./page";
import { config } from "../systems/config";

export function CreatePlayPage(): Page {
  return {
    name: "play",
    title: "TLF - customizable LoFi player",
    path: "/play",
    element: $(".pagePlay"),
    needBlur: config.settings.playPageBlur,
    onEnable: () => {
      //console.log("Index page on enable");
    },
    onDisable: () => {
      //console.log("Index page on disable");
    },
  };
}