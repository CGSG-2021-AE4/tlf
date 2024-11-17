// Settings page event handlers

import { BindPushButton } from "../components/push_button";
import { BindRadioButton } from "../components/radio_button";
import { config } from "../systems/config";
import { player } from "../systems/player";
import { pages } from "../systems/pages";

// Page back
$(".pageBackButton").on("click", () => {
  history.back();
});

// Keyboard shortcuts
$("body").on("keydown", (e) => {
  if (pages.CurPage?.name == "settings" || pages.CurPage?.name == "shortcuts") {
    console.log(e.key);
    switch (e.key) {
      case "Escape":
        history.back();
      break;
    }
  }
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
    case 2:
      mainColor = "#a0a0a0"
      accentColor = "#dfd43e"
      break;
    case 3:
      mainColor = "#a4ddb0"
      accentColor = "#33d656"
      break;
    case 4:
      mainColor = "#e4d595"
      accentColor = "#dd4126"
      break;
  }

  $(":root").css("--main-color", mainColor);
  $(":root").css("--accent-color", accentColor);
}

BindRadioButton(
  [
    $("#colorSchemePink"),
    $("#colorSchemeBlue"),
    $("#colorSchemeYellow"),
    $("#colorSchemeSalat"),
    $("#colorSchemeWarning"),
  ],
  config.settings.colorSchemeIndex,
  setColorScheme,
);
setColorScheme(config.settings.colorSchemeIndex);

// Show title
function updateTitle() {
  // Show/hide
  if (config.settings.showTitleOnPlayPage) {
    $("#playPageTitle").removeClass("hidden");
  } else {
    $("#playPageTitle").addClass("hidden");
  }
  // Vertrical alignment
  switch (config.settings.titleVertAlignment) {
  case "top":
    $("#playPageTitle").css("align-self", "flex-start");
    break;
  case "center":
    $("#playPageTitle").css("align-self", "center");
    break;
  case "bottom":
    $("#playPageTitle").css("align-self", "flex-end");
    break;
  }
}

BindRadioButton(
  [$("#showTitleOnPlayPageHide"), $("#showTitleOnPlayPageShow")],
  Number(config.settings.showTitleOnPlayPage),
  (i) => {
    config.settings.showTitleOnPlayPage = i == 1;
  }
);

// Hide play controls
BindRadioButton(
  [$("#hidePlayControlsEnable"), $("#hidePlayControlsDisable")],
  1 - Number(config.settings.hidePlayControls),
  (i) => {
    config.settings.hidePlayControls = i == 0;
  },
);

// Frequency lines

function updateFreqLines() {
  console.log(config.settings.freqStartAlignment, String(config.settings.freqStartAlignment) == "right");
  player.freqs.setLines(config.settings.freqLinesCount, config.settings.freqIsReflect, config.settings.freqStartAlignment == "right");

  // Vertrical alignment
  switch (config.settings.freqVertAlignment) {
  case "top":
    $("#soundLines").css("align-items", "flex-start");
    break;
  case "center":
    $("#soundLines").css("align-items", "center");
    break;
  case "bottom":
    $("#soundLines").css("align-items", "flex-end");
    break;
  }
  // Vertrical alignment
  switch (config.settings.freqBlockVertAlignment) {
  case "top":
    $("#soundLines").css("align-self", "flex-start");
    break;
  case "center":
    $("#soundLines").css("align-self", "center");
    break;
  case "bottom":
    $("#soundLines").css("align-self", "flex-end");
    break;
  }
}

// Count
BindRadioButton(
  [$("#freqLinesCount20"), $("#freqLinesCount40"), $("#freqLinesCount60"), $("#freqLinesCount80"), $("#freqLinesCount100")],
  Number(config.settings.freqLinesCount) / 20 - 1,
  (i) => {
    switch (i) {
    case 0:
      config.settings.freqLinesCount = 20;
      break;
    case 1:
      config.settings.freqLinesCount = 40;
      break;
    case 2:
      config.settings.freqLinesCount = 60;
      break;
    case 3:
      config.settings.freqLinesCount = 80;
      break;
    case 4:
      config.settings.freqLinesCount = 100;
      break;
    }  

    updateFreqLines();
  },
);

// Orientaion
BindRadioButton(
  [$("#freqLinesStartLeft"), $("#freqLinesStartRight")],
  Number(config.settings.freqStartAlignment == "right"),
  (i) => {
    switch (i) {
    case 0:
      config.settings.freqStartAlignment = "left";
      break;
    case 1:
      config.settings.freqStartAlignment = "right";
      break;
    }

    updateFreqLines();
  },
);

// Orientaion
BindRadioButton(
  [$("#freqLinesReflectEnable"), $("#freqLinesReflectDisable")],
  1 - Number(config.settings.freqIsReflect),
  (i) => {
    config.settings.freqIsReflect = i == 0;

    updateFreqLines();
  },
);

// Vertical alignment
BindRadioButton(
  [$("#freqLinesVertAlignBottom"), $("#freqLinesVertAlignCenter"), $("#freqLinesVertAlignTop")],
  config.settings.freqVertAlignment == "bottom" ? 0 :
  config.settings.freqVertAlignment == "center" ? 1 : 2,
  (i) => {
    switch (i) {
    case 0:
      config.settings.freqVertAlignment = "bottom";
      break;
    case 1:
      config.settings.freqVertAlignment = "center";
      break;
    case 2:
      config.settings.freqVertAlignment = "top";
      break;
    }

    updateFreqLines();
  },
);

// Block vertical alignment
BindRadioButton(
  [$("#freqLinesBlockVertAlignBottom"), $("#freqLinesBlockVertAlignCenter"), $("#freqLinesBlockVertAlignTop")],
  config.settings.freqBlockVertAlignment == "bottom" ? 0 :
  config.settings.freqBlockVertAlignment == "center" ? 1 : 2,
  (i) => {
    switch (i) {
    case 0:
      config.settings.freqBlockVertAlignment = "bottom";
      break;
    case 1:
      config.settings.freqBlockVertAlignment = "center";
      break;
    case 2:
      config.settings.freqBlockVertAlignment = "top";
      break;
    }

    updateFreqLines();
  },
);

// Title vertical alignment
BindRadioButton(
  [$("#titleVertAlignBottom"), $("#titleVertAlignCenter"), $("#titleVertAlignTop")],
  config.settings.titleVertAlignment == "bottom" ? 0 :
  config.settings.titleVertAlignment == "center" ? 1 : 2,
  (i) => {
    switch (i) {
    case 0:
      config.settings.titleVertAlignment = "bottom";
      break;
    case 1:
      config.settings.titleVertAlignment = "center";
      break;
    case 2:
      config.settings.titleVertAlignment = "top";
      break;
    }

    updateTitle();
  },
);

updateFreqLines();
updateTitle();