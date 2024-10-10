import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Response } from '../interfaces/response';
import { Token } from '@angular/compiler';

interface User { name: string, lastname: string,  username: string, phone: number, address:string,  password: string, role: string}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private http: HttpClient ) { }

  registerUser ( newUser: User ) {
    return this.http.post( 'http://localhost:3000/api/auth/register', newUser );
  }
  login( credenciales: User ) : Observable< any > {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/login', 
      credenciales)
      .pipe( 
      tap( ( data )   => {
        console.log(data);
        if ( data.token ) {
          localStorage.setItem( 'token', data.token )           
        }
        return data;
      })
      ,map(  data => data.msg  )
      ,catchError( error =>  of(false))
      
    );
  }
}
