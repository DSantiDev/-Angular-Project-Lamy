import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { SubCategoryService } from '../../../services/sub-category.service'; 
import { CategoryService } from '../../../services/category.service';
import { Subcategory } from '../../../interfaces/subcategory';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-created-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './created-subcategory.component.html',
  styleUrls: ['./created-subcategory.component.css']
})
export class CreatedSubcategoryComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  subcategoryForm!: FormGroup;
  showModal: boolean = false;
  categories: Category[] = [];

  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.subcategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      urlImage: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadCategories(); // Cargar categorías al inicializar
  }

  loadCategories(): void {
    this.subscription = this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response && response.length) {
          this.categories = response; 
        } else {
          console.error('No se encontraron categorías');
        }
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  onSubmit() {
    if (this.subcategoryForm.valid) {
      const formData: Subcategory = this.subcategoryForm.value;
      this.subscription = this.subCategoryService.registerSubcategory(formData).subscribe(
        response => {
          console.log('Subcategoría registrada exitosamente');
          this.showModal = true;
        },
        error => {
          console.error('Error al registrar la subcategoría:', error);
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
    this.subcategoryForm.reset();
    this.router.navigate(['/dashboard']); 
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
