import { Constants, Dialog, Linking, NavigationNative, StyleSheet } from "enmity/metro/common";
import { getByProps } from "enmity/metro";
import { Image, Pressable, ScrollView, View } from "enmity/components";

import { getIDByName } from "./assets";
import { discordInvite, manifest } from "./info";
import { FormDivider, FormRow, FormSection } from "./components/form";
import { reload } from "enmity/api/native";
import { openUserProfile } from "./util";
import { Settings } from "./settings";

const Invites = getByProps("acceptInviteAndTransitionToInviteChannel");

const { Pile, Text } = getByProps("Pile", "Text");

const prettyName = manifest.name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");

const sheet = StyleSheet.createThemedStyleSheet({
  name: {
    color: Constants.ThemeColorMap.HEADER_PRIMARY
  },
  version: {
    color: Constants.ThemeColorMap.HEADER_SECONDARY
  },
  scroller: {
    height: "100%"
  }
});

const BUBBLE_SIZE = 32;

function Info() {
  return (
    <FormRow 
      label={(
        <>
          <Text variant="heading-lg/semibold" style={sheet.name}>{prettyName}</Text>
          <Text variant="text-md/normal" style={sheet.version}>v{manifest.version}</Text>
        </>
      )}
      // leading={<FormRow.Icon source={getIDByName("ic_activity_24px")} />}
      trailing={(
        <Pile size={BUBBLE_SIZE} gap={BUBBLE_SIZE / 8} depthX={.5} depthY={null} shape="circle">
          {manifest.authors.map(({ name, id }, index) => (
            <Pressable 
              onPress={() => {
                if (typeof id === "string") openUserProfile(id!);
                else Linking.openURL(`https://github.com/${name}`);
              }} 
              key={index}
            >
              <Image 
                src={`https://github.com/${name}.png`} 
                style={{
                  width: BUBBLE_SIZE, 
                  height: BUBBLE_SIZE, 
                  borderRadius: BUBBLE_SIZE
                }} 
              />
            </Pressable>
          ))}
        </Pile>
      )}
    />
  );
}

function Updater() {
  const navigation = NavigationNative.useNavigation();

  return (
    <FormSection title="Updater">
      <FormRow 
        label={(
          <>
            <Text variant="heading-md/semibold" style={sheet.name}>Attempt to update</Text>
            <Text variant="text-md/normal" style={sheet.version}>Confirm both prompts to update</Text>
          </>
        )}
        leading={<FormRow.Icon source={getIDByName("ic_sync_24px")} />}
        // disabled
        onPress={() => {
          (async function() {
            // @ts-expect-error
            await window.enmity.plugins.uninstallPlugin(manifest.name);

            const url = window.doggy && window.doggy.overrideDownload() ? (
              `http://${window.doggy.address}/${manifest.name}.js`
            ) : (
              `https://raw.githubusercontent.com/doggybootsy/enmity-plugins/refs/heads/main/dist/${manifest.name}.js`
            );

            // @ts-expect-error
            await window.enmity.plugins.installPlugin(`${url}?${Math.random()}`, ({ data }) => {
              if (navigation.canGoBack()) navigation.goBack();
              else navigation.pop();

              if (data === "installed_plugin") {
                Dialog.show({
                  title: "Installed successfully",
                  body: "Successfully installed plugin"
                });

                return;
              }
              // Shouldnt be possible but
              // https://github.com/domi-btnr/Enmity-Stuff/blob/151b2cd98cd57b5653a61453f5beb2a7f098db89/common/pluginUpdater.ts#L117
              if (data === "overridden_plugin") {
                Dialog.show({
                  title: "Installed successfully",
                  body: "Successfully replaced plugin\nWould you like to reload Discord?",
                  confirmText: "Reload",
                  cancelText: "Later",
                  onConfirm: reload
                });

                return;
              }
              Dialog.show({
                title: "Installed Failed",
                body: "Was not able to update plugin"
              });
            });  
          })();
        }}
      />
    </FormSection>
  );
}

export function SettingsPanel({ settings, children }: React.PropsWithChildren<{ settings: Settings }>) {
	const icons = {
		GitHub: getIDByName("img_account_sync_github_white"),
		Discord: getIDByName("Discord"),
	};
  
  return (
    <View>
      <Info />
      <ScrollView style={sheet.scroller}>
        <Updater />
        <FormSection title="Links">
          <FormRow 
            label="Support Server"
            leading={<FormRow.Icon source={icons.Discord} />}
            trailing={FormRow.Arrow}
            onPress={() => {
              Invites.acceptInviteAndTransitionToInviteChannel({
                inviteKey: discordInvite,
                context: { location: "Invite Button Embed" },
                callback: () => { }
              });
            }}
          />
          <FormDivider />
          <FormRow 
            label="Source"
            leading={<FormRow.Icon source={icons.GitHub} />}
            trailing={FormRow.Arrow}
            onPress={() => {
              Linking.openURL(`https://github.com/doggybootsy/enmity-plugins/tree/main/packages/${manifest.name}/`);
            }}
          />
        </FormSection>
        {children}
      </ScrollView>
    </View>
  )
}