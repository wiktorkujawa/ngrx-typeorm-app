import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { ListComponent } from './components/list/list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';
import { TodoComponent } from './components/todo/todo.component';
import { StoreModule } from '@ngrx/store';
import * as fromPost from './store/reducers/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/effects/post.effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { DateTimePickerField } from 'src/app/modules/shared/material/custom-formly/date-time-picker/date-time-picker.component';
import { AddPostComponent } from './components/add-post/add-post.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ListComponent, ItemListComponent, TodoComponent, AddPostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormlyModule.forChild({ extras: { lazyRender: true }, types: [
      { name: 'datetimepicker', component: DateTimePickerField },
    ] }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects])
  ]
})
export class PostsModule { }
