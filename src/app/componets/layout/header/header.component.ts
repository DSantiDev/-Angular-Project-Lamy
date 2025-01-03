import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from "../../../pages/login/login.component";
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent, RouterLinkActive, CommonModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor( private authServices: AuthService ){

  }
  get authUser(){
    return this.authServices.userData;
  }
}
