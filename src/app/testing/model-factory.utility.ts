import { TodoListItem } from '../todo-list-item.model';
import { AppState } from '../store/app.state';
import { adapter } from '../store/todolist.reducer';

let lastId = 0;

export function createTodoListItem(task: string, isCompleted = false): TodoListItem {
  return {
    id: lastId++,
    task,
    isCompleted,
  };
}

export function createState(items: TodoListItem[]): AppState {
  const initialState: AppState = {
    todolist: {
      entities: {},
      ids: [],
    },
  };
  return {
    ...initialState,
    todolist: adapter.addAll(items, initialState.todolist),
  };
}
