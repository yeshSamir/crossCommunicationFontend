import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {AppRoutingModule} from "./app-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthInterceptor} from "./auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";

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
    DashboardComponent,
    CreateTicketComponent,
    TicketListComponent,
    TicketDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
