import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Menu } from './menu/menu';
import { Checkout } from './checkout/checkout';
import { ManagerDashboard } from './manager-dashboard/manager-dashboard';
import { Orders } from './order/order';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'menu', component: Menu },
  { path: 'cart', component: Cart },

  { path: 'checkout', component: Checkout },
  { path: 'manager-dashboard', component: ManagerDashboard },
  { path: 'orders', component: Orders },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];