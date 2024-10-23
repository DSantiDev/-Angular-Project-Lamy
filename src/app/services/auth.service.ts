import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUserData: User | null = null; 

  constructor( private http: HttpClient ) { }

  get userData(): User | null {
    const storedData = localStorage.getItem('authUserData');
    return this._authUserData || ( storedData && storedData !== 'undefined' ? JSON.parse(storedData) : null);
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
        if( data.token ) {
          if( data.data ) {
            console.log('Datos del usuario a guardar:', data.data); 
            this._authUserData = data.data;  
            localStorage.setItem( 'authUserData', JSON.stringify(data.data)); 
          }
          localStorage.setItem( 'token', data.token );
        }
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
  verifyAuthUser():Observable<boolean>{
    const token = localStorage.getItem('token')||'';
    const headers = new HttpHeaders().set('X-Token',token)
    return this.http.get<Response>('http://localhost:3000/api/auth/re-new-token',{headers})
    .pipe(
      tap((data) => {
        if (data.token) {
          localStorage.setItem('token',data.token)
        }
        else{
          localStorage.removeItem('token')
        }
      }),     
      map((data) => {
        return data.ok
      }),
      catchError((error) => {
        return of (false)
      })
    )
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }
  logoutUser(): Observable<boolean> {
    if( this._authUserData ) {
      this._authUserData = null;                  // Elimina datos del usuario autenticado en el Servicio
      localStorage.removeItem( 'token' );         // Elimina token del LocalStorage
      localStorage.removeItem( 'authUserData' );  // Elimina datos del usuario autenticado en el LocalStorage
    }
    return of( true );
  }
}
