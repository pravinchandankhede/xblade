import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ElementsService, SupportedElement, ElementsData } from '../services/elements.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SampleComponent implements OnInit {
  elements: SupportedElement[] = [];
  categories: { [key: string]: string[] } = {};
  loading = false;
  error: string | null = null;

  constructor(private elementsService: ElementsService) { }

  ngOnInit(): void {
    this.loadElements();
  }

  /**
   * Load elements from the API
   */
  loadElements(): void {
    this.loading = true;
    this.error = null;

    this.elementsService.loadElements().subscribe({
      next: (data: ElementsData) => {
        this.elements = data.supportedElements;
        this.categories = data.elementCategories;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load elements: ' + err.message;
        this.loading = false;
        console.error('Error loading elements:', err);
      }
    });
  }

  /**
   * Get elements by category
   * @param category Category name
   * @returns Array of elements in the category
   */
  getElementsByCategory(category: string): SupportedElement[] {
    const categoryTypes = this.categories[category] || [];
    return this.elements.filter(element => categoryTypes.includes(element.type));
  }

  /**
   * Get all category names
   * @returns Array of category names
   */
  getCategoryNames(): string[] {
    return Object.keys(this.categories);
  }

  /**
   * Get property names for an element
   * @param element The element
   * @returns Array of property names
   */
  getPropertyNames(element: SupportedElement): string[] {
    return Object.keys(element.properties);
  }
}