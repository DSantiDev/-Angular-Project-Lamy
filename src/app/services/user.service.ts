import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap, of, map, catchError } from 'rxjs';
import { Product } from '../interfaces/product';
import { ResponsePro } from '../interfaces/response';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


    getAllUser(): Observable<User[]> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.get<{ ok: boolean, data: User[] }>('http://localhost:3000/api/users/', { headers })
            .pipe(
                map(response => {
                    if (response.ok) {
                        return response.data; 
                    } else {
                        console.error('La respuesta no es correcta:', response);
                        return [];
                    }
                }),
                catchError(error => {
                    console.error('Error al obtener los usuarios:', error);
                    return of([]);  
                })
            );
    }

    getUser(userId: string): Observable<Response> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
    return this.http.get<Response>(`http://localhost:3000/api/users/${userId}`, { headers });
    }
    
    getUserById(userId: string): Observable<Response> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.get<Response>(`http://localhost:3000/api/users/${userId}`, { headers });
    }

    editUser(userId: string, userData: User): Observable<any> { 
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.patch(`http://localhost:3000/api/users/${userId}`, userData, { headers });
    }
    deleteUser(userId: string): Observable<ResponsePro> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'X-Token': token ? token : '',
        });
        return this.http.delete<ResponsePro>(`http://localhost:3000/api/users/${userId}`, { headers }); 
      }
    
}   