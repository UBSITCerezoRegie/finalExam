import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart-service';
import { CoffeeService } from '../coffee.service';
import { ProductCard } from '../product-card/product-card';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [ProductCard, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  cartService = inject(CartService);
  coffeeService = inject(CoffeeService);

  ngOnInit() {
    this.coffeeService.fetchCoffee();
  }
}