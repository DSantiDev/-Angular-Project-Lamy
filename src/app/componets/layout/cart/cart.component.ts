import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service'; // Importar el servicio del carrito
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Item } from '../../../interfaces/cart';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Corregido a 'styleUrls'
})
export class CartComponent {
  cartProducts: Item[] = []; // Cambiar a tipo Item[]
  totalItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
    this.updateTotalItems();
  }

  updateTotalItems() {
    this.totalItems = this.cartProducts.reduce((sum, item) => sum + item.order, 0);
  }

  getTotal(): number {
    return this.cartProducts.reduce((sum, item) => sum + (item.total || 0), 0);
  }

  removeFromCart(product: Product) {
    if (product) {
      this.cartService.removeFromCart(product);
      this.cartProducts = this.cartService.getCartProducts(); 
    }
  }
  toggleCart() {
    const checkbox = document.getElementById('cart-toggle') as HTMLInputElement;
    checkbox.checked = !checkbox.checked; // Cambia el estado del checkbox
}

  
}
