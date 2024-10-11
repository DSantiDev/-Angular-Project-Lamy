import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private http: HttpClient ) { }

  registerUser ( newUser: User ): Observable< boolean|undefined > {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/register', newUser )
    .pipe( 
     map((data) => data.ok   )
      
    );
  }
  login( credenciales: User ) : Observable< string|boolean|undefined > {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/login', 
      credenciales)
      .pipe( 
      tap( ( data: Response)   => {
        if ( data.token ) {
          localStorage.setItem( 'token', data.token )           
        }
        return data;
      })
      ,map(  data => data.token  )
      ,catchError( error =>  of(false))
      
    );
  }
}
