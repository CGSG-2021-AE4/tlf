import $ from "jquery";
import { Page } from "./page";

export function CreateIndexPage(): Page {
  return {
    name: "index",
    title: "TLF - customizable LoFi player",
    path: "/",
    element: $(".pageIndex"),
    needBlur: true,
    onEnable: () => {
      //console.log("Index page on enable");
    },
    onDisable: () => {
      //console.log("Index page on disable");
    },
  };
}