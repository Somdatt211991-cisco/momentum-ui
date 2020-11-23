import { withA11y } from "@storybook/addon-a11y";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { badgeColor, BarType, iconSamples, iconColorSample } from "@/utils/enums";
import "@/components/icon/Icon";
import "@/components/chip/Chip";
import "@/components/theme/Theme";

export default {
  title: "Chip",
  component: "md-chip",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-chip"
    }
  }
};


export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const color = select("Color", badgeColor, "blue");
  const bgColor = text("BG Color Overrides", "blue");
  const textColor = text("Text Color Override", "white");
  const height = text("Height Override", "");
  const valueText = text("value text", "replace this with long string");
  const small = boolean("Small", false);
  const disabled = boolean("Disabled", false);
  const readonly = boolean("readonly", false);
  const isLoad = boolean("If Loading", false);
  const slot = boolean("Slotted Content", false);
  const iconSet = boolean("Add Icon", false);

  if (isLoad) {
    const options = {range: true, min: 0, max: 100, step: 1};
    const type = select("load type", BarType, "indeterminate");
    const value = number("loading", 75, options);

    return type === "indeterminate"
      ? html`
        <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme}>
          <md-chip value="example-chip@cisco.com" indeterminateProgress> </md-chip>
        </md-theme>`
      : html`
        <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme}>
          <md-chip value="example-chip@cisco.com" determinateProgress="${value}"> </md-chip>
        </md-theme>`;
  } else if (slot) {
    return html`
    <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme}>
      <md-chip value="example-chip@cisco.com">
        <md-icon name="icon-alert_16" slot="custom-left-content"></md-icon>
        <md-icon name="icon-alarm_16" slot="custom-right-content"></md-icon>
      </md-chip>
    <md-theme>
    `;
  } else if (iconSet) {
    const icon = select("icon", iconSamples, "");
    const colorIcon = select("icon color", iconColorSample, "");

    return html`
    <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme}>
      <md-chip value="example-chip@cisco.com" icon="${icon}" iconColor="${colorIcon}"> </md-chip>
    </md-theme>`;
  } else {
    return html`
      <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme}>
        <md-chip .color=${color} .bgColor=${bgColor} .textColor=${textColor} .small=${small} .height=${height} .value="${valueText}" .disabled=${disabled} ?readonly=${readonly}></md-chip>
      </md-theme>
    `;
  }
};
