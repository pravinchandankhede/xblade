import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoTextboxComponent } from './demo-textbox.component';
import { DemoTextareaComponent } from './demo-textarea.component';
import { DemoDropdownComponent } from './demo-dropdown.component';
import { DemoButtonComponent } from './demo-button.component';
import { DemoToggleComponent } from './demo-toggle.component';
import { DemoNumericComponent } from './demo-numeric.component';
import { DemoSinglechoiceComponent } from './demo-singlechoice.component';
import { DemoMultichoiceComponent } from './demo-multichoice.component';
import { DemoDateComponent } from './demo-date.component';
import { DemoDatetimeComponent } from './demo-datetime.component';
import { DemoToggle3stateComponent } from './demo-toggle3state.component';
import { DemoSliderComponent } from './demo-slider.component';
import { DemoLinkComponent } from './demo-link.component';
import { DemoLabelComponent } from './demo-label.component';
import { DemoFileuploadComponent } from './demo-fileupload.component';
import { DemoProgressComponent } from './demo-progress.component';
import { DemoAlertComponent } from './demo-alert.component';
import { DemoListComponent } from './demo-list.component';
import { DemoGridComponent } from './demo-grid.component';
import { DemoSectionComponent } from './demo-section.component';
import { DemoTabsComponent } from './demo-tabs.component';
import { DemoPanelComponent } from './demo-panel.component';
import { DemoSpinnerComponent } from './demo-spinner.component';
import { DemoAccordionComponent } from './demo-accordion.component';

@Component({
  selector: 'app-demo-control-renderer',
  template: `
    <div class="demo-control-container">
      <!-- Textbox -->
      <app-demo-textbox 
        *ngIf="element.type === 'textbox'" 
        [element]="element">
      </app-demo-textbox>
      
      <!-- Textarea -->
      <app-demo-textarea 
        *ngIf="element.type === 'textarea'" 
        [element]="element">
      </app-demo-textarea>
      
      <!-- Dropdown -->
      <app-demo-dropdown 
        *ngIf="element.type === 'dropdown'" 
        [element]="element">
      </app-demo-dropdown>
      
      <!-- Single Choice (Radio buttons) -->
      <app-demo-singlechoice 
        *ngIf="element.type === 'singlechoice'" 
        [element]="element">
      </app-demo-singlechoice>
      
      <!-- Multi Choice (Checkboxes) -->
      <app-demo-multichoice 
        *ngIf="element.type === 'multichoice'" 
        [element]="element">
      </app-demo-multichoice>
      
      <!-- Numeric -->
      <app-demo-numeric 
        *ngIf="element.type === 'numeric'" 
        [element]="element">
      </app-demo-numeric>
      
      <!-- Date -->
      <app-demo-date 
        *ngIf="element.type === 'date'" 
        [element]="element">
      </app-demo-date>
      
      <!-- DateTime -->
      <app-demo-datetime 
        *ngIf="element.type === 'datetime'" 
        [element]="element">
      </app-demo-datetime>
      
      <!-- Toggle -->
      <app-demo-toggle 
        *ngIf="element.type === 'toggle'" 
        [element]="element">
      </app-demo-toggle>
      
      <!-- Three State Toggle -->
      <app-demo-toggle3state 
        *ngIf="element.type === 'toggle3state'" 
        [element]="element">
      </app-demo-toggle3state>
      
      <!-- Slider -->
      <app-demo-slider 
        *ngIf="element.type === 'slider'" 
        [element]="element">
      </app-demo-slider>
      
      <!-- Button -->
      <app-demo-button 
        *ngIf="element.type === 'button'" 
        [element]="element">
      </app-demo-button>
      
      <!-- Link -->
      <app-demo-link 
        *ngIf="element.type === 'link'" 
        [element]="element">
      </app-demo-link>
      
      <!-- Label -->
      <app-demo-label 
        *ngIf="element.type === 'label'" 
        [element]="element">
      </app-demo-label>
      
      <!-- File Upload -->
      <app-demo-fileupload 
        *ngIf="element.type === 'fileupload'" 
        [element]="element">
      </app-demo-fileupload>
      
      <!-- Progress Bar -->
      <app-demo-progress 
        *ngIf="element.type === 'progress'" 
        [element]="element">
      </app-demo-progress>
      
      <!-- Alert -->
      <app-demo-alert 
        *ngIf="element.type === 'alert'" 
        [element]="element">
      </app-demo-alert>
      
      <!-- List -->
      <app-demo-list 
        *ngIf="element.type === 'list'" 
        [element]="element">
      </app-demo-list>
      
      <!-- Grid -->
      <app-demo-grid 
        *ngIf="element.type === 'grid'" 
        [element]="element">
      </app-demo-grid>
      
      <!-- Section -->
      <app-demo-section 
        *ngIf="element.type === 'section'" 
        [element]="element">
      </app-demo-section>
      
      <!-- Tabs -->
      <app-demo-tabs 
        *ngIf="element.type === 'tabs'" 
        [element]="element">
      </app-demo-tabs>
      
      <!-- Panel -->
      <app-demo-panel 
        *ngIf="element.type === 'panel'" 
        [element]="element">
      </app-demo-panel>
      
      <!-- Spinner -->
      <app-demo-spinner 
        *ngIf="element.type === 'spinner'" 
        [element]="element">
      </app-demo-spinner>
      
      <!-- Accordion -->
      <app-demo-accordion 
        *ngIf="element.type === 'accordion'" 
        [element]="element">
      </app-demo-accordion>
      
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
    DemoNumericComponent,
    DemoSinglechoiceComponent,
    DemoMultichoiceComponent,
    DemoDateComponent,
    DemoDatetimeComponent,
    DemoToggle3stateComponent,
    DemoSliderComponent,
    DemoLinkComponent,
    DemoLabelComponent,
    DemoFileuploadComponent,
    DemoProgressComponent,
    DemoAlertComponent,
    DemoListComponent,
    DemoGridComponent,
    DemoSectionComponent,
    DemoTabsComponent,
    DemoPanelComponent,
    DemoSpinnerComponent,
    DemoAccordionComponent
  ]
})
export class DemoControlRendererComponent {
  @Input() element: any = {};
  @Input() index: number = 0;

  private supportedTypes = [
    'textbox', 'textarea', 'dropdown', 'button', 'toggle', 'numeric',
    'singlechoice', 'multichoice', 'date', 'datetime', 'toggle3state',
    'slider', 'link', 'label', 'fileupload', 'progress', 'alert',
    'list', 'grid', 'section', 'tabs', 'panel', 'spinner', 'accordion'
  ];

  getControlId(): string {
    return `${this.element.type}_${this.index}`;
  }

  isSupportedType(): boolean {
    return this.supportedTypes.includes(this.element.type);
  }
}