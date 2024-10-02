import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ComputersComponent } from './pages/categories/computers/computers.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: '404', component: PageNotFoundComponent},
    { path: 'computers-category', component: ComputersComponent},
    { path: 'computers-category/product-list', component: ProductListComponent},
    { path: 'computers-category/product-list/product-detail', component: ProductDetailComponent},
    { path: '**', redirectTo: '404', pathMatch: 'full'}
];
