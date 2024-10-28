import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ShoppingComponent } from '../../componets/layout/shopping/shopping.component';
import { ProfileComponent } from '../../componets/layout/profile/profile.component';
import { PaysComponent } from '../../componets/layout/pays/pays.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ShoppingComponent, ProfileComponent, PaysComponent, DashboardComponent, RouterLink, RouterLinkActive],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  selectedSection: string = 'perfil';
  constructor(private authService: AuthService){

  }
  selectSection(section: string) {
    this.selectedSection = section;
  }
  get userData(): User | null {
    return this.authService.userData
  }
}