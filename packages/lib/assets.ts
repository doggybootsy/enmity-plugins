export function getIDByName(name: string): number {
  const id = window.enmity.assets.getIDByName(name);

  if (typeof id === "undefined") {
    throw new Error(`Asset Id by the name of '${name}' is undefined`)
  }
  return id;
}

type AssetType = "jsona" | "jpg" | "png" | "svg" | "lottie" | "ttf" | "webm";

export interface Asset {
  httpServerLocation: string,
  width: number,
  height: number,
  scales: number[],
  hash: string,
  name: string,
  type: AssetType,
  id: number
}

export function getByName(name: string): Asset {
  const asset = window.enmity.assets.getByName(name);

  if (typeof asset === "undefined") {
    throw new Error(`Asset by the name of '${name}' is undefined`)
  }
  return asset;
}
export function getById(id: string): Asset {
  const asset = window.enmity.assets.getById(id);

  if (typeof asset === "undefined") {
    throw new Error(`Asset by the id of '${id}' is undefined`)
  }
  return asset;
}