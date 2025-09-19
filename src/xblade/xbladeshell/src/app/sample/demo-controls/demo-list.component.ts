import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ListItem {
  id: string;
  text: string;
  subtitle?: string;
  selected?: boolean;
}

@Component({
  selector: 'app-demo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-control">
      <h5>{{element.displayName}}</h5>
      <p class="text-muted">{{element.description}}</p>
      
      <!-- Search bar -->
      <div class="mb-3" *ngIf="searchable">
        <input 
          type="text" 
          class="form-control form-control-sm" 
          placeholder="Search items..." 
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange()">
      </div>
      
      <!-- Sort options -->
      <div class="mb-3" *ngIf="sortable">
        <select class="form-select form-select-sm" [(ngModel)]="sortDirection" (ngModelChange)="onSortChange()">
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
          <option value="none">No sorting</option>
        </select>
      </div>
      
      <!-- List items -->
      <div class="list-container">
        <div 
          *ngFor="let item of filteredItems; trackBy: trackByItem" 
          class="list-item"
          [class.selected]="item.selected"
          [class.selectable]="selectable"
          (click)="onItemClick(item)">
          
          <div class="list-item-content">
            <div class="list-item-text">{{item.text}}</div>
            <div class="list-item-subtitle" *ngIf="item.subtitle">{{item.subtitle}}</div>
          </div>
          
          <div class="list-item-actions" *ngIf="selectable">
            <input 
              type="checkbox" 
              *ngIf="multiSelect"
              [checked]="item.selected"
              (change)="onItemSelect(item, $event)"
              (click)="$event.stopPropagation()">
            <div class="selection-indicator" *ngIf="!multiSelect && item.selected">✓</div>
          </div>
        </div>
      </div>
      
      <!-- Selection summary -->
      <div class="mt-3" *ngIf="selectable">
        <small class="text-muted">
          Selected: {{getSelectedItems().length}} of {{items.length}} items
        </small>
      </div>
      
      <!-- Demo actions -->
      <div class="demo-actions mt-3">
        <button class="btn btn-sm btn-secondary me-2" (click)="addItem()">Add Item</button>
        <button class="btn btn-sm btn-secondary me-2" (click)="removeSelected()" *ngIf="selectable && getSelectedItems().length > 0">Remove Selected</button>
        <button class="btn btn-sm btn-outline-secondary" (click)="clearSelection()" *ngIf="selectable && getSelectedItems().length > 0">Clear Selection</button>
      </div>
    </div>
  `,
  styles: [`
    .list-container {
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .list-item {
      padding: 12px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.2s;
    }
    
    .list-item:last-child {
      border-bottom: none;
    }
    
    .list-item.selectable {
      cursor: pointer;
    }
    
    .list-item.selectable:hover {
      background-color: #f8f9fa;
    }
    
    .list-item.selected {
      background-color: #e7f1ff;
      border-color: #0066cc;
    }
    
    .list-item-content {
      flex: 1;
    }
    
    .list-item-text {
      font-weight: 500;
      color: #333;
    }
    
    .list-item-subtitle {
      font-size: 0.875rem;
      color: #666;
      margin-top: 2px;
    }
    
    .list-item-actions {
      display: flex;
      align-items: center;
    }
    
    .selection-indicator {
      color: #0066cc;
      font-weight: bold;
      font-size: 16px;
    }
    
    .demo-actions {
      padding-top: 10px;
      border-top: 1px solid #dee2e6;
    }
  `]
})
export class DemoListComponent {
  @Input() element: any;
  
  items: ListItem[] = [
    { id: '1', text: 'First Item', subtitle: 'This is the first item' },
    { id: '2', text: 'Second Item', subtitle: 'This is the second item' },
    { id: '3', text: 'Third Item', subtitle: 'This is the third item' },
    { id: '4', text: 'Alpha Item', subtitle: 'Starting with A' },
    { id: '5', text: 'Beta Item', subtitle: 'Starting with B' },
    { id: '6', text: 'Gamma Item', subtitle: 'Starting with G' }
  ];
  
  filteredItems: ListItem[] = [];
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' | 'none' = 'none';
  
  // Properties from element configuration
  get selectable(): boolean { return true; }
  get multiSelect(): boolean { return true; }
  get searchable(): boolean { return true; }
  get sortable(): boolean { return true; }
  
  private nextId = 7;
  
  ngOnInit() {
    this.filteredItems = [...this.items];
  }
  
  onSearchChange() {
    this.filterAndSort();
  }
  
  onSortChange() {
    this.filterAndSort();
  }
  
  private filterAndSort() {
    let filtered = [...this.items];
    
    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.text.toLowerCase().includes(term) || 
        (item.subtitle && item.subtitle.toLowerCase().includes(term))
      );
    }
    
    // Apply sorting
    if (this.sortDirection !== 'none') {
      filtered.sort((a, b) => {
        const comparison = a.text.localeCompare(b.text);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    this.filteredItems = filtered;
  }
  
  onItemClick(item: ListItem) {
    if (!this.selectable) return;
    
    if (this.multiSelect) {
      item.selected = !item.selected;
    } else {
      // Single select - clear others first
      this.items.forEach(i => i.selected = false);
      item.selected = true;
    }
  }
  
  onItemSelect(item: ListItem, event: any) {
    item.selected = event.target.checked;
  }
  
  getSelectedItems(): ListItem[] {
    return this.items.filter(item => item.selected);
  }
  
  addItem() {
    const newItem: ListItem = {
      id: this.nextId.toString(),
      text: `New Item ${this.nextId}`,
      subtitle: `Added dynamically`,
      selected: false
    };
    this.items.push(newItem);
    this.nextId++;
    this.filterAndSort();
  }
  
  removeSelected() {
    this.items = this.items.filter(item => !item.selected);
    this.filterAndSort();
  }
  
  clearSelection() {
    this.items.forEach(item => item.selected = false);
  }
  
  trackByItem(index: number, item: ListItem): string {
    return item.id;
  }
}