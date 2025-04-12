import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.formBuilder.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue]

  })

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
  }
}
