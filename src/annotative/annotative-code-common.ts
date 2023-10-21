// Lit
import { customElement } from 'lit/decorators.js';

// Highlight - https://unpkg.com/highlight.js/lib/common.js
import hljs from 'highlight.js/lib/common';

// Components
import { AnnotativeBaseComponent } from './annotative-base-component.js';

@customElement('annotative-code-common')
export class AnnotativeCodeCommon extends AnnotativeBaseComponent {
  constructor() {
    super();
    this.hljs = hljs;
  }

  protected async _loadAndHighlightSyntax() {
    this.contentsWithAnnotations = super._createContentsWithAnnotations();
    this.requestUpdate();
  }

  protected _highlight(contentWithAnnotations: string) {
    return hljs.highlightAuto(contentWithAnnotations).value;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'annotative-code-common': AnnotativeCodeCommon;
  }
}
