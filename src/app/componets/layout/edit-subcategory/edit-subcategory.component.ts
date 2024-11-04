import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubCategoryService } from '../../../services/sub-category.service';
import { CategoryService } from '../../../services/category.service';
import { Subcategory } from '../../../interfaces/subcategory';
import { Category } from '../../../interfaces/category';
import { ResponseSub } from '../../../interfaces/response';

@Component({
  selector: 'app-edit-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent implements OnInit, OnDestroy {
  subcategoryForm!: FormGroup;
  showModal: boolean = false;
  categories: Category[] = [];
  subcategoryId!: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
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
    this.subcategoryId = this.route.snapshot.paramMap.get('id')!; // Obtener el ID de la subcategoría desde la ruta
    this.loadSubcategory(); // Cargar la subcategoría a editar
  }

  loadCategories(): void {
    this.subscription.add(this.categoryService.getAllCategories().subscribe({
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
    }));
  }

  loadSubcategory(): void {
    this.subscription.add(this.subCategoryService.getSubCategory(this.subcategoryId).subscribe({
      next: (response: ResponseSub) => {
        if (response.ok && response.data) {
          const { name, description, category } = response.data;
          this.subcategoryForm.patchValue({ name, description, category: category._id }); // Rellenar el formulario
        } else {
          console.error('Subcategoría no encontrada');
        }
      },
      error: (err) => {
        console.error('Error al cargar la subcategoría:', err);
      }
    }));
  }

  onSubmit() {
    if (this.subcategoryForm.valid) {
      const formData: Subcategory = this.subcategoryForm.value;
      this.subscription.add(this.subCategoryService.editSubcategory(this.subcategoryId, formData).subscribe(
        response => {
          console.log('Subcategoría editada exitosamente');
          this.showModal = true;
        },
        error => {
          console.error('Error al editar la subcategoría:', error);
        }
      ));
    } else {
      console.log('El formulario no es válido');
    }
  }

  closeModal() {
    this.showModal = false;
  }

  handleAccept() {
    this.closeModal();
    this.router.navigate(['/dashboard']); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
