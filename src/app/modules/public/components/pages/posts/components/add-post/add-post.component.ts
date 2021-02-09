import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @Output() addPost: EventEmitter<any> = new EventEmitter();

  postData = {
    subject:'',
    content:''
  };


  form = new FormGroup({});
fields: FormlyFieldConfig[] = [
    {
      key: 'subject',
      type: 'input',
      templateOptions: {
        label: 'Post title',
        placeholder: 'Enter title',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'content',
      type: 'input',
      templateOptions: {
        label: 'Post content',
        placeholder: 'Enter content',
        required: true,
        appearance: 'outline'
      }
    }
  ];

  onSubmit() {
    this.addPost.emit({
      subject: this.postData.subject,
      content: this.postData.content
    });  
  }

  onNoClick() {
    this.dialog.closeAll();
  };

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
