import $ from "jquery";
import { Page, PageSwitcher } from "./page";

export function CreatePlayPage(): Page {
  return {
    name: "play",
    title: "LOFI radio",
    path: "/play",
    element: $(".pagePlay"),
    needBlur: false,
    onEnable: () => {
      console.log("Index page on enable");
    },
    onDisable: () => {
      console.log("Index page on disable");
    },
  };
}