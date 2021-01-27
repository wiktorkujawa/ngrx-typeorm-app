import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { ListComponent } from './list/list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';
import { TodoComponent } from './todo/todo.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ListComponent, ItemListComponent, TodoComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MaterialModule
  ]
})
export class TodosModule { }
