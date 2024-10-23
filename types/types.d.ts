declare const __jsx__ = Object.assign(React["createElement"], React);

declare namespace NodeJS {
  interface ProcessEnv {
    PLUGIN_ID: string;
    DISCORD_INVITE: string;
  }
}

// global.d.ts
interface Window {
  doggy: typeof import("../packages/doggy-dev/src/global")["doggy"];
}
