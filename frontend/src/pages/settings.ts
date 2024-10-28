import $ from "jquery";
import { Page } from "./page";
import { BindPushButton } from "../components/push_button";
import { BindRadioButton, RadioButtons } from "../components/radio_button";

export function CreateSettingsPage(): Page {
  return {
    name: "settings",
    title: "Settings",
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