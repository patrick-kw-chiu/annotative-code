// @ts-nocheck

// Lit
import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, state } from 'lit/decorators.js';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';

// Highlight.js
import { HLJSApi } from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import { LanguageFn } from 'highlight.js';

// Utilities
import {
  getIndexes,
  extractClassName,
  getClassByType,
  checkIsColorLight,
  lightenOrDarken,
} from './utilities/utilities.js';

// Default values
import { DEFAULT_PARENT_STYLE } from './constants/defaultValues.js';

// Components
import './components/annotation.js';
import './components/knobs/textarea.js';
import { close } from './components/icons/icons.js';

// Types
import { AnnotationConfig, ValueChangeEvent } from './types/types.js';

export class AnnotativeBaseComponent extends LitElement {
  static override styles = [
    css`
      #annotative-code {
        position: relative;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          Liberation Mono, Courier New, monospace;
      }
      #annotative-code-inner {
        position: relative;
        white-space: pre;
        text-wrap: wrap;
        line-height: 1.25;
        padding: 8px;
      }
      .annotative-code-annotation-container {
        display: inline-block;
        white-space: initial;
      }

      #copy-button {
        position: absolute;
        top: 0;
        right: 0;
        padding: 4px 6px;
        cursor: pointer;
        z-index: 21;
      }

      #copy-button:hover {
      }

      #copy-popup {
        position: absolute;
        top: 32px;
        right: 6px;
        width: 0;
        border-radius: 12px;
        overflow: hidden;
      }

      #copy-popup.show {
        width: 320px;
        padding: 4px;
        max-width: 90%;
      }

      #copy-popup .inner {
        padding: 6px;
      }

      #copy-popup .inner .copy {
        padding-bottom: 6px;
        border-bottom: 1px solid;
      }

      #copy-popup .inner .icons div {
        padding: 6px;
        border: 1px solid;
        width: 24px;
        height: 24px;
      }

      #copy-popup .close {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      .credentials, a:-webkit-any-link {
        padding-top: 8px;
        text-align: right;
        opacity: 0.8;
        text-decoration: none;
        color: unset;
      }
      .credentials:hover {
        opacity: 1;
        text-decoration: underline;
      }
    `,
  ];

  annotativeInnerRef: Ref<HTMLElement> = createRef();

  // Props
  @property({ attribute: false })
  languageFn: LanguageFn;

  @property({ attribute: 'themeCss' })
  themeCss: string = '';

  @property({ attribute: 'content' })
  content: string = '';

  @property({ attribute: false })
  annotation: Record<string, AnnotationConfig> = {};

  @property({ attribute: false })
  onValueChange?: (event: ValueChangeEvent) => void;

  @property({ attribute: false })
  styleMap?: StyleInfo = {};

  @property({ attribute: 'fontSize' })
  fontSize?: string = '';

  @property({ attribute: 'encloser' })
  encloser?: string = '____';

  @property({ attribute: 'annotationMask' })
  annotationMask?: string = '{{{{____annotation____}}}}';

  @property({ attribute: false })
  showCredentials?: boolean = false;

  // States
  @state()
  parentStyle = DEFAULT_PARENT_STYLE;

  @state()
  private _highlightCopyButton = false;

  @state()
  private _showPopup = false;

  @state()
  private _copyValue = '';

  @state()
  protected hljs: HLJSApi;

  @state()
  protected contentsWithAnnotations: (string | { key: any; config: any })[] =
    [];

  constructor() {
    super();
  }

  protected async _loadAndHighlightSyntax() {}

  protected async _loadCss() {
    // Get parent style e.g. bg color
    // For computing the popup's color
    this.parentStyle = this._getComputedStyle(this.annotativeInnerRef);
    this.requestUpdate();
  }

  updated(changedProperties: Map<string, any>) {
    const cp = new Map(changedProperties);
    cp.delete('contentsWithAnnotations');
    cp.delete('themeCss');
    cp.delete('parentStyle');
    if (cp.size > 0) {
      this._loadAndHighlightSyntax();
    }
    if (changedProperties.has('themeCss')) {
      this._loadCss();
    }
  }

