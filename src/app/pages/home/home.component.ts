import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsOfertsComponent } from '../../componets/layout/cards-oferts/cards-oferts.component';
import { SlidesComponent } from '../../componets/layout/slides/slides.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardsOfertsComponent, SlidesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  
 
}
