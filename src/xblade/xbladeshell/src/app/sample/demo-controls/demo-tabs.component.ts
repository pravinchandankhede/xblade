import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TabData {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
  closeable?: boolean;
}

@Component({
  selector: 'app-demo-tabs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-control">
      <h5>{{element.displayName}}</h5>
      <p class="text-muted">{{element.description}}</p>
      
      <!-- Tab orientation toggle -->
      <div class="demo-controls mb-3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" [(ngModel)]="isVertical">
          <label class="form-check-label">Vertical orientation</label>
        </div>
      </div>
      
      <!-- Tab container -->
      <div class="tab-container" [class.vertical]="isVertical">
        <!-- Tab navigation -->
        <ul class="nav nav-tabs" [class.flex-column]="isVertical" role="tablist">
          <li class="nav-item" *ngFor="let tab of tabs">
            <button 
              class="nav-link" 
              [class.active]="activeTab === tab.id"
              [class.disabled]="tab.disabled"
              [disabled]="tab.disabled"
              (click)="selectTab(tab.id)"
              type="button">
              {{tab.title}}
              <span 
                *ngIf="tab.closeable && !tab.disabled" 
                class="close-tab" 
                (click)="closeTab(tab.id, $event)">
                ×
              </span>
            </button>
          </li>
          
          <!-- Add tab button -->
          <li class="nav-item">
            <button class="nav-link add-tab" (click)="addTab()" type="button">
              + Add Tab
            </button>
          </li>
        </ul>
        
        <!-- Tab content -->
        <div class="tab-content">
          <div 
            *ngFor="let tab of tabs" 
            class="tab-pane fade"
            [class.show]="activeTab === tab.id"
            [class.active]="activeTab === tab.id">
            
            <div class="tab-pane-content">
              <h6>{{tab.title}} Content</h6>
              <div class="content-editor">
                <textarea 
                  class="form-control" 
                  rows="6"
                  [(ngModel)]="tab.content"
                  [placeholder]="'Enter content for ' + tab.title">
                </textarea>
              </div>
              
              <!-- Tab settings -->
              <div class="tab-settings mt-3">
                <div class="row">
                  <div class="col-md-6">
                    <label class="form-label">Tab Title</label>
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      [(ngModel)]="tab.title">
                  </div>
                  <div class="col-md-6">
                    <div class="form-check form-switch mt-4">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        [(ngModel)]="tab.disabled">
                      <label class="form-check-label">Disabled</label>
                    </div>
                    <div class="form-check form-switch">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        [(ngModel)]="tab.closeable">
                      <label class="form-check-label">Closeable</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Demo actions -->
      <div class="demo-actions mt-3">
        <button class="btn btn-sm btn-secondary me-2" (click)="addTab()">Add New Tab</button>
        <button class="btn btn-sm btn-outline-secondary me-2" (click)="resetTabs()">Reset Tabs</button>
        <button 
          class="btn btn-sm btn-outline-danger" 
          (click)="closeCurrentTab()"
          [disabled]="tabs.length <= 1">
          Close Current Tab
        </button>
      </div>
    </div>
  `,
  styles: [`
    .tab-container {
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
      overflow: hidden;
    }
    
    .tab-container.vertical {
      display: flex;
    }
    
    .tab-container.vertical .nav-tabs {
      min-width: 200px;
      border-right: 1px solid #dee2e6;
      border-bottom: none;
      flex-direction: column;
    }
    
    .tab-container.vertical .nav-tabs .nav-item {
      margin-bottom: 0;
    }
    
    .tab-container.vertical .nav-tabs .nav-link {
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #dee2e6;
      text-align: left;
    }
    
    .tab-container.vertical .nav-tabs .nav-link.active {
      background: white;
      border-right: 3px solid #667eea;
    }
    
    .tab-container.vertical .tab-content {
      flex: 1;
    }
    
    .nav-tabs {
      margin-bottom: 0;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    
    .nav-link {
      position: relative;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .nav-link.active {
      background: white;
      border-color: #dee2e6 #dee2e6 white;
      border-bottom: 2px solid #667eea;
    }
    
    .nav-link.add-tab {
      color: #667eea;
      font-weight: 500;
    }
    
    .nav-link.add-tab:hover {
      background: #e7f1ff;
      color: #5a67d8;
    }
    
    .close-tab {
      margin-left: auto;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 50%;
      line-height: 1;
    }
    
    .close-tab:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    
    .tab-content {
      background: white;
    }
    
    .tab-pane-content {
      padding: 20px;
    }
    
    .content-editor {
      margin: 15px 0;
    }
    
    .tab-settings {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 0.375rem;
      border: 1px solid #dee2e6;
    }
    
    .demo-actions {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 0.375rem;
    }
  `]
})
export class DemoTabsComponent {
  @Input() element: any;
  
  tabs: TabData[] = [
    {
      id: 'tab1',
      title: 'General',
      content: 'This is the general information tab. You can put basic information here.',
      closeable: false
    },
    {
      id: 'tab2',
      title: 'Settings',
      content: 'Configuration and settings go in this tab. Modify application preferences here.',
      closeable: true
    },
    {
      id: 'tab3',
      title: 'Advanced',
      content: 'Advanced options and features are available in this tab.',
      closeable: true,
      disabled: false
    }
  ];
  
  activeTab: string = 'tab1';
  isVertical: boolean = false;
  private nextTabId = 4;
  
  selectTab(tabId: string) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTab = tabId;
    }
  }
  
  closeTab(tabId: string, event: Event) {
    event.stopPropagation();
    
    if (this.tabs.length <= 1) {
      return; // Don't close if it's the last tab
    }
    
    const tabIndex = this.tabs.findIndex(t => t.id === tabId);
    if (tabIndex > -1) {
      this.tabs.splice(tabIndex, 1);
      
      // If the closed tab was active, select another tab
      if (this.activeTab === tabId) {
        if (tabIndex > 0) {
          this.activeTab = this.tabs[tabIndex - 1].id;
        } else if (this.tabs.length > 0) {
          this.activeTab = this.tabs[0].id;
        }
      }
    }
  }
  
  closeCurrentTab() {
    if (this.tabs.length > 1) {
      this.closeTab(this.activeTab, new Event('click'));
    }
  }
  
  addTab() {
    const newTab: TabData = {
      id: `tab${this.nextTabId}`,
      title: `Tab ${this.nextTabId}`,
      content: `This is the content for Tab ${this.nextTabId}. You can edit this content as needed.`,
      closeable: true,
      disabled: false
    };
    
    this.tabs.push(newTab);
    this.activeTab = newTab.id;
    this.nextTabId++;
  }
  
  resetTabs() {
    this.tabs = [
      {
        id: 'tab1',
        title: 'General',
        content: 'This is the general information tab. You can put basic information here.',
        closeable: false
      },
      {
        id: 'tab2',
        title: 'Settings',
        content: 'Configuration and settings go in this tab. Modify application preferences here.',
        closeable: true
      },
      {
        id: 'tab3',
        title: 'Advanced',
        content: 'Advanced options and features are available in this tab.',
        closeable: true,
        disabled: false
      }
    ];
    
    this.activeTab = 'tab1';
    this.nextTabId = 4;
  }
}