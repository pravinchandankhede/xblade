import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SpinnerConfig {
  type: string;
  size: string;
  color: string;
  text: string;
}

export interface DemoSpinnerConfig {
  size: string;
  type: string;
  color: string;
  showText: boolean;
  text: string;
}

@Component({
  selector: 'app-demo-spinner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-control">
      <h5>{{element.displayName}}</h5>
      <p class="text-muted">{{element.description}}</p>
      
      <!-- Spinner showcase -->
      <div class="spinners-showcase">
        
        <!-- Different sizes -->
        <div class="spinner-section">
          <h6>Spinner Sizes</h6>
          <div class="spinner-row">
            <div class="spinner-demo">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Small</small>
            </div>
            
            <div class="spinner-demo">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Medium</small>
            </div>
            
            <div class="spinner-demo">
              <div class="spinner-border spinner-lg" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Large</small>
            </div>
          </div>
        </div>
        
        <!-- Different styles -->
        <div class="spinner-section">
          <h6>Spinner Styles</h6>
          <div class="spinner-row">
            <div class="spinner-demo">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Border</small>
            </div>
            
            <div class="spinner-demo">
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Grow</small>
            </div>
            
            <div class="spinner-demo">
              <div class="custom-spinner" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Custom</small>
            </div>
          </div>
        </div>
        
        <!-- Different colors -->
        <div class="spinner-section">
          <h6>Spinner Colors</h6>
          <div class="spinner-row">
            <div class="spinner-demo">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Primary</small>
            </div>
            
            <div class="spinner-demo">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Success</small>
            </div>
            
            <div class="spinner-demo">
              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Warning</small>
            </div>
            
            <div class="spinner-demo">
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <small>Danger</small>
            </div>
          </div>
        </div>
        
        <!-- With text -->
        <div class="spinner-section">
          <h6>Spinner with Text</h6>
          <div class="spinner-with-text-demo">
            <div class="spinner-text-combo" *ngFor="let spinner of spinnerWithText">
              <div [ngClass]="getSpinnerClass(spinner)" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <span class="spinner-text">{{spinner.text}}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Interactive demo -->
      <div class="interactive-demo mt-4">
        <h6>Interactive Spinner Demo</h6>
        <div class="demo-controls">
          <div class="row">
            <div class="col-md-3">
              <label class="form-label">Size</label>
              <select class="form-select form-select-sm" [(ngModel)]="demoSpinner.size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Type</label>
              <select class="form-select form-select-sm" [(ngModel)]="demoSpinner.type">
                <option value="border">Border</option>
                <option value="grow">Grow</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Color</label>
              <select class="form-select form-select-sm" [(ngModel)]="demoSpinner.color">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>
            <div class="col-md-3">
              <div class="form-check form-switch mt-4">
                <input class="form-check-input" type="checkbox" [(ngModel)]="demoSpinner.showText">
                <label class="form-check-label">Show text</label>
              </div>
            </div>
          </div>
          <div class="row mt-2" *ngIf="demoSpinner.showText">
            <div class="col-md-6">
              <input 
                type="text" 
                class="form-control form-control-sm" 
                [(ngModel)]="demoSpinner.text"
                placeholder="Loading text...">
            </div>
          </div>
        </div>
        
        <div class="demo-result">
          <div class="spinner-preview">
            <div [ngClass]="getDemoSpinnerClass()" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span *ngIf="demoSpinner.showText" class="spinner-text">{{demoSpinner.text}}</span>
          </div>
        </div>
      </div>
      
      <!-- Demo actions -->
      <div class="demo-actions mt-3">
        <button class="btn btn-sm btn-secondary me-2" (click)="toggleSpinners()">
          {{spinnersActive ? 'Stop' : 'Start'}} Spinners
        </button>
        <button class="btn btn-sm btn-outline-secondary" (click)="resetDemo()">Reset Demo</button>
      </div>
    </div>
  `,
  styles: [`
    .spinners-showcase {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 0.375rem;
      margin-bottom: 20px;
    }
    
    .spinner-section {
      margin-bottom: 25px;
    }
    
    .spinner-section:last-child {
      margin-bottom: 0;
    }
    
    .spinner-section h6 {
      margin-bottom: 15px;
      color: #495057;
      font-weight: 600;
    }
    
    .spinner-row {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
    }
    
    .spinner-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background: white;
      border-radius: 0.375rem;
      border: 1px solid #dee2e6;
      min-width: 80px;
    }
    
    .spinner-with-text-demo {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .spinner-text-combo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background: white;
      border-radius: 0.375rem;
      border: 1px solid #dee2e6;
    }
    
    .spinner-text {
      font-size: 14px;
      color: #6c757d;
    }
    
    .spinner-lg {
      width: 3rem;
      height: 3rem;
    }
    
    .custom-spinner {
      width: 1.5rem;
      height: 1.5rem;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #667eea;
      border-radius: 50%;
      animation: custom-spin 1s linear infinite;
    }
    
    @keyframes custom-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .interactive-demo {
      background: #fff;
      padding: 20px;
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
    }
    
    .interactive-demo h6 {
      margin-bottom: 15px;
      color: #495057;
      font-weight: 600;
    }
    
    .demo-controls {
      margin-bottom: 20px;
    }
    
    .demo-result {
      text-align: center;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 0.375rem;
      border: 1px solid #dee2e6;
    }
    
    .spinner-preview {
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }
    
    .demo-actions {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 0.375rem;
    }
    
    /* Hide spinners when inactive */
    .spinners-showcase.inactive .spinner-border,
    .spinners-showcase.inactive .spinner-grow,
    .spinners-showcase.inactive .custom-spinner {
      animation-play-state: paused;
      opacity: 0.3;
    }
  `]
})
export class DemoSpinnerComponent {
  @Input() element: any;
  
  spinnersActive = true;
  
  spinnerWithText: SpinnerConfig[] = [
    { type: 'border', size: 'medium', color: 'primary', text: 'Loading...' },
    { type: 'grow', size: 'medium', color: 'success', text: 'Processing...' },
    { type: 'border', size: 'small', color: 'warning', text: 'Please wait...' },
    { type: 'custom', size: 'medium', color: 'primary', text: 'Fetching data...' }
  ];
  
  demoSpinner: DemoSpinnerConfig = {
    size: 'medium',
    type: 'border',
    color: 'primary',
    showText: true,
    text: 'Loading...'
  };
  
  getSpinnerClass(spinner: SpinnerConfig): string {
    let classes = [];
    
    if (spinner.type === 'border') {
      classes.push('spinner-border');
    } else if (spinner.type === 'grow') {
      classes.push('spinner-grow');
    } else if (spinner.type === 'custom') {
      classes.push('custom-spinner');
    }
    
    if (spinner.size === 'small') {
      classes.push('spinner-border-sm');
    } else if (spinner.size === 'large') {
      classes.push('spinner-lg');
    }
    
    if (spinner.color && spinner.type !== 'custom') {
      classes.push(`text-${spinner.color}`);
    }
    
    return classes.join(' ');
  }
  
  getDemoSpinnerClass(): string {
    return this.getSpinnerClass(this.demoSpinner);
  }
  
  toggleSpinners() {
    this.spinnersActive = !this.spinnersActive;
  }
  
  resetDemo() {
    this.demoSpinner = {
      size: 'medium',
      type: 'border',
      color: 'primary',
      showText: true,
      text: 'Loading...'
    };
    this.spinnersActive = true;
  }
}