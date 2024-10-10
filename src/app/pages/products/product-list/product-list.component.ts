import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CardsComponent } from '../../../componets/layout/cards/cards.component';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CardsComponent, RouterLinkActive],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  // Variables para manejar el estado del orden
  orderToggle = false;
  selectedOrder = 'Orden predeterminado'; // Valor por defecto
  
  // Método para manejar el cambio en la selección de orden
  onOrderChange(event: Event): void {
    const selectedRadio = (event.target as HTMLInputElement).value;
    this.selectedOrder = selectedRadio;
    
    // Aquí puedes agregar lógica adicional si necesitas hacer algo más con el orden seleccionado.
  }
}
