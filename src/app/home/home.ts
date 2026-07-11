import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import {FeatureCard} from "../feature-card/feature-card";
@Component({
  selector: 'app-home',
  imports: [RouterLinkActive, RouterLink, FeatureCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
