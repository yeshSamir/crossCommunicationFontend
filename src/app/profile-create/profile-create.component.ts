import { Component } from '@angular/core';
import {ProfileService} from "../profile.service";
import {ResponseModel} from "../../model/response.model";
import {ProfileDetails} from "../../model/profile-details.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  standalone: false,
  styleUrls: ['./profile-create.component.css']
})
export class ProfileCreateComponent {
  profileDetails: ProfileDetails = new ProfileDetails();
  response?: ResponseModel;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  /**
   * Handles form submission to create a new profile.
   */
  createProfile(): void {
    if (!this.profileDetails.isSecurityPinConfirmed()) {
      alert('Security pin and confirm security pin do not match!');
      return;
    }
    // const responseMessage = "Success to create profile and enter OTP code for verification";
    // this.router.navigate(['/otp-page'], { state: { responseMessage , phoneNumber:this.profileDetails.phoneNumber} });
    this.profileService.createProfile(this.profileDetails).subscribe({
      next: (res) => {
        this.response = res;
        console.log("Response back from Backend")
        if(res.status){
          console.log("redirect to Otp page with message and PhoneNumber")
          this.router.navigate(['/otp-page'], { state: {responseMessage:this.response.responseMessage , phoneNumber:this.profileDetails.phoneNumber} });
        }
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to create profile. Please try again.');
      },
    });
  }
}
