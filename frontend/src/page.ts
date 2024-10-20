// Possible pages

export type PageName = "index" | "play" | "settings" | "unknown";

type PageProps = {

}

async function empty(): Promise<void> {
  return;
}

class Page {
  name: PageName;
  path: string;
  element: JQuery;
}