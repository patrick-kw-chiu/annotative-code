# annotative

<p align="center">
  <img src="https://github.com/patrick-kw-chiu/annotative/blob/main/assets/annotative-2.png?raw=true" alt="Annotative Code | Generated with Stable Diffusion XL" width="160" />
  <h6 align="center">
    Icon generated with <a href="https://stability.ai/">Stable Diffusion XL</a>
  </h6>
</p>

Supercharge your [highlight.js](https://github.com/highlightjs/highlight.js) code demo with interactive input knobs

**Quick links:** [Get Started](https://patrick-kw-chiu.github.io/annotative-code/getting-started/) | API Doc | Interactive Playground

**Demos:** [React](https://stackblitz.com/edit/vitejs-vite-qczupp?file=src%2FAnnotativeCode.tsx,src%2FCodeDemo.tsx&terminal=dev) | [Vue](https://stackblitz.com/edit/vitejs-vite-xijn5h?file=src%2Fcomponents%2FHelloWorld.vue&terminal=dev) | [Svelte](https://stackblitz.com/edit/vitejs-vite-rqlzes?file=package.json,src%2FApp.svelte&terminal=dev) | [vanilla JS](https://stackblitz.com/edit/vitejs-vite-nzhtqa?file=index.html,main.js&terminal=dev)

<!-- [Astro](https://stackblitz.com/edit/withastro-astro-podyte?file=src%2Fpages%2Findex.astro&title=Astro%20Starter%20Kit:%20Minimal) |  -->

## Quick React.js example

```
npm i annotative-code -S
```

<p align="center">
  <img src="https://github.com/patrick-kw-chiu/annotative/blob/main/assets/quick-demo.gif?raw=true" alt="Quick demo" />
</p>

```javascript
// 1. Because using web components in React is not mature yet
// we need to create a bridge React component <AnnotativeCode /> with `@lit/react`
import React from 'react';
import { createComponent } from '@lit/react';
import { AnnotativeCode as AnnotativeCodeWC } from 'annotative-code';

export const AnnotativeCode = createComponent({
  tagName: 'annotative-code',
  elementClass: AnnotativeCodeWC,
  react: React,
});
```

```javascript
import { AnnotativeCode } from './AnnotativeCode';

// 2. Only import the language function and theme css in need can reduce the bundle size
import languageFn from 'annotative-code/bin/highlight.js/languages/javascript';
import themeCss from 'annotative-code/bin/highlight.js/css/a11y-dark';

// 3. Code/content to be highlighted
const content = `<Button variant="____variant____">
  Click me!
</Button>`;

// 4. Add annotations to the highlighted code!
const annotation = {
  variant: {
    type: 'string',
    knob: 'select',
    options: ['text', 'contained', 'outlined'],
    value: variant,
  },
};

<AnnotativeCode
  themeCss={themeCss}
  languageFn={languageFn}
  content={content}
  annotation={annotation}
  onValueChange={({ detail }) => setVariant(detail.valueObj.variant)}
/>;
```

## Features

- 📝 **Goodies of [highlight.js](https://github.com/highlightjs/highlight.js)** - Syntax highlighting of [190+ programming languages](https://github.com/highlightjs/highlight.js/tree/main/src/languages) and [240+ themes](https://github.com/highlightjs/highlight.js/tree/main/src/styles) support
- 🎮 **Interactive knobs** - Let users play around with your code **safely** with various knobs e.g. `string`, `number`, `select` and `datetime-local`
- 👂🏻 **On change listener** - Captures user's input and reflect to the demo
- 🧙🏻‍♂️ **Customizable** - Code block styles (`styleMap`) and pop up (`renderPopup` and `renderDescription`) are customizable
- 🧱 **Web component** - Works with most of the frameworks e.g. React, Svelte, Vue and more

---

## Development

(WIP)

1. (One time only) Install dependencies

```
npm install
```

The `annotative` package is built with `lit` and the local development environment is using `vite`.

2. (One time only) Generate lit theme CSS and programming languages functions from [highlight.js](https://github.com/highlightjs/highlight.js)

```
node ./tools/generateThemes
node ./tools/generateProgLangs
```

3. Run the dev server

```
npm run dev
```

<!--

---

## Build for publish

1. Compile the packages

```
npm run build
```

2. Bundle the code to `esm` format

```
npm run rollup
```

So it can be directly used in modern browser by e.g. `<script type="module" src="{{cdn}}/annotative-python-a11y-dark.js" />`
-->
