import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Response } from '../interfaces/response';

interface User { name: string, lastname: string,  username: string, phone: number, address:string,  password: string, role: string}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor( private http: HttpClient ) { }

  registerUser ( newUser: User ) {
    return this.http.post( 'http://localhost:3000/api/auth/register', newUser );
  }
  login( credenciales: User ) : Observable< Response > {
    return this.http.post<Response>( 'http://localhost:3000/api/auth/login', credenciales );
  }
}
