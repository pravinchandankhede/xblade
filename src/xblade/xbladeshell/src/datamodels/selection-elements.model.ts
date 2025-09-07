import { BaseElementModel } from './base-element.model';

/**
 * Option interface for selection elements
 */
export interface SelectOption {
  value: any;
  text: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Dropdown selection element model
 */
export class DropdownModel extends BaseElementModel {
  options: SelectOption[] = [];
  required: boolean = false;
  defaultValue?: any;
  placeholder?: string;
  selectedValue?: any;

  constructor(data?: Partial<DropdownModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Single choice (radio button) element model
 */
export class SingleChoiceModel extends BaseElementModel {
  options: SelectOption[] = [];
  required: boolean = false;
  defaultValue?: any;
  orientation: 'vertical' | 'horizontal' = 'vertical';
  selectedValue?: any;

  constructor(data?: Partial<SingleChoiceModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Multi choice (checkbox) element model
 */
export class MultiChoiceModel extends BaseElementModel {
  options: SelectOption[] = [];
  required: boolean = false;
  defaultValues?: any[];
  orientation: 'vertical' | 'horizontal' = 'vertical';
  selectedValues?: any[];

  constructor(data?: Partial<MultiChoiceModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Slider element model
 */
export class SliderModel extends BaseElementModel {
  min: number = 0;
  max: number = 100;
  step: number = 1;
  defaultValue?: number;
  showLabels: boolean = true;
  showTicks: boolean = false;
  value?: number;

  constructor(data?: Partial<SliderModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
