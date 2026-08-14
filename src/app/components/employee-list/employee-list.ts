import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {

  // Form visibility
  showForm: boolean = false;
  isEditMode: boolean = false;
  editEmployeeId?: number;

  // Search & Filter
  searchTerm: string = '';
  selectedDepartment: string = '';
  selectedTeam: string = '';

  // Toast notification
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  } = {
    show: false,
    message: '',
    type: 'success'
  };

  employees: Employee[] = [
    {
      id: 1,
      name: 'Tanvir Ahmed',
      contact: '01700000000',
      email: 'tanvir@gmail.com',
      image: 'https://i.pravatar.cc/150?img=12',
      department: 'Software',
      designation: 'Software Developer',
      team: 'GB',
      role: 'Developer',
      salary: 50000
    },
    {
      id: 2,
      name: 'Opu',
      contact: '01800000000',
      email: 'opu@gmail.com',
      image: 'https://i.pravatar.cc/150?img=13',
      department: 'Software',
      designation: 'Software Engineer',
      team: 'LN',
      role: 'Developer',
      salary: 60000
    },
    {
      id: 3,
      name: 'Nafiz',
      contact: '01900000000',
      email: 'nafi@gmail.com',
      image: 'https://i.pravatar.cc/150?img=14',
      department: 'Accounts',
      designation: 'Accountant',
      team: 'Finance',
      role: 'Officer',
      salary: 45000
    }
  ];

  selectedEmployee?: Employee;
  getTotalPayroll(): number {
    return this.employees.reduce((total, employee) => total + employee.salary, 0);
  }

  getUniqueDepartments(): string[] {
    const departments = this.employees.map(employee => employee.department);
    return Array.from(new Set(departments));
  }

  newEmployee: Employee = {
    id: 0,
    name: '',
    contact: '',
    email: '',
    image: '',
    department: '',
    designation: '',
    team: '',
    role: '',
    salary: 0
  };

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
      this.isEditMode = false;
      this.editEmployeeId = undefined;
    }
  }

  resetForm(): void {
    this.newEmployee = {
      id: 0,
      name: '',
      contact: '',
      email: '',
      image: '',
      department: '',
      designation: '',
      team: '',
      role: '',
      salary: 0
    };
  }

    // Computed property for filtered employees
    get filteredEmployees(): Employee[] {
    let filtered = this.employees;

    // Search by name or email
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(term) ||
        (emp.email && emp.email.toLowerCase().includes(term))
      );
    }

    // Filter by department
    if (this.selectedDepartment) {
      filtered = filtered.filter(emp => emp.department === this.selectedDepartment);
    }

    // Filter by team
    if (this.selectedTeam) {
      filtered = filtered.filter(emp => emp.team === this.selectedTeam);
    }

    return filtered;
  }

  // Get unique departments for filter
  get uniqueDepartments(): string[] {
    return [...new Set(this.employees.map(emp => emp.department))];
  }

  // Get unique teams for filter
  get uniqueTeams(): string[] {
    return [...new Set(this.employees.map(emp => emp.team))];
  }

  

  

  // Edit Employee
  editEmployee(employee: Employee): void {
    this.isEditMode = true;
    this.editEmployeeId = employee.id;
    this.newEmployee = { ...employee };
    this.showForm = true;
    this.selectedEmployee = undefined;
    
    // Scroll to form
    setTimeout(() => {
      document.querySelector('.form-container')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 300);
  }
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(emp => emp.id !== id);
      if (this.selectedEmployee?.id === id) {
        this.selectedEmployee = undefined;
      }
    }
  }
  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    // Scroll to details on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document.querySelector('.employee-details-panel')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 300);
    }
  }

  // Validate form before submission
  validateForm(): boolean {
    const emp = this.newEmployee;
    const requiredFields = ['name', 'department', 'salary', 'contact', 'designation', 'team', 'role', 'image'];
    
    for (const field of requiredFields) {
      if (!emp[field as keyof Employee]) {
        this.showToast(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`, 'error');
        return false;
      }
    }
    
    if (emp.salary <= 0) {
      this.showToast('Salary must be greater than 0', 'error');
      return false;
    }

    return true;
  }

  addEmployee(): void {
         if (!this.validateForm()) {
      return;
    }

    if (this.isEditMode && this.editEmployeeId) {
      // Update existing employee
      const index = this.employees.findIndex(emp => emp.id === this.editEmployeeId);
      if (index !== -1) {
        this.employees[index] = {
          ...this.newEmployee,
          id: this.editEmployeeId
        };
        this.showToast('Employee updated successfully!', 'success');
      }
    } else {
      // Add new employee
      const newId = this.employees.length > 0 
        ? Math.max(...this.employees.map(emp => emp.id)) + 1 
        : 1;
      
      this.employees.push({
        ...this.newEmployee,
        id: newId
      });
      this.showToast('Employee added successfully!', 'success');
    }

    this.resetForm();
    this.showForm = false;
    this.isEditMode = false;
    this.editEmployeeId = undefined;
  } 
    showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.toast = {
      show: true,
      message,
      type
    };

    setTimeout(() => {
      this.toast.show = false;
    }, 3000);
  }
  
    clearFilters(): void {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.selectedTeam = '';
  }

}