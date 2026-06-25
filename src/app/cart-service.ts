import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  breakfastItems = signal<any[]>([]);
  coffeeItems = signal<any[]>([]);
  coldCoffeeItems = signal<any[]>([]);
  teaItems = signal<any[]>([]);
  mainDishItems = signal<any[]>([]);
  dessertItems = signal<any[]>([]);

  private cartItems = signal<any[]>([]);
  cart = this.cartItems.asReadonly();

  totalPrice = computed(() =>
    this.cartItems().reduce((sum: number, item: any) => sum + item.price, 0)
  );

  addToCart(item: any) {
    this.cartItems.update(current => [...current, item]);
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
