import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Subcategory } from '../interfaces/subcategory';
import { ResponseSub } from '../interfaces/response';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private baseUrl = 'http://localhost:3000/api/subcategories'; // URL base para la API de subcategorías

  constructor(private http: HttpClient) {}

  registerSubcategory(subcategoryData: Subcategory): Observable<{ success: boolean; msg: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Token': token ? token : ''
    });

    return this.http.post<{ success: boolean; msg: string }>(this.baseUrl, subcategoryData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al registrar la subcategoría:', error);
          return of({ success: false, msg: 'Error al registrar subcategoría' });
        })
      );
  }

  getAllSubCategories(): Observable<Subcategory[] | undefined | any > {
    return this.http.get<ResponseSub>(this.baseUrl)
      .pipe(
        map(response => {
          if (response.ok && response.data) {
            return response.data; 
          } else {
            console.error('La respuesta no es correcta:', response);
            return [];
          }
        }),
        catchError(error => {
          console.error('Error al obtener las subcategorías:', error);
          return of([]);  
        })
      );
  }

  getSubCategory(subcategoryId: string): Observable<ResponseSub> {
    return this.http.get<ResponseSub>(`${this.baseUrl}/${subcategoryId}`);
  }

  editSubcategory(subcategoryId: string, subcategoryData: Subcategory): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Token': token ? token : ''
    });
    return this.http.patch(`${this.baseUrl}/${subcategoryId}`, subcategoryData, { headers });
  }

  deleteSubcategory(subcategoryId: string): Observable<ResponseSub> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Token': token ? token : ''
    });
    return this.http.delete<ResponseSub>(`${this.baseUrl}/${subcategoryId}`, { headers });
  }
}

