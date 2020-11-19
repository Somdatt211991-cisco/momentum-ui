import "@/components/datepicker/datepicker-calendar/DatePickerCalendar";
import { addDays, addWeeks, DayFilters, isDayDisabled, now, subtractDays, subtractWeeks } from "@/utils/dateUtils";
import { customElement, html, LitElement, property, PropertyValues, query } from "lit-element";
import { DateTime } from "luxon";
import "../input/Input";
import "../menu-overlay/MenuOverlay";
import { MenuOverlay } from "../menu-overlay/MenuOverlay";

export namespace DatePicker {}

@customElement("md-datepicker")
export class DatePicker extends LitElement {
  @property({ type: Boolean }) shouldCloseOnSelect = true;
  @property({ attribute: false }) locale: string = now().locale;
  @property({ attribute: false }) monthFormat = undefined;
  @property({ attribute: false }) maxDate: DateTime | undefined = undefined;
  @property({ attribute: false }) minDate: DateTime | undefined = undefined;
  @property({ attribute: false }) selectedDate: DateTime = now();
  @property({ attribute: false }) focusedDate: DateTime = now();
  @property({ attribute: false }) filterDate: Function | undefined = undefined;
  @property({ attribute: false }) onChange: Function | undefined = undefined;
  @property({ attribute: false }) onMonthChange: Function | undefined = undefined;
  @property({ attribute: false }) onSelect: Function | undefined = undefined;

  @query("md-menu-overlay") menuOverlay!: MenuOverlay;

  connectedCallback() {
    super.connectedCallback();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    console.log("top updated");
  }
  update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    console.log("top update");
  }

  setOpen = (open: boolean): void => {
    this.menuOverlay.isOpen = open;
  };

  handleSelect = (e: CustomEvent): void => {
    const date = e.detail.date;
    const event = e.detail.sourceEvent;
    this.setPreSelection(date, event);
    this.setSelected(date, event);
    this.shouldCloseOnSelect && this.setOpen(false);
  };

  setSelected = (date: DateTime, event: Event): void => {
    const filters: DayFilters = { maxDate: this.maxDate, minDate: this.minDate, filterDate: this.filterDate };
    !isDayDisabled(date, filters) ? (this.selectedDate = date) : null;
    this.onSelect && this.onSelect(event, date);
  };

  setPreSelection = (date: DateTime, event: KeyboardEvent): void => {
    const filters: DayFilters = { maxDate: this.maxDate, minDate: this.minDate, filterDate: this.filterDate };
    !isDayDisabled(date, filters) ? (this.focusedDate = date) : null;
    this.onChange && this.onChange(event, date);
  };

  handleKeyDown = (e: CustomEvent) => {
    const event = e.detail.sourceEvent;
    console.log(event);
    let flag = false;
    const copy = this.focusedDate;

    switch (!event.shiftKey && event.code) {
      case "Space":
      case "Enter":
        this.handleSelect(e);
        flag = true;
        break;

      case "Escape":
        this.setOpen(false);
        break;
      case "ArrowUp":
        this.setPreSelection(subtractWeeks(copy, 1), event);
        flag = true;
        break;
      case "ArrowLeft":
        this.setPreSelection(subtractDays(copy, 1), event);
        flag = true;
        break;

      case "ArrowRight":
        this.setPreSelection(addDays(copy, 1), event);
        flag = true;
        break;

      case "ArrowDown":
        this.setPreSelection(addWeeks(copy, 1), event);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  render() {
    return html`
      <md-menu-overlay custom-width="248px">
        <md-input slot="menu-trigger" placeholder=${this.selectedDate.toLocaleString()}></md-input>
        <md-datepicker-calendar
          @day-select=${(e: CustomEvent) => this.handleSelect(e)}
          @day-key-event=${(e: CustomEvent) => this.handleKeyDown(e)}
          .datePickerProps=${{ selected: this.selectedDate, focused: this.focusedDate }}
          .filterParams=${{ minDate: this.minDate, maxDate: this.maxDate, filterDate: this.filterDate }}
        ></md-datepicker-calendar>
      </md-menu-overlay>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-datepicker": DatePicker;
  }
}