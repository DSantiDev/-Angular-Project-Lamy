import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData!: FormGroup;
  isLoggedIn: boolean = false
  showLoginPassword: boolean = false; 

  constructor(private authService: AuthService) {
    this.formData = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });

    this.isLoggedIn = this.authService.isLoggedIn(); 
  }

  toggleLoginPassword() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  handleSubmit() {
    if (this.formData.valid) {
      this.authService.login(this.formData.value).subscribe((data: string | boolean | undefined) => {
        console.log(data);
        if (data) {
          this.isLoggedIn = true;
          this.formData.reset();
        }
      });
    }
  }

  logout() {
    this.authService.logout(); 
    this.isLoggedIn = false; 
  }
}
