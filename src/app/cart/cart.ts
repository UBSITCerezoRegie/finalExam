import { Component ,inject} from '@angular/core';
import { cartService } from '../cart-service';
@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class cart {
  cartService = inject(cartService)
}
