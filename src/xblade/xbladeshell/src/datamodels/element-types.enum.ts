/**
 * Element type enumeration based on elements.json
 */
export enum ElementType {
  // Input Elements
  TEXTBOX = 'textbox',
  TEXTAREA = 'textarea',
  DROPDOWN = 'dropdown',
  SINGLECHOICE = 'singlechoice',
  MULTICHOICE = 'multichoice',
  NUMERIC = 'numeric',
  DATE = 'date',
  DATETIME = 'datetime',
  TOGGLE = 'toggle',
  TOGGLE3STATE = 'toggle3state',
  SLIDER = 'slider',
  FILEUPLOAD = 'fileupload',

  // Display Elements
  LABEL = 'label',
  ALERT = 'alert',
  PROGRESS = 'progress',
  SPINNER = 'spinner',

  // Container Elements
  SECTION = 'section',
  PANEL = 'panel',
  TABS = 'tabs',
  ACCORDION = 'accordion',

  // Data Elements
  LIST = 'list',
  GRID = 'grid',

  // Action Elements
  BUTTON = 'button',
  LINK = 'link'
}

/**
 * Element categories as defined in elements.json
 */
export interface ElementCategories {
  inputs: ElementType[];
  display: ElementType[];
  containers: ElementType[];
  data: ElementType[];
  actions: ElementType[];
}

/**
 * Element categories constant
 */
export const ELEMENT_CATEGORIES: ElementCategories = {
  inputs: [
    ElementType.TEXTBOX,
    ElementType.TEXTAREA,
    ElementType.DROPDOWN,
    ElementType.SINGLECHOICE,
    ElementType.MULTICHOICE,
    ElementType.NUMERIC,
    ElementType.DATE,
    ElementType.DATETIME,
    ElementType.TOGGLE,
    ElementType.TOGGLE3STATE,
    ElementType.SLIDER,
    ElementType.FILEUPLOAD
  ],
  display: [
    ElementType.LABEL,
    ElementType.ALERT,
    ElementType.PROGRESS,
    ElementType.SPINNER
  ],
  containers: [
    ElementType.SECTION,
    ElementType.PANEL,
    ElementType.TABS,
    ElementType.ACCORDION
  ],
  data: [
    ElementType.LIST,
    ElementType.GRID
  ],
  actions: [
    ElementType.BUTTON,
    ElementType.LINK
  ]
};
