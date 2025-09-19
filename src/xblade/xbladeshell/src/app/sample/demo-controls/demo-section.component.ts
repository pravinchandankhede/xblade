import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SectionElement {
  type: string;
  label: string;
  value?: any;
}

@Component({
  selector: 'app-demo-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-control">
      <h5>{{element.displayName}}</h5>
      <p class="text-muted">{{element.description}}</p>
      
      <!-- Section container -->
      <div class="section-container">
        <div class="section-header" [class.collapsible]="collapsible" (click)="onHeaderClick()">
          <h6 class="section-title">
            <span *ngIf="collapsible" class="collapse-indicator">
              {{collapsed ? '▶' : '▼'}}
            </span>
            {{title}}
          </h6>
        </div>
        
        <div class="section-content" [class.collapsed]="collapsed" [@slideInOut]="collapsed ? 'out' : 'in'">
          <!-- Sample content elements -->
          <div class="section-element" *ngFor="let sectionElement of sectionElements">
            <label class="form-label">{{sectionElement.label}}</label>
            
            <!-- Different element types based on the section element -->
            <input 
              *ngIf="sectionElement.type === 'text'" 
              type="text" 
              class="form-control" 
              [(ngModel)]="sectionElement.value"
              [placeholder]="'Enter ' + sectionElement.label.toLowerCase()">
            
            <textarea 
              *ngIf="sectionElement.type === 'textarea'"
              class="form-control" 
              rows="3"
              [(ngModel)]="sectionElement.value"
              [placeholder]="'Enter ' + sectionElement.label.toLowerCase()">
            </textarea>
            
            <select 
              *ngIf="sectionElement.type === 'select'" 
              class="form-select" 
              [(ngModel)]="sectionElement.value">
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            
            <div *ngIf="sectionElement.type === 'checkbox'" class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                [(ngModel)]="sectionElement.value">
              <label class="form-check-label">
                {{sectionElement.label}}
              </label>
            </div>
          </div>
          
          <!-- Section actions -->
          <div class="section-actions mt-3">
            <button class="btn btn-sm btn-secondary me-2" (click)="addElement()">Add Element</button>
            <button class="btn btn-sm btn-outline-secondary" (click)="resetSection()">Reset</button>
          </div>
        </div>
      </div>
      
      <!-- Demo controls -->
      <div class="demo-actions mt-3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" [(ngModel)]="collapsible">
          <label class="form-check-label">Make collapsible</label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .section-container {
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
      overflow: hidden;
    }
    
    .section-header {
      background: #f8f9fa;
      padding: 12px 16px;
      border-bottom: 1px solid #dee2e6;
      margin: 0;
    }
    
    .section-header.collapsible {
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .section-header.collapsible:hover {
      background: #e9ecef;
    }
    
    .section-title {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .collapse-indicator {
      font-size: 12px;
      transition: transform 0.2s;
      min-width: 12px;
    }
    
    .section-content {
      padding: 16px;
      transition: all 0.3s ease;
      max-height: 1000px;
      overflow: hidden;
    }
    
    .section-content.collapsed {
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    
    .section-element {
      margin-bottom: 1rem;
    }
    
    .section-element:last-child {
      margin-bottom: 0;
    }
    
    .section-actions {
      padding-top: 12px;
      border-top: 1px solid #dee2e6;
    }
    
    .demo-actions {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 0.375rem;
    }
  `],
  animations: []
})
export class DemoSectionComponent {
  @Input() element: any;
  
  title: string = 'User Information Section';
  collapsible: boolean = true;
  collapsed: boolean = false;
  
  sectionElements: SectionElement[] = [
    { type: 'text', label: 'First Name', value: 'John' },
    { type: 'text', label: 'Last Name', value: 'Doe' },
    { type: 'text', label: 'Email', value: 'john.doe@example.com' },
    { type: 'select', label: 'Department', value: 'option1' },
    { type: 'textarea', label: 'Bio', value: 'A brief description about the user...' },
    { type: 'checkbox', label: 'Send notifications', value: true }
  ];
  
  private elementTypes = ['text', 'textarea', 'select', 'checkbox'];
  private nextElementId = this.sectionElements.length + 1;
  
  onHeaderClick() {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
    }
  }
  
  addElement() {
    const randomType = this.elementTypes[Math.floor(Math.random() * this.elementTypes.length)];
    const newElement: SectionElement = {
      type: randomType,
      label: `New ${randomType.charAt(0).toUpperCase() + randomType.slice(1)} ${this.nextElementId}`,
      value: randomType === 'checkbox' ? false : ''
    };
    
    this.sectionElements.push(newElement);
    this.nextElementId++;
  }
  
  resetSection() {
    this.sectionElements = [
      { type: 'text', label: 'First Name', value: '' },
      { type: 'text', label: 'Last Name', value: '' },
      { type: 'text', label: 'Email', value: '' },
      { type: 'select', label: 'Department', value: '' },
      { type: 'textarea', label: 'Bio', value: '' },
      { type: 'checkbox', label: 'Send notifications', value: false }
    ];
  }
}