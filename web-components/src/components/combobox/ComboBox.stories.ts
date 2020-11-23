import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import { comboBoxObjectOptions, comboBoxOptions } from "@/[sandbox]/sandbox.mock";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "ComboBox",
  component: "md-combobox",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-combobox"
    }
  }
};

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const placeholder = text("placeholder", "Add Country");
  const disabled = boolean("Disabled", false);
  const init = boolean("InitialValue", false);
  const customValue = boolean("Cuatom Value", false);
  const multi = boolean("Multi", false);
  const multiInit = boolean("Multi InitialValue", false);
  const object = boolean("Object Data", false);
  const objectInit = boolean("Object Data InitialValue", false);
  const customContent = boolean("Custom Content", false);
  const customContentInit = boolean("Multi Custom Content InitialValue", false);

  if (init) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox placeholder=${placeholder} .options=${comboBoxOptions} ?disabled=${disabled} .value=${[comboBoxOptions[3]]}></md-combobox>
    </md-theme>
    `;
  } else if (multi) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox placeholder=${placeholder} .options=${comboBoxOptions} is-multi></md-combobox>
    </md-theme>`;
  } else if (customValue) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}> 
      <md-combobox placeholder=${placeholder} .options=${comboBoxOptions} is-multi=${multi} allow-custom-value></md-combobox>
    </md-theme>`;
  } else if (multiInit) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox placeholder=${placeholder} .options=${comboBoxOptions} is-multi .value=${[comboBoxOptions[3], comboBoxOptions[5]]}></md-combobox>
    </md-theme>
  `;
  } else if (object) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox placeholder=${placeholder} .options=${comboBoxObjectOptions} option-id="id" option-value="country" is-multi=${multi}></md-combobox>
    </md-theme>`;
  } else if (objectInit) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox
        placeholder=${placeholder}
        .options=${comboBoxObjectOptions}
        option-id="id"
        option-value="country"
        is-multi=${multi}
        .value=${[comboBoxObjectOptions[4]]}
      ></md-combobox>
    </md-theme>
    `;
  } else if (customContent) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox with-custom-content is-multi=${multi}>
        <div slot="one" aria-label="Facebook" display-value="Facebook">
          <span>Facebook</span>
          <md-icon name="icon-facebook_16"></md-icon>
        </div>
        <div slot="two" aria-label="Twitter" display-value="Twitter">
          <span class="company-value">Twitter</span>
          <md-icon name="icon-twitter_16"></md-icon>
        </div>
        <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
          <span class="company-value">Wikipedia</span>
          <md-icon name="icon-wikipedia_16"></md-icon>
        </div>
        <div slot="four" aria-label="Google" display-value="Google">
          <span class="company-value">Google</span>
          <md-icon name="icon-google_16"></md-icon>
        </div>
      </md-combobox>
    </md-theme>`;
  } else if (customContentInit) {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox with-custom-content is-multi .value=${[{ id: "Wikipedia", value: "Wikipedia" }]}>
        <div slot="one" aria-label="Facebook" display-value="Facebook">
          <span>Facebook</span>
          <md-icon name="icon-facebook_16"></md-icon>
        </div>
        <div slot="two" aria-label="Twitter" display-value="Twitter">
          <span class="company-value">Twitter</span>
          <md-icon name="icon-twitter_16"></md-icon>
        </div>
        <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
          <span class="company-value">Wikipedia</span>
          <md-icon name="icon-wikipedia_16"></md-icon>
        </div>
        <div slot="four" aria-label="Google" display-value="Google">
          <span class="company-value">Google</span>
          <md-icon name="icon-google_16"></md-icon>
        </div>
      </md-combobox>
  </md-theme>`;
  } else {
    return html`
    <md-theme class="theme-toggle" id="combobox" ?darkTheme=${darkTheme}>
      <md-combobox .options=${comboBoxOptions} placeholder=${placeholder} ?disabled=${disabled}></md-combobox>
    </md-theme>`;
  }

};
