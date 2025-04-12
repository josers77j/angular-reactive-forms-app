import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

private formBuilder = inject(FormBuilder);

formUtils = FormUtils;

myForm : FormGroup= this.formBuilder.group({
  name:['', [Validators.required, Validators.minLength(3)], [] /* validadores sincronos [] */, [] /* validadores asincronos [] */],
  price:[0, [Validators.required, Validators.min(10)]],
  inStorage:[0, [Validators.required, Validators.min(0)]],
})

onSave(){
  if(this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }
  console.log(this.myForm.value);

  this.myForm.reset({
    price:0,
    inStorage:0,
  });
}
/*   myForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  }) */
}
