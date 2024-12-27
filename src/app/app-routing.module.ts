import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";  // Import OTP Page Component

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'profile-create', component: ProfileCreateComponent },
  { path: 'otp-page', component: OtpPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },// OTP Page Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
