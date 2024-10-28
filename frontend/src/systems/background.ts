import $ from "jquery";
import { config } from "./config";

// Background system
const curZIndex = -10;
const nextZIndex = -9;

interface BackgroundSystemI {
  setBlur(b: boolean);
}

class BackgroundSystem implements BackgroundSystemI {
  curBackElement: JQuery;
  nextBackElement: JQuery;
  isSwapping = false;

  constructor() {
    this.curBackElement = $("#background1");
    this.nextBackElement = $("#background2");

    this.nextBackElement.addClass("quick_transparent");
    this.curBackElement.css("z-index", curZIndex);
    this.nextBackElement.css("z-index", nextZIndex);
  }

  swapBackground() {
    // Start opacity transition 
    this.isSwapping = true;
    console.log("start transition");

    this.nextBackElement.removeClass("quick_transparent");
    this.nextBackElement.on("transitionend", (e) => {
      console.log("transitionend");
      this.nextBackElement.off("transitionend");
      this.curBackElement.addClass("quick_transparent");
      var el = this.curBackElement;
      this.curBackElement = this.nextBackElement;
      this.nextBackElement = el;

      this.curBackElement.css("z-index", curZIndex);
      this.nextBackElement.css("z-index", nextZIndex);
      this.isSwapping = false;
    });

  }

  private onImageLoad(filename: string) {
    this.nextBackElement.css("background-image", `url(${filename})`);
    this.swapBackground();
  }

  setImage(filename) {
    if (this.isSwapping) {
      console.log("Can't load an image while swapping")
      return; // TODO
    }

    config.state.lastImageFilename = filename;
    //This html element only loads the image
    //So when I set it as background it will use this(already loaded)
    var img = new Image(filename);

    if (img.complete)
      this.onImageLoad(filename);
    else {
      img.addEventListener("load", () => {
        this.onImageLoad(filename);
      });
      img.addEventListener("error", (e) => {
        console.log(`Failed to load image: ${e}`);
      });
    }
  }

  subtitleImage(filename) { // Function that instantly change the style of current image(for those case when I don't need smooth transition(page load))
    config.state.lastImageFilename = filename;
    this.curBackElement.css("background-image", `url(${filename})`);
  }

  setBlur(b: boolean) {
    if (!b) {
      $(".background")
      .css("filter", "none")
      .css("-webkit-filter", "none");
    } else {
      $(".background")
        .css("filter", "blur(var(--blur-r))")
        .css("-webkit-filter", "blur(var(--blur-r))");
    }
  }
}

export var background = new BackgroundSystem();