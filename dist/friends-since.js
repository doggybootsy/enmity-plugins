const __jsx__ = Object.assign((...args) => window.enmity.modules.common.React.createElement(...args), window.enmity.modules.common.React);
function registerPlugin(plugin) {
    window.enmity.plugins.registerPlugin(plugin);
}

function create(name) {
    return window.enmity.patcher.create(name);
}

const Constants = window.enmity.modules.common.Constants;
window.enmity.modules.common.Clipboard;
window.enmity.modules.common.Assets;
window.enmity.modules.common.Messages;
window.enmity.modules.common.Clyde;
window.enmity.modules.common.Avatars;
window.enmity.modules.common.Native;
const React = window.enmity.modules.common.React;
window.enmity.modules.common.Dispatcher;
window.enmity.modules.common.Storage;
window.enmity.modules.common.Toasts;
const Dialog = window.enmity.modules.common.Dialog;
window.enmity.modules.common.Token;
window.enmity.modules.common.REST;
window.enmity.modules.common.Settings;
const Users = window.enmity.modules.common.Users;
window.enmity.modules.common.Navigation;
const NavigationNative = window.enmity.modules.common.NavigationNative;
window.enmity.modules.common.NavigationStack;
window.enmity.modules.common.Theme;
const Linking = window.enmity.modules.common.Linking;
const StyleSheet = window.enmity.modules.common.StyleSheet;
window.enmity.modules.common.ColorMap;
window.enmity.modules.common.Components;
const Locale = window.enmity.modules.common.Locale;
const Profiles = window.enmity.modules.common.Profiles;
window.enmity.modules.common.Lodash;
window.enmity.modules.common.Logger;
const Flux = window.enmity.modules.common.Flux;
window.enmity.modules.common.SVG;
window.enmity.modules.common.Scenes;
window.enmity.modules.common.Moment;

function getByProps(...options) {
    return window.enmity.modules.getByProps(...options);
}
function getByTypeName(...options) {
    return window.enmity.modules.getByTypeName(...options);
}
function getByName(...options) {
    return window.enmity.modules.getByName(...options);
}
window.enmity.modules.common;

const { components } = window.enmity;
components.Alert;
components.Button;
components.FlatList;
const Image = components.Image;
components.ImageBackground;
components.KeyboardAvoidingView;
components.Modal;
const Pressable = components.Pressable;
components.RefreshControl;
const ScrollView = components.ScrollView;
components.SectionList;
components.StatusBar;
components.StyleSheet;
components.Switch;
components.Text;
components.TextInput;
components.TouchableHighlight;
components.TouchableOpacity;
components.TouchableWithoutFeedback;
components.Touchable;
const View = components.View;
components.VirtualizedList;
components.Form;
components.FormArrow;
components.FormCTA;
components.FormCTAButton;
components.FormCardSection;
components.FormCheckbox;
const FormDivider$1 = components.FormDivider;
components.FormHint;
components.FormIcon;
components.FormInput;
components.FormLabel;
components.FormRadio;
const FormRow$1 = components.FormRow;
const FormSection$1 = components.FormSection;
components.FormSelect;
components.FormSubLabel;
components.FormSwitch;
components.FormTernaryCheckBox;
components.FormText;
components.FormTextColors;
components.FormTextSizes;

function getIDByName(name) {
  const id = window.enmity.assets.getIDByName(name);
  if (typeof id === "undefined") {
    throw new Error(`Asset Id by the name of '${name}' is undefined`);
  }
  return id;
}

const secret = {"id":"friends-since","manifest":{"name":"FriendsSince","version":"1.0.0","description":"Shows how long you have been friends for","authors":[{"name":"doggybootsy","id":"515780151791976453"}]},"invite":"yYJA3qQE5F"};
const manifest = Object.assign(
  secret.manifest,
  { name: secret.id }
);
const discordInvite = secret.invite;

const FormSection = FormSection$1;
const FormRow = FormRow$1;
const FormDivider = () => __jsx__(FormDivider$1);

const { native } = window.enmity;
function reload() {
    native.reload();
}
native.version;
native.build;
native.device;
native.version;

function openUserProfile(userId) {
  if (!Users.getUser(userId)) {
    window.enmity.modules.common.AsyncUsers.fetchProfile(userId).then(() => {
      Profiles.showUserProfile({ userId });
    });
  } else {
    Profiles.showUserProfile({ userId });
  }
}

