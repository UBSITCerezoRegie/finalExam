import {
  ChangeDetectionStrategy, Component, inject, signal, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder, ReactiveFormsModule,  Validators
} from '@angular/forms';

import { CoffeeService } from '../coffee.service';
import { Loading } from '../loading/loading';
@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, Loading],
  templateUrl: 'manager-dashboard.html',
  styleUrl: 'manager-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerDashboard implements OnInit {
  

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  CoffeeService = inject(CoffeeService);

  editingId = signal<string | null>(null);

 logout() {
  localStorage.removeItem('managerLoggedIn');
  this.router.navigate(['/manager-login']);
}

  CoffeeForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    description: [''],
    price: [1, [Validators.required, Validators.min(1)]],
    image: ['']
  });

  ngOnInit() {
    this.CoffeeService.fetchCoffee();
  }

deleteCoffee(id: string) {
  if (!confirm('Are you sure you want to delete this coffee?')) {
    return;
  }

  this.CoffeeService.deleteCoffee(id).subscribe({
    next: () => {
      this.CoffeeService.removeCoffeeFromList(id);
    },
    error: (err) => {
      console.error('Delete failed!', err);
    }
  });
}

  startEdit(Coffee: any) {
    this.editingId.set(Coffee._id);
    this.CoffeeForm.patchValue(Coffee);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.CoffeeForm.reset();
  }

  onSubmit() {
    if (this.CoffeeForm.invalid) return;

    const data = this.CoffeeForm.getRawValue();
    const id = this.editingId();

    if (id) {
      this.CoffeeService.updateCoffee(id, data).subscribe({
        next: () => {
          this.CoffeeService.fetchCoffee();
          this.cancelEdit();
        },
        error: (err) => console.error('Update Failed!', err)
      });
    } else {
      this.CoffeeService.saveCoffee(data).subscribe({
        next: () => {
          this.CoffeeService.fetchCoffee();
          this.CoffeeForm.reset();
        },
        error: (err) => console.error('Save Failed!', err)
      });
    }
  }
}