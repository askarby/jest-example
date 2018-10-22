import { ActionsSubject, ReducerManager, StateObservable, Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Injectable, NgModule } from '@angular/core';

@Injectable()
export class MockStore<T> extends Store<T> {
  private stateSubject = new BehaviorSubject<T>({} as T);

  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);
    this.source = this.stateSubject.asObservable();
  }

  setState(nextState: T) {
    this.stateSubject.next(nextState);
  }

  getState(): T {
    return this.stateSubject.getValue();
  }
}

export function provideMockStore() {
  return {
    provide: Store,
    useClass: MockStore
  };
}

@NgModule({
  imports: [
    StoreModule.forRoot({})
  ],
  providers: [
    provideMockStore()
  ]
})
export class TestingWithNgRxStoreModule {
  constructor() {
  }
}
