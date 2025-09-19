import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-date',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <input 
        [id]="controlId"
        [type]="getInputType()" 
        [min]="config.properties?.minDate"
        [max]="config.properties?.maxDate"
        [required]="config.properties?.required === 'true'"
        [(ngModel)]="value"
        class="form-control"
      />
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="value" class="mt-2">
        <small class="text-info">Selected date: {{ formatDate() }}</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoDateComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: string = '';

  getInputType() {
    return this.config.properties?.showTime === 'true' ? 'datetime-local' : 'date';
  }

  formatDate() {
    if (!this.value) return '';
    const date = new Date(this.value);
    const format = this.config.properties?.format;
    
    if (format) {
      // Simple format handling
      return date.toLocaleDateString();
    }
    
    return this.config.properties?.showTime === 'true' 
      ? date.toLocaleString() 
      : date.toLocaleDateString();
  }
}