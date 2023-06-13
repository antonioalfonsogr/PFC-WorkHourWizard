import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Credentials } from '../../models/trabajador.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  resetPasswordForm: FormGroup;
  resetPasswordClicked = false;
  errorMessage: string = '';

  /**
    * Constructor de LoginComponent. Se inicializan servicios y se crea el formulario de inicio de sesión.
    * 
    * @param router 
    * @param authService 
    * @param apiService 
    */
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', Validators.required)
    });
  }

  /**
   * Método para iniciar sesión
   * 
   */
  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value as Credentials).subscribe(() => {
        const userCargo = this.authService.getCargo();
        if (userCargo === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (userCargo === 'GESTOR') {
          this.router.navigate(['/gestor-calendar']);
        } else {
          this.router.navigate(['/calendar']);
        }
      },
        error => {
          this.errorMessage = 'Ha ocurrido un error al iniciar sesión. Por favor, intentelo de nuevo.';
        });
    }
  }

  /**
   * Alternar visibilidad de formulario de cambio de contraseña
   * 
   */
  toggleResetPassword() {
    this.resetPasswordClicked = !this.resetPasswordClicked;
  }

  /**
   * Método para restablecer la contraseña
   * 
   */
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const confirmed = window.confirm('¿Está seguro de que desea cambiar su contraseña?');
      if (confirmed) {
        const email = this.resetPasswordForm.value.email;
        const newPassword = this.resetPasswordForm.value.newPassword;
        // Actualizando la contraseña del trabajador en la base de datos
        this.apiService.getTrabajadorByEmail(email).subscribe((trabajador) => {
          if (trabajador) {
            trabajador.password = newPassword;
            this.apiService.updateTrabajador(trabajador).subscribe(() => {
              alert('¡Contraseña actualizada correctamente!');
              this.resetPasswordClicked = false;
            });
          } else {
            alert('No se encontró ningún trabajador con el email proporcionado.');
          }
        });
      }
    }
  }

  /**
   * Cancelar cambio de contraseña
   * 
   */
  cancelResetPassword() {
    this.resetPasswordClicked = false;
  }
}
