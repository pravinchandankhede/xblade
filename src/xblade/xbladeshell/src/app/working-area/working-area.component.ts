import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ConfigLoadService, DynamicTemplateService, LandingPageConfig, SampleData } from '../../services';

@Component({
    selector: 'app-working-area',
    templateUrl: './working-area.component.html',
    styleUrls: ['./working-area.component.css'],
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        HttpClientModule
    ]
})
export class WorkingAreaComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('dynamicContent', { static: false }) dynamicContent!: ElementRef;

    public isLoading = true;
    public error: string | null = null;
    public landingPageConfig: LandingPageConfig | null = null;
    public sampleData: SampleData | null = null;
    public dynamicHtml = '';

    private destroy$ = new Subject<void>();

    constructor(
        // private configLoadService: ConfigLoadService,
        // private dynamicTemplateService: DynamicTemplateService
    ) { 
        console.log('WorkingAreaComponent constructor called');
    }

    ngOnInit(): void {
        console.log('WorkingAreaComponent ngOnInit called');
        
        // Start with loading false to test if component renders
        this.isLoading = false;
        this.error = null;
    }

    ngAfterViewInit(): void {
        console.log('WorkingAreaComponent ngAfterViewInit called');
        console.log('dynamicContent available:', !!this.dynamicContent);
        
        // Add test content after view is initialized
        setTimeout(() => {
            this.addTestContent();
        }, 100);
        
        // Try to load real data after test content
        // setTimeout(() => {
        //     this.loadLandingPage();
        // }, 2000); // Give user time to see test content first
    }

    /**
     * Add test content to verify component is working
     */
    private addTestContent(): void {
        console.log('Adding test content...');
        console.log('dynamicContent element:', this.dynamicContent);
        
        // Create a simple test that shows the data structure issue
        const testHtml = `
            <div class="test-content">
                <h2>🚀 XBlade Portal - Testing Data Structure Alignment</h2>
                <p>Let's test if our JSON structure and service logic align properly.</p>
                
                <div class="structure-analysis">
                    <h3>📊 Data Structure Analysis</h3>
                    <div style="background: #f5f5f5; padding: 15px; margin: 10px 0;">
                        <strong>landingpage.json structure:</strong><br>
                        • Layout sections with embedded data arrays<br>
                        • Grid elements with their own data property<br>
                        • Example: recent-icons-grid has data: [vm1, storage1, ...]
                    </div>
                    
                    <div style="background: #e8f5e8; padding: 15px; margin: 10px 0;">
                        <strong>sample-data.json structure:</strong><br>
                        • recentIcons: [vm1, storage1, ...]<br>
                        • recentServices: [vm-prod-web01, storage-prod-data, ...]<br>
                        • Separate data file for dynamic loading
                    </div>
                    
                    <div style="background: #fff3cd; padding: 15px; margin: 10px 0;">
                        <strong>🔍 Issue Found:</strong><br>
                        The DynamicTemplateService expects data from sample-data.json,<br>
                        but landingpage.json has its own embedded data arrays.<br>
                        We need to align these two approaches!
                    </div>
                </div>
                
                <div class="test-buttons" style="margin-top: 20px;">
                    <button onclick="testJsonLoad()" class="btn btn-primary">🧪 Test JSON Loading</button>
                    <button onclick="testDataAlignment()" class="btn btn-secondary">🔄 Test Data Alignment</button>
                </div>
                
                <div id="test-results" style="margin-top: 15px; padding: 10px; border: 1px solid #ddd; min-height: 100px;">
                    <em>Click buttons above to test JSON loading and data alignment...</em>
                </div>
            </div>
        `;
        
        if (this.dynamicContent && this.dynamicContent.nativeElement) {
            this.dynamicContent.nativeElement.innerHTML = testHtml;
            this.dynamicHtml = testHtml;
            console.log('✅ Test content with data structure analysis added');
            
            // Add test functions to window for button clicks
            (window as any).testJsonLoad = () => this.testJsonLoad();
            (window as any).testDataAlignment = () => this.testDataAlignment();
        } else {
            console.log('❌ dynamicContent still not available');
        }
    }
    
    /**
     * Test JSON loading functionality
     */
    private testJsonLoad(): void {
        const resultsDiv = document.getElementById('test-results');
        if (!resultsDiv) return;
        
        resultsDiv.innerHTML = '<p>🔄 Testing JSON loading...</p>';
        
        // Try to load the JSON files manually using fetch
        Promise.all([
            fetch('/assets/landingpage.json').then(r => r.json()),
            fetch('/assets/sample-data.json').then(r => r.json())
        ]).then(([landingPage, sampleData]) => {
            resultsDiv.innerHTML = `
                <p>✅ JSON Loading Results:</p>
                <div style="background: #e8f5e8; padding: 10px; margin: 5px 0;">
                    <strong>landingpage.json:</strong><br>
                    • Sections: ${landingPage.layout?.length || 0}<br>
                    • First grid data length: ${landingPage.layout?.[1]?.elements?.[0]?.data?.length || 0}
                </div>
                <div style="background: #e8f5e8; padding: 10px; margin: 5px 0;">
                    <strong>sample-data.json:</strong><br>
                    • Recent Icons: ${sampleData.recentIcons?.length || 0}<br>
                    • Recent Services: ${sampleData.recentServices?.length || 0}
                </div>
            `;
        }).catch(error => {
            resultsDiv.innerHTML = `<p>❌ Error loading JSON: ${error.message}</p>`;
        });
    }
    
    /**
     * Test data alignment between JSON files
     */
    private testDataAlignment(): void {
        const resultsDiv = document.getElementById('test-results');
        if (!resultsDiv) return;
        
        resultsDiv.innerHTML = '<p>🔄 Testing data alignment...</p>';
        
        Promise.all([
            fetch('/assets/landingpage.json').then(r => r.json()),
            fetch('/assets/sample-data.json').then(r => r.json())
        ]).then(([landingPage, sampleData]) => {
            // Check if IDs match between the two data sources
            const landingPageIconData = landingPage.layout?.[1]?.elements?.[0]?.data || [];
            const sampleDataIcons = sampleData.recentIcons || [];
            
            const landingPageServiceData = landingPage.layout?.[2]?.elements?.[0]?.data || [];
            const sampleDataServices = sampleData.recentServices || [];
            
            const iconIdsMatch = landingPageIconData.some((item: any) => 
                sampleDataIcons.some((sItem: any) => sItem.id === item.id));
            const serviceIdsMatch = landingPageServiceData.some((item: any) => 
                sampleDataServices.some((sItem: any) => sItem.id === item.id));
            
            resultsDiv.innerHTML = `
                <p>🔍 Data Alignment Analysis:</p>
                <div style="background: ${iconIdsMatch ? '#e8f5e8' : '#f8d7da'}; padding: 10px; margin: 5px 0;">
                    <strong>Icon Data Alignment:</strong> ${iconIdsMatch ? '✅ MATCH' : '❌ MISMATCH'}<br>
                    Landing page icons: ${landingPageIconData.map((i: any) => i.id).join(', ')}<br>
                    Sample data icons: ${sampleDataIcons.slice(0, 3).map((i: any) => i.id).join(', ')}...
                </div>
                <div style="background: ${serviceIdsMatch ? '#e8f5e8' : '#f8d7da'}; padding: 10px; margin: 5px 0;">
                    <strong>Service Data Alignment:</strong> ${serviceIdsMatch ? '✅ MATCH' : '❌ MISMATCH'}<br>
                    Landing page services: ${landingPageServiceData.slice(0, 2).map((i: any) => i.id).join(', ')}<br>
                    Sample data services: ${sampleDataServices.slice(0, 2).map((i: any) => i.id).join(', ')}
                </div>
                <div style="background: #fff3cd; padding: 10px; margin: 5px 0;">
                    <strong>💡 Recommendation:</strong><br>
                    ${iconIdsMatch && serviceIdsMatch ? 
                        'Data is aligned! The service should use external sample-data.json for dynamic content.' :
                        'Data misalignment detected! We need to choose one approach: either use embedded data in landingpage.json OR use external sample-data.json.'}
                </div>
            `;
        }).catch(error => {
            resultsDiv.innerHTML = `<p>❌ Error: ${error.message}</p>`;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Load landing page configuration and sample data
     */
    /* private loadLandingPage(): void {
        console.log('🔄 Starting to load landing page data...');
        this.isLoading = true;
        this.error = null;

        // Load both config and sample data in parallel
        forkJoin({
            config: this.configLoadService.loadLandingPageConfig().pipe(
                catchError((error: any) => {
                    console.error('Error loading config:', error);
                    return of(null);
                })
            ),
            sampleData: this.configLoadService.loadSampleData().pipe(
                catchError((error: any) => {
                    console.error('Error loading sample data:', error);
                    return of(null);
                })
            )
        }).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (result: any) => {
                console.log('📦 Data loading result:', result);
                if (result.config && result.sampleData) {
                    this.landingPageConfig = result.config;
                    this.sampleData = result.sampleData;
                    console.log('✅ Config and sample data loaded successfully');
                    this.generateDynamicTemplate();
                } else {
                    this.error = 'Failed to load landing page configuration or sample data';
                    console.log('❌ Failed to load data:', result);
                }
                this.isLoading = false;
            },
            error: (error: any) => {
                this.error = 'An unexpected error occurred while loading the landing page';
                this.isLoading = false;
                console.error('❌ Landing page load error:', error);
            }
        });
    } */

    /**
     * Generate dynamic template from configuration
     */
    /* private generateDynamicTemplate(): void {
        console.log('🎨 Starting to generate dynamic template...');
        if (!this.landingPageConfig || !this.sampleData) {
            console.log('❌ Missing config or sample data');
            return;
        }

        try {
            // Apply styles from configuration
            if (this.landingPageConfig.styles) {
                console.log('🎨 Applying styles from configuration');
                this.dynamicTemplateService.applyStyles(this.landingPageConfig.styles);
            }

            // Generate HTML content
            let html = '<div class="landing-page-container">';
            
            console.log('📄 Processing layout sections:', this.landingPageConfig.layout.length);
            for (const section of this.landingPageConfig.layout) {
                html += `<section class="${section.cssClass || ''}" id="${section.id}">`;
                html += this.dynamicTemplateService.createSectionContent(section, this.sampleData);
                html += '</section>';
            }
            
            html += '</div>';

            this.dynamicHtml = html;
            console.log('✅ Dynamic template generated successfully');
            this.updateDynamicContent();
            
            // Add event listeners after a short delay to ensure DOM is updated
            setTimeout(() => {
                this.attachEventListeners();
            }, 100);

        } catch (error) {
            console.error('❌ Error generating dynamic template:', error);
            this.error = 'Failed to generate landing page template';
        }
    } */

    /**
     * Update the dynamic content in the DOM
     */
    private updateDynamicContent(): void {
        if (this.dynamicContent && this.dynamicContent.nativeElement) {
            this.dynamicContent.nativeElement.innerHTML = this.dynamicHtml;
        }
    }

    /**
     * Attach event listeners to dynamic content
     */
    private attachEventListeners(): void {
        if (!this.dynamicContent || !this.dynamicContent.nativeElement) {
            return;
        }

        const container = this.dynamicContent.nativeElement;

        // Service icon click handlers
        const serviceIcons = container.querySelectorAll('.service-icon-container');
        serviceIcons.forEach((icon: Element) => {
            icon.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLElement;
                const serviceId = target.getAttribute('data-id');
                if (serviceId) {
                    this.onServiceIconClick(serviceId);
                }
            });
        });

        // Quick action button handlers
        const quickActionButtons = container.querySelectorAll('.quick-action-button');
        quickActionButtons.forEach((button: Element) => {
            button.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLElement;
                const buttonId = target.getAttribute('id');
                if (buttonId) {
                    this.onQuickActionClick(buttonId);
                }
            });
        });

        // Service table row click handlers
        const serviceRows = container.querySelectorAll('.services-table tbody tr');
        serviceRows.forEach((row: Element) => {
            row.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLElement;
                // Get service ID from the first button in the actions column
                const actionButton = target.querySelector('button');
                if (actionButton) {
                    const onclick = actionButton.getAttribute('onclick');
                    if (onclick) {
                        const serviceId = onclick.match(/'([^']+)'/)?.[1];
                        if (serviceId) {
                            this.onServiceRowClick(serviceId);
                        }
                    }
                }
            });
        });
    }

    /**
     * Handle service icon click events
     */
    private onServiceIconClick(serviceId: string): void {
        console.log('Service icon clicked:', serviceId);
        
        // Find the service in sample data
        const service = this.sampleData?.recentIcons.find(item => item.id === serviceId);
        if (service) {
            console.log('Opening service:', service.name);
            // Navigate to service or show service details
            // this.router.navigate(['/service', serviceId]);
        }
    }

    /**
     * Handle quick action button click events
     */
    private onQuickActionClick(buttonId: string): void {
        console.log('Quick action clicked:', buttonId);
        
        switch (buttonId) {
            case 'create-resource-btn':
                console.log('Opening create resource dialog');
                break;
            case 'view-all-resources-btn':
                console.log('Navigating to all resources');
                break;
            case 'resource-groups-btn':
                console.log('Navigating to resource groups');
                break;
            case 'cost-management-btn':
                console.log('Navigating to cost management');
                break;
            default:
                console.log('Unknown quick action:', buttonId);
        }
    }

    /**
     * Handle service row click events
     */
    private onServiceRowClick(serviceId: string): void {
        console.log('Service row clicked:', serviceId);
        
        // Find the service in sample data
        const service = this.sampleData?.recentServices.find(item => item.id === serviceId);
        if (service) {
            console.log('Opening service details:', service.name);
            // Navigate to service details or show service management
        }
    }

    /**
     * Refresh the landing page data
     */
    public refreshLandingPage(): void {
        console.log('🔄 Refresh landing page clicked');
        // this.loadLandingPage();
    }

    /**
     * Handle template errors
     */
    public onTemplateError(error: any): void {
        console.error('Template error:', error);
        this.error = 'Template rendering error occurred';
    }
}
