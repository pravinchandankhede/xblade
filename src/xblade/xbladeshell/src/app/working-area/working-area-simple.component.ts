import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-working-area',
    templateUrl: './working-area.component.html',
    styleUrls: ['./working-area.component.css'],
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule
    ]
})
export class WorkingAreaComponent implements OnInit {
    @ViewChild('dynamicContent', { static: true }) dynamicContent!: ElementRef;

    public isLoading = false;
    public error: string | null = null;
    public dynamicHtml = '';

    constructor() { }

    ngOnInit(): void {
        this.generateFallbackContent();
    }

    /**
     * Generate fallback content until HTTP services are working
     */
    private generateFallbackContent(): void {
        this.dynamicHtml = `
            <div class="landing-page-container">
                <section class="landing-header" id="header-section">
                    <h2 class="section-title">Welcome to XBlade Portal</h2>
                    <div class="welcome-text">Welcome back! Quick access to your most used services.</div>
                </section>

                <section class="recent-icons-section" id="recent-icons-section">
                    <h2 class="section-title">Recently Used</h2>
                    <div class="recent-icons-grid">
                        <div class="service-icon-container" data-id="vm1">
                            <i class="icon icon-virtual-machine"></i>
                            <span class="service-name">Virtual Machines</span>
                            <small class="service-description">Create and manage virtual machines</small>
                        </div>
                        <div class="service-icon-container" data-id="storage1">
                            <i class="icon icon-storage-account"></i>
                            <span class="service-name">Storage Accounts</span>
                            <small class="service-description">Manage blob, file, queue storage</small>
                        </div>
                        <div class="service-icon-container" data-id="sql1">
                            <i class="icon icon-sql-database"></i>
                            <span class="service-name">SQL Databases</span>
                            <small class="service-description">Manage SQL databases and servers</small>
                        </div>
                        <div class="service-icon-container" data-id="webapp1">
                            <i class="icon icon-web-app"></i>
                            <span class="service-name">App Services</span>
                            <small class="service-description">Host web applications and APIs</small>
                        </div>
                        <div class="service-icon-container" data-id="keyvault1">
                            <i class="icon icon-key-vault"></i>
                            <span class="service-name">Key Vault</span>
                            <small class="service-description">Manage secrets and certificates</small>
                        </div>
                        <div class="service-icon-container" data-id="monitor1">
                            <i class="icon icon-monitor"></i>
                            <span class="service-name">Monitor</span>
                            <small class="service-description">Application and infrastructure monitoring</small>
                        </div>
                    </div>
                </section>

                <section class="recent-services-section" id="recent-services-section">
                    <h2 class="section-title">Recently Used Services</h2>
                    <div class="recent-services-grid">
                        <table class="services-table">
                            <thead>
                                <tr>
                                    <th>Service Name</th>
                                    <th>Resource Group</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Last Accessed</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>vm-prod-web01</td>
                                    <td>rg-production</td>
                                    <td>East US</td>
                                    <td><span class="status-badge status-running">Running</span></td>
                                    <td>2025-09-07</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">Open</button>
                                        <button class="btn btn-sm btn-secondary">Manage</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>storageproddata001</td>
                                    <td>rg-production</td>
                                    <td>East US</td>
                                    <td><span class="status-badge status-available">Available</span></td>
                                    <td>2025-09-07</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">Open</button>
                                        <button class="btn btn-sm btn-secondary">Manage</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>sql-prod-database</td>
                                    <td>rg-database</td>
                                    <td>East US 2</td>
                                    <td><span class="status-badge status-online">Online</span></td>
                                    <td>2025-09-07</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">Open</button>
                                        <button class="btn btn-sm btn-secondary">Manage</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>webapp-api-prod</td>
                                    <td>rg-web</td>
                                    <td>West US</td>
                                    <td><span class="status-badge status-running">Running</span></td>
                                    <td>2025-09-06</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">Open</button>
                                        <button class="btn btn-sm btn-secondary">Manage</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>kv-prod-secrets</td>
                                    <td>rg-security</td>
                                    <td>Central US</td>
                                    <td><span class="status-badge status-available">Available</span></td>
                                    <td>2025-09-06</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">Open</button>
                                        <button class="btn btn-sm btn-secondary">Manage</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section class="quick-actions-section" id="quick-actions-section">
                    <h2 class="section-title">Quick Actions</h2>
                    <button class="btn btn-primary quick-action-button" id="create-resource-btn">
                        <i class="icon icon-plus"></i> Create a Resource
                    </button>
                    <button class="btn btn-secondary quick-action-button" id="view-all-resources-btn">
                        <i class="icon icon-list"></i> All Resources
                    </button>
                    <button class="btn btn-secondary quick-action-button" id="resource-groups-btn">
                        <i class="icon icon-folder"></i> Resource Groups
                    </button>
                    <button class="btn btn-secondary quick-action-button" id="cost-management-btn">
                        <i class="icon icon-chart"></i> Cost Management
                    </button>
                </section>
            </div>
        `;
        
        setTimeout(() => {
            this.updateDynamicContent();
            this.attachEventListeners();
        }, 100);
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

        // Service table buttons
        const actionButtons = container.querySelectorAll('.services-table .btn');
        actionButtons.forEach((button: Element) => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const target = event.currentTarget as HTMLElement;
                const action = target.textContent?.trim().toLowerCase();
                const row = target.closest('tr');
                const serviceName = row?.querySelector('td')?.textContent;
                console.log(`${action} action clicked for service: ${serviceName}`);
            });
        });
    }

    /**
     * Handle service icon click events
     */
    private onServiceIconClick(serviceId: string): void {
        console.log('Service icon clicked:', serviceId);
        alert(`Opening service: ${serviceId}`);
    }

    /**
     * Handle quick action button click events
     */
    private onQuickActionClick(buttonId: string): void {
        console.log('Quick action clicked:', buttonId);
        
        switch (buttonId) {
            case 'create-resource-btn':
                alert('Opening create resource dialog');
                break;
            case 'view-all-resources-btn':
                alert('Navigating to all resources');
                break;
            case 'resource-groups-btn':
                alert('Navigating to resource groups');
                break;
            case 'cost-management-btn':
                alert('Navigating to cost management');
                break;
            default:
                alert(`Unknown quick action: ${buttonId}`);
        }
    }

    /**
     * Refresh the landing page data
     */
    public refreshLandingPage(): void {
        this.generateFallbackContent();
    }

    /**
     * Handle template errors
     */
    public onTemplateError(error: any): void {
        console.error('Template error:', error);
        this.error = 'Template rendering error occurred';
    }
}
