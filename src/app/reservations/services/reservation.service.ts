import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../../models/api-response.model';
import { Parameter } from '../../models/parameter.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAvailableHours(day: string, spaceId: number): Observable<string[]> {
    const params = new HttpParams()
      .set('day', day)
      .set('spaceId', spaceId.toString());

    return this.http.get<ApiResponse>(`${this.baseUrl}/GetAvailableHouser`, { params }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.message || 'Error al obtener las horas disponibles');
        }
        const reservation = response.parameters.find((param: Parameter) => param.name === 'AvailableIntervals');
        return reservation ? JSON.parse(reservation.value) : [];
      }),
      catchError((error) => {
        console.error('Error en la API:', error);
        return throwError(() => new Error(error.message || 'Error desconocido al llamar a la API'));
      })
    );
  }

  createReservation(spaceId: number, userId: number, startTime: string, endTime: string): Observable<any> {
    const body = {
      spaceId,
      userId,
      startTime,
      endTime,
      IsActive: true
    };

    return this.http.post<ApiResponse>(`${this.baseUrl}/CreateReservation`, {reservationDto : body}).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.message || 'Error al crear la reserva');
        }
        return response; // Retorna toda la respuesta
      }),
      catchError((error) => {
        console.error('Error en la API de CreateReservation:', error);
        return throwError(() => new Error(error.message || 'Error desconocido al crear la reserva'));
      })
    );
  }

  getReservationsByUserId(userId: number): Observable<any[]> {
    const params = new HttpParams().set('userId', userId.toString());

    return this.http.get<ApiResponse>(`${this.baseUrl}/GetByUserIdReservation`, { params }).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.message || 'Error al obtener las reservas del usuario');
        }
        const reservation = response.parameters.find((param: Parameter) => param.name === 'UserReservations');
        return reservation ? JSON.parse(reservation.value) : [];
      }),
      catchError((error) => {
        console.error('Error en la API de GetByUserIdReservation:', error);
        return throwError(() => new Error(error.message || 'Error desconocido al obtener las reservas del usuario'));
      })
    );
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/DeleteReservation/${id}`).pipe(
      map((response) => {
        if (!response.success) {
          throw new Error(response.message || 'Error al eliminar la reserva');
        }
      }),
      catchError((error) => {
        console.error('Error en la API de DeleteReservation:', error);
        return throwError(() => new Error(error.message || 'Error desconocido al eliminar la reserva'));
      })
    );
  }
}
