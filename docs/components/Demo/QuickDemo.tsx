import React from 'react';
import AnnotativeCode from './AnnotativeCode';
import { AnnotationConfig } from 'annotative-code/bin/types/types';

import languageFn from 'annotative-code/bin/highlight.js/languages/javascript';
import themeCss from 'annotative-code/bin/highlight.js/css/a11y-dark';

const CodeDemo = () => {
  const content = `<Button variant="____variant____">
  Button
</Button>`;

  const annotation = {
    variant: {
      type: 'string',
      knob: 'select',
      options: ['text', 'contained', 'outlined'],
      value: 'text',
    },
  } as Record<string, AnnotationConfig>;

  return (
    <div>
      <AnnotativeCode
        themeCss={themeCss}
        languageFn={languageFn}
        content={content}
        annotation={annotation}
      />
    </div>
  );
};

export default CodeDemo;
