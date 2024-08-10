import {
  ValueChangeEvent,
  AnnotativeCode,
  AnnotativeCodeElement,
  AnnotativeCodeFull,
  AnnotativeCodeFullElement,
} from './src/annotative/types/types';

import { applyProperties } from './src/annotative/utilities/utilities';

interface AnnotativeCodeWithId extends AnnotativeCode {
  id: string;
}
interface AnnotativeCodeFullWithId extends AnnotativeCodeFull {
  id: string;
}

import javascript from './src/annotative/highlight.js/languages/javascript';
import python from './src/annotative/highlight.js/languages/python';

import a11yDarkCss from './src/annotative/highlight.js/css/a11y-dark';
import a11yLightCss from './src/annotative/highlight.js/css/a11y-light';
import agateCss from './src/annotative/highlight.js/css/agate';
import androidstudioCss from './src/annotative/highlight.js/css/androidstudio';
import githubDarkCss from './src/annotative/highlight.js/css/github-dark';

const blocks: (AnnotativeCodeFullWithId | AnnotativeCodeWithId)[] = [
  {
    id: 'block-1',
    languageFn: javascript,
    themeCss: a11yDarkCss,
    content: `<ActivityCalendarWidget
  showSummary={____showSummary____}
  daysToRender={____daysToRender____}
  data={[
    { date: '____daysToRender____', activities: [{}, {}, {}, {}] },
    { date: '2023-10-20', activities: [{}] },
    { date: '2023-10-23', activities: [{}, {}, {}] },
  ]}
/>
`,
    annotationMask: '????',
    annotation: {
      showSummary: {
        type: 'boolean',
        value: true,
        description: `If set to \`true\`, a summary of "26 activities in this period" will be displayed in the bottom left of the component.
        
A new line.`,
      },
      summaryText: {
        type: 'string',
        value: 'count activities in this period',
      },
      daysToRender: {
        type: 'integer',
        min: 0,
        max: 365,
        value: 365,
        renderDescription: ({ html, key, config, isBgLight, popupStyle }) => {
          // console.log(html, key, config, isBgLight, popupStyle);
          return html`<div style="color: green">123</div>`;
        },
      },
      date2: {
        type: 'symbol',
        value: '2023-12-01',
        knob: 'date',
      },
      levelColorMode: {
        type: 'string',
        knob: 'select',
        options: ['light', 'dark'],
        value: 'light',
      },
      weekStart: {
        type: 'string',
        knob: 'select',
        options: [0, 1, 2, 3, 4, 5, 6],
        value: 0,
      },
      weekdayLabel: {
        type: 'string',
        // knob: 'textarea',
        shouldValidateJson: true,
        value: `
          {
            0: '日曜日',
            1: '月曜日',
            2: '火曜日',
            3: '水曜日',
            4: '木曜日',
            5: '金曜日',
            6: '土曜日',
          }
        `,
      },
    },
    // styleMap: {
    //   padding: '0 32px',
    // },
    fontSize: '12px',
    showCredentials: true,
  },
  {
    id: 'block-2',
    languageFn: javascript,
    themeCss: a11yLightCss,
    content: `const name = 'kitty';
console.log(
  name
);
window.pyodideWorker.postMessage({
  id: new Date().getTime(),
  action: "____action____",
  packages: [],
  count: ____count____ ,
  time: "____time____",
});

console.log("____action____")
`,
    annotation: {
      action: {
        type: 'string',
        knob: 'select',
        options: ['hey 🍎', 'dude'],
        value: 'hey 🍎',
        animation: 'background',
      },
      count: {
        type: 'number',
        value: 123321,
        animation: 'underline',
        renderPopup: ({ html, key, config, isBgLight, popupStyle }) => {
          // console.log(html, key, config, isBgLight, popupStyle);
          return html`<div style="color: red">123</div>`;
        },
      },
      time: {
        type: 'string',
        knob: 'time',
        value: '19:30',
      },
    },
    styleMap: {
      padding: '12px',
    },
  },
  {
    id: 'block-3',
    // @ts-ignore fixing on the highlight.js side
    languageFn: python,
    themeCss: androidstudioCss,
    content: `from cachetools import cached
import time

def old_test(n):
  return n if n<2 else old_test(n-1) + old_test(n-2)

t = time.time()
print(old_test(____value____))
print('Time taken ____color____ without cache: ', time.time() - ____value____)

s = time.time()
@cached(cache = {})
def test(n):
  return n if n<2 else test(n-1) + test(n-2)

date = "____date____"

print(test(____value____))
print('Time taken(cached): ', time.time() - s)`,
    annotation: {
      value: {
        type: 'number',
        knob: 'range',
        value: 35,
        min: 5,
        max: 45,
      },
      date: {
        type: 'string',
        knob: 'datetime-local',
        value: '2023-11-20T19:30',
      },
      color: {
        type: 'string',
        knob: 'color',
        value: '#ffffff',
      },
    },
  },
  {
    id: 'block-4',
    themeCss: agateCss,
    content: `# This program adds two numbers

num1 = ____num1____
num2 = ____num2____

# Add two numbers
sum = num1 + num2

# Display the sum
print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))`,
    annotation: {
      num1: {
        type: 'number',
        knob: 'range',
        value: 35,
        min: 5,
        max: 45,
      },
      num2: {
        type: 'number',
        knob: 'range',
        value: 66,
        min: 40,
        max: 105,
      },
    },
  },
  {
    id: 'block-5',
    themeCss: githubDarkCss,
    content: `fn main() {
  // Integer addition
  println!("1 + 2 = {}", 1u32 + 2);

  // Scientific notation
  println!("1e4 is {}, -2.5e-3 is {}", 1e4, -2.5e-3);

  // Use underscores to improve readability!
  println!("____oneMillion____ is written as {}", 1_000_000u32);
}`,
    annotation: {
      oneMillion: {
        type: 'string',
        value: 'One million',
      },
    },
    onValueChange({ detail }) {
      console.log({ detail });
    },
  },
];

// const props = [
//   'languageFn',
//   'themeCss',
//   'content',
//   'annotation',
//   'annotationMask',
//   'encloser',
//   'styleMap',
// ];
blocks.forEach((block) => {
  // if (block.id !== 'block-2') {
  //   return;
  // }
  const codeSnippet = document.getElementById(block.id) as
    | AnnotativeCodeFullElement
    | AnnotativeCodeElement;

  applyProperties(codeSnippet, block);
});
