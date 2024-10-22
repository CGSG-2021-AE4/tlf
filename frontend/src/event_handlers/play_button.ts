import $ from "jquery";
import { pageManager } from "../pages/page_manager";

$(".playStartButton").on("click", function() {
  pageManager.switchPage("play");
});