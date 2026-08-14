// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      // Demo credentials
      if (this.email === 'admin@company.com' && this.password === 'admin123') {
        this.successMessage = 'Login successful! Redirecting...';
        localStorage.setItem('isLoggedIn', 'true');
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 1500);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
        this.isLoading = false;
      }
    }, 1000);
  }

  loginAsAdmin(): void {
    this.email = 'admin@company.com';
    this.password = 'admin123';
    this.onSubmit();
  }

  loginAsEmployee(): void {
    this.email = 'tanvir@company.com';
    this.password = 'password123';
    this.onSubmit();
  }

  loginAsManager(): void {
    this.email = 'nafiz@company.com';
    this.password = 'password123';
    this.onSubmit();
  }
}