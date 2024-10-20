// Possible pages

export type PageName = "welcome" | "play" | "settings";

type PageProps = {
  name: PageName;
  path: string;
  element: JQuery;
}

async function empty(): Promise<void> {
  return;
}