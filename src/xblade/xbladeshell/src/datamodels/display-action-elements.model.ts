import { BaseElementModel } from './base-element.model';

/**
 * Button element model
 */
export class ButtonModel extends BaseElementModel {
  text: string = '';
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' = 'primary';
  icon?: string;
  size: 'small' | 'medium' | 'large' = 'medium';
  clickHandler?: () => void;

  constructor(data?: Partial<ButtonModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Link element model
 */
export class LinkModel extends BaseElementModel {
  text: string = '';
  url: string = '';
  target: '_blank' | '_self' | '_parent' | '_top' = '_self';

  constructor(data?: Partial<LinkModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Label element model
 */
export class LabelModel extends BaseElementModel {
  text: string = '';
  for?: string;
  required: boolean = false;

  constructor(data?: Partial<LabelModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Alert element model
 */
export class AlertModel extends BaseElementModel {
  message: string = '';
  variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  dismissible: boolean = false;
  icon: boolean = true;

  constructor(data?: Partial<AlertModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Progress bar element model
 */
export class ProgressModel extends BaseElementModel {
  value: number = 0;
  max: number = 100;
  showPercentage: boolean = true;
  variant: 'default' | 'success' | 'warning' | 'error' = 'default';

  constructor(data?: Partial<ProgressModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }

  /**
   * Get progress percentage
   */
  getPercentage(): number {
    return Math.round((this.value / this.max) * 100);
  }
}

/**
 * Loading spinner element model
 */
export class SpinnerModel extends BaseElementModel {
  size: 'small' | 'medium' | 'large' = 'medium';
  text?: string;

  constructor(data?: Partial<SpinnerModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
