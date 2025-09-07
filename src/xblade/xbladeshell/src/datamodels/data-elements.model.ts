import { BaseElementModel } from './base-element.model';

/**
 * Grid column definition
 */
export interface GridColumn {
  field: string;
  header: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  template?: string;
}

/**
 * List item template
 */
export interface ListItemTemplate {
  template: string;
  bindings?: { [key: string]: string };
}

/**
 * List view element model
 */
export class ListModel extends BaseElementModel {
  items: any[] = [];
  selectable: boolean = false;
  multiSelect: boolean = false;
  searchable: boolean = false;
  sortable: boolean = false;
  itemTemplate?: ListItemTemplate;
  selectedItems?: any[];

  constructor(data?: Partial<ListModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
}

/**
 * Data grid element model
 */
export class GridModel extends BaseElementModel {
  columns: GridColumn[] = [];
  data: any[] = [];
  selectable: boolean = false;
  multiSelect: boolean = false;
  sortable: boolean = true;
  filterable: boolean = false;
  pageable: boolean = false;
  pageSize: number = 10;
  selectedRows?: any[];
  currentPage?: number;
  totalRows?: number;

  constructor(data?: Partial<GridModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }

  /**
   * Get paginated data for current page
   */
  getPaginatedData(): any[] {
    if (!this.pageable || !this.currentPage) {
      return this.data;
    }
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.slice(startIndex, endIndex);
  }

  /**
   * Get total number of pages
   */
  getTotalPages(): number {
    if (!this.pageable) return 1;
    return Math.ceil(this.data.length / this.pageSize);
  }
}
