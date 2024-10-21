import $ from "jquery";
import { Page, PageName, PageSwitcher } from "./page";
import { setBlur } from "../background";
import { CreateIndexPage } from "./";
import { CreatePlayPage } from "./play";

export class PageManager implements PageSwitcher {
  Pages: Record<PageName, Page>;
  CurPage: Page | null;
  isLoading: boolean;

  constructor() {
    // Init static data
    this.Pages = {
      index: CreateIndexPage(),
      play: CreatePlayPage(),
    };

    this.isLoading = true; // Because after start it is loading
    this.CurPage = null; // By default there is no current page

    // Calculate current page and switch to it
    // ...
    this.setLoading(false);
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