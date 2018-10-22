import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mockComponent } from './testing/mock-component.utility';
import { MockStore, TestingWithNgRxStoreModule } from './testing/ngrx.mock';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { AddItem, DeleteItem, GetAllItems, UpdateItem } from './store/todolist.actions';
import { createState, createTodoListItem } from './testing/model-factory.utility';
import { TemplateLookup } from './testing/template-lookup.utility';
import { ItemListComponent } from './item-list/item-list.component';
import { TodoListItem } from './todo-list-item.model';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let lookup: TemplateLookup;

  let store: MockStore<AppState>;
  let items: TodoListItem[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingWithNgRxStoreModule,
      ],
      declarations: [
        AppComponent,
        mockComponent({
          selector: 'tl-item-list',
          inputs: ['items'],
          outputs: ['add', 'update', 'delete']
        }),
        mockComponent({
          selector: 'tl-pie-chart',
          inputs: ['items'],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    lookup = new TemplateLookup(fixture);
    component = fixture.debugElement.componentInstance;

    const injector = getTestBed();
    store = injector.get(Store) as MockStore<AppState>;

    items = [
      createTodoListItem('a'),
      createTodoListItem('b'),
      createTodoListItem('c'),
    ];
    store.setState(createState(items));
  });

  it('should be created', async(() => {
    expect(component).toBeDefined();
  }));

  describe('ngOnInit', () => {
    it('should dispatch a GetAllItems action', () => {
      spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledWith(new GetAllItems());
    });

    it('should select all TodoListItem-object from the Store', (done) => {
      fixture.detectChanges();
      component.items$.subscribe(fromStore => {
        expect(fromStore).toEqual(items);
        done();
      });
    });
  });

  describe('addItem', () => {
    it('should dispatch a AddItem-action, with item', () => {
      spyOn(store, 'dispatch');
      const item = createTodoListItem('task');
      component.addItem(item);
      expect(store.dispatch).toHaveBeenCalledWith(new AddItem(item));
    });
  });

  describe('updateItem', () => {
    it('should dispatch a UpdateItem-action, with item', () => {
      spyOn(store, 'dispatch');
      const item = createTodoListItem('task');
      component.updateItem(item);
      expect(store.dispatch).toHaveBeenCalledWith(new UpdateItem(item));
    });
  });

  describe('deleteItem', () => {
    it('should dispatch a DeleteItem-action, with item', () => {
      spyOn(store, 'dispatch');
      const item = createTodoListItem('task');
      component.deleteItem(item);
      expect(store.dispatch).toHaveBeenCalledWith(new DeleteItem(item));
    });
  });

  describe('Component bindings', () => {
    it('should bind items to item-list', () => {
      fixture.detectChanges();
      const itemList = lookup.getComponentByCss<ItemListComponent>('tl-item-list');
      expect(itemList.items).toEqual(items);
    });

    it('should invoke addItem-method when item-list emits add-event', () => {
      const itemList = lookup.getComponentByCss<ItemListComponent>('tl-item-list');
      spyOn(component, 'addItem');
      itemList.add.emit(items[0]);
      expect(component.addItem).toHaveBeenCalledWith(items[0]);
    });

    it('should invoke updateItem-method when item-list emits update-event', () => {
      const itemList = lookup.getComponentByCss<ItemListComponent>('tl-item-list');
      spyOn(component, 'updateItem');
      itemList.update.emit(items[0]);
      expect(component.updateItem).toHaveBeenCalledWith(items[0]);
    });

    it('should invoke deleteItem-method when item-list emits delete-event', () => {
      const itemList = lookup.getComponentByCss<ItemListComponent>('tl-item-list');
      spyOn(component, 'deleteItem');
      itemList.delete.emit(items[0]);
      expect(component.deleteItem).toHaveBeenCalledWith(items[0]);
    });

    it('should bind items to pie chart', () => {
      fixture.detectChanges();
      const chart = lookup.getComponentByCss<ItemListComponent>('tl-pie-chart');
      expect(chart.items).toEqual(items);
    });
  });
});