const Invites = getByProps("acceptInviteAndTransitionToInviteChannel");
const { Pile, Text: Text$1 } = getByProps("Pile", "Text");
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
  return /* @__PURE__ */ __jsx__(FormRow, {
    label: /* @__PURE__ */ __jsx__(__jsx__.Fragment, null, /* @__PURE__ */ __jsx__(Text$1, {
      variant: "heading-lg/semibold",
      style: sheet.name
    }, prettyName), /* @__PURE__ */ __jsx__(Text$1, {
      variant: "text-md/normal",
      style: sheet.version
    }, "v", manifest.version)),
    trailing: /* @__PURE__ */ __jsx__(Pile, {
      size: BUBBLE_SIZE,
      gap: BUBBLE_SIZE / 8,
      depthX: 0.5,
      depthY: null,
      shape: "circle"
    }, manifest.authors.map(({ name, id }, index) => /* @__PURE__ */ __jsx__(Pressable, {
      onPress: () => {
        if (typeof id === "string")
          openUserProfile(id);
        else
          Linking.openURL(`https://github.com/${name}`);
      },
      key: index
    }, /* @__PURE__ */ __jsx__(Image, {
      src: `https://github.com/${name}.png`,
      style: {
        width: BUBBLE_SIZE,
        height: BUBBLE_SIZE,
        borderRadius: BUBBLE_SIZE
      }
    }))))
  });
}
function Updater() {
  const navigation = NavigationNative.useNavigation();
  return /* @__PURE__ */ __jsx__(FormSection, {
    title: "Updater"
  }, /* @__PURE__ */ __jsx__(FormRow, {
    label: /* @__PURE__ */ __jsx__(__jsx__.Fragment, null, /* @__PURE__ */ __jsx__(Text$1, {
      variant: "heading-md/semibold",
      style: sheet.name
    }, "Attempt to update"), /* @__PURE__ */ __jsx__(Text$1, {
      variant: "text-md/normal",
      style: sheet.version
    }, "Confirm both prompts to update")),
    leading: /* @__PURE__ */ __jsx__(FormRow.Icon, {
      source: getIDByName("ic_sync_24px")
    }),
    onPress: () => {
      (async function() {
        await window.enmity.plugins.uninstallPlugin(manifest.name);
        const url = window.doggy && window.doggy.overrideDownload() ? `http://${window.doggy.address}/${manifest.name}.js` : `https://raw.githubusercontent.com/doggybootsy/enmity-plugins/refs/heads/main/dist/${manifest.name}.js`;
        await window.enmity.plugins.installPlugin(`${url}?${Math.random()}`, ({ data }) => {
          if (navigation.canGoBack())
            navigation.goBack();
          else
            navigation.pop();
          if (data === "installed_plugin") {
            Dialog.show({
              title: "Installed successfully",
              body: "Successfully installed plugin"
            });
            return;
          }
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
    }
  }));
}
function SettingsPanel({ settings, children }) {
  const icons = {
    GitHub: getIDByName("img_account_sync_github_white"),
    Discord: getIDByName("Discord")
  };
  return /* @__PURE__ */ __jsx__(View, null, /* @__PURE__ */ __jsx__(Info, null), /* @__PURE__ */ __jsx__(ScrollView, {
    style: sheet.scroller
  }, /* @__PURE__ */ __jsx__(Updater, null), /* @__PURE__ */ __jsx__(FormSection, {
    title: "Links"
  }, /* @__PURE__ */ __jsx__(FormRow, {
    label: "Support Server",
    leading: /* @__PURE__ */ __jsx__(FormRow.Icon, {
      source: icons.Discord
    }),
    trailing: FormRow.Arrow,
    onPress: () => {
      Invites.acceptInviteAndTransitionToInviteChannel({
        inviteKey: discordInvite,
        context: { location: "Invite Button Embed" },
        callback: () => {
        }
      });
    }
  }), /* @__PURE__ */ __jsx__(FormDivider, null), /* @__PURE__ */ __jsx__(FormRow, {
    label: "Source",
    leading: /* @__PURE__ */ __jsx__(FormRow.Icon, {
      source: icons.GitHub
    }),
    trailing: FormRow.Arrow,
    onPress: () => {
      Linking.openURL(`https://github.com/doggybootsy/enmity-plugins/tree/main/packages/${manifest.name}/`);
    }
  })), children));
}

function set(file, setting, value) {
    window.enmity.settings.set(file, setting, value);
}
function get(file, setting, defaults) {
    return window.enmity.settings.get(file, setting, defaults);
}
function getBoolean(file, setting, defaults) {
    return window.enmity.settings.getBoolean(file, setting, defaults);
}
function toggle(file, setting, defaults) {
    window.enmity.settings.toggle(file, setting, defaults);
}
function subscribe(file, callback) {
    window.enmity.settings.subscribe(file, callback);
}
function unsubscribe(file, callback) {
    window.enmity.settings.unsubscribe(file, callback);
}

const settings = {
  get(setting, value) {
    return get(manifest.name, setting, value);
  },
  set(setting, value) {
    set(manifest.name, setting, value);
  },
  getBoolean(setting, defaults) {
    return getBoolean(manifest.name, setting, defaults);
  },
  toggle(setting, defaults) {
    toggle(manifest.name, setting, defaults);
  },
  subscribe(callback) {
    subscribe(manifest.name, callback);
    return () => unsubscribe(manifest.name, callback);
  },
  unsubscribe(callback) {
    unsubscribe(manifest.name, callback);
  }
};

const patcher = create(manifest.name);
function implementPlugin(plugin) {
  var _a;
  if (typeof plugin === "function")
    plugin = plugin(manifest);
  const call = (name) => {
    if (typeof plugin[name] === "function")
      plugin[name]();
  };
  const $plugin = {
    ...manifest,
    commands: plugin.commands,
    patches: plugin.patches,
    onStart: () => call("onStart"),
    onStop: () => call("onStop"),
    getSettingsPanel: void 0
  };
  const SettingsPage = (_a = plugin.SettingsPanel) != null ? _a : plugin.SettingsPanel = () => null;
  $plugin.getSettingsPanel = () => /* @__PURE__ */ __jsx__(SettingsPanel, {
    settings
  }, /* @__PURE__ */ __jsx__(SettingsPage, {
    settings
  }));
  registerPlugin($plugin);
  $plugin.doggy = {
    manifest,
    settings,
    patcher
  };
  call("onLoad");
}

const {
  Children,
Component,
Fragment,
Profiler,
PureComponent,
StrictMode,
Suspense,
// @ts-expect-error
__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
cloneElement,
createContext,
createElement,
createFactory,
createRef,
forwardRef,
isValidElement,
lazy,
memo,
startTransition,
useCallback,
useContext,
useDebugValue,
useDeferredValue,
useEffect,
useId,
useImperativeHandle,
useInsertionEffect,
useLayoutEffect,
useMemo,
useReducer,
useRef,
useState,
useSyncExternalStore,
useTransition,
version
} = React;

const UserProfileSection = getByName("UserProfileSection");
const { Text } = getByProps("TextStyleSheet", "Text");
function getStore(storeName) {
  return Flux.Store.getAll().find((store) => store.getName() === storeName);
}
const RelationshipStore = getStore("RelationshipStore");
function getCreatedAt(value, lang) {
  if (null == value || "" === value)
    return null;
  const data = new Date(value);
  return !(data instanceof Date) || isNaN(data.getTime()) ? null : data.toLocaleDateString(lang, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function FriendsSinceSection({ userId }) {
  const since = Flux.useStateFromStores([RelationshipStore], () => {
    const since2 = RelationshipStore.getSince(userId);
    if (since2 && RelationshipStore.isFriend(userId))
      return getCreatedAt(since2, Locale.getLocale());
    return null;
  });
  if (!since)
    return;
  return /* @__PURE__ */ __jsx__(UserProfileSection, {
    title: "Friends Since"
  }, /* @__PURE__ */ __jsx__(View, {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }, /* @__PURE__ */ __jsx__(Text, {
    variant: "text-md/normal",
    style: { marginRight: 8 }
  }, since)));
}
const UserProfileContent = getByTypeName("UserProfileContent");
implementPlugin({
  onStart() {
    patcher.after(UserProfileContent, "type", (self, [{ user }], res) => {
      try {
        const children = res.props.children[1].props.children[1].props.children[3].props.children.props.children;
        const index = children.findIndex((value) => isValidElement(value) && value.props.user && "channel" in value.props);
        if (!~index)
          return;
        children.splice(index + 1, 0, /* @__PURE__ */ __jsx__(FriendsSinceSection, {
          userId: user.id
        }));
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
