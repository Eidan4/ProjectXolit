import { Component } from '@angular/core';
import { HeaderComponent } from '../../../principal/components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InitialService } from '../../services/initial.service';
import { ModalInfoComponent } from '../../../shared/modal-info/modal-info.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isRightPanelActive = false;
  signUpForm: FormGroup;
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private initialService: InitialService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog // Servicio MatDialog para abrir modales
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  activateSignUp() {
    this.isRightPanelActive = true;
  }

  activateSignIn() {
    this.isRightPanelActive = false;
  }

  // Método para mostrar el modal
  openModal(title: string, message: string): void {
    this.dialog.open(ModalInfoComponent, {
      data: { title, message },
      width: '400px'
    });
  }

  onSignUpSubmit() {
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;

      this.initialService.createUser(name, email, password).subscribe({
        next: (response) => {
          this.userService.setUser(response);
          this.openModal('Registro Exitoso', 'El usuario ha sido creado con éxito.');
          setTimeout(() => {
            this.router.navigate(['/reservations']);
          }, 1000); // Espera 2 segundos antes de redirigir
        },
        error: (err) => {
          this.openModal('Error', 'Hubo un problema al crear el usuario. Intenta nuevamente.');
        }
      });
    } else {
      this.openModal('Formulario Inválido', 'Por favor completa correctamente todos los campos.');
    }
  }

  onSignInSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      this.initialService.login(email, password).subscribe({
        next: (response) => {
          this.userService.setUser(response);
          this.openModal('Inicio de Sesión Exitoso', 'Bienvenido de nuevo. Redirigiendo...');
          setTimeout(() => {
            this.router.navigate(['/reservations']);
          }, 1000); // Espera 2 segundos antes de redirigir
        },
        error: (err) => {
          this.openModal('Error', 'Hubo un problema al iniciar sesión. Intenta nuevamente.');
        }
      });
    } else {
      this.openModal('Formulario Inválido', 'Por favor completa correctamente todos los campos.');
    }
  }
}
