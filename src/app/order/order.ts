import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { Loading } from '../loading/loading';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, Loading],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Orders implements OnInit {

  private http = inject(HttpClient);

  orders = signal<any[]>([]);
  loading = signal(true);

  private apiUrl = `${environment.apiUrl}/orders`;

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading.set(true);

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.orders.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  updateStatus(order: any, status: string) {
    this.http.put(
      `${this.apiUrl}/${order._id}/status`,
      { status }
    ).subscribe(() => {
      this.fetchOrders();
    });
  }

  deleteOrder(id: string) {

    if (!confirm('Delete this order?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.fetchOrders();
    });

  }
}