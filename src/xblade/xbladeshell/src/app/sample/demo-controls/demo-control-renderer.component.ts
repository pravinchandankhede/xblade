import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoTextboxComponent } from './demo-textbox.component';
import { DemoTextareaComponent } from './demo-textarea.component';
import { DemoDropdownComponent } from './demo-dropdown.component';
import { DemoButtonComponent } from './demo-button.component';
import { DemoToggleComponent } from './demo-toggle.component';
import { DemoNumericComponent } from './demo-numeric.component';

@Component({
  selector: 'app-demo-control-renderer',
  template: `
    <div class="demo-control-container">
      <!-- Textbox -->
      <app-demo-textbox 
        *ngIf="element.type === 'textbox'" 
        [config]="element" 
        [controlId]="getControlId()">
      </app-demo-textbox>
      
      <!-- Textarea -->
      <app-demo-textarea 
        *ngIf="element.type === 'textarea'" 
        [config]="element" 
        [controlId]="getControlId()">
      </app-demo-textarea>
      
      <!-- Dropdown -->
      <app-demo-dropdown 
        *ngIf="element.type === 'dropdown'" 
        [config]="element" 
        [controlId]="getControlId()">
      </app-demo-dropdown>
      
      <!-- Button -->
      <app-demo-button 
        *ngIf="element.type === 'button'" 
        [config]="element" 
        [controlId]="getControlId()">
      </app-demo-button>
      
      <!-- Toggle -->
      <app-demo-toggle 
        *ngIf="element.type === 'toggle'" 
        [config]="element" 
        [controlId]="getControlId()">
      </app-demo-toggle>
      
      <!-- Numeric -->
      <app-demo-numeric 
        *ngIf="element.type === 'numeric'" 
        [config]="element" 
        [controlId]="getControlId()">
      </app-demo-numeric>
      
      <!-- Fallback for unsupported types -->
      <div *ngIf="!isSupportedType()" class="unsupported-control">
        <h5>{{ element.displayName }}</h5>
        <p class="text-muted">{{ element.description }}</p>
        <div class="alert alert-info">
          <small>This control type ({{ element.type }}) is not yet implemented in the demo.</small>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    DemoTextboxComponent,
    DemoTextareaComponent,
    DemoDropdownComponent,
    DemoButtonComponent,
    DemoToggleComponent,
    DemoNumericComponent
  ]
})
export class DemoControlRendererComponent {
  @Input() element: any = {};
  @Input() index: number = 0;

  private supportedTypes = [
    'textbox', 'textarea', 'dropdown', 'button', 'toggle', 'numeric'
  ];

  getControlId(): string {
    return `${this.element.type}_${this.index}`;
  }

  isSupportedType(): boolean {
    return this.supportedTypes.includes(this.element.type);
  }
}