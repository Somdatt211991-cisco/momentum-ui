import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-html";
import { alertTypes } from "@/utils/enums";
import { action } from '@storybook/addon-actions';
import "@/components/alert/Alert";
import "@/components/theme/Theme";

export default {
  title: "Alert",
  component: "md-alert",
  decorators: [withKnobs, withA11y],
  argTypes: {
    renderIconTemplate: { table: { disable: true } },
    alertClassMap: { table: { disable: true } },
    internalClose: {description: 'By default closing internally, othervise - controlling outer via .show',}
  },
  parameters: {
    a11y: {
      element: "md-alert"
    }
  }
};

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const show = boolean("Show", true);
  const title = text("Title", "Alert");
  const message = text("Message", "Who is awesome? You are!");
  const type = select("Size", alertTypes, "default");
  const closable = boolean("clossable", true);
  const inline = boolean("Inline", false);

  return html`
    <md-theme class="theme-toggle" id="alert" ?darkTheme=${darkTheme}>
      <md-alert @alert-close=${(action('dispatchEvent'))} title=${title} message=${message} type=${type} ?closable=${closable} ?show=${show} .inline=${inline}></md-alert>
    </md-theme>
  `;
};
