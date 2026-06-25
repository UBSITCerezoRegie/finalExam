import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {

  product = {
    name: '',
    price: 0,
    description: '',
    image: ''
  };

  saveProduct() {

    console.log(this.product);

    alert('Product Saved');
  }
}