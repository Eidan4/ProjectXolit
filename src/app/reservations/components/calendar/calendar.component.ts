import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Output, EventEmitter, PLATFORM_ID } from '@angular/core'; // Importa EventEmitter de @angular/core
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>(); // Usar EventEmitter de Angular
  selected: Date | null = new Date(); // Fecha inicial predeterminada
  isClient = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isClient = isPlatformBrowser(this.platformId);
  }

  onDateChange(date: Date): void {
    this.selected = date;
    this.dateSelected.emit(date); // Emitir la fecha seleccionada al padre
  }
}
