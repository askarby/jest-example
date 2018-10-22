import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppState } from './app.state';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { GetAllItemsFailure, GetAllItemsResult, ItemsPersisted, ItemsPersistedFailure, TodoListActionTypes } from './todolist.actions';
import { LocalStorageService } from '../local-storage.service';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { TodoListItem } from '../todo-list-item.model';
import { todoItems } from './todolist.selectors';

@Injectable()
export class TodoListEffects {
  static readonly LOCAL_STORAGE_KEY = 'todolist';

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private localStorageService: LocalStorageService) {
  }

  @Effect()
  getItems$: Observable<Action> = this.actions$.pipe(
    ofType(TodoListActionTypes.GET_ALL_ITEMS),
    map(() => {
      try {
        const items = this.localStorageService.getArray<TodoListItem>(TodoListEffects.LOCAL_STORAGE_KEY);
        return new GetAllItemsResult(items || []);
      } catch (error) {
        return new GetAllItemsFailure(error);
      }
    })
  );

  @Effect()
  saveItems$: Observable<Action> = this.actions$.pipe(
    ofType(
      TodoListActionTypes.ADD_ITEM,
      TodoListActionTypes.UPDATE_ITEM,
      TodoListActionTypes.DELETE_ITEM,
    ),
    mergeMap(() => this.store.pipe(select(todoItems), first()).pipe(
      map(items => {
        this.localStorageService.persist(TodoListEffects.LOCAL_STORAGE_KEY, items);
        return new ItemsPersisted(items);
      }),
      catchError(cause => of(new ItemsPersistedFailure(cause)))),
    )
  );
}
