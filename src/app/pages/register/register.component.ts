import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData!: FormGroup;
  showPassword: boolean = false; 
  showConfirmPassword: boolean = false;  
  passwordMismatch: boolean = false;  
  emailAlreadyRegistered: boolean = false;
  showModal: boolean = false;  // Controlar la visibilidad del modal

  constructor(private authService: AuthService, private router: Router) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required]),
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
        this.authService.registerUser(this.formData.value).subscribe({
            next: (data) => {
                this.showModal = true;  
                this.emailAlreadyRegistered = false; // Resetea el estado al éxito
                this.formData.reset(); // Mueve esta línea aquí
            },
            error: (err) => {
                if (err.status === 409) { // Suponiendo que el servidor envía un status 409 para el correo existente
                    this.emailAlreadyRegistered = true; // Indica que el correo ya está registrado
                    this.formData.get('username')?.setErrors({ emailTaken: true }); // Marcamos el error en el formControl
                } else {
                    console.error('Error al registrar:', err); // Manejo de otros errores
                }
            }
        });
    }
}


  closeModal() {
    this.showModal = false;
  }

  redirectToHome() {
    this.closeModal();
    this.router.navigate(['/home']);  
  }
}
