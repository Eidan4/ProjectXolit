import { provideRouter, Routes } from '@angular/router';
import { ReservationsMainComponent } from './reservations/components/reservations-main/reservations-main.component';
import { MainComponent } from './principal/components/main/main.component';
import { LoginComponent } from './initial/components/login/login.component';

export const routes: Routes = [
  {
    path: 'reservations',
    component: ReservationsMainComponent,
  },
  { path: '',
    component: LoginComponent
  },
  { path: 'login',
    component: LoginComponent
  },
];

export const appConfig = [
  provideRouter(routes),
];
