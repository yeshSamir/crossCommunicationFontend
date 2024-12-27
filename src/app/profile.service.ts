import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileDetails} from "../model/profile-details.model";
import {ResponseModel} from "../model/response.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8082/profile'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  /**
   * Sends a POST request to create a new profile.
   * @param profileDetails - The profile data to be sent.
   * @returns Observable<ResponseModel>
   */
  createProfile(profileDetails: ProfileDetails): Observable<ResponseModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseModel>(`${this.baseUrl}/create`, profileDetails, { headers });
  }
}
