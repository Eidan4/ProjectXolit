import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  imports: [CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
  standalone: true,
})
export class ReservationListComponent implements OnChanges {
  @Input() userId: number | undefined; // Recibe el User ID

  reservations: any[] = [];
  errorMessage: string | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.loadReservations();
    }
  }

  loadReservations(): void {
    if (this.userId) {
      this.reservationService.getReservationsByUserId(this.userId).subscribe(
        (reservations) => {
          this.reservations = reservations;
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage = error.message;
          this.reservations = [];
        }
      );
    }
  }

  deleteReservation(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.reservationService.deleteReservation(id).subscribe(
        () => {
          console.log('Reserva eliminada con éxito');
          this.loadReservations(); // Recargar la lista después de eliminar
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }
}
