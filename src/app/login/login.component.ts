import {Component} from '@angular/core';
import {ProfileService} from "../profile.service";
import {Router} from "@angular/router";
import {LoginDetails} from "../../model/login-details.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequestModel: LoginDetails = new LoginDetails();
  username: string = '';
  password: string = '';

  constructor(private profileService: ProfileService, private router: Router) {
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      alert('Please enter both username and password');
      return;
    }
    console.log("Username: " + this.username + " Password: " + this.password);
    this.loginRequestModel.phoneNumber = this.username;
    this.loginRequestModel.password = this.password;
    this.profileService.login(this.loginRequestModel).subscribe({
      next: (response) => {
        if (response.status && response.responseCode === 200) {
          sessionStorage.setItem('authToken',String(response.token)); // Store token
          this.router.navigate(['/dashboard']); // Redirect to dashboard or another page
        } else {
          alert('Invalid username or password. Please try again.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('An error occurred while logging in. Please try again later.');
      }
    });
  }

  navigateToCreateProfile(): void {
    this.router.navigate(['/profile-create']); // Navigate to the Create Profile page
  }
}
