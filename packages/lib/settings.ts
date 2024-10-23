import { get, getBoolean, type Serializable, set, subscribe, toggle, unsubscribe } from "enmity/api/settings";
import { manifest } from "./info";

export interface Settings {
  get<T extends Serializable>(setting: string, value?: T): T | undefined;
  get<T extends Serializable>(setting: string, value: T): T;
  set(setting: string, value: Serializable): void;
  getBoolean(setting: string, defaults?: boolean): boolean;
  toggle(setting: string, defaults?: boolean): void;
  subscribe(callback: (...args: any[]) => any): () => void;
  unsubscribe(callback: (...args: any[]) => any): void
}

export const settings: Settings = { 
  get<T extends Serializable>(setting: string, value: T): T {
    return get(manifest.name, setting, value) as T;
  },
  set(setting: string, value: Serializable) {
    set(manifest.name, setting, value);
  },
  getBoolean(setting: string, defaults?: boolean) {
    return getBoolean(manifest.name, setting, defaults);
  },
  toggle(setting: string, defaults?: boolean) {
    toggle(manifest.name, setting, defaults);
  },
  subscribe(callback: (...args: any[]) => any) {
    subscribe(manifest.name, callback);
    return () => unsubscribe(manifest.name, callback);
  },
  unsubscribe(callback: (...args: any[]) => any) {
    unsubscribe(manifest.name, callback);
  }
}