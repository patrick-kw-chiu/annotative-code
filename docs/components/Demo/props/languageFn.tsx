import React from 'react';
import AnnotativeCode from '../AnnotativeCode';
import { AnnotationConfig } from 'annotative-code/bin/types/types';

import jsLanguageFn from 'annotative-code/bin/highlight.js/languages/javascript';
import xmlLanguageFn from 'annotative-code/bin/highlight.js/languages/xml';
import themeCss from 'annotative-code/bin/highlight.js/css/a11y-dark';

const CodeDemo = () => {
  const wc1 = `// Using web component
import languageFn from 'annotative-code/bin/highlight.js/languages/____language____';
import 'annotative-code';
`;

  const wc2 = `<annotative-code languageFn={languageFn} />`;

  const react1 = `// Using React.js with the bridge component
// See more in "Getting Started > annotative-code > React"
// https://patrick-kw-chiu.github.io/annotative-code/getting-started/annotative-code/react
import languageFn from 'annotative-code/bin/highlight.js/languages/____language____';
import AnnotativeCode from './AnnotativeCode';
`;

  const react2 = `<AnnotativeCode languageFn={languageFn} />  `;

  const annotation = {
    language: {
      type: 'string',
      knob: 'select',
      options: [
        'javascript',
        'typescript',
        'xml',
        'css',
        'python',
        'dart',
        'rust',
      ],
      value: 'javascript',
    },
  } as Record<string, AnnotationConfig>;

  const styleMap = { padding: '8px', marginBottom: '16px' };

  return (
    <div style={{ paddingTop: '8px' }}>
      <AnnotativeCode
        themeCss={themeCss}
        languageFn={jsLanguageFn}
        content={wc1}
        annotation={annotation}
        styleMap={styleMap}
      />
      <details style={{ padding: '8px 8px 24px' }}>
        <summary style={{ cursor: 'pointer' }}>🔎🔎🔎</summary>
        <pre>
          {`
const content = \`// Using web component
import languageFn from 'annotative-code/bin/highlight.js/languages/____language____';
import 'annotative-code';\`

const annotation = ${JSON.stringify(annotation, null, 2)}

<annotative-code
  languageFn={languageFn}
  themeCss={themeCss}
  content={content}
  annotation={annotation}
/>`}
        </pre>
      </details>
      <AnnotativeCode
        themeCss={themeCss}
        languageFn={xmlLanguageFn}
        content={wc2}
        styleMap={styleMap}
      />
      <hr style={{ margin: '24px 0' }} />
      <AnnotativeCode
        themeCss={themeCss}
        languageFn={jsLanguageFn}
        content={react1}
        annotation={annotation}
        styleMap={styleMap}
      />
      <details style={{ padding: '8px 8px 24px' }}>
        <summary style={{ cursor: 'pointer' }}>🔎🔎🔎</summary>
        <pre>
          {`
const content = \`// Using React.js with the bridge component
// See more in "Getting Started > annotative-code > React"
// https://patrick-kw-chiu.github.io/annotative-code/getting-started/annotative-code/react
import languageFn from 'annotative-code/bin/highlight.js/languages/____language____';
import AnnotativeCode from './AnnotativeCode';\`

const annotation = ${JSON.stringify(annotation, null, 2)}

<AnnotativeCode
  languageFn={languageFn}
  themeCss={themeCss}
  content={content}
  annotation={annotation}
/>`}
        </pre>
      </details>
      <AnnotativeCode
        themeCss={themeCss}
        languageFn={xmlLanguageFn}
        content={react2}
        styleMap={styleMap}
      />
    </div>
  );
};

export default CodeDemo;
