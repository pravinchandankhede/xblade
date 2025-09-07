// Base models
export * from './base-element.model';
export * from './element-types.enum';

// Input element models
export * from './input-elements.model';
export * from './selection-elements.model';
export * from './date-toggle-elements.model';

// Data element models
export * from './data-elements.model';

// Display and action element models
export * from './display-action-elements.model';

// Container element models
export * from './container-elements.model';

// Union type for all element models
import { BaseElementModel } from './base-element.model';
import { TextBoxModel, TextAreaModel, NumericModel, FileUploadModel } from './input-elements.model';
import { DropdownModel, SingleChoiceModel, MultiChoiceModel, SliderModel } from './selection-elements.model';
import { DateModel, DateTimeModel, ToggleModel, Toggle3StateModel } from './date-toggle-elements.model';
import { ListModel, GridModel } from './data-elements.model';
import { ButtonModel, LinkModel, LabelModel, AlertModel, ProgressModel, SpinnerModel } from './display-action-elements.model';
import { SectionModel, PanelModel, TabsModel, AccordionModel } from './container-elements.model';

/**
 * Union type representing all possible element models
 */
export type ElementModel = 
  | TextBoxModel
  | TextAreaModel
  | NumericModel
  | FileUploadModel
  | DropdownModel
  | SingleChoiceModel
  | MultiChoiceModel
  | SliderModel
  | DateModel
  | DateTimeModel
  | ToggleModel
  | Toggle3StateModel
  | ListModel
  | GridModel
  | ButtonModel
  | LinkModel
  | LabelModel
  | AlertModel
  | ProgressModel
  | SpinnerModel
  | SectionModel
  | PanelModel
  | TabsModel
  | AccordionModel;

/**
 * Type guard to check if an object is a BaseElementModel
 */
export function isElementModel(obj: any): obj is ElementModel {
  return obj instanceof BaseElementModel;
}

/**
 * Factory function to create element models based on type
 */
export function createElementModel(type: string, data?: any): ElementModel | null {
  switch (type) {
    case 'textbox':
      return new TextBoxModel(data);
    case 'textarea':
      return new TextAreaModel(data);
    case 'numeric':
      return new NumericModel(data);
    case 'fileupload':
      return new FileUploadModel(data);
    case 'dropdown':
      return new DropdownModel(data);
    case 'singlechoice':
      return new SingleChoiceModel(data);
    case 'multichoice':
      return new MultiChoiceModel(data);
    case 'slider':
      return new SliderModel(data);
    case 'date':
      return new DateModel(data);
    case 'datetime':
      return new DateTimeModel(data);
    case 'toggle':
      return new ToggleModel(data);
    case 'toggle3state':
      return new Toggle3StateModel(data);
    case 'list':
      return new ListModel(data);
    case 'grid':
      return new GridModel(data);
    case 'button':
      return new ButtonModel(data);
    case 'link':
      return new LinkModel(data);
    case 'label':
      return new LabelModel(data);
    case 'alert':
      return new AlertModel(data);
    case 'progress':
      return new ProgressModel(data);
    case 'spinner':
      return new SpinnerModel(data);
    case 'section':
      return new SectionModel(data);
    case 'panel':
      return new PanelModel(data);
    case 'tabs':
      return new TabsModel(data);
    case 'accordion':
      return new AccordionModel(data);
    default:
      return null;
  }
}
