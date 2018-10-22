import {
  AddItem,
  DeleteItem,
  GetAllItems,
  GetAllItemsFailure,
  GetAllItemsResult, ItemsPersisted, ItemsPersistedFailure,
  TodoListActionTypes,
  UpdateItem
} from './todolist.actions';
import { createTodoListItem } from '../testing/model-factory.utility';

describe('TodoList actions', () => {

  describe('GetAllItems', () => {
    it(`should have the type of ${TodoListActionTypes.GET_ALL_ITEMS}`, () => {
      const action = new GetAllItems();
      expect(action.type).toBe(TodoListActionTypes.GET_ALL_ITEMS);
    });
  });

  describe('GetAllItemsResult', () => {
    it(`should have the type of ${TodoListActionTypes.GET_ALL_ITEMS_RESULT}`, () => {
      const tasks = [createTodoListItem('test')];
      const action = new GetAllItemsResult(tasks);
      expect(action.type).toBe(TodoListActionTypes.GET_ALL_ITEMS_RESULT);
      expect(action.payload).toEqual(tasks);
    });
  });

  describe('GetAllItemsFailure', () => {
    it(`should have the type of ${TodoListActionTypes.GET_ALL_ITEMS_FAILURE}`, () => {
      const cause = 'some cause of error';
      const action = new GetAllItemsFailure(cause);
      expect(action.type).toBe(TodoListActionTypes.GET_ALL_ITEMS_FAILURE);
      expect(action.error).toEqual(cause);
    });
  });

  describe('AddItem', () => {
    it(`should have the type of ${TodoListActionTypes.ADD_ITEM}`, () => {
      const task = createTodoListItem('test');
      const action = new AddItem(task);
      expect(action.type).toBe(TodoListActionTypes.ADD_ITEM);
    });
  });

  describe('UpdateItem', () => {
    it(`should have the type of ${TodoListActionTypes.UPDATE_ITEM}`, () => {
      const task = createTodoListItem('test');
      const action = new UpdateItem(task);
      expect(action.type).toBe(TodoListActionTypes.UPDATE_ITEM);
    });
  });

  describe('DeleteItem', () => {
    it(`should have the type of ${TodoListActionTypes.DELETE_ITEM}`, () => {
      const task = createTodoListItem('test');
      const action = new DeleteItem(task);
      expect(action.type).toBe(TodoListActionTypes.DELETE_ITEM);
    });
  });

  describe('ItemsPersisted', () => {
    it(`should have the type of ${TodoListActionTypes.ITEMS_PERSISTED}`, () => {
      const tasks = [createTodoListItem('test')];
      const action = new ItemsPersisted(tasks);
      expect(action.type).toBe(TodoListActionTypes.ITEMS_PERSISTED);
      expect(action.payload).toEqual(tasks);
    });
  });

  describe('ItemsPersistedFailure', () => {
    it(`should have the type of ${TodoListActionTypes.ITEMS_PERSISTED_FAILURE}`, () => {
      const cause = 'some cause of error';
      const action = new ItemsPersistedFailure(cause);
      expect(action.type).toBe(TodoListActionTypes.ITEMS_PERSISTED_FAILURE);
      expect(action.error).toEqual(cause);
    });
  });

});
