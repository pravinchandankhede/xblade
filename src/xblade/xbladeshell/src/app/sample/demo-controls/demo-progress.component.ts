import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-progress',
  template: `
    <div class="control-demo">
      <label>{{ config.label || config.displayName }}</label>
      <div class="progress">
        <div 
          class="progress-bar"
          [class]="getProgressClass()"
          [style.width.%]="getPercentage()"
          role="progressbar"
          [attr.aria-valuenow]="getCurrentValue()"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="getMaxValue()"
        >
          <span *ngIf="showPercentage()">{{ getPercentage() }}%</span>
        </div>
      </div>
      <div class="progress-controls mt-2">
        <button class="btn btn-sm btn-primary" (click)="simulate()">Simulate Progress</button>
        <button class="btn btn-sm btn-secondary" (click)="reset()">Reset</button>
      </div>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div class="mt-2">
        <small class="text-info">
          Value: {{ getCurrentValue() }} / {{ getMaxValue() }}
        </small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DemoProgressComponent implements OnInit {
  @Input() config: any = {};
  @Input() controlId: string = '';
  currentValue: number = 0;
  isSimulating: boolean = false;

  ngOnInit() {
    this.currentValue = +(this.config.properties?.value || 0);
  }

  getCurrentValue() {
    return this.currentValue;
  }

  getMaxValue() {
    return +(this.config.properties?.max || 100);
  }

  getPercentage() {
    return Math.round((this.currentValue / this.getMaxValue()) * 100);
  }

  showPercentage() {
    return this.config.properties?.showPercentage === 'true';
  }

  getProgressClass() {
    const variant = this.config.properties?.variant || 'default';
    const baseClass = 'progress-bar';
    
    switch (variant) {
      case 'success':
        return `${baseClass} bg-success`;
      case 'warning':
        return `${baseClass} bg-warning`;
      case 'error':
        return `${baseClass} bg-danger`;
      default:
        return baseClass;
    }
  }

  simulate() {
    if (this.isSimulating) return;
    
    this.isSimulating = true;
    this.currentValue = 0;
    
    const interval = setInterval(() => {
      this.currentValue += 5;
      if (this.currentValue >= this.getMaxValue()) {
        this.currentValue = this.getMaxValue();
        this.isSimulating = false;
        clearInterval(interval);
      }
    }, 100);
  }

  reset() {
    this.currentValue = 0;
    this.isSimulating = false;
  }
}