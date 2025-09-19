import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ElementProperty {
  [key: string]: string;
}

export interface SupportedElement {
  type: string;
  displayName: string;
  description: string;
  properties: ElementProperty;
}

export interface ElementsData {
  supportedElements: SupportedElement[];
  elementCategories: {
    [key: string]: string[];
  };
  commonProperties: ElementProperty;
}

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  constructor(private http: HttpClient) { }

  /**
   * Loads the elements.json file through an API call
   * @returns Observable of ElementsData
   */
  loadElements(): Observable<ElementsData> {
    return this.http.get<ElementsData>('assets/json/elements.json');
  }
}