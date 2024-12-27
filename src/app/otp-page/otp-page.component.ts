import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  standalone: false,
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent {
  otp: string = '';
  // OTP Page Logic here
  verifyOtp() {
    console.log('Otp Page Verify Otp Page'+ this.otp);
  }
}
