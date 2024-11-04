import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryService } from '../../../services/sub-category.service';
import { Subcategory } from '../../../interfaces/subcategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  subcategories: Subcategory[] = [];

  constructor(private subCategoryService: SubCategoryService) {}

  ngOnInit(): void {
    this.loadSubCategories();
  }

  loadSubCategories(): void {
    this.subCategoryService.getAllSubCategories().subscribe({
      next: (data) => {
        this.subcategories = data;
      },
      error: (err) => {
        console.error('Error al obtener las subcategorías:', err);
      }
    });
  }

  deleteSubCategory(subCategoryId: string): void {
    this.subCategoryService.deleteSubcategory(subCategoryId).subscribe({
      next: (response) => {
        console.log('Subcategoría eliminada:', response);
        this.loadSubCategories();
      },
      error: (error) => {
        console.error('Error al eliminar la subcategoría:', error);
      }
    });
  }
}
