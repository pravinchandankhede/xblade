import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-singlechoice',
  template: `
    <div class="control-demo">
      <fieldset>
        <legend>{{ config.label || config.displayName }}</legend>
        <div [class]="getOrientationClass()">
          <div *ngFor="let option of getOptions(); let i = index" class="form-check">
            <input 
              [id]="controlId + '_' + i"
              [name]="controlId"
              type="radio" 
              [value]="option.value"
              [required]="config.properties?.required === 'true'"
              [(ngModel)]="value"
              class="form-check-input"
            />
            <label class="form-check-label" [for]="controlId + '_' + i">
              {{ option.label }}
            </label>
          </div>
        </div>
      </fieldset>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="value" class="mt-2">
        <small class="text-info">Selected: {{ value }}</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoSinglechoiceComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: string = '';

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
    return orientation === 'horizontal' ? 'radio-horizontal' : 'radio-vertical';
  }
}