import { Component, inject } from '@angular/core';
import { CartService } from '../cart-service'; 
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [RouterLink],  
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  protected cartService = inject(CartService); 
}
