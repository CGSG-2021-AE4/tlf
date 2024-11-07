import $ from "jquery";
import { Page, PageName } from "../pages/page";

import { background } from "./background";
import { CreateIndexPage } from "../pages";
import { CreatePlayPage } from "../pages/play";
import { CreateSettingsPage } from "../pages/settings";
import { CreateShortcutsPage } from "../pages/shortcuts";

interface PageSystemI {
  switchPage(page: PageName): void
  setLoading(isLoading: boolean);
}

class PageSystem implements PageSystemI {
  public pages: Record<PageName, Page>;
  CurPage: Page | null;
  isLoading: boolean;

  constructor() {
    // Init pages
    this.pages = {
      index: CreateIndexPage(),
      play: CreatePlayPage(),
      settings: CreateSettingsPage(),
      shortcuts: CreateShortcutsPage(),
    };

    // Setup pages
    Object.keys(this.pages).map((key) => {
      this.pages[key].element.addClass("hidden").addClass("transparent");
    });


    this.isLoading = true; // Because after start it is loading
    this.CurPage = null; // By default there is no current page

    // Calculate current page and switch to it
    // ...
    this.setLoading(false);
    this.updatePage();

    // Set callback on url change
    window.onpopstate = this.updatePage;
  }

  // Switch page based on current url
  updatePage = () => {
    switch (window.location.pathname) {
    case "/settings":
      this.switchPage("settings");
      break;
    case "/shortcuts":
      this.switchPage("shortcuts");
      break;
    case "/play":
      this.switchPage("play");
      break;
    default:
      this.switchPage("index");
      break;
    }
  }

  activateCurPage() {
    if (this.CurPage == null)
      return;
    this.CurPage.onEnable();
    background.setBlur(this.CurPage.needBlur)
    this.CurPage.element.removeClass("hidden");
    window.setTimeout(() => { // So css is able to update and smooth appearing will play
      if (this.CurPage != null)
        this.CurPage.element.removeClass("transparent");
    }, 1);
  }

  switchPage(page: PageName) {
    if (this.CurPage == null) {
      this.CurPage = this.pages[page];
      this.activateCurPage();
      return;
    }
    this.CurPage.onDisable();
    this.CurPage.element.addClass("transparent");
    this.CurPage.element.on("transitionend", (e) => {
      if (this.CurPage == null || !$(e.target).hasClass("page"))
        return;
      this.CurPage.element.off("transitionend");
      $(e.target).addClass("hidden");
      this.activateCurPage();
    });
    this.CurPage = this.pages[page]
    history.pushState({}, this.CurPage.name, this.CurPage.path);
  }

  // Sets loading animation
  setLoading(isLoading: boolean) {
    background.setBlur(isLoading);
    if (!isLoading)
      $(".loadScreen").addClass("hidden");
    else
      $(".loadScreen").removeClass("hidden");
  }
}

export var pages = new PageSystem();