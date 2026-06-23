import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  product = input<any>();

  add = output<any>();

  addToCart() {
    this.add.emit(this.product());
  }
}