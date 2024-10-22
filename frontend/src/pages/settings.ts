import $ from "jquery";
import { Page, PageSwitcher } from "./page";
import { BindPushButton } from "../components/push_button";
import { BindRadioButton, RadioButtons } from "../components/radio_button";

export function CreateSettingsPage(ps: PageSwitcher): Page {
  BindPushButton($("#testButton"), true, (p)=> { console.log(p);});
  BindRadioButton([$("#radioButton1"), $("#radioButton2"), $("#radioButton3"), $("#radioButton4")], 1, (i)=>{ console.log(i); })
  
  return {
    name: "settings",
    title: "Settings",
    path: "/settings",
    element: $(".pageSettings"),
    needBlur: true,
    onEnable: () => {
      console.log("Settings page on enable");
    },
    onDisable: () => {
      console.log("Settings page on disable");
    },
  };
}