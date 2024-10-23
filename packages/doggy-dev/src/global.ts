import { settings } from "@lib";

export const doggy = {
  address: "10.0.0.170:9091",
  overrideDownload: () => settings.getBoolean("override-download", true)
};