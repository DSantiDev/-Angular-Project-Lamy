import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-created-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './created-category.component.html',
  styleUrl: './created-category.component.css'
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  categoryForm!: FormGroup;
  showModal: boolean = false;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData: Category = this.categoryForm.value;
      this.subscription = this.categoryService.registerCategory(formData).subscribe(
        response => {
          console.log('Categoría registrada exitosamente');
          this.showModal = true;
        },
        error => {
          console.error('Error al registrar la categoría:', error);
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
    this.router.navigate(['/dashboard']); // Redirige a otra página si lo deseas
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}