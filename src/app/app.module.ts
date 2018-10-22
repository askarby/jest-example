import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ItemListComponent } from './item-list/item-list.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ItemComponent } from './item-list/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { todoListReducer } from './store/todolist.reducer';
import { LocalStorageService } from './local-storage.service';
import { WindowService } from './window.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TodoListEffects } from './store/todolist.effects';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faTrash, faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faSave);
library.add(faTrash);
library.add(faCheck);
library.add(faTimes);
library.add(faPlus);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    FontAwesomeModule,
    NgxChartsModule,

    StoreModule.forRoot({
      todolist: todoListReducer,
    }),
    EffectsModule.forRoot([
      TodoListEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  declarations: [
    AppComponent,
    CheckboxComponent,
    ItemListComponent,
    PieChartComponent,
    ItemComponent
  ],
  providers: [
    WindowService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
