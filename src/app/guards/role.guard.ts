import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';


export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.verifyAuthUser()
  .pipe(
    tap((value) => {
      console.log(value)
      if (!value) {
        router.navigateByUrl('home')
      }
      
    }),
    map((value) => {
      return value  
    })
  );

};