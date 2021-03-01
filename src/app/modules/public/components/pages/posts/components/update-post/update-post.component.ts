import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  // postData = {
  //   fileImage: this.data.me
  // }

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'content',
      type: 'input',
      templateOptions: {
        label: 'Post content',
        placeholder: 'Enter content',
        required: true,
        appearance: 'outline'
      }
    },
      {
        key: 'fileImage',
        type: 'checkbox',
        templateOptions: {
          label: 'File Image:',
          required: true,
        }
      },
      {
        key: 'profileImage',
        type: 'checkbox',
        defaultValue: true,
        templateOptions: {
          label: 'Profile Image:',
          change: (field) => { 
            if(field.formControl?.value){
              field.form?.controls.path.setValue(this.data.user.image)
            }
          }
        },
        hideExpression: 'model.fileImage'
      },
      {
        key: 'files',
        type: 'dropzone',
        templateOptions: {
          label: 'File Image:',
          required: true,
        },
        hideExpression: '!model.fileImage',
      },
      {
        key: 'path',
        type: 'input',
        templateOptions: {
          label: 'Image URL:',
          required: true,
          appearance: 'outline'
        },
        hideExpression: 'model.fileImage',
      }
    ];

  @Output() updatePost: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) 
  public data:any,
  public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSubmit() {

    if( this.data.post.fileImage){
      const message = new FormData();
      
      message.append('post', this.data.post.files[0]);

      message.append('content', this.data.post.content);
      message.append('email', this.data.post.email);
      message.append('fileImage', JSON.stringify(this.data.post.fileImage));
      this.updatePost.emit(message);
    }
    else{
      this.updatePost.emit(this.data.post);
    }
  }

  onNoClick() {
    this.dialog.closeAll();
  };

}
