import $ from "jquery";
import { pages } from "../systems/pages";
import { background } from "../systems/background";

$(".settingsButton").on("click", function () {
  pages.switchPage("settings");
});

$("#setBackground").on("click", function() {
  const images = [
    "static/imgs/back0.png",
    "static/imgs/back1.png",
    "static/imgs/back2.png",
    "static/imgs/back3.png",
    "static/imgs/back4.png",
    "static/imgs/back5.png",
    "static/imgs/back6.png",
    "static/imgs/back7.png",
    "static/imgs/noisy_back.png",
  ]
  background.setImage(images[Math.floor(Math.random() * (images.length - 1))]);
});