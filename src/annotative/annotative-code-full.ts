// Lit
import { customElement } from 'lit/decorators.js';

// Highlight - https://unpkg.com/highlight.js
import hljs from 'highlight.js';

// Components
import { AnnotativeBaseComponent } from './annotative-base-component.js';

@customElement('annotative-code-full')
export class AnnotativeCodeFull extends AnnotativeBaseComponent {
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
    'annotative-code-full': AnnotativeCodeFull;
  }
}
