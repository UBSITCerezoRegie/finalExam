import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
