import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { log } from 'console';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  imports: [CommonModule, HttpClientModule], // Agregar HttpClientModule aquí
  standalone: true,
})
export class ReservationFormComponent implements OnChanges {
  @Input() selectedDate: Date = new Date(); // Recibe la fecha seleccionada
  @Input() spaceId: number = 1; // Recibe el Space ID
  @Input() userId: number | undefined; // Recibe el User ID
  @Output() reservationCreated = new EventEmitter<void>();

  availableHours: string[] = [];
  selectedHour: string | null = null;
  errorMessage: string | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] || changes['spaceId']) {
      this.loadAvailableHours();
    }
  }

  loadAvailableHours(): void {
    const formattedDate = this.formatDate(this.selectedDate);
    this.reservationService.getAvailableHours(formattedDate, this.spaceId).subscribe(
      (hours) => {
        this.availableHours = hours;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = error.message;
        this.availableHours = [];
      }
    );
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  selectHour(hour: string): void {
    if (!this.userId) {
      this.errorMessage = 'El usuario no está identificado. No se puede crear la reserva.';
      return;
    }

    const [hourStart, hourEnd] = hour.split(' - ');
    const startTime = this.combineDateAndTime(this.selectedDate, hourStart);
    const endTime = this.combineDateAndTime(this.selectedDate, hourEnd);

    this.reservationService.createReservation(this.spaceId, this.userId, startTime, endTime).subscribe(
      () => {
        this.selectedHour = hour;
        this.loadAvailableHours();
        this.reservationCreated.emit();
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  combineDateAndTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    const hour = newDate.getHours().toString().padStart(2, '0');
    const minute = newDate.getMinutes().toString().padStart(2, '0');
    const second = newDate.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }
}
