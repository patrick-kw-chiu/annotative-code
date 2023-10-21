import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class AnnotativeKnobSwitch extends LitElement {
  static override styles = [
    css`
      .toggle {
        cursor: pointer;
        display: inline-block;
      }

      .toggle-switch {
        display: inline-block;
        background: #ccc;
        border-radius: 12px;
        width: 42px;
        height: 24px;
        position: relative;
        vertical-align: middle;
        transition: background 0.25s;
      }
      .toggle-switch:before,
      .toggle-switch:after {
        content: '';
      }
      .toggle-switch:before {
        display: block;
        background: linear-gradient(to bottom, #fff 0%, #eee 100%);
        border-radius: 50%;
        width: 18px;
        height: 18px;
        position: absolute;
        top: 3px;
        left: 3px;
        transition: left 0.25s;
      }
      .toggle:hover .toggle-switch:before {
        background: linear-gradient(to bottom, #fff 0%, #fff 100%);
      }
      .toggle-checkbox:checked + .toggle-switch {
        background: #56c080;
      }
      .toggle-checkbox:checked + .toggle-switch:before {
        left: 21px;
      }

      .toggle-checkbox {
        position: absolute;
        visibility: hidden;
      }

      .toggle-label {
        margin-left: 5px;
        position: relative;
        top: 2px;
      }
    `,
  ];

  @property({ attribute: 'checked' })
  checked = false;

  @property({ attribute: 'onChange' })
  onChange = () => {};

  override render() {
    return html`
      <label class="toggle">
        <input
          class="toggle-checkbox"
          type="checkbox"
          .checked=${this.checked}
          @change=${this.onChange}
        />
        <div class="toggle-switch"></div>
      </label>
    `;
  }
}

customElements.get('annotative-code-knob-switch') ||
  customElements.define('annotative-code-knob-switch', AnnotativeKnobSwitch);
