import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Orders implements OnInit {

  private http = inject(HttpClient);

  orders = signal<any[]>([]);

  private apiUrl = 'https://finalexam-api.onrender.com/api/coffees';

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http
      .get<any[]>(this.apiUrl)
      .subscribe(data => this.orders.set(data));
  }

  updateStatus(order: any, status: string) {

    this.http.put(
      `${this.apiUrl}/${order._id}/status`,
      { status }
    )
    .subscribe(() => {
      this.fetchOrders();
    });

  }

}