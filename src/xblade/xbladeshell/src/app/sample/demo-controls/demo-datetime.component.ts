import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-datetime',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <input 
        [id]="controlId"
        type="datetime-local" 
        [min]="config.properties?.minDateTime"
        [max]="config.properties?.maxDateTime"
        [required]="config.properties?.required === 'true'"
        [(ngModel)]="value"
        class="form-control"
      />
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="value" class="mt-2">
        <small class="text-info">Selected: {{ formatDateTime() }}</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoDatetimeComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: string = '';

  formatDateTime() {
    if (!this.value) return '';
    const date = new Date(this.value);
    const timeFormat = this.config.properties?.timeFormat;
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: timeFormat === '12h' ? 'numeric' : '2-digit',
      minute: '2-digit',
      hour12: timeFormat === '12h'
    };
    
    return date.toLocaleString('en-US', options);
  }
}