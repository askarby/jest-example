import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { mockComponent } from '../../testing/mock-component.utility';
import { createTodoListItem } from '../../testing/model-factory.utility';
import { TemplateLookup } from '../../testing/template-lookup.utility';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from '../../checkbox/checkbox.component';

describe('ItemComponent', () => {
  let fixture: ComponentFixture<ItemComponent>;
  let component: ItemComponent;

  let lookup: TemplateLookup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemComponent,
        mockComponent({
          selector: 'tl-checkbox',
          inputs: ['checked'],
          outputs: ['checkedChange']
        }),
        mockComponent({
          selector: 'fa-icon',
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    lookup = new TemplateLookup(fixture);

    component = fixture.componentInstance;
    component.item = createTodoListItem('test');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('confirm', () => {
    it('should emit a change event with the item (having the modified task)', () => {
      spyOn(component.change, 'emit');
      const newTask = 'new text';
      component.confirm(newTask);
      expect(component.change.emit).toHaveBeenCalledWith({
        ...component.item,
        task: newTask,
      });
    });
  });

  describe('cancel', () => {
    it('should set edit-mode to false', () => {
      component.isEditing = true;
      component.cancel();
      expect(component.isEditing).toBe(false);
    });
  });

  describe('set completed', () => {
    it('should emit a change event with the item (having the completed-state modified)', () => {
      spyOn(component.change, 'emit');
      component.completed = true;
      expect(component.change.emit).toHaveBeenCalledWith({
        ...component.item,
        isCompleted: true,
      });
    });
  });

  describe('get completed', () => {
    it('should retrieve the completed state from the item', () => {
      expect(component.item.isCompleted).toBe(false);
    });
  });

  describe('toggleMode', () => {
    it('should be able to toggle "isEditing"-flag', () => {
      expect(component.isEditing).toBe(false);
      component.toggleMode();
      expect(component.isEditing).toBe(true);
      component.toggleMode();
      expect(component.isEditing).toBe(false);
    });
  });

  describe('Component bindings', () => {
    it('should bind the checked state to the checkbox', () => {
      const checkbox = lookup.getComponentByCss<CheckboxComponent>('tl-checkbox');
      component.item = {
        ...createTodoListItem('test'),
        isCompleted: true,
      };
      fixture.detectChanges();
      expect(checkbox.checked).toBe(true);
    });

    describe('edit mode', () => {
      let confirmButton: DebugElement;
      let cancelButton: DebugElement;

      beforeEach(() => {
        component.toggleMode();
        fixture.detectChanges();

        confirmButton = fixture.debugElement.query(By.css('button.confirm'));
        cancelButton = fixture.debugElement.query(By.css('button.cancel'));
      });

      it('should display item in edit mode', () => {
        expect(confirmButton).not.toBeNull();
        expect(cancelButton).not.toBeNull();
      });

      it('should bind value of input to task-property of item', () => {
        const input = lookup.getSingleElementByCss('input') as HTMLInputElement;
        expect(input.value).toEqual(component.item.task);
      });

      it('should invoke the confirm-method, when the confirm button is clicked', () => {
        spyOn(component, 'confirm');
        confirmButton.nativeElement.click();
        expect(component.confirm).toHaveBeenCalled();
      });

      it('should invoke the cancel-method, when the cancel button is clicked', () => {
        spyOn(component, 'cancel');
        cancelButton.nativeElement.click();
        expect(component.cancel).toHaveBeenCalled();
      });
    });

    describe('read-only mode', () => {
      let labelContainer: DebugElement;

      beforeEach(() => {
        labelContainer = fixture.debugElement.query(By.css('.label-container'));
      });

      it('should display item in read-only mode', () => {
        expect(labelContainer).not.toBeNull();
      });

      it('should display the task-property of the item, as the label', () => {
        expect(labelContainer.nativeElement.innerHTML).toContain(component.item.task);
      });

      it('should trigger edit-mode when the label is clicked', () => {
        labelContainer.nativeElement.click();
        fixture.detectChanges();
        const confirmButton = fixture.debugElement.query(By.css('button.confirm'));
        expect(confirmButton).not.toBeNull();
      });

      it('should emit delete-event when delete button is clicked', () => {
        spyOn(component.delete, 'emit');
        const deleteButton = fixture.debugElement.query(By.css('button.delete'));
        deleteButton.nativeElement.click();
        expect(component.delete.emit).toHaveBeenCalledWith(component.item);
      });
    });
  });

  describe('snapshot of markup', () => {
    it('should match the markup for a item', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });
});
