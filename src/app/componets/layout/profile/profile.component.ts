import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { Response } from '../../../interfaces/response';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  formData!: FormGroup;
  subscription!: Subscription;
  showPassword = false; 
  showActualPassword = false; 
  showConfirmPassword = false;  
  passwordMismatch = false;  
  emailAlreadyRegistered = false;
  showModal = false; 
  userData!: User;
  userId  !: string; 
  


  constructor(
    private authService: AuthService, 
    private router: Router,
    private userService: UserService ,
    
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl({ value: '', disabled: true }),
      actualPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', []),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadUserData();
}

  
loadUserData(): void {
  const userData = localStorage.getItem('authUserData');
  if (userData) {
    const user = JSON.parse(userData);
    const userId = user._id; 
    this.userService.getUserById(userId).subscribe({
      next: (response: Response) => {
        if (response.data) {  
          this.formData.patchValue(response.data); 
        } else {
          console.error('No se encontraron datos del usuario en la respuesta');
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    });
  } else {
    console.error('No se encontró authUserData en localStorage');
  }
}



  validatePasswords() {
    const registerPassword = this.formData.get('password')  ?.value;
    const confirmPassword = this.formData.get('confirmPassword')?.value;
    this.passwordMismatch = registerPassword !== confirmPassword;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleActualPassword() {
    this.showActualPassword = !this.showActualPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleSubmit() {
    this.validatePasswords();
    if (this.formData.valid && !this.passwordMismatch) {
      const userId = JSON.parse(localStorage.getItem('authUserData') || '{}')._id; 
      const userData: User = {
        ...this.formData.value,
        _id: userId 
      };

      this.userService.editUser(userId, userData).subscribe({
        next: (data: Response) => { 
          this.showModal = true;  
          this.emailAlreadyRegistered = false; 
          this.formData.reset(); 
        },
        error: (err) => {
          if (err.status === 409) { 
            this.emailAlreadyRegistered = true; 
            this.formData.get('username')?.setErrors({ emailTaken: true }); 
          } else {
            console.error('Error al editar:', err); 
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
