import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// Use absolute path to environments to avoid module resolution issues
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-manager-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manager-login.html',
  styleUrl: './manager-login.css'
})
export class ManagerLogin {

  private fb = inject(FormBuilder);
  private router = inject(Router);
private http = inject(HttpClient);
  error = signal(false);

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  login() {

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
this.http.post(
  `${environment.apiUrl}/login`,
  {
    username,
    password
  }
).subscribe({
  next: () => {
    localStorage.setItem('managerLoggedIn', 'true');
    this.router.navigate(['/manager-dashboard']);
  },
  error: () => {
    this.error.set(true);
  }
});

  }

}