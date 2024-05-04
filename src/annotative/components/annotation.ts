// Lit
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';

// Utilities
import { computePopupStyle } from '../utilities/utilities.js';

// Styles
import { backgroundAnimation, underlineAnimation } from '../styles/animation.js';
import { popupStyle } from '../styles/popup.js';

// Types
import {
  CustomRenderingProps,
  AnnotationConfig,
  PopupStyle,
} from '../types/types.js';

// Default values
import {
  DEFAULT_ANNOTATION_CONFIG,
  DEFAULT_POPUP_STYLE,
} from '../constants/defaultValues.js';

// Components
import './knob.js';

export class AnnotativeAnnotation extends LitElement {
  static override styles = [
    backgroundAnimation,
    underlineAnimation,
    popupStyle,
    css`
      :host {
        position: relative;
        display: inline-block;
        vertical-align: top;
        white-space: initial;
        cursor: pointer;
        z-index: 20;
        overflow: visible;
      }
      #annotation {
        position: relative;
        display: inline-block;
        vertical-align: top;
        padding: 0px 4px;
      }
      div.background {
        border-radius: 4px;
        animation: background-animation 1s infinite alternate-reverse;
      }
      div.underline {
        animation: underline-animation 1s infinite alternate-reverse;
      }
    `,
  ];

  annotationRef: Ref<HTMLElement> = createRef();
  popupRef: Ref<HTMLElement> = createRef();

  @property({ state: true })
  private _showPopup = false;

  @property({ state: true })
  private _popupStyle: Record<string, string | number | undefined> = {};

  @property({ attribute: 'key' })
  key = '';

  @property({ attribute: 'config' })
  config: AnnotationConfig = DEFAULT_ANNOTATION_CONFIG;

  @property({ attribute: 'isBgLight' })
  isBgLight = true;

  @property({ attribute: 'onChange' })
  onChange: (key: string, event: Event) => void = () => {};

  @property({ attribute: 'popupStyle' })
  popupStyle: PopupStyle = DEFAULT_POPUP_STYLE;

  @property({ attribute: 'renderPopup' })
  renderPopup = ({
    html,
    key,
    config,
    isBgLight,
    popupStyle = this.popupStyle,
  }: CustomRenderingProps) => {
    const { type, title, description, isEditable, renderDescription } = config;
    return html`<div>
      <div class="">
        <span>${type}</span>
        <span style="color: ${popupStyle.textColor}">${title ?? key}</span>
      </div>
      <div style="color: ${popupStyle.textColor}">
        ${description || isEditable
          ? html`<hr
              class="popup-line-break"
              style="border-color: ${popupStyle.textColor}"
            />`
          : ''}
        <annotative-code-knob
          .key=${key}
          .config=${config}
          .popupStyle=${popupStyle}
          .onChange=${this.onChange}
        ></annotative-code-knob>
        <div class="popup-description">${renderDescription
            ? renderDescription({
                html,
                key,
                config,
                isBgLight,
                popupStyle,
              })
            : description
            ? html`${description}`
            : ''}</div>
      </div>
    </div>`;
  };

  private async _togglePopup() {
    const annotationElement = this.annotationRef;
    if (!annotationElement.value) {
      return;
    }

    if (this._showPopup) {
      this._showPopup = false;

      (annotationElement.value.offsetParent as HTMLElement).style.zIndex =
        '10';
      return;
    }

    const { style } = computePopupStyle(annotationElement.value);

    this._showPopup = true;
    this._popupStyle = style;

    (annotationElement.value.offsetParent as HTMLElement).style.zIndex = '11';
  }

  override render() {
    const config = { ...DEFAULT_ANNOTATION_CONFIG, ...this.config };
    const {
      animation,
      value,
      formatValue,
      renderPopup = this.renderPopup,
    } = config;

    return html`<div
      ${ref(this.annotationRef)}
      id="annotation"
      class=${classMap({
        ...(animation ? { [animation]: true } : null),
      })}
      @mouseover=${this._togglePopup}
      @mouseout=${this._togglePopup}
    >
      <div>${formatValue ? formatValue(value) : value}</div>
      <div
        id="popup"
        ${ref(this.popupRef)}
        class=${classMap({ 'fade-in': this._showPopup })}
        style=${styleMap(this._popupStyle)}
      >
        <div
          id="popup-inner"
          style=${styleMap({
            'color-scheme': this.isBgLight ? 'dark' : 'light',
            'background-color': this.popupStyle.backgroundColor,
            border: `1px solid ${this.popupStyle.borderColor}`,
          })}
        >
          ${renderPopup({
            html,
            key: this.key,
            config,
            isBgLight: this.isBgLight,
            popupStyle: this.popupStyle,
          })}
        </div>
      </div>
    </div>`;
  }
}
customElements.get('annotative-code-annotation') ||
  customElements.define('annotative-code-annotation', AnnotativeAnnotation);
