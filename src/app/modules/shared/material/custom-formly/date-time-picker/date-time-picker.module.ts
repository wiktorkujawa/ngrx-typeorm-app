import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
  declarations: [DateTimePickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'datetimepicker',
          component: DateTimePickerComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class DateTimePickerModule {}