import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CardsComponent } from '../../../componets/layout/cards/cards.component';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CardsComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  orderToggle = false;
  selectedOrder = 'Orden predeterminado';

  onOrderChange(event: Event): void {
    const selectedRadio = (event.target as HTMLInputElement).value;
    this.selectedOrder = selectedRadio;
    this.orderToggle = false;
  }
  toggleOrder(): void {
    this.orderToggle = !this.orderToggle;
  }
}

