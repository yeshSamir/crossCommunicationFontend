import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LocationResponse} from "../model/location.module";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationBaseUrl = 'http://localhost:8082/location'; // Your backend URL

  constructor(private http: HttpClient) {}

  getCountries(): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${this.locationBaseUrl}/countries`);
  }

  // Get the list of states for a given country
  getStates(countryId: string): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${this.locationBaseUrl}/states`, {
      params: { countryId }
    });
  }
  // Get the list of cities for a given state
  getCities(stateId: string): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${this.locationBaseUrl}/cities`,{
      params: { stateId }
    });
  }

}
