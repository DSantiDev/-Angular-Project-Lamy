import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ComputersComponent } from './pages/categories/computers/computers.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { UserEditComponent } from './componets/layout/user-edit/user-edit.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'computers', component: ComputersComponent},
    { path: 'perfil', component: UserProfileComponent, canActivate: [authGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: '404', component: PageNotFoundComponent},
    { path: 'user/edit/:id', component: UserEditComponent, canActivate: [authGuard]}, 
    { path: 'products/form', component: ProductFormComponent, canActivate: [authGuard]}, 
    { path: 'product/edit/:id', component: ProductEditComponent, canActivate: [authGuard] },
    { path: 'computers/category', component: ProductListComponent},
    { path: 'computers/category/product', component: ProductDetailComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: '404', pathMatch: 'full'}
];
