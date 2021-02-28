import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 templateUrl: './dropzone.component.html'
})

export class DropzoneField extends FieldType {

  public formControl!: FormControl; 

  onSelect(event:any){
    this.formControl.setValue(event.addedFiles);
    // console.log(event);
  }

  onRemove() {
    this.formControl.setValue([]);
  }

    constructor() {
        super();
        // Initialize this.value by getting it from the form model somehow.
    }
}