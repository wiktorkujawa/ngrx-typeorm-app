import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { selectMessage } from 'src/app/auth/store/selectors/user.selectors';
import { environment } from 'src/environments/environment';
interface FormData {
  switched: boolean,
  data: any
}

@Component({
  selector: 'app-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Output() FormSubmit: EventEmitter<FormData> = new EventEmitter();
  form = new FormGroup({});
  exampleData = { 
    email:'',
    displayName:'',
    password:'',
    password2:''
};

  environment = environment.apiUrl
  message$!: Observable<any>;

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
    }
  ];

  secondFormFields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        appearance: 'outline'
      },
      validators: {
        email: {
          expression: (c: any) => !c.value ||  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value),
          message: (_error:any, field: any) => `"${field.formControl.value}" is not a valid email Address`,
        }
      }
    },
    {
      key: 'displayName',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter name',
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
      key: 'password2',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Confirm password',
        placeholder: 'Confirm password',
        required: true,
        appearance: 'outline'
      }
    },
  ];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any) { }

  ngOnInit(): void {
    this.switched = this.data.switched;
  }
  

  onSubmit(){
    this.FormSubmit.emit({
      switched: this.switched, 
      data: {
        email: this.exampleData.email,
        displayName: this.exampleData.displayName,
        password: this.exampleData.password,
        password2: this.exampleData.password2
      }});
    this.message$ = this.store.pipe(select(selectMessage));
  }

  onNoClick() {
    this.dialog.closeAll();
  };

  switchForms(){
    this.switched = !this.switched
  }

}