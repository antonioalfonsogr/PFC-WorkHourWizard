import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private apiService: ApiService) {}

  login() {
    console.log('form value', this.form.value);
    this.apiService.login(this.form.value as Credentials).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/recuperar-contraseña']);
  }
}


