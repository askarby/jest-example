import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { TemplateLookup } from '../testing/template-lookup.utility';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let lookup: TemplateLookup;
  let component: CheckboxComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    lookup = new TemplateLookup(fixture);

    component = fixture.componentInstance;
    component.checked = false;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  describe('constructor (initial state)', () => {
    it('should produce an id', () => {
      expect(component.id.startsWith('check-')).toBe(true);
    });

    it('should create an @Output for emitting checked state', () => {
      expect(component.checkedChange).toBeDefined();
    });
  });

  describe('Component bindings', () => {
    let checkbox: HTMLInputElement;
    let label: HTMLLabelElement;

    beforeEach(() => {
      checkbox = lookup.getSingleElementByCss('input[type="checkbox"]') as HTMLInputElement;
      label = lookup.getSingleElementByCss('label') as HTMLLabelElement;
    });

    it('should bind id to input', () => {
      expect(checkbox.id).toEqual(component.id);
    });

    it('should bind id to label', () => {
      expect(label.htmlFor).toEqual(component.id);
    });

    it('should bind checked-state to checkbox', () => {
      component.checked = true;
      fixture.detectChanges();
      expect(checkbox.checked).toBe(component.checked);
    });
  });
});
