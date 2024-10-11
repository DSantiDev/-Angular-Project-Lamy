import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'] 
})
export class ProductFormComponent {
  productForm!: FormGroup;
  
  constructor(private productService: ProductService) { 
    this.productForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      description: new FormControl(''),
      price: new FormControl(0, [ Validators.required, Validators.min(0) ]),
      quantity: new FormControl(1, [ Validators.required, Validators.min(1) ]),
      category: new FormControl('non-category', [ Validators.required ]),
      urlImage: new FormControl('')
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log('Datos del formulario:', formData);

      this.productService.registerProduct(formData).subscribe(success => {
        if (success) {
          console.log('Producto registrado exitosamente');
          this.productForm.reset();
        } else {
          console.error('Error al registrar el producto');
        }
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
