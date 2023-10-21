import { AnnotationConfig } from '../types/types.js';

export const DEFAULT_ANNOTATION_CONFIG: AnnotationConfig = {
  type: 'string',
  value: '',
  animation: 'background',
  isEditable: true,
};

export const DEFAULT_PARENT_STYLE = {
  fontSize: 16,
  backgroundColor: 'rgb(255, 255, 255)',
  width: 0,
  height: 0,
  paddingLeft: 0,
  paddingRight: 0,
};

export const DEFAULT_POPUP_STYLE = {
  backgroundColor: '',
  borderColor: '',
  textColor: '',
  inputBorderColor: '',
};
