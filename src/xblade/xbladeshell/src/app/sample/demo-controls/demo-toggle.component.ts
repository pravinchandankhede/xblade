import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-toggle',
  template: `
    <div class="control-demo">
      <div class="form-check form-switch">
        <input 
          [id]="controlId"
          class="form-check-input" 
          type="checkbox" 
          [required]="config.properties?.required === 'true'"
          [(ngModel)]="value"
        />
        <label class="form-check-label" [for]="controlId">
          {{ config.label || config.displayName }}
          <span class="toggle-text">{{ value ? (config.properties?.onText || 'On') : (config.properties?.offText || 'Off') }}</span>
        </label>
      </div>
      <small class="form-text text-muted">{{ config.description }}</small>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoToggleComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: boolean = false;
}