import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsComponent } from '../../../componets/layout/cards/cards.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CardsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
