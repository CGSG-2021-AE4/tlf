// Settings page event handlers

import $ from "jquery";
import { BindPushButton } from "../components/push_button";
import { BindRadioButton } from "../components/radio_button";
import { config } from "../systems/config";
import { pages } from "../systems/pages";

// Page back
$("#settingsPageBackButton").on("click", () => {
  history.back();
});

// Test
BindPushButton($("#testButton"), true, (p)=> { console.log(p);});
BindRadioButton([$("#radioButton1"), $("#radioButton2"), $("#radioButton3"), $("#radioButton4")], 1, (i)=>{ console.log(i); })

// Player blur
BindRadioButton(
  [$("#blurPlayBackEnable"), $("#blurPlayBackDisable")],
  1 - Number(config.settings.playPageBlur),
  (i) => {
    config.settings.playPageBlur = i == 0;
    pages.pages.play.needBlur = config.settings.playPageBlur;
  },
);

 