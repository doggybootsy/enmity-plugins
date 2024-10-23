const o=Object.assign((...e)=>window.enmity.modules.common.React.createElement(...e),window.enmity.modules.common.React);function I(e){window.enmity.plugins.registerPlugin(e)}function C(e){return window.enmity.patcher.create(e)}const S=window.enmity.modules.common.Constants;window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native,window.enmity.modules.common.React,window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts;const d=window.enmity.modules.common.Dialog;window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings;const x=window.enmity.modules.common.Users;window.enmity.modules.common.Navigation;const A=window.enmity.modules.common.NavigationNative;window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme;const f=window.enmity.modules.common.Linking,R=window.enmity.modules.common.StyleSheet;window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale;const b=window.enmity.modules.common.Profiles;window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function u(...e){return window.enmity.modules.getByProps(...e)}window.enmity.modules.common;const{components:n}=window.enmity;n.Alert,n.Button,n.FlatList;const k=n.Image;n.ImageBackground,n.KeyboardAvoidingView,n.Modal;const D=n.Pressable;n.RefreshControl;const L=n.ScrollView;n.SectionList,n.StatusBar,n.StyleSheet,n.Switch,n.Text,n.TextInput,n.TouchableHighlight,n.TouchableOpacity,n.TouchableWithoutFeedback,n.Touchable;const _=n.View;n.VirtualizedList,n.Form,n.FormArrow,n.FormCTA,n.FormCTAButton,n.FormCardSection,n.FormCheckbox;const B=n.FormDivider;n.FormHint,n.FormIcon,n.FormInput,n.FormLabel,n.FormRadio;const $=n.FormRow,E=n.FormSection;n.FormSelect,n.FormSubLabel;const N=n.FormSwitch;n.FormTernaryCheckBox,n.FormText,n.FormTextColors,n.FormTextSizes;function w(e){const i=window.enmity.assets.getIDByName(e);if(typeof i=="undefined")throw new Error(`Asset Id by the name of '${e}' is undefined`);return i}const g={id:"silent-typing",manifest:{name:"SilentTyping",version:"1.0.0",description:"Silences your typing indicator.",authors:[{name:"eternal",id:"263689920210534400"},{name:"doggybootsy",id:"515780151791976453"}]},invite:"yYJA3qQE5F"},t=Object.assign(g.manifest,{name:g.id}),U=g.invite,v=E,m=$,M=()=>o(B),V=N,{native:l}=window.enmity;function j(){l.reload()}l.version,l.build,l.device,l.version;function H(e){x.getUser(e)?b.showUserProfile({userId:e}):window.enmity.modules.common.AsyncUsers.fetchProfile(e).then(()=>{b.showUserProfile({userId:e})})}const G=u("acceptInviteAndTransitionToInviteChannel"),{Pile:O,Text:F}=u("Pile","Text"),Y=t.name.split("-").map(e=>e[0].toUpperCase()+e.slice(1)).join(" "),y=R.createThemedStyleSheet({name:{color:S.ThemeColorMap.HEADER_PRIMARY},version:{color:S.ThemeColorMap.HEADER_SECONDARY},scroller:{height:"100%"}}),a=32;function z(){return o(m,{label:o(o.Fragment,null,o(F,{variant:"heading-lg/semibold",style:y.name},Y),o(F,{variant:"text-md/normal",style:y.version},"v",t.version)),trailing:o(O,{size:a,gap:a/8,depthX:.5,depthY:null,shape:"circle"},t.authors.map(({name:e,id:i},s)=>o(D,{onPress:()=>{typeof i=="string"?H(i):f.openURL(`https://github.com/${e}`)},key:s},o(k,{src:`https://github.com/${e}.png`,style:{width:a,height:a,borderRadius:a}}))))})}function W(){const e=A.useNavigation();return o(v,{title:"Updater"},o(m,{label:"Attempt to update",subLabel:"Confirm both prompts to update",leading:o(m.Icon,{source:w("ic_sync_24px")}),onPress:()=>{(async function(){await window.enmity.plugins.uninstallPlugin(t.name);const i=window.doggy&&window.doggy.overrideDownload()?`http://${window.doggy.address}/${t.name}.js`:`https://raw.githubusercontent.com/doggybootsy/enmity-plugins/refs/heads/main/dist/${t.name}.js`;await window.enmity.plugins.installPlugin(`${i}?${Math.random()}`,({data:s})=>{if(e.canGoBack()?e.goBack():e.pop(),s==="installed_plugin"){d.show({title:"Installed successfully",body:"Successfully installed plugin"}),setTimeout(()=>{e.push("EnmityCustomPage",{pageName:t.name,pagePanel:window.enmity.plugins.getPlugin(t.name).getSettingsPanel})});return}if(s==="overridden_plugin"){d.show({title:"Installed successfully",body:`Successfully replaced plugin
Would you like to reload Discord?`,confirmText:"Reload",cancelText:"Later",onConfirm:j});return}d.show({title:"Installed Failed",body:"Was not able to update plugin"})})})()}}))}function K({settings:e,children:i}){const s={GitHub:w("img_account_sync_github_white"),Discord:w("Discord")};return o(_,null,o(z,null),o(L,{style:y.scroller},o(W,null),o(v,{title:"Links"},o(m,{label:"Support Server",leading:o(m.Icon,{source:s.Discord}),trailing:m.Arrow,onPress:()=>{G.acceptInviteAndTransitionToInviteChannel({inviteKey:U,context:{location:"Invite Button Embed"},callback:()=>{}})}}),o(M,null),o(m,{label:"Source",leading:o(m.Icon,{source:s.GitHub}),trailing:m.Arrow,onPress:()=>{f.openURL(`https://github.com/doggybootsy/enmity-plugins/tree/main/packages/${t.name}/`)}})),i))}function q(e){return window.enmity.settings.makeStore(e)}const p=q(t.name),r=C(t.name);function J(e){var i;typeof e=="function"&&(e=e(t));const s=h=>{typeof e[h]=="function"&&e[h]()},c={...t,commands:e.commands,patches:e.patches,onStart:()=>s("onStart"),onStop:()=>s("onStop"),getSettingsPanel:void 0},P=(i=e.SettingsPanel)!=null?i:e.SettingsPanel=()=>null;c.getSettingsPanel=()=>o(K,{settings:p},o(P,{settings:p})),I(c),c.doggy={manifest:t,settings:p,patcher:r},s("onLoad")}var Q=({settings:e})=>o(m,{label:"Example Setting",trailing:o(V,{value:e.getBoolean("example",!0),onValueChange:()=>e.toggle("example",!0)})});const T=u("startTyping");J({onStart(){r.instead(T,"startTyping",()=>{}),r.instead(T,"stopTyping",()=>{})},onStop(){r.unpatchAll()},SettingsPanel({settings:e}){return o(Q,{settings:e})}});
