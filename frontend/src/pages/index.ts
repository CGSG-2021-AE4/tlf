import $ from "jquery";
import { Page, PageSwitcher } from "./page";

export function CreateIndexPage(): Page {
  return {
    name: "index",
    title: "LOFI radio",
    path: "/",
    element: $(".pageIndex"),
    needBlur: true,
    onEnable: (ps: PageSwitcher) => {
      console.log("Index page on enable");
      $(".playStartButton").on("click", function() {
        ps.switchPage("play");
      })
    },
    onDisable: () => {
      console.log("Index page on disable");
    },
  };
}