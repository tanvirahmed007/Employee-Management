// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-slate-800 mb-4">Dashboard</h1>
      <p class="text-slate-600">Welcome to your dashboard!</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <h3 class="text-sm text-slate-500">Total Employees</h3>
          <p class="text-3xl font-bold text-slate-800 mt-2">0</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <h3 class="text-sm text-slate-500">Departments</h3>
          <p class="text-3xl font-bold text-slate-800 mt-2">0</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-lg">
          <h3 class="text-sm text-slate-500">Total Payroll</h3>
          <p class="text-3xl font-bold text-slate-800 mt-2">$0</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}