// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component'; 

export const routes: Routes = [
  // Default - redirect to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Public routes
  { path: 'login', component: LoginComponent },

  {
    path: 'employees',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/employee/employee.component').then(m => m.EmployeesComponent)
  },
  
  // Protected routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  
  
  // Wildcard - redirect to login
  { path: '**', redirectTo: '/login' }
];