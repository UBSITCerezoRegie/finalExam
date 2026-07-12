import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Menu } from './menu/menu';
import { Checkout } from './checkout/checkout';
import { ManagerDashboard } from './manager-dashboard/manager-dashboard';
import { Orders } from './order/order';
import { ManagerLogin } from './manager-login/manager-login';
import { managerGuard } from './auth/manager-guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'menu', component: Menu },
  { path: 'cart', component: Cart },

  { path: 'checkout', component: Checkout },
  { path: 'manager-dashboard', component: ManagerDashboard       ,canActivate: [managerGuard]},
  { path: 'orders', component: Orders       ,canActivate: [managerGuard]},
    { path: 'manager-login', component: ManagerLogin
     },


  { path: '', redirectTo: 'home', pathMatch: 'full' }
];