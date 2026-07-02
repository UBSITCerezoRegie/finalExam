import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  cartService = inject(CartService);

  checkoutForm = this.fb.group({
    customerName: ['', Validators.required],
    contactNumber: ['', Validators.required]
  });

  placeOrder() {

    if (this.checkoutForm.invalid) return;

    const orderData = {
      customerName: this.checkoutForm.value.customerName,
      contactNumber: this.checkoutForm.value.contactNumber,
      items: this.cartService.cart(),
      total: this.cartService.totalPrice()
    };

    this.http.post(
      'http://localhost:3000/api/orders',
      orderData
    ).subscribe({
      next: (response) => {
        console.log('Order placed', response);

        alert('Order placed successfully!');

        this.cartService.clearCart();

        this.checkoutForm.reset();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}