import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Item } from '../../../interfaces/cart';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: Item[] = [];
  isCartOpen: boolean = false; // Variable para controlar la visibilidad del carrito

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCartProducts();
  }

  
  loadCartProducts() {
    this.cartProducts = this.cartService.getCartProducts();
  }

  getTotal(): number {
    return this.cartProducts.reduce((sum, item) => sum + (item.total || 0), 0);
  }

  removeFromCart(product: Product) {
    if (product) {
      this.cartService.removeFromCart(product);
      this.loadCartProducts(); 
    }
  }


  toggleCart() {
    this.isCartOpen = !this.isCartOpen; 
  }


  finalizePurchase() {
    const productsToCheckout = this.cartProducts
      .filter(item => item.info !== undefined)
      .map(item => ({
        name: item.info?.name,
        image: item.info?.urlImage,
        price: item.info?.price,
        quantity: item.order
      }));

    if (productsToCheckout.length > 0) {
      this.cartService.setCheckoutProducts(productsToCheckout);
      this.router.navigate(['/checkout']);
    } else {
      console.warn('No hay productos en el carrito para finalizar la compra.');
    }
  }
  
}
