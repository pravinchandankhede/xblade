import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-multichoice',
  template: `
    <div class="control-demo">
      <fieldset>
        <legend>{{ config.label || config.displayName }}</legend>
        <div [class]="getOrientationClass()">
          <div *ngFor="let option of getOptions(); let i = index" class="form-check">
            <input 
              [id]="controlId + '_' + i"
              type="checkbox" 
              [value]="option.value"
              [required]="config.properties?.required === 'true'"
              [checked]="isSelected(option.value)"
              (change)="onCheckboxChange(option.value, $event)"
              class="form-check-input"
            />
            <label class="form-check-label" [for]="controlId + '_' + i">
              {{ option.label }}
            </label>
          </div>
        </div>
      </fieldset>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="selectedValues.length > 0" class="mt-2">
        <small class="text-info">Selected: {{ selectedValues.join(', ') }}</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoMultichoiceComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  selectedValues: string[] = [];

  getOptions() {
    return [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' }
    ];
  }

  getOrientationClass() {
    const orientation = this.config.properties?.orientation || 'vertical';
    return orientation === 'horizontal' ? 'checkbox-horizontal' : 'checkbox-vertical';
  }

  isSelected(value: string): boolean {
    return this.selectedValues.includes(value);
  }

  onCheckboxChange(value: string, event: any) {
    if (event.target.checked) {
      this.selectedValues.push(value);
    } else {
      const index = this.selectedValues.indexOf(value);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      }
    }
  }
}