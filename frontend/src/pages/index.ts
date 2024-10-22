import $ from "jquery";
import { Page, PageSwitcher } from "./page";

export function CreateIndexPage(ps: PageSwitcher): Page {
  return {
    name: "index",
    title: "LOFI radio",
    path: "/",
    element: $(".pageIndex"),
    needBlur: true,
    onEnable: () => {
      console.log("Index page on enable");
      
    },
    onDisable: () => {
      console.log("Index page on disable");
    },
  };
}