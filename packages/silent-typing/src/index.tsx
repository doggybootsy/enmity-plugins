import { implementPlugin } from "@lib";

import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher";

import manifest from "../manifest.json";

import Settings from "./components/Settings";

const Typing = getByProps("startTyping");
const Patcher = create("silent-typing");

implementPlugin({
  ...manifest,

  onStart() {
    Patcher.instead(Typing, "startTyping", () => { });
    Patcher.instead(Typing, "stopTyping", () => { });
  },

  onStop() {
    Patcher.unpatchAll();
  },

  SettingsPanel({ settings }) {
    return <Settings settings={settings} />;
  }
});
