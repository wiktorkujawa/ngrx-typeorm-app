import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { FieldType } from '@ngx-formly/core';
import * as moment from 'moment';

@Component({
 selector: 'formly-field-input',
 templateUrl: './date-time-picker.component.html'
})

export class DateTimePickerComponent extends FieldType {
  @ViewChild('picker') picker: any;

  public formControl!: FormControl;
  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

    constructor() {
        super();
        // Initialize this.value by getting it from the form model somehow.

    }
}