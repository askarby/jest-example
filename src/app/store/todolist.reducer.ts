import { createEntityAdapter } from '@ngrx/entity';
import { TodoListActions, TodoListActionTypes } from './todolist.actions';
import { TodolistState } from './todolist.state';
import { TodoListItem } from '../todo-list-item.model';

export const adapter = createEntityAdapter<TodoListItem>();

const initialState: TodolistState = {
  ...adapter.getInitialState(),
};

export function todoListReducer(state: Readonly<TodolistState> = initialState, action: TodoListActions) {
  switch (action.type) {
    case TodoListActionTypes.GET_ALL_ITEMS_RESULT:
      return adapter.addAll(action.payload, state);
    case TodoListActionTypes.ADD_ITEM:
      return adapter.addOne(action.payload, state);
    case TodoListActionTypes.UPDATE_ITEM:
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload,
      }, state);
    case TodoListActionTypes.DELETE_ITEM:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
