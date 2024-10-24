import $ from "jquery";
import { pages } from "../systems/pages";

$(".settingsButton").on("click", function () {
  pages.switchPage("settings");
});