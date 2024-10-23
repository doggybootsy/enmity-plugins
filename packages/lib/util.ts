import { Profiles, Users } from "enmity/metro/common";

export function openUserProfile(userId: string) {
  if (!Users.getUser(userId)) {
    window.enmity.modules.common.AsyncUsers.fetchProfile(userId).then(() => {
      Profiles.showUserProfile({ userId });
    });
  } else {
    Profiles.showUserProfile({ userId });
  }
}