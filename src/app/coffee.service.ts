import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/coffee';

  // Reactive state management using signals
  coffeeList = signal<any[]>([]);

  fetchCoffee() {
    this.http
      .get<any[]>(this.apiUrl)
      .subscribe(data => this.coffeeList.set(data));
  }

  saveCoffee(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  deleteCoffee(id: string) {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .subscribe(() =>
        this.coffeeList.update(list =>
          list.filter(coffee => coffee._id !== id)
        )
      );
  }

  updateCoffee(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}