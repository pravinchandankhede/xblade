/**
 * Base interface for all UI elements containing common properties
 */
export interface BaseElement {
  id: string;
  name: string;
  label: string;
  visible: boolean;
  disabled: boolean;
  tooltip?: string;
  cssClass?: string;
  style?: { [key: string]: any };
  validation?: ValidationRule[];
  events?: { [eventName: string]: string };
}

/**
 * Validation rule interface
 */
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email' | 'custom';
  value?: any;
  message: string;
}

/**
 * Base abstract class implementing common element functionality
 */
export abstract class BaseElementModel implements BaseElement {
  id: string = '';
  name: string = '';
  label: string = '';
  visible: boolean = true;
  disabled: boolean = false;
  tooltip?: string;
  cssClass?: string;
  style?: { [key: string]: any };
  validation?: ValidationRule[];
  events?: { [eventName: string]: string };

  constructor(data?: Partial<BaseElement>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  /**
   * Check if the element is valid based on validation rules
   */
  isValid(value?: any): boolean {
    if (!this.validation) return true;
    
    for (const rule of this.validation) {
      if (!this.validateRule(rule, value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get validation errors for the current value
   */
  getValidationErrors(value?: any): string[] {
    const errors: string[] = [];
    if (!this.validation) return errors;

    for (const rule of this.validation) {
      if (!this.validateRule(rule, value)) {
        errors.push(rule.message);
      }
    }
    return errors;
  }

  private validateRule(rule: ValidationRule, value: any): boolean {
    switch (rule.type) {
      case 'required':
        return value !== null && value !== undefined && value !== '';
      case 'minLength':
        return !value || value.length >= rule.value;
      case 'maxLength':
        return !value || value.length <= rule.value;
      case 'pattern':
        return !value || new RegExp(rule.value).test(value);
      case 'min':
        return !value || Number(value) >= rule.value;
      case 'max':
        return !value || Number(value) <= rule.value;
      case 'email':
        return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      default:
        return true;
    }
  }
}
