import $ from "jquery";

import { pageManager } from "../pages/page_manager";
$(".settingsButton").on("click", function () {
  pageManager.switchPage("settings");
});