import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-dropdown',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <select 
        [id]="controlId"
        [required]="config.properties?.required === 'true'"
        [(ngModel)]="value"
        class="form-control"
      >
        <option value="" disabled>{{ config.properties?.placeholder || 'Select an option' }}</option>
        <option *ngFor="let option of getOptions()" [value]="option.value">{{ option.label }}</option>
      </select>
      <small class="form-text text-muted">{{ config.description }}</small>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoDropdownComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: string = '';

  getOptions() {
    // Sample options for demo
    return [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ];
  }
}