import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart-service';
import { CoffeeService } from '../coffee.service';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {Loading} from '../loading/loading';
@Component({
  selector: 'app-menu',
  imports: [ProductCard, RouterLink, Loading],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  cartService = inject(CartService);
  coffeeService = inject(CoffeeService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    console.log('Menu ngOnInit');
    this.coffeeService.fetchCoffee();

    this.route.queryParams.subscribe(params => {
      const category = params['category'];

      if (category) {
        setTimeout(() => {
          const el = document.getElementById(category);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }
}