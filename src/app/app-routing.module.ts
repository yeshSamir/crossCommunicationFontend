import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { OtpPageComponent } from './otp-page/otp-page.component';  // Import OTP Page Component

const routes: Routes = [
  { path: '', redirectTo: '/profile-create', pathMatch: 'full' },
  { path: 'profile-create', component: ProfileCreateComponent },
  { path: 'otp-page', component: OtpPageComponent },  // OTP Page Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
