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
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', Validators.required)
  });

  resetPasswordClicked = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  login() {
    console.log('form value', this.form.value);
    this.authService.login(this.form.value as Credentials).subscribe(() => {
      const userCargo = this.authService.getCargo();
      if (userCargo === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (userCargo === 'GESTOR') {
        this.router.navigate(['/gestor-calendar']);
      } else {
        this.router.navigate(['/calendar']);
      }
    });
  }
  

  toggleResetPassword() {
    this.resetPasswordClicked = !this.resetPasswordClicked;
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const confirmed = window.confirm('¿Está seguro de que desea cambiar su contraseña?');
      if (confirmed) {
        const email = this.resetPasswordForm.value.email;
        const newPassword = this.resetPasswordForm.value.newPassword;
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

  cancelResetPassword() {
    this.resetPasswordClicked = false;
  }
}









