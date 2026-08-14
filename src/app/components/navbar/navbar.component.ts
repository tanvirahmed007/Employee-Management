// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <a routerLink="/dashboard" class="flex items-center gap-2">
              <div class="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 p-2 shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span class="text-xl font-bold text-slate-800 hidden sm:inline">EMS</span>
            </a>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center gap-2">
            <a routerLink="/dashboard" 
               routerLinkActive="bg-blue-50 text-blue-700"
               class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              Dashboard
            </a>
            <a routerLink="/employees" 
               routerLinkActive="bg-blue-50 text-blue-700"
               class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              Employees
            </a>
          </div>

          <!-- User Info & Logout -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {{ authService.getUserName()?.charAt(0) || 'U' }}
              </div>
              <span class="text-sm font-medium text-slate-700 hidden sm:inline">
                {{ authService.getUserName() }}
              </span>
            </div>
            <button
              (click)="authService.logout()"
              class="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .router-link-active {
      background-color: #eff6ff;
      color: #2563eb;
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}