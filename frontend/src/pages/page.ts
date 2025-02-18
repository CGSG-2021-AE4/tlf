// Possible pages

export type PageName = "index" | "play" | "settings" | "shortcuts";// | "unknown";

export class Page {
  name: PageName;
  title: string;
  path: string;
  element: JQuery;
  needBlur: boolean;

  onEnable: () => void;
  onDisable: () => void;
}
