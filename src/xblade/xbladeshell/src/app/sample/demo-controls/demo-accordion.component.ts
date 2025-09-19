import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AccordionSection {
  id: string;
  title: string;
  content: string;
  expanded: boolean;
  disabled?: boolean;
  editing?: boolean;
  originalContent?: string;
}

@Component({
  selector: 'app-demo-accordion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-control">
      <h5>{{element.displayName}}</h5>
      <p class="text-muted">{{element.description}}</p>
      
      <!-- Accordion settings -->
      <div class="accordion-settings mb-3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" [(ngModel)]="allowMultiple">
          <label class="form-check-label">Allow multiple sections open</label>
        </div>
      </div>
      
      <!-- Accordion component -->
      <div class="accordion" id="demoAccordion">
        <div class="accordion-item" *ngFor="let section of sections; let i = index">
          <h2 class="accordion-header">
            <button 
              class="accordion-button" 
              [class.collapsed]="!section.expanded"
              [disabled]="section.disabled"
              type="button" 
              (click)="toggleSection(section)">
              {{section.title}}
              <span *ngIf="section.disabled" class="badge bg-secondary ms-2">Disabled</span>
            </button>
          </h2>
          <div class="accordion-collapse" [class.show]="section.expanded">
            <div class="accordion-body">
              <div *ngIf="!section.editing">
                <div [innerHTML]="section.content"></div>
                
                <div class="section-actions mt-3">
                  <button class="btn btn-sm btn-outline-primary me-2" (click)="editSection(section)">
                    Edit Content
                  </button>
                  <button class="btn btn-sm btn-outline-secondary me-2" (click)="toggleSectionState(section)">
                    {{section.disabled ? 'Enable' : 'Disable'}}
                  </button>
                  <button 
                    class="btn btn-sm btn-outline-danger" 
                    (click)="removeSection(section.id)"
                    [disabled]="sections.length <= 1">
                    Remove
                  </button>
                </div>
              </div>
              
              <div *ngIf="section.editing" class="edit-mode">
                <div class="mb-3">
                  <label class="form-label">Section Title</label>
                  <input 
                    type="text" 
                    class="form-control form-control-sm" 
                    [(ngModel)]="section.title">
                </div>
                <div class="mb-3">
                  <label class="form-label">Content</label>
                  <textarea 
                    class="form-control" 
                    rows="6" 
                    [(ngModel)]="section.content"
                    placeholder="Enter HTML content for this section">
                  </textarea>
                </div>
                <div class="edit-actions">
                  <button class="btn btn-sm btn-success me-2" (click)="saveSection(section)">
                    Save Changes
                  </button>
                  <button class="btn btn-sm btn-secondary" (click)="cancelEdit(section)">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Demo actions -->
      <div class="demo-actions mt-3">
        <button class="btn btn-sm btn-secondary me-2" (click)="addSection()">Add Section</button>
        <button class="btn btn-sm btn-outline-secondary me-2" (click)="expandAll()">Expand All</button>
        <button class="btn btn-sm btn-outline-secondary me-2" (click)="collapseAll()">Collapse All</button>
        <button class="btn btn-sm btn-outline-secondary" (click)="resetAccordion()">Reset</button>
      </div>
    </div>
  `,
  styles: [`
    .accordion-settings {
      background: #f8f9fa;
      padding: 12px;
      border-radius: 0.375rem;
    }
    
    .accordion {
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
      overflow: hidden;
    }
    
    .accordion-item {
      border-bottom: 1px solid #dee2e6;
    }
    
    .accordion-item:last-child {
      border-bottom: none;
    }
    
    .accordion-button {
      padding: 16px 20px;
      background: #f8f9fa;
      border: none;
      width: 100%;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.15s ease-in-out;
      position: relative;
    }
    
    .accordion-button:not(.collapsed) {
      background: #e7f1ff;
      color: #0066cc;
    }
    
    .accordion-button:hover:not(:disabled) {
      background: #e9ecef;
    }
    
    .accordion-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .accordion-button::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 8px solid #6c757d;
      transition: transform 0.15s ease-in-out;
      margin-left: auto;
    }
    
    .accordion-button:not(.collapsed)::after {
      transform: rotate(180deg);
    }
    
    .accordion-collapse {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
    }
    
    .accordion-collapse.show {
      max-height: 1000px;
    }
    
    .accordion-body {
      padding: 20px;
      background: white;
    }
    
    .section-actions {
      border-top: 1px solid #dee2e6;
      padding-top: 15px;
    }
    
    .edit-mode {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 0.375rem;
      margin: -20px;
    }
    
    .edit-actions {
      margin-top: 15px;
    }
    
    .demo-actions {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 0.375rem;
    }
    
    .badge {
      font-size: 0.75em;
    }
    
    /* Content styling */
    .accordion-body h6 {
      color: #495057;
      margin-bottom: 12px;
    }
    
    .accordion-body p {
      margin-bottom: 12px;
      line-height: 1.6;
    }
    
    .accordion-body ul {
      padding-left: 20px;
      margin-bottom: 12px;
    }
    
    .accordion-body li {
      margin-bottom: 6px;
    }
    
    .accordion-body .feature-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }
    
    .accordion-body .feature-item {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 0.25rem;
      border-left: 4px solid #667eea;
    }
  `]
})
export class DemoAccordionComponent {
  @Input() element: any;
  
  allowMultiple = false;
  
  sections: AccordionSection[] = [
    {
      id: 'section1',
      title: 'Getting Started',
      content: `
        <h6>Welcome to the Accordion Component</h6>
        <p>This section contains information about getting started with accordion components.</p>
        <div class="feature-list">
          <div class="feature-item">
            <strong>Easy to Use</strong><br>
            Simple setup and configuration
          </div>
          <div class="feature-item">
            <strong>Customizable</strong><br>
            Flexible styling options
          </div>
          <div class="feature-item">
            <strong>Accessible</strong><br>
            Built with accessibility in mind
          </div>
        </div>
      `,
      expanded: true,
      disabled: false,
      editing: false,
      originalContent: ''
    },
    {
      id: 'section2',
      title: 'Configuration Options',
      content: `
        <h6>Accordion Configuration</h6>
        <p>Learn about the various configuration options available:</p>
        <ul>
          <li><strong>Allow Multiple:</strong> Enable multiple sections to be open simultaneously</li>
          <li><strong>Default Expanded:</strong> Set which sections are expanded by default</li>
          <li><strong>Disabled Sections:</strong> Temporarily disable specific sections</li>
          <li><strong>Custom Styling:</strong> Apply custom CSS classes and styles</li>
          <li><strong>Event Handling:</strong> Handle expand/collapse events</li>
        </ul>
        <p>Each option provides flexibility in how the accordion behaves and appears.</p>
      `,
      expanded: false,
      disabled: false,
      editing: false,
      originalContent: ''
    },
    {
      id: 'section3',
      title: 'Advanced Features',
      content: `
        <h6>Advanced Functionality</h6>
        <p>Explore advanced features and capabilities:</p>
        <ul>
          <li>Dynamic section management</li>
          <li>Content editing capabilities</li>
          <li>Section state management</li>
          <li>Programmatic control</li>
          <li>Integration with forms</li>
        </ul>
        <p>These features make the accordion component powerful and versatile for various use cases.</p>
      `,
      expanded: false,
      disabled: false,
      editing: false,
      originalContent: ''
    },
    {
      id: 'section4',
      title: 'API Reference',
      content: `
        <h6>API Documentation</h6>
        <p>This section would typically contain API documentation. Currently disabled for demonstration.</p>
        <p>When enabled, you would find detailed information about:</p>
        <ul>
          <li>Component properties</li>
          <li>Methods and events</li>
          <li>Usage examples</li>
          <li>Integration guides</li>
        </ul>
      `,
      expanded: false,
      disabled: true,
      editing: false,
      originalContent: ''
    }
  ];
  
  private nextSectionId = 5;
  
  toggleSection(section: AccordionSection) {
    if (section.disabled) return;
    
    if (!this.allowMultiple && !section.expanded) {
      // Close all other sections
      this.sections.forEach(s => {
        if (s.id !== section.id) {
          s.expanded = false;
        }
      });
    }
    
    section.expanded = !section.expanded;
  }
  
  editSection(section: AccordionSection) {
    section.originalContent = section.content;
    section.editing = true;
  }
  
  saveSection(section: AccordionSection) {
    section.editing = false;
    section.originalContent = '';
  }
  
  cancelEdit(section: AccordionSection) {
    if (section.originalContent) {
      section.content = section.originalContent;
    }
    section.editing = false;
    section.originalContent = '';
  }
  
  toggleSectionState(section: AccordionSection) {
    section.disabled = !section.disabled;
    if (section.disabled && section.expanded) {
      section.expanded = false;
    }
  }
  
  addSection() {
    const newSection: AccordionSection = {
      id: `section${this.nextSectionId}`,
      title: `New Section ${this.nextSectionId}`,
      content: `
        <h6>New Section Content</h6>
        <p>This is a newly created accordion section. You can edit its content using the Edit Content button.</p>
        <p>Customize this section to meet your specific needs.</p>
      `,
      expanded: false,
      disabled: false,
      editing: false,
      originalContent: ''
    };
    
    this.sections.push(newSection);
    this.nextSectionId++;
  }
  
  removeSection(sectionId: string) {
    if (this.sections.length <= 1) return;
    
    const index = this.sections.findIndex(s => s.id === sectionId);
    if (index > -1) {
      this.sections.splice(index, 1);
    }
  }
  
  expandAll() {
    this.sections.forEach(section => {
      if (!section.disabled) {
        section.expanded = true;
      }
    });
  }
  
  collapseAll() {
    this.sections.forEach(section => section.expanded = false);
  }
  
  resetAccordion() {
    this.allowMultiple = false;
    this.sections = [
      {
        id: 'section1',
        title: 'Getting Started',
        content: `
          <h6>Welcome to the Accordion Component</h6>
          <p>This section contains information about getting started with accordion components.</p>
          <div class="feature-list">
            <div class="feature-item">
              <strong>Easy to Use</strong><br>
              Simple setup and configuration
            </div>
            <div class="feature-item">
              <strong>Customizable</strong><br>
              Flexible styling options
            </div>
            <div class="feature-item">
              <strong>Accessible</strong><br>
              Built with accessibility in mind
            </div>
          </div>
        `,
        expanded: true,
        disabled: false,
        editing: false,
        originalContent: ''
      },
      {
        id: 'section2',
        title: 'Configuration Options',
        content: `
          <h6>Accordion Configuration</h6>
          <p>Learn about the various configuration options available:</p>
          <ul>
            <li><strong>Allow Multiple:</strong> Enable multiple sections to be open simultaneously</li>
            <li><strong>Default Expanded:</strong> Set which sections are expanded by default</li>
            <li><strong>Disabled Sections:</strong> Temporarily disable specific sections</li>
            <li><strong>Custom Styling:</strong> Apply custom CSS classes and styles</li>
            <li><strong>Event Handling:</strong> Handle expand/collapse events</li>
          </ul>
          <p>Each option provides flexibility in how the accordion behaves and appears.</p>
        `,
        expanded: false,
        disabled: false,
        editing: false,
        originalContent: ''
      },
      {
        id: 'section3',
        title: 'Advanced Features',
        content: `
          <h6>Advanced Functionality</h6>
          <p>Explore advanced features and capabilities:</p>
          <ul>
            <li>Dynamic section management</li>
            <li>Content editing capabilities</li>
            <li>Section state management</li>
            <li>Programmatic control</li>
            <li>Integration with forms</li>
          </ul>
          <p>These features make the accordion component powerful and versatile for various use cases.</p>
        `,
        expanded: false,
        disabled: false,
        editing: false,
        originalContent: ''
      },
      {
        id: 'section4',
        title: 'API Reference',
        content: `
          <h6>API Documentation</h6>
          <p>This section would typically contain API documentation. Currently disabled for demonstration.</p>
          <p>When enabled, you would find detailed information about:</p>
          <ul>
            <li>Component properties</li>
            <li>Methods and events</li>
            <li>Usage examples</li>
            <li>Integration guides</li>
          </ul>
        `,
        expanded: false,
        disabled: true,
        editing: false,
        originalContent: ''
      }
    ];
    this.nextSectionId = 5;
  }
}