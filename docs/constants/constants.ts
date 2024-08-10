export const contentTemplate = `import languageFn from 'annotative-code/bin/highlight.js/languages/javascript';

const content = \`{{content}}\`

const annotation = {{annotation}}

<annotative-code
  languageFn={languageFn}
  content={content}
  annotation={annotation}
/>`;

export const styleMap = { padding: '8px' };
export const innerAccordionStyle = { paddingBottom: 0, fontSize: '1rem' };
