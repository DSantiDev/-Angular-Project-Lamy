import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Asegúrate de tener esto importado
import { Subscription } from 'rxjs';
import { Subcategory } from '../../../interfaces/subcategory';
import { SubCategoryService } from '../../../services/sub-category.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  productEditForm!: FormGroup;
  showModal: boolean = false;
  productId!: string; 
  subCategoryService: Subcategory[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: SubCategoryService
  ) {
    this.productEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      category: new FormControl('non-category', [Validators.required]),
      urlImage: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.loadProduct(this.productId);
      this.loadSubcategories(); // Cargar categorías al inicializar
    });
  }

  loadSubcategories(): void {
    this.subscription = this.categoryService.getAllSubCategories().subscribe({
      next: (response) => {
        console.log('Respuesta de subcategorías:', response); 
        if (response && response.length) {
          this.categoryService = response; 
        } else {
          console.error('No se encontraron subcategorías');
        }
      },
      error: (err) => {
        console.error('Error al cargar subcategorías:', err);
      }
    });
}


loadProduct(productId: string): void {
  this.subscription = this.productService.getProduct(productId).subscribe(
      (response) => {
          if (response.ok && response.data) {  
              this.productEditForm.patchValue(response.data);
          } else {
              console.error('Producto no encontrado o error en la respuesta');
          }
      },
      error => {
          console.error('Error al obtener el producto:', error);
      }
  );
}

  onSubmit() {
    if (this.productEditForm.valid) {
      const formData = this.productEditForm.value;
      this.subscription = this.productService.editProduct(this.productId, formData).subscribe(
        response => {
          console.log('Producto editado exitosamente');
          this.showModal = true;
        },
        error => {
          console.error('Error al editar el producto:', error);
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
    this.productEditForm.reset();
    this.router.navigate(['/dashboard']); 
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
