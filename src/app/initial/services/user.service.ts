import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData!: User; // Variable para almacenar los datos del usuario

  // Método para establecer los datos del usuario
  setUser(data: User): void {
    this.userData = data;
  }

  // Método para obtener los datos del usuario
  getUser(): User {
    return this.userData;
  }
}
