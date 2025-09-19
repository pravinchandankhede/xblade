import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-label',
  template: `
    <div class="control-demo">
      <label 
        [for]="config.properties?.for || ''"
        [class]="getLabelClass()"
      >
        {{ config.properties?.text || config.displayName }}
        <span *ngIf="isRequired()" class="required-indicator">*</span>
      </label>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div class="mt-2">
        <small class="text-info">
          This label would be associated with control ID: 
          <code>{{ config.properties?.for || 'none' }}</code>
        </small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DemoLabelComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';

  getLabelClass() {
    return this.isRequired() ? 'form-label required' : 'form-label';
  }

  isRequired() {
    return this.config.properties?.required === 'true';
  }
}