import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category.service';
import { Subcategory } from '../../../interfaces/subcategory';
import { SubCategoryService } from '../../../services/sub-category.service';

@Component({
  selector: 'app-cards-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cards-category.component.html',
  styleUrl: './cards-category.component.css'
})
export class CardsCategoryComponent {
  @Input() categoryValue!: Subcategory;


}
