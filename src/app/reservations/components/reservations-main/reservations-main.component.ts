import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar el Router para navegación
import { UserService } from '../../../initial/services/user.service';
import { HeaderComponent } from '../../../principal/components/header/header.component';

@Component({
  selector: 'app-reservations-main',
  imports: [
    CalendarComponent,
    ReservationFormComponent,
    ReservationListComponent,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './reservations-main.component.html',
  styleUrls: ['./reservations-main.component.scss'], // Cambiado de styleUrl a styleUrls
  standalone: true,
})
export class ReservationsMainComponent implements OnInit {
  // Fecha inicial predeterminada
  selectedDate: Date = new Date();

  // ID del espacio inicial predeterminado
  spaceId: number = 1;

  // Datos del usuario y su ID
  userData: any;
  userId: number | undefined;

  constructor(private userService: UserService, private router: Router) {}

  onDateSelected(date: Date): void {
    this.selectedDate = date; // Actualiza la fecha seleccionada
    console.log('Fecha seleccionada desde el calendario:', date);
  }

  ngOnInit(): void {
    // Obtener los datos del usuario al inicializar el componente
    this.userData = this.userService.getUser();

    if (!this.userData) {
      this.router.navigate(['/login']); // Redirige al login si no hay datos del usuario
    } else {
      console.log('Datos del usuario:', this.userData);

      // Extraer y guardar el ID del usuario
      this.userId = this.userData?.id || this.userData?.Id; // Dependiendo de cómo venga el dato
      console.log('ID del usuario:', this.userId);
    }
  }
}
