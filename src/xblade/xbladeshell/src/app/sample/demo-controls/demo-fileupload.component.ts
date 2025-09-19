import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-fileupload',
  template: `
    <div class="control-demo">
      <label [for]="controlId">{{ config.label || config.displayName }}</label>
      <div [class]="getDragDropClass()" 
           (dragover)="onDragOver($event)" 
           (dragleave)="onDragLeave($event)"
           (drop)="onDrop($event)">
        <input 
          [id]="controlId"
          type="file" 
          [accept]="config.properties?.accept || '*'"
          [multiple]="config.properties?.multiple === 'true'"
          [required]="config.properties?.required === 'true'"
          (change)="onFileSelect($event)"
          class="form-control"
        />
        <div *ngIf="isDragDropEnabled()" class="drag-drop-text">
          <p>Drag and drop files here or click to browse</p>
        </div>
      </div>
      <small class="form-text text-muted">{{ config.description }}</small>
      <div *ngIf="selectedFiles.length > 0" class="mt-2">
        <h6>Selected Files:</h6>
        <ul class="file-list">
          <li *ngFor="let file of selectedFiles">
            {{ file.name }} ({{ formatFileSize(file.size) }})
            <span [class]="getFileSizeClass(file.size)">
              {{ getFileSizeStatus(file.size) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class DemoFileuploadComponent {
  @Input() config: any = {};
  @Input() controlId: string = '';
  selectedFiles: File[] = [];
  isDragging: boolean = false;

  isDragDropEnabled() {
    return this.config.properties?.dragDrop === 'true';
  }

  getDragDropClass() {
    const baseClass = 'file-upload-container';
    if (this.isDragDropEnabled()) {
      return this.isDragging ? `${baseClass} drag-over` : `${baseClass} drag-enabled`;
    }
    return baseClass;
  }

  onFileSelect(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files;
  }

  onDragOver(event: DragEvent) {
    if (this.isDragDropEnabled()) {
      event.preventDefault();
      this.isDragging = true;
    }
  }

  onDragLeave(event: DragEvent) {
    if (this.isDragDropEnabled()) {
      this.isDragging = false;
    }
  }

  onDrop(event: DragEvent) {
    if (this.isDragDropEnabled()) {
      event.preventDefault();
      this.isDragging = false;
      const files = Array.from(event.dataTransfer?.files || []);
      this.selectedFiles = files;
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileSizeStatus(size: number): string {
    const maxSize = this.config.properties?.maxSize;
    if (maxSize && size > maxSize) {
      return 'Too large';
    }
    return 'Valid';
  }

  getFileSizeClass(size: number): string {
    const maxSize = this.config.properties?.maxSize;
    if (maxSize && size > maxSize) {
      return 'text-danger';
    }
    return 'text-success';
  }
}