import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsCategoryComponent } from '../../../componets/layout/cards-category/cards-category.component';
import { Subcategory } from '../../../interfaces/subcategory';
import { CommonModule } from '@angular/common';
import { SubCategoryService } from '../../../services/sub-category.service';

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [RouterLink, CardsCategoryComponent,  CommonModule],
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css'
})
export class ComputersComponent {

  categories: Subcategory[] = [];

  constructor( private subcategoryService: SubCategoryService ) {}

  ngOnInit() {
    this.subcategoryService.getAllSubCategories().subscribe( data => {
      console.log( data );
      this.categories = data;
    })
  }

}
