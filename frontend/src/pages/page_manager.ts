import $ from "jquery";
import { Page, PageName, PageSwitcher } from "./page";
import { setBlur } from "../utils/background";
import { CreateIndexPage } from "./";
import { CreatePlayPage } from "./play";
import { CreateSettingsPage } from "./settings";

export class PageManager implements PageSwitcher {
  public Pages: Record<PageName, Page>;
  CurPage: Page | null;
  isLoading: boolean;

  constructor() {
    // Init static data
    this.Pages = {
      index: CreateIndexPage(),
      play: CreatePlayPage(),
      settings: CreateSettingsPage(),
    };

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
  updatePage() {
    switch (window.location.pathname) {
    case "/settings":
      this.switchPage("settings");
      break;
    case "/play":
      this.switchPage("play");
      break;
    default:
      this.switchPage("index");
      break;
    }
  }

  switchPage(page: PageName) {
    if (this.CurPage != null) {
      this.CurPage.onDisable();
      this.CurPage.element.addClass("hidden");
    }
    this.CurPage = this.Pages[page]
    this.CurPage.onEnable();
    setBlur(this.CurPage.needBlur)
    this.CurPage.element.removeClass("hidden");
    history.pushState({}, this.CurPage.name, this.CurPage.path);
  }

  // Sets loading animation
  setLoading(isLoading: boolean) {
    setBlur(isLoading);
    if (!isLoading)
      $(".loadScreen").addClass("hidden");
    else
      $(".loadScreen").removeClass("hidden");
  }
}

export var pageManager = new PageManager();