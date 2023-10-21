// Lit
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

// Utilities
import { getKnobType } from '../utilities/utilities.js';

// Types
import { AnnotationConfig, PopupStyle } from '../types/types.js';

// Default values
import { DEFAULT_POPUP_STYLE } from '../constants/defaultValues.js';

// Components
import './knobs/switch.js';
import './knobs/number-date-time.js';
import './knobs/string.js';
import './knobs/select.js';

export class AnnotativeKnob extends LitElement {
  static override styles = [];

  @property({ attribute: 'key' })
  key = '';

  @property({ attribute: 'config' })
  config: AnnotationConfig = { type: 'string', value: '' };

  @property({ attribute: 'popupStyle' })
  popupStyle: PopupStyle = DEFAULT_POPUP_STYLE;

  @property({ attribute: 'onChange' })
  // @ts-ignore
  onChange = (key: string, event: Event) => {};

  override render() {
    const { isEditable, type, knob = '', value } = this.config;
    const knobType = getKnobType(type, knob);

    return html`<div>
      ${!isEditable
        ? ''
        : ['string'].includes(knobType)
        ? html`<annotative-code-knob-string
            .type=${knobType}
            .popupStyle=${this.popupStyle}
            .value=${value}
            .onChange=${(event: Event) => this.onChange(this.key, event)}
          />`
        : [
            'number',
            'integer',
            'date',
            'time',
            'datetime-local',
            'range',
          ].includes(knobType)
        ? html`<annotative-code-knob-number-date-time
            .type=${knobType}
            .config=${this.config}
            .popupStyle=${this.popupStyle}
            .value=${value}
            .onChange=${(event: Event) => this.onChange(this.key, event)}
          />`
        : ['boolean'].includes(knobType)
        ? html`<annotative-code-knob-switch
            .config=${this.config}
            .checked=${value === true}
            .onChange=${(event: Event) => this.onChange(this.key, event)}
          />`
        : ['select'].includes(knobType)
        ? html`<annotative-code-knob-select
            .config=${this.config}
            .popupStyle=${this.popupStyle}
            .value=${value}
            .onChange=${(event: Event) => this.onChange(this.key, event)}
          />`
        : ['color'].includes(knobType)
        ? html`<input
            type="color"
            .value=${value}
            @change=${(event: Event) => this.onChange(this.key, event)}
          />`
        : ''}
    </div>`;
  }
}

customElements.get('annotative-code-knob') ||
  customElements.define('annotative-code-knob', AnnotativeKnob);
