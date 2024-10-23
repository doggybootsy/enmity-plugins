import { implementPlugin } from "@lib";
import { FormDivider, FormRow, FormSection } from "@lib/components/form";
import { doggy } from "./global";
import { getIDByName } from "@lib/assets";

window.doggy = doggy;

async function installPlugin(id: string) {
  // @ts-expect-error
  if (window.enmity.plugins.getPlugin(id)) {
    // @ts-expect-error
    await window.enmity.plugins.uninstallPlugin("friends-since")
  }
  
  // @ts-expect-error
  window.enmity.plugins.installPlugin(`http://${doggy.address}/${id}.js`);
}

implementPlugin({
  SettingsPanel({ settings }) {
    return (
      <FormSection title="Install Plugins">
        {[ "doggy-dev", "friends-since" ].map((id, index, array) => (
          <__jsx__.Fragment key={id}>
            <FormRow 
              label={id}
              leading={<FormRow.Icon source={getIDByName("ic_activity_24px")} />}
              onPress={() => {
                installPlugin(id);
              }}
            />
            {index !== (array.length - 1) && <FormDivider />}
          </__jsx__.Fragment>
        ))}
      </FormSection>
    )
  }
});