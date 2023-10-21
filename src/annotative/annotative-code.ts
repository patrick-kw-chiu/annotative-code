// Lit
import { customElement } from 'lit/decorators.js';

// Highlight
import hljs from 'highlight.js/lib/core';

// Components
import { AnnotativeBaseComponent } from './annotative-base-component.js';

@customElement('annotative-code')
export class AnnotativeCode extends AnnotativeBaseComponent {
  constructor() {
    super();
    this.hljs = hljs;
  }

  protected async _loadAndHighlightSyntax() {
    if (!this.languageFn) {
      return;
    }
    this.hljs.registerLanguage('language', this.languageFn);
    // @ts-ignore
    this.contentsWithAnnotations = super._createContentsWithAnnotations();
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'annotative-code': AnnotativeCode;
  }
}
