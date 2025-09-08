import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface LandingPageConfig {
  specVersion: string;
  name: string;
  bladeName: string;
  bladeType: string;
  layout: any[];
  templates?: any;
  styles?: any;
  events?: any;
}

export interface RecentItem {
  id: string;
  name: string;
  type: string;
  icon: string;
  description: string;
  lastUsed: string;
  category: string;
  resourceGroup?: string;
  location?: string;
  status?: string;
}

export interface SampleData {
  recentIcons: RecentItem[];
  recentServices: RecentItem[];
  quickActions: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigLoadService {
  private configSubject = new BehaviorSubject<LandingPageConfig | null>(null);
  private sampleDataSubject = new BehaviorSubject<SampleData | null>(null);
  
  public config$ = this.configSubject.asObservable();
  public sampleData$ = this.sampleDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Load landing page configuration from JSON file
   */
  loadLandingPageConfig(): Observable<LandingPageConfig> {
    return this.http.get<LandingPageConfig>('assets/landingpage.json').pipe(
      map(config => {
        this.configSubject.next(config);
        return config;
      }),
      catchError(error => {
        console.error('Error loading landing page config:', error);
        throw error;
      })
    );
  }

  /**
   * Load sample data from JSON file
   */
  loadSampleData(): Observable<SampleData> {
    return this.http.get<SampleData>('assets/sample-data.json').pipe(
      map(data => {
        this.sampleDataSubject.next(data);
        return data;
      }),
      catchError(error => {
        console.error('Error loading sample data:', error);
        throw error;
      })
    );
  }

  /**
   * Get current config value
   */
  getCurrentConfig(): LandingPageConfig | null {
    return this.configSubject.value;
  }

  /**
   * Get current sample data value
   */
  getCurrentSampleData(): SampleData | null {
    return this.sampleDataSubject.value;
  }

  /**
   * Load blade configuration by name
   */
  loadBladeConfig(bladeName: string): Observable<any> {
    return this.http.get(`assets/blades/${bladeName}.json`).pipe(
      catchError(error => {
        console.error(`Error loading blade config for ${bladeName}:`, error);
        throw error;
      })
    );
  }

  /**
   * Save user preferences (recent items, pinned services, etc.)
   */
  saveUserPreferences(preferences: any): Observable<any> {
    // In a real application, this would save to a backend service
    // For now, we'll store in localStorage
    localStorage.setItem('xblade-preferences', JSON.stringify(preferences));
    return new Observable(observer => {
      observer.next({ success: true });
      observer.complete();
    });
  }

  /**
   * Load user preferences
   */
  loadUserPreferences(): Observable<any> {
    const preferences = localStorage.getItem('xblade-preferences');
    return new Observable(observer => {
      observer.next(preferences ? JSON.parse(preferences) : {});
      observer.complete();
    });
  }
}
