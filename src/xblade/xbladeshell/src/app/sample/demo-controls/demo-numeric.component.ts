import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-numeric',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <input 
        [id]="controlId"
        type="number" 
        [min]="config.properties?.min"
        [max]="config.properties?.max"
        [step]="config.properties?.step || 1"
        [required]="config.properties?.required === 'true'"
        [(ngModel)]="value"
        class="form-control"
      />
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="value" class="mt-1">
        <small class="text-info">Current value: {{ formatValue() }}</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoNumericComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: number = 0;

  formatValue() {
    const format = this.config.properties?.format;
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.value);
    } else if (format === 'percentage') {
      return `${this.value}%`;
    }
    return this.value.toString();
  }
}