import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  error = signal(false);

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  login() {

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (
      username === 'admin' &&
      password === '1234'
    ) {

      localStorage.setItem('managerLoggedIn', 'true');

      this.router.navigate(['/manager-dashboard']);

    } else {

      this.error.set(true);

    }

  }

}