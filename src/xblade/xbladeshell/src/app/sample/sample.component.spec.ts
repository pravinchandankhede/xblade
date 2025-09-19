import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SampleComponent } from './sample.component';
import { ElementsService, ElementsData } from '../services/elements.service';

describe('SampleComponent', () => {
  let component: SampleComponent;
  let fixture: ComponentFixture<SampleComponent>;
  let httpMock: HttpTestingController;
  let elementsService: ElementsService;

  const mockElementsData: ElementsData = {
    supportedElements: [
      {
        type: 'textbox',
        displayName: 'Text Box',
        description: 'Single-line text input control',
        properties: {
          placeholder: 'string',
          maxLength: 'number',
          required: 'boolean'
        }
      },
      {
        type: 'button',
        displayName: 'Button',
        description: 'Clickable button control',
        properties: {
          text: 'string',
          variant: 'primary|secondary|danger',
          disabled: 'boolean'
        }
      }
    ],
    elementCategories: {
      inputs: ['textbox'],
      actions: ['button']
    },
    commonProperties: {
      id: 'string',
      name: 'string',
      visible: 'boolean'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleComponent],
      imports: [HttpClientTestingModule],
      providers: [ElementsService]
    }).compileComponents();

    fixture = TestBed.createComponent(SampleComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    elementsService = TestBed.inject(ElementsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load elements on init', () => {
    component.ngOnInit();
    
    const req = httpMock.expectOne('assets/json/elements.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockElementsData);

    expect(component.elements).toEqual(mockElementsData.supportedElements);
    expect(component.categories).toEqual(mockElementsData.elementCategories);
    expect(component.loading).toBe(false);
  });

  it('should handle error when loading elements', () => {
    component.ngOnInit();
    
    const req = httpMock.expectOne('assets/json/elements.json');
    req.error(new ErrorEvent('Network error'));

    expect(component.error).toContain('Failed to load elements');
    expect(component.loading).toBe(false);
  });

  it('should get elements by category', () => {
    component.elements = mockElementsData.supportedElements;
    component.categories = mockElementsData.elementCategories;

    const inputElements = component.getElementsByCategory('inputs');
    expect(inputElements.length).toBe(1);
    expect(inputElements[0].type).toBe('textbox');

    const actionElements = component.getElementsByCategory('actions');
    expect(actionElements.length).toBe(1);
    expect(actionElements[0].type).toBe('button');
  });

  it('should get category names', () => {
    component.categories = mockElementsData.elementCategories;

    const categoryNames = component.getCategoryNames();
    expect(categoryNames).toContain('inputs');
    expect(categoryNames).toContain('actions');
    expect(categoryNames.length).toBe(2);
  });

  it('should get property names for an element', () => {
    const element = mockElementsData.supportedElements[0];
    const propertyNames = component.getPropertyNames(element);

    expect(propertyNames).toContain('placeholder');
    expect(propertyNames).toContain('maxLength');
    expect(propertyNames).toContain('required');
    expect(propertyNames.length).toBe(3);
  });

  it('should reload elements when loadElements is called', () => {
    spyOn(component, 'loadElements').and.callThrough();
    
    component.loadElements();
    
    expect(component.loading).toBe(true);
    expect(component.error).toBe(null);

    const req = httpMock.expectOne('assets/json/elements.json');
    req.flush(mockElementsData);

    expect(component.loading).toBe(false);
  });
});