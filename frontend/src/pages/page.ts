// Possible pages

export type PageName = "index" | "play" | "settings";// | "unknown";

// I need PageSwitcher type because pages can refer to page manager because of import loop
export interface PageSwitcher {
  switchPage(page: PageName): void
}

export class Page {
  name: PageName;
  title: string;
  path: string;
  element: JQuery;
  needBlur: boolean;

  onEnable: () => void;
  onDisable: () => void;
}
