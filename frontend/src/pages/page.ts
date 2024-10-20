// Possible pages

export type PageName = "index" | "play";// | "settings" | "unknown";

export interface PageSwitcher {
  switchPage(page: PageName): void
}

export class Page {
  name: PageName;
  title: string;
  path: string;
  element: JQuery;
  needBlur: boolean;

  onEnable: (ps: PageSwitcher) => void;
  onDisable: () => void;
}
