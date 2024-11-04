import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../interfaces/category';
import { ResponseCat } from '../interfaces/response';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) { }

  registerCategory(categoryData: Category): Observable<{ success: boolean, msg: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Token': token || ''
    });

    return this.http.post<{ success: boolean, msg: string }>(`${this.baseUrl}`, categoryData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error al registrar la categoría:', error);
          return of({ success: false, msg: 'Error al registrar categoría' });
        })
      );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<ResponseCat>(this.baseUrl)
      .pipe(
        map(response => {
          return response.ok && Array.isArray(response.data) ? response.data : [];
        }),
        catchError(error => {
          console.error('Error al obtener las categorías:', error);
          return of([]); 
        })
      );
}




  getCategory(categoryId: string): Observable<ResponseCat> {
    return this.http.get<ResponseCat>(`${this.baseUrl}/${categoryId}`);
  }

  editCategory(categoryId: string, categoryData: Category): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Token': token || ''
    });
    return this.http.patch(`${this.baseUrl}/${categoryId}`, categoryData, { headers });
  }

  deleteCategory(categoryId: string): Observable<ResponseCat> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'X-Token': token || ''
    });
    return this.http.delete<ResponseCat>(`${this.baseUrl}/${categoryId}`, { headers });
  }
}
