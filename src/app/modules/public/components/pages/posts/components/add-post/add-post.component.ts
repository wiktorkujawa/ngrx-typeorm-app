import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { loadUser } from 'src/app/auth/store/actions/user.actions';
import { UserState } from 'src/app/auth/store/reducers/user.reducer';
import { selectUser } from 'src/app/auth/store/selectors/user.selectors';
import { addPostModel } from '../../store/model/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {


  user$!: Observable<any>;


  @Output() addPost: EventEmitter<any> = new EventEmitter();

  postData: addPostModel = {
    content:'',
    files_id:'',
    fileImage: true,
    email: '',
    files: [],
    path:''
  };


  form = new FormGroup({});
fields: FormlyFieldConfig[] = [
  // {
  //   key: 'content',
  //   type: 'input',
  //   templateOptions: {
  //     label: 'Post content',
  //     placeholder: 'Enter content',
  //     required: true,
  //     appearance: 'outline'
  //   }
  // },
    // {
    //   key: 'fileImage',
    //   type: 'checkbox',
    //   templateOptions: {
    //     label: 'File Image:',
    //     required: true,
    //   }
    // },
    // {
    //   key: 'profileImage',
    //   type: 'checkbox',
    //   defaultValue: true,
    //   templateOptions: {
    //     label: 'Profile Image:',
    //     change: (field) => { 
    //       if(field.formControl?.value){
    //         this.user$.subscribe( user => {
    //         field.form?.controls.path.setValue(user[0].image)})
    //       }
    //     }
    //   },
    //   hideExpression: 'model.fileImage'
    // },
    {
      key: 'files',
      type: 'dropzone',
      templateOptions: {
        label: 'File Image:',
        required: true,
      },
      hideExpression: '!model.fileImage',
    },
    // {
    //   key: 'path',
    //   type: 'input',
    //   templateOptions: {
    //     label: 'Image URL:',
    //     required: true,
    //     appearance: 'outline'
    //   },
    //   hideExpression: 'model.fileImage',
    // }
  ];

  
  onSubmit() {

    // if( this.postData.fileImage){
    //   const message = new FormData();
      
    //   message.append('post', this.postData.files[0]);

    //   message.append('content', this.postData.content);
    //   message.append('email', this.postData.email);
    //   message.append('fileImage', JSON.stringify(this.postData.fileImage));
    //   this.addPost.emit(message);
    // }
    // else{
    //   this.addPost.emit(this.postData);
    // }

    console.log(this.postData.files);
  }

  onNoClick() {
    this.dialog.closeAll();
  };

  constructor( public dialog: MatDialog,
    private store: Store<UserState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.user$ = this.store.pipe(select(selectUser));
    this.user$.subscribe( user => {
      if(user[0]!=null){
        this.postData.email = user[0].email
        this.postData.path = user[0].image
      }
    
    });

  }

}
