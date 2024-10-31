import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CardsComponent } from '../../../componets/layout/cards/cards.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CardsComponent, RouterLink, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  orderToggle = false;
  products: Product[] = [];

  selectedOrder = 'Orden predeterminado';

  constructor( private productService: ProductService ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe( data => {
      this.products = data;
      console.log( this.products );
    });
  }

  onOrderChange(event: Event): void {
    const selectedRadio = (event.target as HTMLInputElement).value;
    this.selectedOrder = selectedRadio;
    this.orderToggle = false;
  }
  toggleOrder(): void {
    this.orderToggle = !this.orderToggle;
  }
}

