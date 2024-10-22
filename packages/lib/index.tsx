import type { Command } from "enmity/api/commands";
import type { SettingsStore } from "enmity/api/settings";
import type { EntityAuthor } from "enmity/common";
import type { Patcher } from "enmity/patcher";
import { registerPlugin, type Plugin } from "enmity/managers/plugins";
import { SettingsPanel } from "./settings";

interface LibPlugin {
  name: string;
  description: string;
  color?: string;
  version: string;
  authors: EntityAuthor[] | string[];
  commands?: Command[];
  patches?: Patcher[];
  SettingsPanel?: React.ComponentType<{ settings: SettingsStore }>;
  onStart?(): void;
  onStop?(): void;
  onEnable?(): void;
  onDisable?(): void;
}

export function implementPlugin(plugin: LibPlugin) {
  const $plugin: Plugin = {
    ...plugin,
    onStart() {
      plugin.onStart?.();
    },
    onStop() {
      plugin.onStop?.();
    },
    getSettingsPanel: undefined
  }

  const SettingsPage: React.ComponentType<{ settings: SettingsStore }> = plugin.SettingsPanel ??= () => null;
  
  // @ts-expect-error wrong types here too?
  $plugin.getSettingsPanel = ({ settings }) => (
    <SettingsPanel settings={settings} name={plugin.name}>
      <SettingsPage settings={settings} />
    </SettingsPanel>
  );

  registerPlugin($plugin);
}
