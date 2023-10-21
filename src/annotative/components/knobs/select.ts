// Lit
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

// Types
import { PopupStyle } from '../../types/types.js';

// Default values
import { DEFAULT_POPUP_STYLE } from '../../constants/defaultValues.js';

// Components
import { inputStyle } from '../../styles/knobs/input.js';

export class AnnotativeKnobSelect extends LitElement {
  static override styles = [inputStyle];

  @property({ attribute: 'config' })
  config = { options: [] };

  @property({ attribute: 'popupStyle' })
  popupStyle: PopupStyle = DEFAULT_POPUP_STYLE;

  @property({ attribute: 'value' })
  value = 0;

  @property({ attribute: 'onChange' })
  onChange = () => {};

  override render() {
    const options = this.config.options as any[];

    if (!options || options.length === 0) return '';

    return html`
      <select
        @change=${this.onChange}
        .value=${this.value}
        style=${styleMap({
          color: this.popupStyle.textColor,
          border: `1px solid ${this.popupStyle.inputBorderColor}`,
          'min-width': '200px',
          appearance: 'none',
        })}
      >
        ${options.map((option) => html`<option>${option}</option>`)}
      </select>
    `;
  }
}

customElements.get('annotative-code-knob-select') ||
  customElements.define('annotative-code-knob-select', AnnotativeKnobSelect);
