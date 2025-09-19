import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-toggle3state',
  template: `
    <div class="control-demo">
      <label>{{ config.label || config.displayName }}</label>
      <div class="three-state-toggle">
        <button 
          type="button"
          [class]="getToggleClass()"
          (click)="cycleState()"
          class="toggle-button"
        >
          {{ getCurrentText() }}
        </button>
      </div>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div class="mt-2">
        <small class="text-info">Current state: {{ value || 'indeterminate' }}</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoToggle3stateComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: string = 'indeterminate';

  private states = ['indeterminate', 'true', 'false'];

  cycleState() {
    const currentIndex = this.states.indexOf(this.value);
    const nextIndex = (currentIndex + 1) % this.states.length;
    this.value = this.states[nextIndex];
  }

  getCurrentText() {
    switch (this.value) {
      case 'true':
        return this.config.properties?.onText || 'On';
      case 'false':
        return this.config.properties?.offText || 'Off';
      default:
        return this.config.properties?.indeterminateText || 'Indeterminate';
    }
  }

  getToggleClass() {
    switch (this.value) {
      case 'true':
        return 'btn btn-success';
      case 'false':
        return 'btn btn-secondary';
      default:
        return 'btn btn-warning';
    }
  }
}