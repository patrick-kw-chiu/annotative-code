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

export class AnnotativeKnobString extends LitElement {
  static override styles = [inputStyle];

  @property({ attribute: 'type' })
  type = 'string';

  @property({ attribute: 'popupStyle' })
  popupStyle: PopupStyle = DEFAULT_POPUP_STYLE;

  @property({ attribute: 'value' })
  value = 0;

  @property({ attribute: 'onChange' })
  onChange = () => {};

  override render() {
    return html`<input
      type=${this.type === 'color' ? 'color' : 'text'}
      style=${styleMap({
        color: this.popupStyle.textColor,
        border: `1px solid ${this.popupStyle.inputBorderColor}`,
        'min-width': '200px',
      })}
      .value=${this.value}
      @change=${this.onChange}
    />`;
  }
}

customElements.get('annotative-code-knob-string') ||
  customElements.define('annotative-code-knob-string', AnnotativeKnobString);
