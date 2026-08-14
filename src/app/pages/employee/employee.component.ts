import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { EmployeeList } from '../../components/employee-list/employee-list';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, NavbarComponent, EmployeeList],
  template: `
    <app-navbar></app-navbar>
    <app-employee-list></app-employee-list>
  `
})
export class EmployeesComponent {}