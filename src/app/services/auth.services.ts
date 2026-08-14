// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'employee' | 'manager';
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Demo users database
  private readonly DEMO_USERS: User[] = [
    { 
      email: 'admin@company.com', 
      password: 'admin123', 
      role: 'admin',
      name: 'Admin User'
    },
    { 
      email: 'tanvir@company.com', 
      password: 'password123', 
      role: 'employee',
      name: 'Tanvir Ahmed'
    },
    { 
      email: 'opu@company.com', 
      password: 'password123', 
      role: 'employee',
      name: 'Opu'
    },
    { 
      email: 'nafiz@company.com', 
      password: 'password123', 
      role: 'manager',
      name: 'Nafiz'
    }
  ];

  private currentUser: User | null = null;
  private token: string | null = null;

  constructor(private router: Router) {
    // Check if user is already logged in from localStorage
    this.loadSession();
  }

  // Login user
  login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const user = this.DEMO_USERS.find(
          u => u.email === email && u.password === password
        );

        if (user) {
          this.currentUser = user;
          this.token = this.generateToken(user.email);
          
          // Save session
          this.saveSession(user);
          
          resolve({
            success: true,
            message: 'Login successful!',
            user: user
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password. Please try again.'
          });
        }
      }, 1000);
    });
  }

  // Logout user
  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null && this.token !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get current user email
  getUserEmail(): string {
    return this.currentUser?.email || '';
  }

  // Get current user name
  getUserName(): string {
    return this.currentUser?.name || 'User';
  }

  // Get current user role
  getUserRole(): string {
    return this.currentUser?.role || 'employee';
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  // Generate fake token
  private generateToken(email: string): string {
    return btoa(`${email}:${Date.now()}`);
  }

  // Save session to localStorage
  private saveSession(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', this.token || '');
  }

  // Load session from localStorage
  private loadSession(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        this.currentUser = JSON.parse(userStr);
        this.token = localStorage.getItem('token');
      } catch (e) {
        this.clearSession();
      }
    }
  }

  // Clear session
  private clearSession(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  // Forgot password - demo
  resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.DEMO_USERS.find(u => u.email === email);
        if (user) {
          resolve({
            success: true,
            message: `Password reset link sent to ${email}`
          });
        } else {
          resolve({
            success: false,
            message: 'No account found with this email address'
          });
        }
      }, 1000);
    });
  }

  // Register new user - demo
  register(userData: Partial<User>): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = this.DEMO_USERS.find(u => u.email === userData.email);
        if (existingUser) {
          resolve({
            success: false,
            message: 'User with this email already exists'
          });
        } else {
          // In real app, would add to database
          resolve({
            success: true,
            message: 'Registration successful! Please login.'
          });
        }
      }, 1000);
    });
  }
}