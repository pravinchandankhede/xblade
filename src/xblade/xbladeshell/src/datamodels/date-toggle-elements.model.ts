import { BaseElementModel } from './base-element.model';

/**
 * Date picker element model
 */
export class DateModel extends BaseElementModel {
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  required: boolean = false;
  showTime: boolean = false;
  value?: Date;

  constructor(data?: Partial<DateModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Date time picker element model
 */
export class DateTimeModel extends BaseElementModel {
  format?: string;
  minDateTime?: Date;
  maxDateTime?: Date;
  required: boolean = false;
  timeFormat: '12h' | '24h' = '24h';
  value?: Date;

  constructor(data?: Partial<DateTimeModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Toggle switch element model
 */
export class ToggleModel extends BaseElementModel {
  defaultValue: boolean = false;
  onText?: string;
  offText?: string;
  required: boolean = false;
  value?: boolean;

  constructor(data?: Partial<ToggleModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Three state toggle element model
 */
export class Toggle3StateModel extends BaseElementModel {
  defaultValue: 'true' | 'false' | 'indeterminate' = 'false';
  onText?: string;
  offText?: string;
  indeterminateText?: string;
  required: boolean = false;
  value?: 'true' | 'false' | 'indeterminate';

  constructor(data?: Partial<Toggle3StateModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
