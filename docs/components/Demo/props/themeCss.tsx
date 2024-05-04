import React, { useState } from 'react';
import AnnotativeCode from '../AnnotativeCode';
import { AnnotationConfig } from 'annotative-code/bin/types/types';

import jsLanguageFn from 'annotative-code/bin/highlight.js/languages/javascript';
import xmlLanguageFn from 'annotative-code/bin/highlight.js/languages/xml';
import themeCssA11yDark from 'annotative-code/bin/highlight.js/css/a11y-dark';
import themeCssA11yLight from 'annotative-code/bin/highlight.js/css/a11y-light';
import themeCssGithub from 'annotative-code/bin/highlight.js/css/github';
import themeCssGoogleCode from 'annotative-code/bin/highlight.js/css/googlecode';

const themeObj = {
  'a11y-dark': themeCssA11yDark,
  'a11y-light': themeCssA11yLight,
  github: themeCssGithub,
  googlecode: themeCssGoogleCode,
};

const CodeDemo = () => {
  const wc1 = `// Using web component
import themeCss from 'annotative-code/bin/highlight.js/css/____theme____';
import 'annotative-code';
`;

  const wc2 = `<annotative-code themeCss={themeCss} />;`;

  const react1 = `// Using React.js with the bridge component
// See more in "Getting Started > annotative-code > React"
// https://patrick-kw-chiu.github.io/annotative-code/getting-started/annotative-code/react
import themeCss from 'annotative-code/bin/highlight.js/css/____theme____';
import AnnotativeCode from './AnnotativeCode';
`;

  const react2 = `<AnnotativeCode languageFn={languageFn} />;  `;

  const [theme, setTheme] = useState('a11y-dark');

  const annotation = {
    theme: {
      type: 'string',
      knob: 'select',
      options: ['a11y-dark', 'a11y-light', 'github', 'googlecode'],
      value: theme,
    },
  } as Record<string, AnnotationConfig>;

  const styleMap = { padding: '8px', marginBottom: '16px' };

  return (
    <div style={{ paddingTop: '8px' }}>
      <AnnotativeCode
        themeCss={themeObj[theme]}
        languageFn={jsLanguageFn}
        content={wc1}
        annotation={annotation}
        styleMap={styleMap}
        onValueChange={(event) => {
          setTheme(event.detail.valueObj.theme);
        }}
      />
      <details style={{ padding: '8px 8px 24px' }}>
        <summary style={{ cursor: 'pointer' }}>🔎🔎🔎</summary>
        <pre>
          {`
const content = \`// Using web component
import themeCss from 'annotative-code/bin/highlight.js/css/____theme____';
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
        themeCss={themeObj[theme]}
        languageFn={xmlLanguageFn}
        content={wc2}
        styleMap={styleMap}
      />
      <hr style={{ margin: '24px 0' }} />
      <AnnotativeCode
        themeCss={themeObj[theme]}
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
import themeCss from 'annotative-code/bin/highlight.js/css/____theme____';
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
        themeCss={themeObj[theme]}
        languageFn={xmlLanguageFn}
        content={react2}
        styleMap={styleMap}
      />
    </div>
  );
};

export default CodeDemo;
