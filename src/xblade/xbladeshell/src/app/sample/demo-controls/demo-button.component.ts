import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-button',
  template: `
    <div class="control-demo">
      <button 
        [disabled]="config.properties?.disabled === 'true'"
        [class]="getButtonClass()"
        (click)="onButtonClick()"
      >
        {{ config.properties?.text || config.displayName }}
      </button>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="clickCount > 0" class="mt-2">
        <small class="text-info">Button clicked {{ clickCount }} times</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DemoButtonComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  clickCount: number = 0;

  getButtonClass() {
    const variant = this.config.properties?.variant || 'primary';
    const size = this.config.properties?.size || 'medium';
    return `btn btn-${variant} btn-${size}`;
  }

  onButtonClick() {
    this.clickCount++;
  }
}