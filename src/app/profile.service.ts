import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileDetails} from "../model/profile-details.model";
import {ResponseModel} from "../model/response.model";
import {OtpDetails} from "../model/otp-details.model";

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

  verifyPhoneNumberByOtp(otpDetails: OtpDetails):Observable<ResponseModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseModel>(`${this.baseUrl}/validateOtp`, otpDetails, { headers });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password });
  }

  ResendOtpOnAssociatePhoneNumber(phoneNumber: string): Observable<ResponseModel> {
    const params = new HttpParams().set('phoneNumber', phoneNumber);
    return this.http.post<ResponseModel>(`${this.baseUrl}/sendOtp`, null, { params });
  }
}

