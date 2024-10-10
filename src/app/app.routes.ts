import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ComputersComponent } from './pages/categories/computers/computers.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'computers', component: ComputersComponent},
    { path: '404', component: PageNotFoundComponent},
    { path: 'products/form', component: ProductFormComponent}, 
    { path: 'computers/category', component: ProductListComponent},
    { path: 'computers/category/product', component: ProductDetailComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: '404', pathMatch: 'full'}
];
