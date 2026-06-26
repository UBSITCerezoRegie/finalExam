import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Menu } from './menu/menu';
import { Checkout } from './checkout/checkout';
import { ManagerLogin } from './manager-login/manager-login';
import { ManagerDashboard } from './manager-dashboard/manager-dashboard';
import { OrderList } from './order-list/order-list';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'menu', component: Menu },
  { path: 'cart', component: Cart },

  { path: 'checkout', component: Checkout },
  { path: 'manager-login', component: ManagerLogin },
  { path: 'manager-dashboard', component: ManagerDashboard },
  { path: 'orders', component: OrderList },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];