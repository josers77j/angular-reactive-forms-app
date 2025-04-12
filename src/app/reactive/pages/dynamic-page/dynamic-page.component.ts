import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  formBuilder = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array(
      [
        ['metal gear', [Validators.required]],
        ['final fantasy', [Validators.required]],
    ],
  [Validators.required,Validators.minLength(2)])
  })

  newFavorite = new FormControl('', [Validators.required, Validators.minLength(3)]);
  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.formBuilder.control(newGame, [Validators.required]));
    this.newFavorite.reset();
  }

  onRemoveFromFavorites(index: number){

    this.favoriteGames.removeAt(index);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
