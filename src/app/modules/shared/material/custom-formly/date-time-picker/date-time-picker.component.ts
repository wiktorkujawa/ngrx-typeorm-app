import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 templateUrl: './date-time-picker.component.html'
})

export class DateTimePickerComponent extends FieldType {

  // public formControl: FormControl = new FormControl('');
  public formControl!: FormControl; 

    constructor() {
        super();
        // Initialize this.value by getting it from the form model somehow.
    }
}