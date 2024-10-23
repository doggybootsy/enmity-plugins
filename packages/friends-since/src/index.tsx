import { implementPlugin, patcher } from "@lib";

import { getByName, getByProps, getByTypeName } from "enmity/metro";
import { View } from "enmity/components";
import { Flux, Locale } from "enmity/metro/common";

import { isValidElement } from "react";

const UserProfileSection = getByName("UserProfileSection");
const { Text } = getByProps("TextStyleSheet", "Text");

function getStore(storeName: string) {
  return Flux.Store.getAll().find((store: any) => store.getName() === storeName);
}

const RelationshipStore = getStore("RelationshipStore");

function getCreatedAt(value: Date | string | number, lang?: string) {
  if (null == value || "" === value) return null;
  const data = new Date(value);
  return !(data instanceof Date) || isNaN(data.getTime()) ? null : data.toLocaleDateString(lang, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function FriendsSinceSection({ userId }: { userId: string }) {
  const since = Flux.useStateFromStores([ RelationshipStore ], () => {
    const since = RelationshipStore.getSince(userId);

    if (since && RelationshipStore.isFriend(userId)) return getCreatedAt(since, (Locale as unknown as { getLocale(): string }).getLocale());
    return null;
  });
  
  if (!since) return;

  return (
    <UserProfileSection title="Friends Since">
      <View 
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text variant="text-md/normal" style={{ marginRight: 8 }}>
          {since}
        </Text>
      </View>
    </UserProfileSection>
  );
}

const UserProfileContent = getByTypeName("UserProfileContent");

implementPlugin({
  onStart() {
    patcher.after(UserProfileContent, "type", (self, [{ user }], res: React.ReactElement) => {
      try {
        const children: React.ReactNode[] = res.props.children[1].props.children[1].props.children[3].props.children.props.children;
        
        const index = children.findIndex((value) => isValidElement(value) && value.props.user && "channel" in value.props);      
        
        // if index is `-1` just noop
        if (!~index) return;

        children.splice(index + 1, 0, <FriendsSinceSection userId={user.id} />);
      } catch (error) {
        
      } finally {
        return res;
      }
    });
  },
  onStop() {
    patcher.unpatchAll();
  }
});
