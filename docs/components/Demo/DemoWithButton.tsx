import React, { useState } from 'react';
import AnnotativeCode from './AnnotativeCode';
import { AnnotationConfig } from 'annotative-code/bin/types/types';

import Button from '@mui/material/Button';

import languageFn from 'annotative-code/bin/highlight.js/languages/javascript';
import themeCss from 'annotative-code/bin/highlight.js/css/a11y-dark';

const CodeDemo = () => {
  const [variant, setVariant] = useState<'text' | 'contained' | 'outlined'>(
    'text',
  );

  const content = `<Button variant="____variant____">
  Button
</Button>`;

  const annotation = {
    variant: {
      type: 'string',
      knob: 'select',
      options: ['text', 'contained', 'outlined'],
      value: variant,
    },
  } as Record<string, AnnotationConfig>;

  return (
    <div>
      <Button variant={variant}>Button</Button>
      <hr style={{ margin: '12px 0' }} />
      <AnnotativeCode
        themeCss={themeCss}
        styleMap={{ padding: '12px' }}
        languageFn={languageFn}
        content={content}
        annotation={annotation}
        onValueChange={({ detail }) => {
          setVariant(detail.valueObj.variant);
        }}
      />
    </div>
  );
};

export default CodeDemo;
