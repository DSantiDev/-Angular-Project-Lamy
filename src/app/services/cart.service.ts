import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Item } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  item!: Item;
  private cartProducts: any = [] ;
  private localStorageKey = 'cart';

  constructor() {
    this.loadCartFromLocalStorage();
    console.log( this.cartProducts );
  }

  addToCart(product: Product) {
    // Buscar el producto en el carrito usando su id
    const productFound = this.cartProducts.find((productItem: any) => 
      productItem.info._id === product._id
    );
  
    if (!productFound) {
      // Si no se encuentra en el carrito, se crea un nuevo item con order = 1
      this.item = {
        info: product,
        order: 1,
        total: product.price // Total inicial basado en la cantidad de 1
      };
      this.cartProducts.push(this.item);
    } else if ( productFound.order < product.stock ) {
      // Si el producto ya está en el carrito y no se ha alcanzado el límite, incrementar 'order'
      productFound.order += 1;
      productFound.total = productFound.order * product.price;
    } else {
      console.error('Cantidad excedida');
    }
  
    // Guardar el carrito actualizado en localStorage
    this.saveCartToLocalStorage();
  }
  

  private saveCartToLocalStorage() {
    localStorage.setItem( this.localStorageKey, JSON.stringify( this.cartProducts ) );
  }

  private loadCartFromLocalStorage() {

    if( localStorage.getItem( this.localStorageKey ) ) {
      this.cartProducts = JSON.parse( localStorage.getItem( this.localStorageKey ) ! )
    }
    else {
      this.cartProducts = []
    }
  }
}