  private _getComputedStyle(ref: Ref) {
    const style: CSSStyleDeclaration = (
      window && ref?.value ? window.getComputedStyle(ref.value) : {}
    ) as CSSStyleDeclaration;

    const backgroundColor = style.backgroundColor || '';
    return { backgroundColor };
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleResize = () => {
      const style = this._getComputedStyle(this.annotativeInnerRef);
      this.parentStyle = style;
    };
    window.addEventListener('resize', this._handleResize);
    setTimeout(this._handleResize, 1);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleResize);
  }

  private _insertAnnotationKeysAndGetKeyIndexes(annotation = {}) {
    const annotationKeys = Object.keys(annotation);

    // 1. Insert annotations to content and get key indexes
    let contentWithAnnotations = this.content;
    let keyIndexes = [];
    for (let i = 0; i < annotationKeys.length; i++) {
      const annotationKey = annotationKeys[i];
      const annotationKeyWithEncloser = `${this.encloser}${annotationKey}${this.encloser}`;
      const indexes = getIndexes(this.content, annotationKeyWithEncloser);
      keyIndexes = [
        ...keyIndexes,
        ...indexes.map((index) => ({ annotationKey, index })),
      ];
      contentWithAnnotations = contentWithAnnotations.replaceAll(
        annotationKeyWithEncloser,
        this.annotationMask,
      );
    }

    // 2. Sort for later knobs insertion
    keyIndexes = keyIndexes.sort((a, b) => {
      return a.index - b.index;
    });

    return { contentWithAnnotations, keyIndexes };
  }

  protected _highlight(contentWithAnnotations) {
    return hljs.highlight(contentWithAnnotations, {
      language: 'language',
    }).value;
  }

  protected _createContentsWithAnnotations() {
    const annotation = this.annotation || {};

    // 1. and 2.
    let { contentWithAnnotations, keyIndexes } =
      this._insertAnnotationKeysAndGetKeyIndexes(annotation);

    // 3. `Highlight` the content
    let contentsWithAnnotation = [];
    let contentHighlighted = this._highlight(contentWithAnnotations);
    let contentChunks = contentHighlighted.split(this.annotationMask);

    // 4. Extract last occurence
    let classes = contentChunks.map((chunk) => {
      return extractClassName(chunk, 'class="', '">');
    });
    classes.pop();

    // 5. Knobs insertion
    for (let i = 0; i < contentChunks.length; i++) {
      const contentChunk = contentChunks[i];

      contentsWithAnnotation.push(
        (i !== 0 ? `<span class=\"${classes[i - 1]}\">` : '') +
          contentChunk +
          '</span>',
      );

      if (i !== contentChunks.length - 1) {
        const { annotationKey: key, index } = keyIndexes[i];
        contentsWithAnnotation.push({
          key,
          config: annotation[key],
        });
      }
    }

    return contentsWithAnnotation;
  }

  private _computeNewValueObj = (updatedKey?: string, newValue?: any) => {
    const valueObj = Object.entries(this.annotation).reduce((acc, cur) => {
      const [annotationMask, annotationConfig] = cur;
      return {
        ...acc,
        [annotationMask]:
          annotationMask === updatedKey ? newValue : annotationConfig.value,
      };
    }, {});

    return valueObj;
  };

  private _onChange = (updatedKey: string, event: Event) => {
    const target = event.target as HTMLInputElement;
    const config = this.annotation[updatedKey];
    const newValue =
      config.type === 'boolean'
        ? target.checked
        : config.type === 'number'
        ? parseFloat(target.value?.replace(/[^\d.-]/g, ''))
        : config.type === 'integer'
        ? parseInt(target.value?.replace(/[^\d.-]/g, ''))
        : target.value;

    const valueObj = this._computeNewValueObj(updatedKey, newValue);

    this.annotation = {
      ...this.annotation,
      [updatedKey]: {
        ...this.annotation[updatedKey],
        value: newValue,
      },
    };

    const detail = {
      updatedKey,
      valueObj,
    };

    if (this.onValueChange) {
      this.onValueChange({ detail });
    } else {
      this.dispatchEvent(
        new CustomEvent('valuechange', {
          detail,
          bubbles: true,
          composed: true,
        }),
      );
    }
  };

  private _onTriggerCopyPopup = (e: Event) => {
    e.stopPropagation();
    if (!this._showPopup) {
      const valueObj = this._computeNewValueObj();

      const copyValue = Object.entries(valueObj).reduce((prev, acc) => {
        const [key, value] = acc;
        const annotationWithEncloser = `${this.encloser}${key}${this.encloser}`;
        return prev.replaceAll(annotationWithEncloser, value);
      }, this.content);

      this._copyValue = copyValue;
      window.navigator.clipboard.writeText(copyValue);
    }
    this._showPopup = !this._showPopup;
  };

  private _toggleCopyButtonClass = () => {
    this._highlightCopyButton = !this._highlightCopyButton;
  };

  override render() {
    //
    const style = this.parentStyle;
    const isBgLight = checkIsColorLight(style.backgroundColor);
    const textColor = isBgLight ? 'rgb(237, 237, 237)' : 'rgb(18, 18, 18)';
    const inputBorderColor = lightenOrDarken(textColor);
    const grayColor = {
      '100': lightenOrDarken(style.backgroundColor, 8),
      '300': lightenOrDarken(style.backgroundColor, 8 + 16),
      '400': lightenOrDarken(style.backgroundColor, 8 + 16 * 1.5),
      '500': lightenOrDarken(style.backgroundColor, 8 + 16 * 2),
      '700': lightenOrDarken(style.backgroundColor, 8 + 16 * 3),
      '900': lightenOrDarken(style.backgroundColor, 8 + 16 * 4),
    };
    const popupStyle = {
      backgroundColor: grayColor['100'],
      borderColor: grayColor['300'],
      textColor,
      inputBorderColor,
    };
    const shareButtonBg = this._showPopup
      ? grayColor['500']
      : this._highlightCopyButton
      ? grayColor['400']
      : popupStyle.borderColor;
    const sharePopupStyle = {
      backgroundColor: popupStyle.backgroundColor,
      borderColor: popupStyle.borderColor,
      color: popupStyle.textColor,
      'z-index': 30,
    };

    return html`
      <div
        id="annotative-code"
        style="${styleMap({ fontSize: this.fontSize ?? '14px' })}"
      >
        <style>
          ${this.themeCss}
        </style>
        <div
          id="annotative-code-inner"
          ${ref(this.annotativeInnerRef)}
          class="hljs"
          style="${styleMap(this.styleMap ?? {})}"
          @click=${() => (this._showPopup = false)}
        >${this.contentsWithAnnotations?.map((content) => {
            const { key, config } = content;

            // 1. annotation
            if (key) {
              return html`<span
                class="hljs-${getClassByType(
                  config.type,
                )} annotative-code-annotation-container"
              >
                <annotative-code-annotation
                  .key="${key}"
                  .config="${config}"
                  .isBgLight=${isBgLight}
                  .popupStyle=${popupStyle}
                  .onChange="${this._onChange}"
                />
              </span>`;
            }

            // 2. highlighted content
            return unsafeHTML(content);
          })}</div>
        <div
          id="copy-button"
          style="${styleMap({
            backgroundColor: shareButtonBg,
            color: popupStyle.textColor,
          })}"
          @mouseover=${this._toggleCopyButtonClass}
          @mouseout=${this._toggleCopyButtonClass}
          @click=${this._onTriggerCopyPopup}
        >
          Copy
        </div>
        <div
          id="copy-popup"
          class="${this._showPopup ? 'show' : ''}"
          style="${styleMap(sharePopupStyle)}"
        >
          <div class="inner">
            <div class="copy">Copied</div>
            <div>
              <annotative-code-knob-textarea
                .popupStyle=${{
                  ...popupStyle,
                  backgroundColor: grayColor['400'],
                }}
                .value=${this._copyValue}
              />
            </div>
            ${this.showCredentials
              ? html`<div class="credentials">
                  <a
                    href="https://github.com/patrick-kw-chiu/annotative-code"
                    target="_blank"
                  >⚡ Annotative Code</a>
                </div>`
              : null}
          </div>
          <div class="close" @click=${this._onTriggerCopyPopup}>${close}</div>
        </div>
      </div>
    `;
  }
}
