import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Home } from './home/home';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: 
  
  [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}