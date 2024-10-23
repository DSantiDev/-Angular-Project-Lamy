import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  suscription!: Subscription;
  formData!: FormGroup;
  isLoggedIn: boolean = false
  showLoginPassword: boolean = false; 
  message: string|undefined|boolean;

  constructor(private authService: AuthService, private router: Router) {


    this.formData = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });

    this.isLoggedIn = this.authService.isLoggedIn(); 
  }

  get userData(): User | null {
    return this.authService.userData;  
  }

  toggleLoginPassword() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  handleSubmit() {
      this.suscription = this.authService.login( this.formData.value ).subscribe( ( data ) => {
        if ( typeof data === 'string' ) {
          this.message = data;
        } else {
          this.message = 'Ingresando al sistema...';
        }

        setTimeout( () => {
          this.message = '';
        }, 3000 );

      });

      this.formData.reset();
    }

    

    logout() {
      this.authService.logoutUser().subscribe( data => {
        this.router.navigateByUrl( 'home' );
      } );
    }
    ngOnDestroy(){
      if (this.suscription) {
        this.suscription.unsubscribe()
      }
     }
}
