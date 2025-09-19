import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-alert',
  template: `
    <div class="control-demo">
      <div 
        [class]="getAlertClass()"
        role="alert"
      >
        <div class="alert-content">
          <i *ngIf="showIcon()" [class]="getIconClass()"></i>
          <span>{{ config.properties?.message || 'This is a sample alert message' }}</span>
          <button 
            *ngIf="isDismissible()" 
            type="button" 
            class="btn-close" 
            (click)="dismiss()"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
      <div *ngIf="isDismissed" class="mt-2">
        <button class="btn btn-sm btn-outline-primary" (click)="show()">
          Show Alert Again
        </button>
      </div>
      <small class="form-text text-muted">{{ config.description }}</small>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DemoAlertComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  isDismissed: boolean = false;

  getAlertClass() {
    if (this.isDismissed) return 'd-none';
    
    const variant = this.config.properties?.variant || 'info';
    const dismissible = this.isDismissible() ? 'alert-dismissible' : '';
    
    return `alert alert-${variant} ${dismissible}`.trim();
  }

  getIconClass() {
    const variant = this.config.properties?.variant || 'info';
    const iconMap: { [key: string]: string } = {
      'info': 'bi bi-info-circle',
      'success': 'bi bi-check-circle',
      'warning': 'bi bi-exclamation-triangle',
      'error': 'bi bi-x-circle'
    };
    
    return iconMap[variant] || iconMap['info'];
  }

  isDismissible() {
    return this.config.properties?.dismissible === 'true';
  }

  showIcon() {
    return this.config.properties?.icon === 'true';
  }

  dismiss() {
    this.isDismissed = true;
  }

  show() {
    this.isDismissed = false;
  }
}