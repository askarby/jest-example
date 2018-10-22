import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodolistState } from './todolist.state';
import { adapter } from './todolist.reducer';

const {selectAll} = adapter.getSelectors();

export const todoListState = createFeatureSelector<TodolistState>('todolist');

export const todoItems = createSelector(
  todoListState,
  selectAll
);
