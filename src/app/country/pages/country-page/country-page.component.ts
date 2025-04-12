import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../interfaces/country.interface';
import { count, filter, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  formBuilder = inject(FormBuilder);
  formUtils = FormUtils;
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions)

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanup) => {
    const regionSuscription = this.onRegionChanged();
    const countrySuscription = this.onCountryChanged();

    onCleanup(() => {
      regionSuscription.unsubscribe();
      countrySuscription.unsubscribe();
      console.log('cleanup');
    })
  })

  onRegionChanged(){
    return this.myForm
    .get('region')!
    .valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap(region => this.countryService.getCountriesByRegion(region ?? ''))
    )
    .subscribe((countries) => {
      console.log(countries);
      this.countriesByRegion.set(countries);
    });
  }

  onSubmit() {
  throw new Error('Method not implemented.');
  }

  onCountryChanged(){
    return this.myForm
    .get('country')!
    .valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter(value => value!.length > 0),
      switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
      switchMap((country) => this.countryService.getCountryNamesByCodeArray(country.borders)),
    )
    .subscribe(
      (borders) => {
        this.borders.set(borders);
      }
    )
  }
}
