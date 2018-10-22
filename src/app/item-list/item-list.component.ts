import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListItem } from '../todo-list-item.model';

@Component({
  selector: 'tl-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input()
  items: TodoListItem[];

  @Output()
  add: EventEmitter<TodoListItem>;

  @Output()
  update: EventEmitter<TodoListItem>;

  @Output()
  delete: EventEmitter<TodoListItem>;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.add = new EventEmitter<TodoListItem>();
    this.update = new EventEmitter<TodoListItem>();
    this.delete = new EventEmitter<TodoListItem>();

    this.createForm(formBuilder);
  }

  addItem() {
    const item: TodoListItem = {
      id: this.getNextId(),
      isCompleted: false,
      task: this.form.value.task,
    };
    this.form.reset();
    this.add.emit(item);
  }

  private createForm(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      task: ['', Validators.required],
    });
  }

  private getNextId(): number {
    let largestId = 0;
    for (const item of this.items) {
      if (item.id > largestId) {
        largestId = item.id;
      }
    }
    return largestId + 1;
  }
}
