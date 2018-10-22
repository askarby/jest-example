import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';
import { mockComponent } from '../testing/mock-component.utility';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { createTodoListItem } from '../testing/model-factory.utility';
import { TemplateLookup } from '../testing/template-lookup.utility';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let lookup: TemplateLookup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        ItemListComponent,
        mockComponent({
          selector: 'li[tl-item]',
          inputs: ['item'],
          outputs: ['change', 'delete']
        }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    lookup = new TemplateLookup(fixture);

    component = fixture.componentInstance;
    component.items = [
      createTodoListItem('Clean the house'),
      createTodoListItem('Wash the car'),
      createTodoListItem('Cook a meal'),
    ];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor (initial state)', () => {
    it('should have created a form', () => {
      expect(component.form).toBeDefined();
    });
  });

  describe('addItem', () => {
    it('should reset the form', () => {
      spyOn(component.form, 'reset');
      component.addItem();
      expect(component.form.reset).toHaveBeenCalled();
    });

    it('should emit an add-event with the item as event data', () => {
      spyOn(component.add, 'emit');
      const task = 'Walk the dog';
      component.form.setValue({ task});
      component.addItem();
      expect(component.add.emit).toHaveBeenCalledWith({
        id: component.items[2].id + 1,
        isCompleted: false,
        task
      });
    });
  });

  describe('Component bindings', () => {
    it('should render a li-element per TodoListItem', () => {
      const liElements = lookup.getMultipleElementsByCss('li');
      expect(liElements.length).toEqual(component.items.length);
    });

    it('should bind the task-input to the form', () => {
      const input = lookup.getSingleElementByCss('input') as HTMLInputElement;
      const task = 'Input changed';
      input.value = task;
      input.dispatchEvent(new Event('input'));
      expect(component.form.value.task).toEqual(task);
    });

    it('should invoke addItem-emthod, when the add (+) button is clicked', () => {
      spyOn(component, 'addItem');
      const addButton = lookup.getSingleElementByCss('button');
      addButton.click();
      expect(component.addItem).toHaveBeenCalled();
    });
  });
});
