import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor( private http: HttpClient ) { }

  registerProduct(productData: any): Observable<boolean> {
    return this.http.post<{ success: boolean, msg: string }>('http://localhost:3000/api/products', productData)
      .pipe(
        tap((response) => {
          console.log('Respuesta del servidor:', response);
        }),
        map(response => response.success),
        catchError(error => {
          console.error('Error al registrar el producto:', error);
          return of(false);  
        })
      );
  }
}
