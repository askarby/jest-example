import { TodoListItem } from '../todo-list-item.model';
import { EntityState } from '@ngrx/entity';

export interface TodolistState extends EntityState<TodoListItem> {

}
