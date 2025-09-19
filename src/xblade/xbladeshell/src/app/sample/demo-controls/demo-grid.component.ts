import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface GridColumn {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface GridData {
  [key: string]: any;
}

@Component({
  selector: 'app-demo-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-control">
      <h5>{{element.displayName}}</h5>
      <p class="text-muted">{{element.description}}</p>
      
      <!-- Grid controls -->
      <div class="grid-controls mb-3">
        <div class="row">
          <div class="col-md-4" *ngIf="filterable">
            <input 
              type="text" 
              class="form-control form-control-sm" 
              placeholder="Filter data..." 
              [(ngModel)]="filterTerm"
              (ngModelChange)="onFilterChange()">
          </div>
          <div class="col-md-4" *ngIf="pageable">
            <select class="form-select form-select-sm" [(ngModel)]="pageSize" (ngModelChange)="onPageSizeChange()">
              <option [value]="5">5 per page</option>
              <option [value]="10">10 per page</option>
              <option [value]="20">20 per page</option>
            </select>
          </div>
          <div class="col-md-4">
            <button class="btn btn-sm btn-secondary" (click)="addRow()">Add Row</button>
          </div>
        </div>
      </div>
      
      <!-- Data grid -->
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th *ngIf="selectable">
                <input 
                  type="checkbox" 
                  [(ngModel)]="selectAll"
                  (ngModelChange)="onSelectAllChange()">
              </th>
              <th 
                *ngFor="let column of columns" 
                [style.width]="column.width"
                [class.sortable]="column.sortable"
                (click)="onSort(column)">
                {{column.title}}
                <span *ngIf="column.sortable && sortColumn === column.key" class="sort-indicator">
                  {{sortDirection === 'asc' ? '↑' : '↓'}}
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of pagedData; let i = index" [class.selected]="row.selected">
              <td *ngIf="selectable">
                <input 
                  type="checkbox" 
                  [(ngModel)]="row.selected"
                  (ngModelChange)="onRowSelectionChange()">
              </td>
              <td *ngFor="let column of columns">
                <span *ngIf="!row.editing">{{getDisplayValue(row, column.key)}}</span>
                <input 
                  *ngIf="row.editing" 
                  type="text" 
                  class="form-control form-control-sm"
                  [(ngModel)]="row[column.key]">
              </td>
              <td>
                <button 
                  *ngIf="!row.editing" 
                  class="btn btn-sm btn-outline-primary me-1" 
                  (click)="editRow(row)">
                  Edit
                </button>
                <button 
                  *ngIf="row.editing" 
                  class="btn btn-sm btn-success me-1" 
                  (click)="saveRow(row)">
                  Save
                </button>
                <button 
                  *ngIf="row.editing" 
                  class="btn btn-sm btn-secondary me-1" 
                  (click)="cancelEdit(row)">
                  Cancel
                </button>
                <button 
                  class="btn btn-sm btn-outline-danger" 
                  (click)="deleteRow(i)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="pagination-container mt-3" *ngIf="pageable && totalPages > 1">
        <nav>
          <ul class="pagination pagination-sm justify-content-center">
            <li class="page-item" [class.disabled]="currentPage === 1">
              <button class="page-link" (click)="goToPage(currentPage - 1)">Previous</button>
            </li>
            <li 
              *ngFor="let page of getPageNumbers()" 
              class="page-item" 
              [class.active]="page === currentPage">
              <button class="page-link" (click)="goToPage(page)">{{page}}</button>
            </li>
            <li class="page-item" [class.disabled]="currentPage === totalPages">
              <button class="page-link" (click)="goToPage(currentPage + 1)">Next</button>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Grid info -->
      <div class="grid-info mt-3">
        <small class="text-muted">
          Showing {{pagedData.length}} of {{filteredData.length}} entries
          <span *ngIf="getSelectedRows().length > 0">
            ({{getSelectedRows().length}} selected)
          </span>
        </small>
      </div>
    </div>
  `,
  styles: [`
    .grid-controls {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 0.375rem;
    }
    
    .table th.sortable {
      cursor: pointer;
      user-select: none;
    }
    
    .table th.sortable:hover {
      background-color: #f8f9fa;
    }
    
    .sort-indicator {
      margin-left: 5px;
      color: #667eea;
    }
    
    .table tbody tr.selected {
      background-color: #e7f1ff;
    }
    
    .grid-info {
      text-align: center;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 0.375rem;
    }
    
    .pagination-container {
      display: flex;
      justify-content: center;
    }
  `]
})
export class DemoGridComponent {
  @Input() element: any;
  
  columns: GridColumn[] = [
    { key: 'id', title: 'ID', sortable: true, width: '80px' },
    { key: 'name', title: 'Name', sortable: true, filterable: true },
    { key: 'email', title: 'Email', sortable: true, filterable: true },
    { key: 'role', title: 'Role', sortable: true },
    { key: 'status', title: 'Status', sortable: true }
  ];
  
  data: GridData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', selected: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', selected: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', selected: false },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', selected: false },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'Active', selected: false },
    { id: 6, name: 'Diana Wilson', email: 'diana@example.com', role: 'Editor', status: 'Active', selected: false }
  ];
  
  filteredData: GridData[] = [];
  pagedData: GridData[] = [];
  
  // Filter and pagination
  filterTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  
  // Sorting
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Selection
  selectAll: boolean = false;
  
  // Properties from element configuration
  get selectable(): boolean { return true; }
  get multiSelect(): boolean { return true; }
  get sortable(): boolean { return true; }
  get filterable(): boolean { return true; }
  get pageable(): boolean { return true; }
  
  private nextId = 7;
  
  ngOnInit() {
    this.filteredData = [...this.data];
    this.updatePagination();
  }
  
  onFilterChange() {
    this.currentPage = 1;
    this.applyFilter();
    this.updatePagination();
  }
  
  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }
  
  onSort(column: GridColumn) {
    if (!column.sortable) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.applySorting();
    this.updatePagination();
  }
  
  onSelectAllChange() {
    this.pagedData.forEach(row => row.selected = this.selectAll);
  }
  
  onRowSelectionChange() {
    this.selectAll = this.pagedData.every(row => row.selected);
  }
  
  private applyFilter() {
    if (!this.filterTerm.trim()) {
      this.filteredData = [...this.data];
    } else {
      const term = this.filterTerm.toLowerCase();
      this.filteredData = this.data.filter(row =>
        this.columns.some(column =>
          column.filterable && 
          row[column.key]?.toString().toLowerCase().includes(term)
        )
      );
    }
    
    this.applySorting();
  }
  
  private applySorting() {
    if (!this.sortColumn) return;
    
    this.filteredData.sort((a, b) => {
      const aVal = a[this.sortColumn];
      const bVal = b[this.sortColumn];
      
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      else if (aVal > bVal) comparison = 1;
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }
  
  private updatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filteredData.slice(startIndex, endIndex);
    
    // Reset select all
    this.selectAll = false;
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
  
  getPageNumbers(): number[] {
    const pages = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
  
  editRow(row: GridData) {
    row.editing = true;
    row.originalData = { ...row };
  }
  
  saveRow(row: GridData) {
    row.editing = false;
    delete row.originalData;
  }
  
  cancelEdit(row: GridData) {
    if (row.originalData) {
      Object.keys(row.originalData).forEach(key => {
        row[key] = row.originalData[key];
      });
    }
    row.editing = false;
    delete row.originalData;
  }
  
  deleteRow(index: number) {
    const globalIndex = this.data.indexOf(this.pagedData[index]);
    if (globalIndex > -1) {
      this.data.splice(globalIndex, 1);
      this.applyFilter();
      this.updatePagination();
    }
  }
  
  addRow() {
    const newRow: GridData = {
      id: this.nextId++,
      name: `New User ${this.nextId - 1}`,
      email: `user${this.nextId - 1}@example.com`,
      role: 'User',
      status: 'Active',
      selected: false
    };
    
    this.data.push(newRow);
    this.applyFilter();
    this.updatePagination();
  }
  
  getSelectedRows(): GridData[] {
    return this.data.filter(row => row.selected);
  }
  
  getDisplayValue(row: GridData, key: string): string {
    return row[key]?.toString() || '';
  }
}