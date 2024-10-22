// @ts-nocheck

import type { SettingsStore } from "enmity/api/settings"
import { FormDivider, FormRow, FormSection, Text, View } from "enmity/components"
import { Linking } from "enmity/metro/common";
import { getByProps } from "enmity/metro";
import { Component } from "react";

interface SettingsPanelProps extends React.PropsWithChildren {
  settings: SettingsStore,
  name: string
}

const Invites = getByProps("acceptInviteAndTransitionToInviteChannel");

const getIdByName = window.enmity.assets.getIDByName;

class ErrorBoundary extends Component<React.PropsWithChildren, { hasError: boolean }> {
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) return <Text>React Error</Text>;
    return this.props.children;
  }
}

export function SettingsPanel({ settings, name, children }: SettingsPanelProps) {
	const Icons = {
		GitHub: getIdByName("img_account_sync_github_white"),
		Refresh: getIdByName("ic_sync_24px"),
		Discord: getIdByName("Discord"),
	};
  
  return (
    <View>
      <FormSection title="Links">
        <FormRow 
          label="Support Server"
          leading={<FormRow.Icon source={Icons.Discord} />}
          trailing={FormRow.Arrow}
          onPress={() => {
            Invites.acceptInviteAndTransitionToInviteChannel({
              inviteKey: process.env.DISCORD_INVITE,
              context: { location: "Invite Button Embed" },
              callback: () => { }
            });
          }}
        />
        <FormDivider />
        <FormRow 
          label="Source"
          leading={<FormRow.Icon source={Icons.GitHub} />}
          trailing={FormRow.Arrow}
          onPress={() => {
            Linking.openURL(`https://github.com/doggybootsy/enmity-plugins/tree/main/packages/${name}/`);
          }}
        />
      </FormSection>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </View>
  )
}