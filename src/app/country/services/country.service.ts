import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../pages/interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _baseUrl = 'https://restcountries.com/v3.1';
  private _http = inject(HttpClient);
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions():string[]{
    return [...this._regions]
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if(!region) return of([]);

    const url = `${this._baseUrl}/region/${region}?fields=name,cca3,borders`;

    return this._http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    if(!alphaCode) return of();

    const url = `${this._baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`;

    return this._http.get<Country>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if(!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequest:Observable<Country>[] = [];
    countryCodes.forEach(code =>{
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    })

    return combineLatest(countriesRequest);
  }

}
