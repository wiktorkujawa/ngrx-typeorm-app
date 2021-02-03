import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

interface FormData {
  switched: boolean,
  data: object
}

@Component({
  selector: 'app-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  
  @Output() FormSubmit: EventEmitter<FormData> = new EventEmitter();
  form = new FormGroup({});
  exampleData = { 
    email:'',
    password:'',
    date:''
};

  switched!: boolean; 
  firstFormFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'date',
      type: 'datetimepicker',
      templateOptions: {
        label: 'Enter date',
        required: true
      }
    }
  ];

  secondFormFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
        appearance: 'outline'
      }
    }
  ];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any) { }

  ngOnInit(): void {
    this.switched = this.data.switched;
  }
  

  onSubmit(){
    this.FormSubmit.emit({switched: this.switched, data: this.exampleData});
  }

  onNoClick() {
    this.dialog.closeAll();
  };

  switchForms(){
    this.switched = !this.switched
  }

}