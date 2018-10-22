import { AppState } from './app.state';
import { AddItem, DeleteItem, GetAllItemsResult, TodoListActionTypes, UpdateItem } from './todolist.actions';
import { createState, createTodoListItem } from '../testing/model-factory.utility';
import { todoListReducer } from './todolist.reducer';

describe('todoListReducer', () => {
  let initialState: AppState;

  beforeEach(() => {
    initialState = createState([]);
  });

  describe(`reduce action with type ${TodoListActionTypes.GET_ALL_ITEMS_RESULT}`, () => {
    it('should add all items to store', () => {
      const items = [
        createTodoListItem('Clean the car'),
        createTodoListItem('Pick up the kids'),
      ];
      const action = new GetAllItemsResult(items);
      const reduced = todoListReducer(initialState.todolist, action);

      const entitiesFromState = Object.values(reduced.entities);
      const idsFromState = reduced.ids;
      expect(entitiesFromState.length).toBe(2);
      expect(idsFromState.length).toBe(2);
      items.forEach(item => {
        expect(entitiesFromState).toContain(item);
        expect(idsFromState).toContain(item.id);
      });
    });
  });

  describe(`reduce action with type ${TodoListActionTypes.ADD_ITEM}`, () => {
    it('should add item to store', () => {
      const item = createTodoListItem('Clean the car');
      const action = new AddItem(item);
      const reduced = todoListReducer(initialState.todolist, action);

      const entitiesFromState = Object.values(reduced.entities);
      const idsFromState = reduced.ids;
      expect(entitiesFromState.length).toBe(1);
      expect(idsFromState.length).toBe(1);
      expect(entitiesFromState).toContain(item);
      expect(idsFromState).toContain(item.id);
    });
  });

  describe(`reduce action with type ${TodoListActionTypes.UPDATE_ITEM}`, () => {
    it('should add item to store', () => {
      const item = createTodoListItem('Clean the car');
      initialState = createState([item]);
      const action = new UpdateItem(item);
      const reduced = todoListReducer(initialState.todolist, action);

      const entitiesFromState = Object.values(reduced.entities);
      const idsFromState = reduced.ids;
      expect(entitiesFromState.length).toBe(1);
      expect(idsFromState.length).toBe(1);
      expect(entitiesFromState).toContain(item);
      expect(idsFromState).toContain(item.id);
    });
  });

  describe(`reduce action with type ${TodoListActionTypes.DELETE_ITEM}`, () => {
    it('should delete item from store', () => {
      const item = createTodoListItem('Clean the car');
      initialState = createState([item]);
      const action = new DeleteItem(item);
      const reduced = todoListReducer(initialState.todolist, action);

      const entitiesFromState = Object.values(reduced.entities);
      const idsFromState = reduced.ids;
      expect(entitiesFromState.length).toBe(0);
      expect(idsFromState.length).toBe(0);
    });
  });

  describe('reduce unknown action', () => {
    it('should not modify state', () => {
      const action = { type: 'bob'} as any;
      const reduced = todoListReducer(initialState.todolist, action);
      expect(reduced).toBe(initialState.todolist);
    });
  });
});
