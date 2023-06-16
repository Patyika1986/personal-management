import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Latest version - v3.0.0 with Tree Shaking to reduce bundle size
import { Country }  from 'country-state-city';


// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'

@Injectable({
  providedIn: 'root'
})
export class CountryCityService {

  constructor(private http: HttpClient) { }

  getCountry(){
    let country = Country.getAllCountries();
    return country
  }
}
