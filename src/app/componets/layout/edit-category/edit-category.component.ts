import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../services/category.service'; 
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterLink],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  categoryForm!: FormGroup;
  showModal: boolean = false;
  categoryId!: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.loadCategory(this.categoryId);
    });
  }

  loadCategory(categoryId: string): void {
    this.subscription = this.categoryService.getCategory(categoryId).subscribe(
      (response) => {
        if (response.ok && response.data) {  
          this.categoryForm.patchValue(response.data);
        } else {
          console.error('Categoría no encontrada o error en la respuesta');
        }
      },
      error => {
        console.error('Error al obtener la categoría:', error);
      }
    );
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData: Category = this.categoryForm.value;
      this.subscription = this.categoryService.editCategory(this.categoryId, formData).subscribe(
        response => {
          console.log('Categoría editada exitosamente');
          this.showModal = true;
        },
        error => {
          console.error('Error al editar la categoría:', error);
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
    this.categoryForm.reset();
    this.router.navigate(['/dashboard']); 
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
