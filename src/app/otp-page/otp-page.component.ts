import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {OtpDetails} from "../../model/otp-details.model";
import {ResponseModel} from "../../model/response.model";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  standalone: false,
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent {
  otpDetails: OtpDetails = new OtpDetails();
  response?: ResponseModel;
  responseMessage: string = '';
  otp: string = '';

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { responseMessage: string; phoneNumber: string; };
    if (state) {
      this.responseMessage = state.responseMessage;
      this.otpDetails.phoneNumber = state.phoneNumber;
    }
  }

  verifyOtp() {
   console.log('OTP Page Verify OTP: ' + this.otp);
   this.otpDetails.otp = this.otp;
    this.profileService.verifyPhoneNumberByOtp(this.otpDetails).subscribe({
      next: (res) => {
        this.response = res;
        console.log("Otp Verify Response got")
        if(res.status){
          console.log(res.responseMessage)
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to Verify otp. Please try again.');
      },
    });
  }

  resendOtp() {
    console.log('Resending OTP...');
    this.profileService.ResendOtpOnAssociatePhoneNumber(this.otpDetails.phoneNumber).subscribe({
      next: (res) => {
        this.response = res;
        console.log("Otp Resend Response got")
        if(res.status){
          console.log(res.responseMessage)
          this.responseMessage = res.responseMessage;
          // this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to Send New otp. Please try again.');
      },
    });
    // this.responseMessage = 'A new OTP has been sent to your registered Phone number.';
  }
}
