import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {AppRoutingModule} from "./app-routing.module";

const routes: Routes = [
  { path: '', component: ProfileCreateComponent },
  { path: 'otp-page', component: OtpPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OtpPageComponent,
    ProfileCreateComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
