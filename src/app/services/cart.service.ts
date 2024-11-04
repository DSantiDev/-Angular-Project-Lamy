import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Item } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: Item[] = [];
  private localStorageKey = 'cart';
  private checkoutProducts: any[] = [];

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(product: Product) {
    const productFound = this.cartProducts.find((item: Item) => item.info?._id === product._id);

    if (!productFound) {
      const item: Item = {
        info: product,
        order: 1,
        total: product.price
      };
      this.cartProducts.push(item);
    } else if (productFound.order < product.stock) {
      productFound.order += 1;
      productFound.total = productFound.order * product.price;
    } else {
      console.error('Cantidad excedida');
    }

    this.saveCartToLocalStorage();
  }

  removeFromCart(product: Product) {
    this.cartProducts = this.cartProducts.filter(item => item.info?._id !== product._id);
    this.saveCartToLocalStorage();
  }

  getCartProducts(): Item[] {
    return this.cartProducts;
  }

  private saveCartToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartProducts));
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(this.localStorageKey);
    this.cartProducts = storedCart ? JSON.parse(storedCart) : [];
  }
  setCheckoutProducts(products: any[]) {
    this.checkoutProducts = products;
  }

  getCheckoutProducts() {
    return this.checkoutProducts;
  }
}