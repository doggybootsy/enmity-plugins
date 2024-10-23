import type { EntityAuthor } from "enmity/common";

export interface LibManifest {
  name: string;
  description: string;
  color?: string;
  version: string;
  authors: EntityAuthor[];
}

interface LibSecretInfo {
  manifest: LibManifest,
  invite: string,
  id: string
}

const secret: LibSecretInfo = (
  // @ts-expect-error unexposed pseudo var
  __lib_meta_data__
);

export const manifest: LibManifest = Object.assign(
  secret.manifest,
  // Because of the filename not being the same as the plugin name
  // enmity will error. because idk?
  { name: secret.id }
);

export const discordInvite = secret.invite;
