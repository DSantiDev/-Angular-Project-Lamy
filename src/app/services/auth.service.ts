import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUserData!: User; 

  constructor( private http: HttpClient ) { }

  get authUser(){
    return{...this.authUserData}
  }

  registerUser(newUser: User): Observable<boolean> {
  return this.http.post<Response>('http://localhost:3000/api/auth/register', newUser)
    .pipe(
      map((data) => {
        return data.ok
      }) 
    );
}

 editUser(editUser: User): Observable< boolean | string > {
  return this.http.post<Response>('http://localhost:3000/api/auth/edit', editUser)
    .pipe(
      map((data) => {
        return data.ok
      }),
      catchError( error =>  {
        return of ('error')
      })
    );
}
  
  login( credenciales: User ) : Observable< string|boolean|undefined > {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/login', 
      credenciales)
      .pipe( 
      tap( ( data: Response)   => {
        if ( data.token ) {
          localStorage.setItem( 'token', data.token );
          this.authUserData = data.data!;

        }
        return data;
        
      })
      ,map(  (data) => {
        if(!data.ok){
          return data.msg
        }
        return 'Se logeo correctamente'
      } )
      ,catchError( error =>  {
        return of ('error en el servidor')
      })
      
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }
  logout(): void {
    localStorage.removeItem('token'); 
  }
}
