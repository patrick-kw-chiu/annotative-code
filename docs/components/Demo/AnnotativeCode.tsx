import React from 'react';
import { createComponent } from '@lit/react';
import { AnnotativeCode as AnnotativeCodeWC } from 'annotative-code';

const AnnotativeCode = createComponent({
  tagName: 'annotative-code',
  elementClass: AnnotativeCodeWC,
  react: React,
});

export default AnnotativeCode;
