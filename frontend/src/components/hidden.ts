export class HiddenComponent {
  hidden: boolean;
  container: JQuery;

  constructor(c: JQuery) {
    this.container = c;
    this.container.addClass("hiddenComponent");
  }

  toggle(hide: boolean) {
    if (hide) {
      this.container.addClass("hide");
    } else {
      this.container.removeClass("hide");
    }
  }
}
