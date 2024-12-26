import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InitialService {
  private baseUrl = environment.apiUserUrl;

  constructor(private http: HttpClient) {}

  // Método para login
  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<any>(`${this.baseUrl}/Login`, {userLoginDto:body}).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.message || 'Error al iniciar sesión');
        }
        // Extraer y parsear el usuario del parámetro "User"
        const userParameter = response.parameters.find((param: any) => param.name === 'User');
        if (!userParameter) {
          throw new Error('Datos de usuario no encontrados en la respuesta');
        }
        const user = JSON.parse(userParameter.value);
        return user; // Retorna el usuario parseado
      }),
      catchError((error) => {
        console.error('Error en la API de Login:', error);
        return throwError(() => new Error(error.message || 'Error desconocido al iniciar sesión'));
      })
    );
  }

  // Método para crear un usuario
  createUser(name: string, email: string, password: string): Observable<any> {
    let body = { name, email, password, role: 'user' };
    return this.http.post<any>(`${this.baseUrl}/CreateUser`, {userDto:body}).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.message || 'Error al crear el usuario');
        }
        // Retorna el usuario creado o algún mensaje de éxito
        const userParameter = response.parameters.find((param: any) => param.name === 'CreatedUser');
        if (!userParameter) {
          throw new Error('Datos de usuario no encontrados en la respuesta');
        }
        const user = JSON.parse(userParameter.value);
        return user; // Retorna el usuario parseado
      }),
      catchError((error) => {
        console.error('Error en la API de CreateUser:', error);
        return throwError(() => new Error(error.message || 'Error desconocido al crear el usuario'));
      })
    );
  }
}
