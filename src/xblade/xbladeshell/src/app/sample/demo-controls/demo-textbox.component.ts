import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-textbox',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <input 
        [id]="controlId"
        type="text" 
        [placeholder]="config.properties?.placeholder || ''"
        [maxLength]="config.properties?.maxLength ? +config.properties.maxLength : undefined"
        [required]="config.properties?.required === 'true'"
        [readonly]="config.properties?.readonly === 'true'"
        [(ngModel)]="value"
        class="form-control"
      />
      <small class="form-text text-muted">{{ config.description }}</small>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoTextboxComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: string = '';
}