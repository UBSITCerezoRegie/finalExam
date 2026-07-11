import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.css'
})
export class FeatureCard {

  @Input() title = '';

  @Input() image = '';

  @Input() category = '';

}