import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductFormComponent } from '../products/product-form/product-form.component';
import { RouterLink } from '@angular/router';
import { CreateProductComponent } from '../../componets/layout/create-product/create-product.component';
import { UserViewComponent } from "../../componets/layout/user-view/user-view.component";
import { CategoriesComponent } from '../../componets/layout/categories/categories.component';
import { SubcategoriesComponent } from '../../componets/layout/subcategories/subcategories.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, RouterLink, CreateProductComponent, UserViewComponent, CategoriesComponent, SubcategoriesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedSection: string = 'products';

  selectSection(section: string) {
    this.selectedSection = section;
  }
}
