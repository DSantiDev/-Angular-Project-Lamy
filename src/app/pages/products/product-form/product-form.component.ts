import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router, RouterLink } from '@angular/router'; // Asegúrate de tener esto importado
import { Subscription } from 'rxjs';
import { Subcategory } from '../../../interfaces/subcategory';
import { SubCategoryService } from '../../../services/sub-category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'] 
})
export class ProductFormComponent implements OnInit, OnDestroy {
  suscription!: Subscription;
  productForm!: FormGroup;
  subscription!: Subscription;
  showModal: boolean = false;
  subcategories: Subcategory[] = []; 

  constructor(private productService: ProductService, private router: Router, private subCategoryService: SubCategoryService,) { 
    this.productForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      description: new FormControl(''),
      price: new FormControl(0, [ Validators.required, Validators.min(0) ]),
      quantity: new FormControl(1, [ Validators.required, Validators.min(1) ]),
      category: new FormControl('non-category', [ Validators.required ]),
      urlImage: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadSubcategories(); 
  }

  loadSubcategories(): void {
    this.subscription = this.subCategoryService.getAllSubCategories().subscribe({
      next: (response) => {
        console.log('Respuesta de subcategorías:', response); 
        if (response && response.length) {
          this.subcategories = response; 
        } else {
          console.error('No se encontraron subcategorías');
        }
      },
      error: (err) => {
        console.error('Error al cargar subcategorías:', err);
      }
    });
}


  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.suscription = this.productService.registerProduct(formData).subscribe(
        response => {
          console.log('Producto registrado exitosamente'); 
          this.showModal = true; 
        },
        error => {
          console.error('Error al registrar el producto:', error); 
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }

  closeModal() {
    this.showModal = false;
  }
  handleAccept() {
    this.closeModal();         
    this.productForm.reset();
  }
  ngOnDestroy(){
    if (this.suscription) {
      this.suscription.unsubscribe()
    }
   }
}
