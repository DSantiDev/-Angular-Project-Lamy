import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData!: FormGroup;
  showPassword: boolean = false; 
  showConfirmPassword: boolean = false;  
  passwordMismatch: boolean = false;  

  constructor(private authService: AuthService) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required]),  // Añadimos confirmación de contraseña
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required])
    });
  }

  validatePasswords() {
    const registerPassword = this.formData.get('password')?.value;
    const confirmPassword = this.formData.get('confirmPassword')?.value;
    this.passwordMismatch = registerPassword !== confirmPassword;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleSubmit() {
    this.validatePasswords();
    if (this.formData.valid && !this.passwordMismatch) {
      console.log(this.formData.value);
      this.authService.registerUser(this.formData.value).subscribe(data => {
        console.log(data);
      });
      this.formData.reset();
    }
  }
}
