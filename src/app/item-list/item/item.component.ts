import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TodoListItem } from '../../todo-list-item.model';

@Component({
  selector: 'li[tl-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {

  @Input()
  item: Readonly<TodoListItem>;

  @Output()
  change: EventEmitter<TodoListItem>;

  @Output()
  delete: EventEmitter<TodoListItem>;

  isEditing: boolean;

  constructor() {
    this.change = new EventEmitter<TodoListItem>();
    this.delete = new EventEmitter<TodoListItem>();

    this.isEditing = false;
  }

  confirm(task: string) {
    const modified: TodoListItem = {
      ...this.item,
      task,
    };
    this.change.emit(modified);
    this.isEditing = false;
  }

  cancel() {
    this.isEditing = false;
  }

  set completed(completed: boolean) {
    const modified: TodoListItem = {
      ...this.item,
      isCompleted: completed,
    };
    this.change.emit(modified);
  }

  get completed() {
    return this.item.isCompleted;
  }

  toggleMode() {
    this.isEditing = !this.isEditing;
  }
}
