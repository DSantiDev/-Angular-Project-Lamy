import { Component } from '@angular/core';
import { CardsOfertsComponent } from '../../componets/layout/cards-oferts/cards-oferts.component';
import { SlidesComponent } from '../../componets/layout/slides/slides.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsOfertsComponent, SlidesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  
 
}
