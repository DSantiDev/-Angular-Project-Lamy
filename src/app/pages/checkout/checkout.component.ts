import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface Product {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any[] = []; // Reemplaza 'any' por el tipo adecuado
  total: number = 0; // Total de la compra
  shippingForm: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService) {
    // Inicializa el formulario
    this.shippingForm = this.fb.group({
        name: [''],
        address: [''],
        city: [''],
        phone: [''],
        paymentMethod: ['credit']
    });
}

ngOnInit(): void {
  this.products = this.cartService.getCheckoutProducts() || [];
  this.updateTotal();
}


  increaseQuantity(product: any): void {
    product.quantity++;
    this.updateTotal();
  }

  decreaseQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateTotal();
    }
  }

  updateTotal(): void {
    this.total = this.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }

  completePurchase(): void {
  }
  removeProduct(product: any): void {
    this.cartService.removeFromCart(product);
    this.products = this.products.filter(p => p.name !== product.name || p.image !== product.image);
    this.updateTotal();
  }
  
}
  