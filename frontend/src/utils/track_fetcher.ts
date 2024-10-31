import { TrackDescriptor } from "./audio";

export async function getRand( limit: number ): Promise<TrackDescriptor[]> {
  try {
    const resp = await fetch(window.location.origin + "/api/getRand?limit=" + limit);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    const json: TrackDescriptor[] = await resp.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }

  return [];
}