import { async, getTestBed, TestBed } from '@angular/core/testing';
import { TodoListEffects } from './todolist.effects';
import { Subject } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { MockStore, TestingWithNgRxStoreModule } from '../testing/ngrx.mock';
import {
  AddItem,
  DeleteItem,
  GetAllItems,
  GetAllItemsFailure,
  GetAllItemsResult,
  TodoListActionTypes,
  UpdateItem
} from './todolist.actions';
import { LocalStorageService } from '../local-storage.service';
import { createState, createTodoListItem } from '../testing/model-factory.utility';
import { TodoListItem } from '../todo-list-item.model';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import createSpyObj = jasmine.createSpyObj;

describe('TodoListEffects', () => {
  let effects: TodoListEffects;
  let localStorageService: any;
  let actionStreamSource: Subject<any>;
  let store: MockStore<AppState>;

  beforeEach(async(() => {
    actionStreamSource = new Subject<any>();

    TestBed.configureTestingModule({
      imports: [
        TestingWithNgRxStoreModule,
      ],
      providers: [
        TodoListEffects,
        {
          provide: Actions,
          useFactory: () => new Actions(actionStreamSource),
        },
        {
          provide: LocalStorageService,
          useValue: createSpyObj('LocalStorageService', ['getArray', 'persist']),
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const injector = getTestBed();

    effects = injector.get(TodoListEffects);
    localStorageService = injector.get(LocalStorageService);

    store = injector.get(Store) as MockStore<AppState>;
  });

  describe('getItems$', () => {
    it(`should ignore action type not being ${TodoListActionTypes.GET_ALL_ITEMS}`, done => {
      effects.getItems$.subscribe(() => {
        fail('Should not respond with side-effect, when unrelated type');
      }, () => {
        fail('Should not respond with side-effect, when unrelated type');
      }, () => done());

      actionStreamSource.next({type: 'dummy'});
      actionStreamSource.complete();
    });

    it(`should acquire using LocalStorageService and dispatch a "${TodoListActionTypes.GET_ALL_ITEMS_RESULT}"-action`, done => {
      const items = [createTodoListItem('test')];
      localStorageService.getArray.and.returnValue(items);

      effects.getItems$.subscribe(action => {
        expect(action).toEqual(new GetAllItemsResult(items));
        done();
      }, () => {
        done.fail('Should result in success');
      });

      actionStreamSource.next(new GetAllItems());
    });

    it(`should dispatch a "${TodoListActionTypes.GET_ALL_ITEMS_FAILURE}"-action (on error)`, done => {
      const error = 'foo';
      localStorageService.getArray.and.throwError(error);
      effects.getItems$.subscribe((action: GetAllItemsFailure) => {
        expect(action.type).toEqual(TodoListActionTypes.GET_ALL_ITEMS_FAILURE);
        expect(action.error).toEqual(new Error(error));
        done();
      }, () => fail('Should result in failure'));

      actionStreamSource.next(new GetAllItems());
    });
  });

  describe('saveItems$', () => {
    const triggerTypes = [
      TodoListActionTypes.ADD_ITEM,
      TodoListActionTypes.UPDATE_ITEM,
      TodoListActionTypes.DELETE_ITEM,
    ];
    const actionFactory = (type: TodoListActionTypes, item: TodoListItem) => {
      switch (type) {
        case TodoListActionTypes.ADD_ITEM:
          return new AddItem(item);
        case TodoListActionTypes.UPDATE_ITEM:
          return new UpdateItem(item);
        case TodoListActionTypes.DELETE_ITEM:
          return new DeleteItem(item);
      }
    };

    it(`should ignore action type not being ${triggerTypes.join(', ')}`, done => {
      effects.saveItems$.subscribe(() => {
        fail('Should not respond with side-effect, when unrelated type');
      }, () => {
        fail('Should not respond with side-effect, when unrelated type');
      }, () => done());

      actionStreamSource.next({type: 'dummy'});
      actionStreamSource.complete();
    });

    triggerTypes.forEach(type => {
      it(`should persist using LocalStorageService and dispatch a "${TodoListActionTypes.ITEMS_PERSISTED}"-action`, done => {
        const alreadyInStore = [
          createTodoListItem('a'),
          createTodoListItem('b'),
        ];
        const toAdd = createTodoListItem('c');

        effects.saveItems$.subscribe(action => {
          expect(action.type).toBe(TodoListActionTypes.ITEMS_PERSISTED);
          done();
        }, () => {
          fail('Should result in success');
        });

        store.setState(createState(alreadyInStore));
        actionStreamSource.next(actionFactory(type, toAdd));
      });
    });
  });
});
