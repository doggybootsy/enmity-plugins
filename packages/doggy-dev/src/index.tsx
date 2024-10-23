import { implementPlugin, LibManifest } from "@lib";
import { FormDivider, FormRow, FormSection, FormSwitch } from "@lib/components/form";
import { doggy } from "./global";
import { getIDByName } from "@lib/assets";
import { Constants, StyleSheet } from "enmity/metro/common";
import { getByProps } from "enmity/metro";

const { Text } = getByProps("TextStyleSheet", "Text");

window.doggy = doggy;

async function installPlugin(id: string) {
  if (window.enmity.plugins.getPlugin(id)) {
    await window.enmity.plugins.uninstallPlugin("friends-since")
  }
  
  window.enmity.plugins.installPlugin(`http://${doggy.address}/${id}.js`);
}

const data: {
  plugins: LibManifest[]
} = (
  // @ts-expect-error
  __doggy_dev_data__
);

const styles = StyleSheet.createThemedStyleSheet({
  version: {
    color: Constants.ThemeColorMap.HEADER_SECONDARY
  }
});

implementPlugin({
  SettingsPanel({ settings }) {
    return (
      <>
        <FormSection title="Settings">
          <FormRow
            label="Override Download URL"
            subLabel={"When this is disabled it will use github\nThis may break updating when disabled"}
            trailing={
              <FormSwitch
                value={settings.getBoolean("override-download", true)}
                onValueChange={() => settings.toggle("override-download", true)}
              />
            }
          />
        </FormSection>
        <FormSection title="Install Plugins">
          {data.plugins.map((manifest, index, array) => (
            <__jsx__.Fragment key={index}>
              <FormRow 
                label={manifest.name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ")}
                subLabel={manifest.description}
                leading={<FormRow.Icon source={getIDByName("ic_activity_24px")} />}
                disabled={manifest.name === "doggy-dev"}
                trailing={(
                  <Text style={styles.version}>v{manifest.version}</Text>
                )}
                onPress={() => {
                  installPlugin(manifest.name);
                }}
              />
              {index !== (array.length - 1) && <FormDivider />}
            </__jsx__.Fragment>
          ))}
        </FormSection>
      </>
    )
  }
});