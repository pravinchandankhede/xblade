import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

export interface DynamicTemplate {
  html: string;
  css?: string;
  data?: any;
}

export interface TemplateBinding {
  property: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicTemplateService {
  private templateCache = new Map<string, DynamicTemplate>();
  private templateUpdated = new Subject<string>();

  public templateUpdated$ = this.templateUpdated.asObservable();

  constructor() { }

  /**
   * Register a template with the service
   */
  registerTemplate(templateId: string, template: DynamicTemplate): void {
    this.templateCache.set(templateId, template);
    this.templateUpdated.next(templateId);
  }

  /**
   * Get a registered template
   */
  getTemplate(templateId: string): DynamicTemplate | undefined {
    return this.templateCache.get(templateId);
  }

  /**
   * Process template with data binding
   */
  processTemplate(templateHtml: string, data: any): string {
    let processedHtml = templateHtml;

    // Simple template processing - replace {{property}} with data values
    const regex = /\{\{([^}]+)\}\}/g;
    processedHtml = processedHtml.replace(regex, (match, property) => {
      const trimmedProperty = property.trim();
      
      // Handle nested properties (e.g., status | lowercase)
      if (trimmedProperty.includes('|')) {
        const [prop, filter] = trimmedProperty.split('|').map(p => p.trim());
        const value = this.getNestedProperty(data, prop);
        return this.applyFilter(value, filter);
      }
      
      return this.getNestedProperty(data, trimmedProperty) || '';
    });

    return processedHtml;
  }

  /**
   * Create dynamic HTML content for a section
   */
  createSectionContent(sectionConfig: any, sampleData: any): string {
    let sectionHtml = '';

    if (sectionConfig.title) {
      sectionHtml += `<h2 class="section-title">${sectionConfig.title}</h2>`;
    }

    for (const element of sectionConfig.elements) {
      sectionHtml += this.createElement(element, sampleData);
    }

    return sectionHtml;
  }

  /**
   * Create HTML for individual elements
   */
  private createElement(element: any, sampleData: any): string {
    switch (element.type) {
      case 'label':
        return this.createLabel(element);
      case 'button':
        return this.createButton(element);
      case 'grid':
        return this.createGrid(element, sampleData);
      default:
        return `<div class="unknown-element">Unknown element type: ${element.type}</div>`;
    }
  }

  /**
   * Create label element
   */
  private createLabel(element: any): string {
    const cssClass = element.cssClass ? ` class="${element.cssClass}"` : '';
    return `<div${cssClass}>${element.text || ''}</div>`;
  }

  /**
   * Create button element
   */
  private createButton(element: any): string {
    const cssClass = element.cssClass ? ` class="btn btn-${element.variant || 'primary'} ${element.cssClass}"` : ` class="btn btn-${element.variant || 'primary'}"`;
    const icon = element.icon ? `<i class="icon icon-${element.icon}"></i> ` : '';
    return `<button${cssClass} id="${element.id}">${icon}${element.text || ''}</button>`;
  }

  /**
   * Create grid element
   */
  private createGrid(element: any, sampleData: any): string {
    if (element.id === 'recent-icons-grid') {
      return this.createRecentIconsGrid(element, sampleData.recentIcons);
    } else if (element.id === 'recent-services-grid') {
      return this.createRecentServicesGrid(element, sampleData.recentServices);
    }
    
    return this.createGenericGrid(element);
  }

  /**
   * Create recent icons grid
   */
  private createRecentIconsGrid(element: any, recentIcons: any[]): string {
    let gridHtml = '<div class="recent-icons-grid">';
    
    recentIcons.slice(0, 6).forEach(item => {
      gridHtml += `
        <div class="service-icon-container" data-id="${item.id}">
          <i class="icon icon-${item.icon}"></i>
          <span class="service-name">${item.name}</span>
          <small class="service-description">${item.description}</small>
        </div>
      `;
    });
    
    gridHtml += '</div>';
    return gridHtml;
  }

  /**
   * Create recent services grid
   */
  private createRecentServicesGrid(element: any, recentServices: any[]): string {
    let gridHtml = '<div class="recent-services-grid"><table class="services-table">';
    
    // Create header
    gridHtml += '<thead><tr>';
    element.columns.forEach((col: any) => {
      gridHtml += `<th>${col.header}</th>`;
    });
    gridHtml += '</tr></thead>';
    
    // Create body
    gridHtml += '<tbody>';
    recentServices.slice(0, element.pageSize || 10).forEach(service => {
      gridHtml += '<tr>';
      element.columns.forEach((col: any) => {
        if (col.type === 'custom') {
          if (col.field === 'status') {
            gridHtml += `<td><span class="status-badge status-${service.status?.toLowerCase()}">${service.status}</span></td>`;
          } else if (col.field === 'actions') {
            gridHtml += `<td>
              <button class="btn btn-sm btn-primary" onclick="openResource('${service.id}')">Open</button>
              <button class="btn btn-sm btn-secondary" onclick="manageResource('${service.id}')">Manage</button>
            </td>`;
          }
        } else if (col.type === 'date') {
          const date = new Date(service[col.field]);
          gridHtml += `<td>${date.toLocaleDateString()}</td>`;
        } else {
          gridHtml += `<td>${service[col.field] || ''}</td>`;
        }
      });
      gridHtml += '</tr>';
    });
    gridHtml += '</tbody></table></div>';
    
    return gridHtml;
  }

  /**
   * Create generic grid
   */
  private createGenericGrid(element: any): string {
    return `<div class="generic-grid" id="${element.id}">Generic grid for ${element.id}</div>`;
  }

  /**
   * Get nested property from object using dot notation
   */
  private getNestedProperty(obj: any, property: string): any {
    return property.split('.').reduce((o, p) => o && o[p], obj);
  }

  /**
   * Apply template filters
   */
  private applyFilter(value: any, filter: string): string {
    switch (filter) {
      case 'lowercase':
        return value ? value.toString().toLowerCase() : '';
      case 'uppercase':
        return value ? value.toString().toUpperCase() : '';
      case 'capitalize':
        return value ? value.toString().charAt(0).toUpperCase() + value.toString().slice(1).toLowerCase() : '';
      default:
        return value ? value.toString() : '';
    }
  }

  /**
   * Apply CSS styles from config
   */
  applyStyles(styles: any): void {
    if (!styles) return;

    // Remove existing xblade styles
    const existingStyle = document.getElementById('xblade-dynamic-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style element
    const styleElement = document.createElement('style');
    styleElement.id = 'xblade-dynamic-styles';
    
    let cssText = '';
    for (const [selector, rules] of Object.entries(styles)) {
      cssText += `${selector} {`;
      for (const [property, value] of Object.entries(rules as any)) {
        cssText += `${this.camelToKebab(property)}: ${value};`;
      }
      cssText += '}';
    }
    
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}
