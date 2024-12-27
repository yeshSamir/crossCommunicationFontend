import { Component } from '@angular/core';
import {ProfileService} from "../profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private profileService: ProfileService, private router: Router) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      alert('Please enter both username and password');
      return;
    }

    this.profileService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Login successful!');
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
