import { BaseElementModel } from './base-element.model';

/**
 * Tab definition interface
 */
export interface Tab {
  id: string;
  title: string;
  disabled?: boolean;
  elements: BaseElementModel[];
}

/**
 * Accordion section interface
 */
export interface AccordionSection {
  id: string;
  title: string;
  content: string;
  elements?: BaseElementModel[];
  expanded?: boolean;
}

/**
 * Section container element model
 */
export class SectionModel extends BaseElementModel {
  title?: string;
  collapsible: boolean = false;
  collapsed: boolean = false;
  elements: BaseElementModel[] = [];

  constructor(data?: Partial<SectionModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }

  /**
   * Add an element to the section
   */
  addElement(element: BaseElementModel): void {
    this.elements.push(element);
  }

  /**
   * Remove an element from the section
   */
  removeElement(elementId: string): void {
    this.elements = this.elements.filter(el => el.id !== elementId);
  }

  /**
   * Find an element by ID
   */
  findElement(elementId: string): BaseElementModel | undefined {
    return this.elements.find(el => el.id === elementId);
  }
}

/**
 * Panel container element model
 */
export class PanelModel extends BaseElementModel {
  title?: string;
  variant: 'default' | 'info' | 'warning' | 'error' | 'success' = 'default';
  elements: BaseElementModel[] = [];

  constructor(data?: Partial<PanelModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }

  /**
   * Add an element to the panel
   */
  addElement(element: BaseElementModel): void {
    this.elements.push(element);
  }

  /**
   * Remove an element from the panel
   */
  removeElement(elementId: string): void {
    this.elements = this.elements.filter(el => el.id !== elementId);
  }
}

/**
 * Tab container element model
 */
export class TabsModel extends BaseElementModel {
  tabs: Tab[] = [];
  activeTab?: string;
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  constructor(data?: Partial<TabsModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }

  /**
   * Add a new tab
   */
  addTab(tab: Tab): void {
    this.tabs.push(tab);
    if (!this.activeTab) {
      this.activeTab = tab.id;
    }
  }

  /**
   * Remove a tab
   */
  removeTab(tabId: string): void {
    this.tabs = this.tabs.filter(tab => tab.id !== tabId);
    if (this.activeTab === tabId && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
  }

  /**
   * Get active tab
   */
  getActiveTab(): Tab | undefined {
    return this.tabs.find(tab => tab.id === this.activeTab);
  }
}

/**
 * Accordion container element model
 */
export class AccordionModel extends BaseElementModel {
  sections: AccordionSection[] = [];
  allowMultiple: boolean = false;
  defaultExpanded?: string[];

  constructor(data?: Partial<AccordionModel>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }

  /**
   * Add a new section
   */
  addSection(section: AccordionSection): void {
    this.sections.push(section);
  }

  /**
   * Remove a section
   */
  removeSection(sectionId: string): void {
    this.sections = this.sections.filter(section => section.id !== sectionId);
  }

  /**
   * Toggle section expansion
   */
  toggleSection(sectionId: string): void {
    const section = this.sections.find(s => s.id === sectionId);
    if (section) {
      if (!this.allowMultiple) {
        // Collapse all other sections
        this.sections.forEach(s => {
          if (s.id !== sectionId) {
            s.expanded = false;
          }
        });
      }
      section.expanded = !section.expanded;
    }
  }

  /**
   * Get expanded sections
   */
  getExpandedSections(): AccordionSection[] {
    return this.sections.filter(section => section.expanded);
  }
}
