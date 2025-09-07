import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ConfigLoadService, DynamicTemplateService, LandingPageConfig, SampleData } from '../services';

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
export class WorkingAreaComponent implements OnInit, OnDestroy {
    @ViewChild('dynamicContent', { static: true }) dynamicContent!: ElementRef;

    public isLoading = true;
    public error: string | null = null;
    public landingPageConfig: LandingPageConfig | null = null;
    public sampleData: SampleData | null = null;
    public dynamicHtml = '';

    private destroy$ = new Subject<void>();

    constructor(
        private configLoadService: ConfigLoadService,
        private dynamicTemplateService: DynamicTemplateService
    ) { }

    ngOnInit(): void {
        this.loadLandingPage();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Load landing page configuration and sample data
     */
    private loadLandingPage(): void {
        this.isLoading = true;
        this.error = null;

        // Load both config and sample data in parallel
        forkJoin({
            config: this.configLoadService.loadLandingPageConfig().pipe(
                catchError(error => {
                    console.error('Error loading config:', error);
                    return of(null);
                })
            ),
            sampleData: this.configLoadService.loadSampleData().pipe(
                catchError(error => {
                    console.error('Error loading sample data:', error);
                    return of(null);
                })
            )
        }).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (result) => {
                if (result.config && result.sampleData) {
                    this.landingPageConfig = result.config;
                    this.sampleData = result.sampleData;
                    this.generateDynamicTemplate();
                } else {
                    this.error = 'Failed to load landing page configuration or sample data';
                }
                this.isLoading = false;
            },
            error: (error) => {
                this.error = 'An unexpected error occurred while loading the landing page';
                this.isLoading = false;
                console.error('Landing page load error:', error);
            }
        });
    }

    /**
     * Generate dynamic template from configuration
     */
    private generateDynamicTemplate(): void {
        if (!this.landingPageConfig || !this.sampleData) {
            return;
        }

        try {
            // Apply styles from configuration
            if (this.landingPageConfig.styles) {
                this.dynamicTemplateService.applyStyles(this.landingPageConfig.styles);
            }

            // Generate HTML content
            let html = '<div class="landing-page-container">';
            
            for (const section of this.landingPageConfig.layout) {
                html += `<section class="${section.cssClass || ''}" id="${section.id}">`;
                html += this.dynamicTemplateService.createSectionContent(section, this.sampleData);
                html += '</section>';
            }
            
            html += '</div>';

            this.dynamicHtml = html;
            this.updateDynamicContent();
            this.attachEventListeners();

        } catch (error) {
            console.error('Error generating dynamic template:', error);
            this.error = 'Failed to generate landing page template';
        }
    }

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
        this.loadLandingPage();
    }

    /**
     * Handle template errors
     */
    public onTemplateError(error: any): void {
        console.error('Template error:', error);
        this.error = 'Template rendering error occurred';
    }
}
