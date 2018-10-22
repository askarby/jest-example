import { Action } from '@ngrx/store';
import { TodoListItem } from '../todo-list-item.model';

export enum TodoListActionTypes {
  GET_ALL_ITEMS = '[TodoList] Get All Items',
  GET_ALL_ITEMS_RESULT = '[TodoList] Get All Items Result',
  GET_ALL_ITEMS_FAILURE = '[TodoList] Failure: Get All Items',
  ADD_ITEM = '[TodoList] Add Item',
  UPDATE_ITEM = '[TodoList] Update Item ',
  DELETE_ITEM = '[TodoList] Delete Item',
  ITEMS_PERSISTED = '[TodoList] Items Persisted',
  ITEMS_PERSISTED_FAILURE = '[TodoList] Failure: Items Persisted',
}

export class GetAllItems implements Action {
  readonly type = TodoListActionTypes.GET_ALL_ITEMS;
}

export class GetAllItemsResult implements Action {
  readonly type = TodoListActionTypes.GET_ALL_ITEMS_RESULT;

  constructor(public payload: TodoListItem[]) {
  }
}

export class GetAllItemsFailure implements Action {
  readonly type = TodoListActionTypes.GET_ALL_ITEMS_FAILURE;

  constructor(public error: any) {
  }
}

export class AddItem implements Action {
  readonly type = TodoListActionTypes.ADD_ITEM;

  constructor(public payload: TodoListItem) {
  }
}

export class UpdateItem implements Action {
  readonly type = TodoListActionTypes.UPDATE_ITEM;

  constructor(public payload: TodoListItem) {
  }
}

export class DeleteItem implements Action {
  readonly type = TodoListActionTypes.DELETE_ITEM;

  constructor(public payload: TodoListItem) {
  }
}

export class ItemsPersisted implements Action {
  readonly type = TodoListActionTypes.ITEMS_PERSISTED;

  constructor(public payload: TodoListItem[]) {
  }
}

export class ItemsPersistedFailure implements Action {
  readonly type = TodoListActionTypes.ITEMS_PERSISTED_FAILURE;

  constructor(public error: any) {
  }
}

export type TodoListActions
  = GetAllItems | GetAllItemsResult | GetAllItemsFailure
  | AddItem
  | UpdateItem
  | DeleteItem
  | ItemsPersisted | ItemsPersistedFailure;
