import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-textarea',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <textarea 
        [id]="controlId"
        [placeholder]="config.properties?.placeholder || ''"
        [rows]="config.properties?.rows ? +config.properties.rows : 3"
        [maxLength]="config.properties?.maxLength ? +config.properties.maxLength : undefined"
        [required]="config.properties?.required === 'true'"
        [readonly]="config.properties?.readonly === 'true'"
        [(ngModel)]="value"
        class="form-control"
      ></textarea>
      <small class="form-text text-muted">{{ config.description }}</small>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoTextareaComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: string = '';
}