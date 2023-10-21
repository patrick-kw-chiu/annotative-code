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

export class AnnotativeKnobTextarea extends LitElement {
  static override styles = [inputStyle];

  @property({ attribute: 'popupStyle' })
  popupStyle: PopupStyle = DEFAULT_POPUP_STYLE;

  @property({ attribute: 'value' })
  value = '';

  override render() {
    return html`<textarea
      style=${styleMap({
        color: this.popupStyle.textColor,
        'background-color': this.popupStyle.backgroundColor,
        border: `1px solid ${this.popupStyle.inputBorderColor}`,
        'min-width': '200px',
        'border-radius': '4px',
        width: 'calc(100% - 8px - 8px)',
        'margin-top': '8px',
        resize: 'vertical',
      })}
      .value=${this.value}
    ></textarea>`;
  }
}

customElements.get('annotative-code-knob-textarea') ||
  customElements.define(
    'annotative-code-knob-textarea',
    AnnotativeKnobTextarea,
  );
