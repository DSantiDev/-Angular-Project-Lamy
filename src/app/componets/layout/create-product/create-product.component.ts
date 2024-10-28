import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { ResponsePro } from '../../../interfaces/response';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); 
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
        next: (data) => {
            this.products = data;   
        },
        error: (err) => {
            console.error('Error al obtener los productos:', err);
        }
    });
}

deleteProduct(productId: string): void {
  this.productService.deleteProduct(productId).subscribe(
    (response: ResponsePro) => {
      console.log('Producto eliminado:', response);
      this.loadProducts(); 
    },
    (error) => {
      console.error('Error al eliminar el producto:', error);
    }
  );
}
}