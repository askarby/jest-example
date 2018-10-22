import { Component, OnInit } from '@angular/core';
import { AppState } from './store/app.state';
import { select, Store } from '@ngrx/store';
import { AddItem, DeleteItem, GetAllItems, UpdateItem } from './store/todolist.actions';
import { todoItems } from './store/todolist.selectors';
import { TodoListItem } from './todo-list-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'tl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items$: Observable<TodoListItem[]>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(new GetAllItems());
    this.items$ = this.store.pipe(select(todoItems));
  }

  addItem(item: TodoListItem) {
    this.store.dispatch(new AddItem(item));
  }

  updateItem(item: TodoListItem) {
    this.store.dispatch(new UpdateItem(item));
  }

  deleteItem(item: TodoListItem) {
    this.store.dispatch(new DeleteItem(item));
  }
}
