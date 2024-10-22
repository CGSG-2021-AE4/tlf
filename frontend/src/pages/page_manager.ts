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
    if (window.location.pathname == "/settings")
      this.switchPage("settings");
    else if (window.location.pathname == "/play")
      this.switchPage("play");
    else
    this.switchPage("index");
  }

  switchPage(page: PageName) {
    if (this.CurPage != null) {
      this.CurPage.onDisable();
      this.CurPage.element.addClass("hidden");
    }
    this.CurPage = this.Pages[page]
    this.CurPage.onEnable(this);
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