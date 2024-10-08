import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsOfertsComponent } from '../../componets/layout/cards-oferts/cards-oferts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardsOfertsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
