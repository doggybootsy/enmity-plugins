import type { Command } from "enmity/api/commands";
import { registerPlugin, type Plugin } from "enmity/managers/plugins";
import { create, type Patcher } from "enmity/patcher";
import { SettingsPanel } from "./settings-panel";
import { LibManifest, manifest } from "./info";
import { settings } from "./settings";
import { SettingsStore } from "enmity/api/settings";

export { manifest, LibManifest } from "./info";

export * as assets from "./assets";
export * from "./settings";

export interface LibPlugin {
  commands?: Command[];
  patches?: Patcher[];
  SettingsPanel?: React.ComponentType<{ settings: SettingsStore }>;
  onStart?(): void;
  onStop?(): void;
  onLoad?(): void;
  // onEnable?(): void;
  // onDisable?(): void;
}
export const patcher = create(manifest.name);

export function implementPlugin(plugin: LibPlugin | ((manifest: LibManifest) => LibPlugin)) {
  if (typeof plugin === "function") plugin = plugin(manifest);

  const call = (name: "onStart" | "onStop" | "onLoad") => {
    if (typeof plugin[name] === "function") plugin[name]();
  }

  const $plugin: Plugin = {
    ...manifest,
    commands: plugin.commands,
    patches: plugin.patches,
    onStart: () => call("onStart"),
    onStop: () => call("onStop"),
    getSettingsPanel: undefined
  }

  const SettingsPage: React.ComponentType<{ settings: SettingsStore }> = plugin.SettingsPanel ??= () => null;
  
  // @ts-expect-error one of many incorrect types
  $plugin.getSettingsPanel = () => (
    <SettingsPanel settings={settings}>
      <SettingsPage settings={settings} />
    </SettingsPanel>
  );

  registerPlugin($plugin);

  // @ts-expect-error
  $plugin.doggy = {
    manifest, settings, patcher
  }

  call("onLoad");
}
