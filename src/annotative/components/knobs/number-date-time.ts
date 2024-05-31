// Lit
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

// Types
import { PopupStyle } from '../../types/types.js';

// Default values
import { DEFAULT_POPUP_STYLE } from '../../constants/defaultValues.js';

// Components
import { inputStyle } from '../../styles/knobs/input.js';

export class AnnotativeKnobNumberDateTime extends LitElement {
  static override styles = [
    inputStyle,
    css`
      .min-max-label {
        display: inline-block;
        vertical-align: top;
        transform: translateY(8px);
      }
    `,
  ];

  @property({ attribute: 'type' })
  type = 'number';

  @property({ attribute: 'config' })
  config = { max: null, min: null };

  @property({ attribute: 'popupStyle' })
  popupStyle: PopupStyle = DEFAULT_POPUP_STYLE;

  @property({ attribute: 'value' })
  value = 0;

  @property({ attribute: 'onChange' })
  onChange = () => {};

  override render() {
    const isRange = this.type === 'range';
    return html`
      ${isRange && this.config.min !== 0 && this.config.min
        ? html`<div class="min-max-label">${this.config.min}</div>`
        : ''}
      <input
        class="number"
        type=${this.type === 'integer' ? 'number' : this.type}
        style=${styleMap({
          color: this.popupStyle.textColor,
          border: `1px solid ${this.popupStyle.inputBorderColor}`,
        })}
        min=${this.config.min}
        max=${this.config.max}
        .value=${this.value}
        @change=${this.onChange}
      />
      ${isRange && this.config.max !== 0 && this.config.max
        ? html`<div class="min-max-label">${this.config.max}</div>`
        : ''}
    `;
  }
}
customElements.get('annotative-code-knob-number-date-time') ||
  customElements.define(
    'annotative-code-knob-number-date-time',
    AnnotativeKnobNumberDateTime,
  );
