import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsCategoryComponent } from '../../../componets/layout/cards-category/cards-category.component';

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [RouterLink, CardsCategoryComponent],
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css'
})
export class ComputersComponent {

}
