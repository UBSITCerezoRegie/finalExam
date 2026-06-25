import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Menu } from './menu/menu';
export const routes: Routes = [
   {path: 'home', component: Home}, 
  { path: 'menu', component: Menu }, 
  { path: 'cart', component: Cart }, 
  { path: '', redirectTo: 'home', pathMatch:'full'} //deffault
];