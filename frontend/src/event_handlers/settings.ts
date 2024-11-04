// Settings page event handlers

import $ from "jquery";
import { BindPushButton } from "../components/push_button";
import { BindRadioButton } from "../components/radio_button";
import { config, defaultSettings } from "../systems/config";
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

// Color scheme
function setColorScheme(i: number) {
  config.settings.colorSchemeIndex = i;

  var mainColor = "#ffcdcd";
  var accentColor = "#f06c6c";

  switch (i) {
    case 1:
      mainColor = "#e3d7ff"
      accentColor = "#826fbd"
      break;
  }

  $(":root").css("--main-color", mainColor);
  $(":root").css("--accent-color", accentColor);
}

BindRadioButton(
  [$("#colorSchemePink"), $("#colorSchemeBlue")],
  config.settings.colorSchemeIndex,
  setColorScheme,
);
setColorScheme(config.settings.colorSchemeIndex);

// Show title
function setShowTitle(show: number) {
  config.settings.showTitleOnPlayPage = Boolean(show);

  if (config.settings.showTitleOnPlayPage) {
    $("#playPageTitle").removeClass("hidden");
  } else {
    $("#playPageTitle").addClass("hidden");
  }
}

BindRadioButton(
  [$("#showTitleOnPlayPageHide"), $("#showTitleOnPlayPageShow")],
  Number(config.settings.showTitleOnPlayPage),
  setShowTitle,
);
setShowTitle(Number(config.settings.showTitleOnPlayPage));
