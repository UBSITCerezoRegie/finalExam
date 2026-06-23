import { Component ,inject} from '@angular/core';
import { cartService } from '../cart-service';
import { ProductCard } from '../product-card/product-card';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [ProductCard, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  cartService = inject(cartService);
}
