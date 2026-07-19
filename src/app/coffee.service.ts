import { Injectable, inject, signal ,computed} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})

export class CoffeeService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/coffees`;

  
  // Reactive state management using signals
  coffeeList = signal<any[]>([]);
loading = signal(false);
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
  this.loading.set(true);

  this.http.get<any[]>(this.apiUrl).subscribe({
    next: data => {
      this.coffeeList.set(data);
      this.loading.set(false);
    },
    error: () => {
      this.loading.set(false);
    }
  });
}

  saveCoffee(data: any) {
    return this.http.post(this.apiUrl, data);
  }

deleteCoffee(id: string) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

removeCoffeeFromList(id: string) {
  this.coffeeList.update(list =>
    list.filter(coffee => coffee._id !== id)
  );
}

  updateCoffee(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}