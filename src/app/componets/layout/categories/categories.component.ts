import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'] // Usar 'styleUrls' en plural
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
      }
    });
  }

  deleteCategory(categoryId: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (response) => {
        console.log('Categoría eliminada:', response);
        this.loadCategories(); // Recargar categorías después de eliminar
      },
      (error) => {
        console.error('Error al eliminar la categoría:', error);
      }
    );
  }
}
