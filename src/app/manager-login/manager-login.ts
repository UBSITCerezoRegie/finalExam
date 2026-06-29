import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-login',
  imports: [FormsModule],
  templateUrl: './manager-login.html',
  styleUrl: './manager-login.css'
})
export class ManagerLogin {

  private http = inject(HttpClient);
  private router = inject(Router);

  username = '';
  password = '';

  login() {
    this.http.post<any>('http://localhost:3000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/manager-dashboard']);
        }
      },
      error: () => {
        alert('Invalid username or password');
      }
    });
  }
}