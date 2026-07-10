import { Injectable, inject, signal ,computed} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  private http = inject(HttpClient);

  // comment outprivate apiUrl = 'http://localhost:3000/api/coffees';
  private apiUrl = 'https://finalexam-api.onrender.com/api/coffees';
  // Reactive state management using signals
  coffeeList = signal<any[]>([]);
  breakfastItems = computed(() =>
    this.coffeeList().filter(item => item.category === 'breakfast')
  );

  coffeeItems = computed(() =>
    this.coffeeList().filter(item => item.category === 'coffee')
  );

  coldCoffeeItems = computed(() =>
    this.coffeeList().filter(item => item.category === 'coldCoffee')
  );

  teaItems = computed(() =>
    this.coffeeList().filter(item => item.category === 'tea')
  );

  mainDishItems = computed(() =>
    this.coffeeList().filter(item => item.category === 'mainDish')
  );

  dessertItems = computed(() =>
    this.coffeeList().filter(item => item.category === 'dessert')
  );
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