import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-control">
      <h5>{{element.displayName}}</h5>
      <p class="text-muted">{{element.description}}</p>
      
      <!-- Panel variants demo -->
      <div class="panels-container">
        <div *ngFor="let panel of panels" class="panel-wrapper mb-3">
          <div class="panel" [ngClass]="'panel-' + panel.variant">
            <div class="panel-header" *ngIf="panel.title">
              <h6 class="panel-title">{{panel.title}}</h6>
              <div class="panel-actions" *ngIf="panel.showActions">
                <button class="btn btn-sm btn-outline-secondary me-1" (click)="editPanel(panel)">
                  <span *ngIf="!panel.editing">Edit</span>
                  <span *ngIf="panel.editing">Save</span>
                </button>
                <button class="btn btn-sm btn-outline-danger" (click)="togglePanel(panel)">
                  {{panel.collapsed ? 'Expand' : 'Collapse'}}
                </button>
              </div>
            </div>
            
            <div class="panel-body" [class.collapsed]="panel.collapsed">
              <div *ngIf="!panel.editing" [innerHTML]="panel.content"></div>
              
              <div *ngIf="panel.editing" class="edit-mode">
                <div class="mb-3">
                  <label class="form-label">Panel Title</label>
                  <input 
                    type="text" 
                    class="form-control form-control-sm" 
                    [(ngModel)]="panel.title">
                </div>
                <div class="mb-3">
                  <label class="form-label">Variant</label>
                  <select class="form-select form-select-sm" [(ngModel)]="panel.variant">
                    <option value="default">Default</option>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Content</label>
                  <textarea 
                    class="form-control" 
                    rows="4" 
                    [(ngModel)]="panel.content">
                  </textarea>
                </div>
                <div class="form-check form-switch">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    [(ngModel)]="panel.showActions">
                  <label class="form-check-label">Show Actions</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Demo actions -->
      <div class="demo-actions mt-3">
        <button class="btn btn-sm btn-secondary me-2" (click)="addPanel()">Add Panel</button>
        <button class="btn btn-sm btn-outline-secondary me-2" (click)="expandAll()">Expand All</button>
        <button class="btn btn-sm btn-outline-secondary me-2" (click)="collapseAll()">Collapse All</button>
        <button class="btn btn-sm btn-outline-secondary" (click)="resetPanels()">Reset</button>
      </div>
    </div>
  `,
  styles: [`
    .panels-container {
      max-height: 600px;
      overflow-y: auto;
    }
    
    .panel {
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .panel-default {
      border-color: #dee2e6;
    }
    
    .panel-info {
      border-color: #0dcaf0;
    }
    
    .panel-success {
      border-color: #198754;
    }
    
    .panel-warning {
      border-color: #ffc107;
    }
    
    .panel-error {
      border-color: #dc3545;
    }
    
    .panel-header {
      padding: 12px 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .panel-info .panel-header {
      background: #cff4fc;
      color: #055160;
      border-bottom-color: #0dcaf0;
    }
    
    .panel-success .panel-header {
      background: #d1e7dd;
      color: #0a3622;
      border-bottom-color: #198754;
    }
    
    .panel-warning .panel-header {
      background: #fff3cd;
      color: #664d03;
      border-bottom-color: #ffc107;
    }
    
    .panel-error .panel-header {
      background: #f8d7da;
      color: #58151c;
      border-bottom-color: #dc3545;
    }
    
    .panel-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .panel-actions {
      display: flex;
      gap: 4px;
    }
    
    .panel-body {
      padding: 16px;
      transition: all 0.3s ease;
      max-height: 500px;
      overflow: hidden;
    }
    
    .panel-body.collapsed {
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    
    .edit-mode {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 0.375rem;
      margin: -16px;
      margin-top: 0;
    }
    
    .demo-actions {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 0.375rem;
    }
    
    /* Panel content styling */
    .panel-body h6 {
      color: #495057;
      margin-bottom: 12px;
    }
    
    .panel-body p {
      margin-bottom: 12px;
      line-height: 1.5;
    }
    
    .panel-body ul {
      padding-left: 20px;
    }
    
    .panel-body li {
      margin-bottom: 4px;
    }
  `]
})
export class DemoPanelComponent {
  @Input() element: any;
  
  panels = [
    {
      id: 1,
      title: 'Information Panel',
      variant: 'info',
      content: `
        <h6>Welcome to the Information Panel</h6>
        <p>This panel contains important information that users should be aware of.</p>
        <ul>
          <li>Feature one: Enhanced performance</li>
          <li>Feature two: Better user experience</li>
          <li>Feature three: Improved security</li>
        </ul>
      `,
      collapsed: false,
      editing: false,
      showActions: true
    },
    {
      id: 2,
      title: 'Success Panel',
      variant: 'success',
      content: `
        <h6>Operation Completed Successfully</h6>
        <p>Your request has been processed successfully. All changes have been saved.</p>
        <p>You can continue working or close this notification.</p>
      `,
      collapsed: false,
      editing: false,
      showActions: true
    },
    {
      id: 3,
      title: 'Warning Panel',
      variant: 'warning',
      content: `
        <h6>Important Warning</h6>
        <p>Please review the following items before proceeding:</p>
        <ul>
          <li>Ensure all data is backed up</li>
          <li>Check system requirements</li>
          <li>Verify network connectivity</li>
        </ul>
      `,
      collapsed: true,
      editing: false,
      showActions: true
    },
    {
      id: 4,
      title: 'Default Panel',
      variant: 'default',
      content: `
        <h6>Standard Content Panel</h6>
        <p>This is a standard content panel that can contain any type of information.</p>
        <p>Use this type of panel for general content that doesn't require special emphasis.</p>
      `,
      collapsed: false,
      editing: false,
      showActions: true
    }
  ];
  
  private nextPanelId = 5;
  
  editPanel(panel: any) {
    panel.editing = !panel.editing;
  }
  
  togglePanel(panel: any) {
    panel.collapsed = !panel.collapsed;
  }
  
  addPanel() {
    const newPanel = {
      id: this.nextPanelId++,
      title: `New Panel ${this.nextPanelId - 1}`,
      variant: 'default',
      content: `<h6>New Panel Content</h6><p>This is a newly created panel. You can edit its content by clicking the Edit button.</p>`,
      collapsed: false,
      editing: false,
      showActions: true
    };
    
    this.panels.push(newPanel);
  }
  
  expandAll() {
    this.panels.forEach(panel => panel.collapsed = false);
  }
  
  collapseAll() {
    this.panels.forEach(panel => panel.collapsed = true);
  }
  
  resetPanels() {
    this.panels = [
      {
        id: 1,
        title: 'Information Panel',
        variant: 'info',
        content: `
          <h6>Welcome to the Information Panel</h6>
          <p>This panel contains important information that users should be aware of.</p>
          <ul>
            <li>Feature one: Enhanced performance</li>
            <li>Feature two: Better user experience</li>
            <li>Feature three: Improved security</li>
          </ul>
        `,
        collapsed: false,
        editing: false,
        showActions: true
      },
      {
        id: 2,
        title: 'Success Panel',
        variant: 'success',
        content: `
          <h6>Operation Completed Successfully</h6>
          <p>Your request has been processed successfully. All changes have been saved.</p>
          <p>You can continue working or close this notification.</p>
        `,
        collapsed: false,
        editing: false,
        showActions: true
      },
      {
        id: 3,
        title: 'Warning Panel',
        variant: 'warning',
        content: `
          <h6>Important Warning</h6>
          <p>Please review the following items before proceeding:</p>
          <ul>
            <li>Ensure all data is backed up</li>
            <li>Check system requirements</li>
            <li>Verify network connectivity</li>
          </ul>
        `,
        collapsed: true,
        editing: false,
        showActions: true
      },
      {
        id: 4,
        title: 'Default Panel',
        variant: 'default',
        content: `
          <h6>Standard Content Panel</h6>
          <p>This is a standard content panel that can contain any type of information.</p>
          <p>Use this type of panel for general content that doesn't require special emphasis.</p>
        `,
        collapsed: false,
        editing: false,
        showActions: true
      }
    ];
    this.nextPanelId = 5;
  }
}