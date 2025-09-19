import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-link',
  template: `
    <div class="control-demo">
      <a 
        [href]="config.properties?.url || '#'"
        [target]="config.properties?.target || '_self'"
        [class]="getLinkClass()"
        (click)="onLinkClick($event)"
      >
        {{ config.properties?.text || config.displayName }}
      </a>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="clickCount > 0" class="mt-2">
        <small class="text-info">Link clicked {{ clickCount }} times</small>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DemoLinkComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  clickCount: number = 0;

  getLinkClass() {
    return this.config.properties?.disabled === 'true' 
      ? 'link-disabled' 
      : 'link-primary';
  }

  onLinkClick(event: Event) {
    this.clickCount++;
    // Prevent navigation for demo purposes
    if (!this.config.properties?.url || this.config.properties.url === '#') {
      event.preventDefault();
    }
  }
}