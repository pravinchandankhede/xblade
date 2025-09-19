import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-slider',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <div class="slider-container">
        <input 
          [id]="controlId"
          type="range" 
          [min]="getMin()"
          [max]="getMax()"
          [step]="getStep()"
          [(ngModel)]="value"
          class="form-range"
        />
        <div class="slider-value">{{ value }}</div>
      </div>
      <div *ngIf="showLabels()" class="slider-labels">
        <span>{{ getMin() }}</span>
        <span>{{ getMax() }}</span>
      </div>
      <small class="form-text text-muted">{{ config.description }}</small>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoSliderComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  value: number = 50;

  ngOnInit() {
    // Set default value if specified
    if (this.config.properties?.defaultValue) {
      this.value = +this.config.properties.defaultValue;
    }
  }

  getMin() {
    return this.config.properties?.min || 0;
  }

  getMax() {
    return this.config.properties?.max || 100;
  }

  getStep() {
    return this.config.properties?.step || 1;
  }

  showLabels() {
    return this.config.properties?.showLabels === 'true';
  }
}