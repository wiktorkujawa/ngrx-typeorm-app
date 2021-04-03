import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 templateUrl: './dropzone.component.html',
 styleUrls: ['./dropzone.component.scss']
})

export class DropzoneField extends FieldType {

  public formControl!: FormControl; 

  value:any[] = [];
  selected:any = [];
  previous:any = -1;

  onSelect(event:any){
    event.addedFiles.map( (file:any) =>{
      this.value.push(file);
      this.selected.push(false);
    })
    
    this.formControl.setValue(this.value);
    console.log(this.formControl.value);
    // console.log(event);
  }

  onChoose(event:any){
    this.selected = this.selected.map((value:any) => 
      value=false
    );
    this.selected[event.target.value] = true;
    console.log(this.selected);
  }

  onRemove(event:any) {
    this.value.splice(this.value.indexOf(event), 1);
    this.selected.splice(this.value.indexOf(event), 1);
    this.formControl.setValue(this.value);
  }

    constructor() {
        super();
        // Initialize this.value by getting it from the form model somehow.
    }
}