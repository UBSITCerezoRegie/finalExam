import { Routes } from '@angular/router';
import { Home } from './home/home';
import { cart } from './cart/cart';
import { Menu } from './menu/menu';
export const routes: Routes = [
   {path: 'home', component: Home}, //landing page
  { path: 'menu', component: Menu }, // go to kanto
  { path: 'cart', component: cart }, // johto
  //{path: 'hoenn', component: HoennGymLeader}, // go to hoenN!!
  { path: '', redirectTo: 'home', pathMatch:'full'} //deffault
];