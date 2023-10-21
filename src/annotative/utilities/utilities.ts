import {
  AnnotativeCode,
  AnnotativeCodeElement,
  AnnotativeCodeFull,
  AnnotativeCodeFullElement,
} from '../types/types.js';

export const getIndexes = (string: string, matchedSubString: string) => {
  return [
    ...string.matchAll(new RegExp('\\b' + matchedSubString + '\\b', 'gi')),
  ].map((a) => a.index);
};

export const extractLastOccurence = (
  string: string,
  start: string,
  end: string,
) => {
  const temp = string.split(start);
  const lastOccurence = temp[temp.length - 1].split(end)[0];
  return lastOccurence;
};

export const extractClassName = (
  string: string,
  start: string,
  end: string,
) => {
  const closingIndexOfSpan = string.lastIndexOf('</span>');
  const closingIndexOfSpanWithClass = string.lastIndexOf('">');

  if (closingIndexOfSpan > closingIndexOfSpanWithClass) {
    return '';
  }

  return extractLastOccurence(string, start, end);
};

export const getClassByType = (type: string) => {
  const classTypeMap: Record<string, string> = {
    boolean: 'literal',
    integer: 'number',
  };
  return classTypeMap[type] || type;
};

export const getKnobType = (type: string, knob: string) => {
  const standardKnobs = ['string', 'number', 'integer', 'boolean'];
  const isStandardKnob = standardKnobs.indexOf(type) > 0;

  return knob || (isStandardKnob ? type : 'string');
};

export const checkIsColorLight = (colorCode: string) => {
  const start = colorCode.startsWith('rgba(') ? 'rgba(' : 'rgb(';
  const code = parseInt(extractLastOccurence(colorCode, start, ','));
  return code < 127.5;
};

export const lightenOrDarken = (colorCode: string, degree = 25) => {
  try {
    const start = colorCode.startsWith('rgba(') ? 'rgba(' : 'rgb(';
    const code = parseInt(extractLastOccurence(colorCode, start, ','));
    if (isNaN(code)) {
      throw 'NaN Error';
    }
    const _code = code < 127.5 ? code + degree : code - degree;
    return `rgb(${_code}, ${_code}, ${_code})`;
  } catch (e) {
    return 'rgb(127.5, 127.5, 127.5)';
  }
};

export const computePopupStyle = (annotationElement: HTMLElement) => {
  const { x, y, width, height } = annotationElement.getBoundingClientRect();

  const isSmall = window.innerWidth < 640;

  const yPos = (y + height / 2) / window.innerHeight > 0.5 ? 'bottom' : 'top';
  const xPos = (x + width / 2) / window.innerWidth > 0.5 ? 'right' : 'left';
  const pos = `${yPos}-${xPos}`;

  if (isSmall) {
    return {
      pos,
      style: {
        [yPos]: height + 'px',
        left: `${18 - x - 8}px`,
        width: 'calc(100vw - 36px)',
      },
      isSmall,
    };
  }

  return {
    pos: `${yPos}-${xPos}`,
    style:
      pos === 'top-left'
        ? { top: height + 'px', left: 0 }
        : pos === 'top-right'
        ? { top: height + 'px', right: 0 }
        : pos === 'bottom-left'
        ? { bottom: height + 'px', left: 0 }
        : { bottom: height + 'px', right: 0 },
    isSmall,
  };
};

export const applyProperties = (
  AnnotativeCode: AnnotativeCodeElement | AnnotativeCodeFullElement,
  properties: AnnotativeCode | AnnotativeCodeFull,
) => {
  for (let key in properties) {
    const propKey = key as keyof (AnnotativeCode | AnnotativeCodeFull);
    const propValue = properties[propKey];
    if (propValue !== undefined) {
      if (propKey === 'onValueChange') {
        // @ts-ignore
        AnnotativeCode.addEventListener('valuechange', propValue);
      } else {
        // @ts-ignore
        AnnotativeCode[propKey] = propValue;
      }
    }
  }
};
