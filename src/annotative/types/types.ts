import { LanguageFn } from 'highlight.js';

export interface ValueChangeDetail {
  updatedKey: string;
  valueObj: Record<string, any>;
}

export interface ValueChangeEvent extends CustomEvent {
  detail: ValueChangeDetail;
}

export interface PopupStyle {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  inputBorderColor: string;
}
export interface CustomRenderingProps {
  html: any;
  key: string;
  config: AnnotationConfig;
  isBgLight: boolean;
  popupStyle: PopupStyle;
}

export interface AnnotationConfig {
  // `type` defines
  // - the styling of the annotation
  // - the input type if knob is not provided
  type:
    | 'boolean'
    | 'string'
    | 'number'
    | 'integer'
    //
    | 'comment'
    | 'quote'
    | 'deletion'
    | 'name'
    | 'regexp'
    | 'selector-class'
    | 'selector-id'
    | 'tag'
    | 'template-variable'
    | 'variable'
    | 'built_in'
    | 'link'
    | 'literal'
    | 'meta'
    | 'params'
    | 'type'
    | 'attribute'
    | 'addition'
    | 'bullet'
    | 'symbol'
    | 'section'
    | 'title'
    | 'keyword'
    | 'selector-tag'
    | 'emphasis';
  // value to show in annotation
  value: boolean | string | number;
  formatValue?: (input: any) => any;
  //
  animation?: 'background' | 'underline';
  // custom editing
  isEditable?: boolean;
  knob?:
    | 'boolean'
    | 'string'
    | 'number'
    | 'integer'
    // custom
    | 'select'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'range'
    | 'color';
  // type - number
  min?: number | string;
  max?: number | string;
  // knob - select
  options?: (boolean | string | number)[];
  // knob - textarea
  shouldValidateJson?: true;
  // popup basic
  title?: string;
  typeText?: string;
  description?: string;
  // popup advanced
  customPopupPayload?: any;
  renderPopup?: (props: CustomRenderingProps) => any;
  renderDescription?: (props: CustomRenderingProps) => any;
}

export interface AnnotativeCodeFull {
  themeCss: string;
  content: string;
  annotation: Record<string, AnnotationConfig>;
  annotationMask?: string;
  encloser?: string;
  styleMap?: Record<string, string>;
  fontSize?: string;
  showCredentials?: boolean;
  onValueChange?: ({ detail }: { detail: ValueChangeDetail }) => any;
}

export interface AnnotativeCodeFullElement
  extends HTMLElement,
    AnnotativeCodeFull {}

export interface AnnotativeCode extends AnnotativeCodeFull {
  languageFn: LanguageFn;
}

export interface AnnotativeCodeElement extends HTMLElement, AnnotativeCode {}
