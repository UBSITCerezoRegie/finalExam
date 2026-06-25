import { Component, inject } from '@angular/core';
import { CartService } from '../cart-service'; 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  protected cartService = inject(CartService); 
}
