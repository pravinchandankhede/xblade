import { BaseElementModel } from './base-element.model';

/**
 * Text box input element model
 */
export class TextBoxModel extends BaseElementModel {
  placeholder?: string;
  maxLength?: number;
  required: boolean = false;
  readonly: boolean = false;
  value?: string;

  constructor(data?: Partial<TextBoxModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Text area input element model
 */
export class TextAreaModel extends BaseElementModel {
  placeholder?: string;
  rows: number = 3;
  maxLength?: number;
  required: boolean = false;
  readonly: boolean = false;
  value?: string;

  constructor(data?: Partial<TextAreaModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Numeric input element model
 */
export class NumericModel extends BaseElementModel {
  min?: number;
  max?: number;
  step?: number;
  required: boolean = false;
  decimals?: number;
  format: 'integer' | 'decimal' | 'currency' | 'percentage' = 'decimal';
  value?: number;

  constructor(data?: Partial<NumericModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * File upload element model
 */
export class FileUploadModel extends BaseElementModel {
  accept?: string;
  multiple: boolean = false;
  maxSize?: number;
  required: boolean = false;
  dragDrop: boolean = true;
  files?: File[];

  constructor(data?: Partial<FileUploadModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
