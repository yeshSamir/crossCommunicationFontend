import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileDetails} from "../model/profile-details.model";
import {ResponseModel} from "../model/response.model";
import {OtpDetails} from "../model/otp-details.model";
import {LoginDetails} from "../model/login-details.module";
import {LoginResponseModel} from "../model/loginResponse.module";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileBaseUrl = environment.profileBaseUrl;
  private autBaseUrl = environment.autBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sends a POST request to create a new profile.
   * @param profileDetails - The profile data to be sent.
   * @returns Observable<ResponseModel>
   */
  createProfile(profileDetails: ProfileDetails): Observable<ResponseModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseModel>(`${this.profileBaseUrl}/create`, profileDetails, { headers });
  }

  verifyPhoneNumberByOtp(otpDetails: OtpDetails):Observable<ResponseModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseModel>(`${this.profileBaseUrl}/validateOtp`, otpDetails, { headers });
  }

  ResendOtpOnAssociatePhoneNumber(phoneNumber: string): Observable<ResponseModel> {
    const params = new HttpParams().set('phoneNumber', phoneNumber);
    return this.http.post<ResponseModel>(`${this.profileBaseUrl}/sendOtp`, null, { params });
  }

  login(loginRequestDetails: LoginDetails): Observable<LoginResponseModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponseModel>(`${this.autBaseUrl}/login`, loginRequestDetails,{ headers });
  }



}

