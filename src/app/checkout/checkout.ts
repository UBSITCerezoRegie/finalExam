import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart-service';
import { Loading } from '../loading/loading';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, Loading],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/orders`;

  cartService = inject(CartService);

  loading = signal(false);


  checkoutForm = this.fb.group({
    customerName: ['', Validators.required],
    contactNumber: ['', Validators.required]
  });

  placeOrder() {

    if (this.checkoutForm.invalid || this.cartService.cart().length === 0) {
      return;
    }

    const orderData = {
      customerName: this.checkoutForm.value.customerName,
      contactNumber: this.checkoutForm.value.contactNumber,
      items: this.cartService.cart(),
      total: this.cartService.totalPrice()
    };

    this.loading.set(true);

    this.http.post(this.apiUrl, orderData).subscribe({
      next: (response) => {

        this.loading.set(false);

        console.log('Order placed', response);

        alert('Order placed successfully!');

        this.cartService.clearCart();

        this.checkoutForm.reset();

      },

      error: (err) => {

        this.loading.set(false);

        console.error(err);

        alert('Failed to place order.');

      }
    });
  }

}