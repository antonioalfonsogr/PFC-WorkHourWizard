import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { Credentials } from '../../models/trabajador.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  creds: Credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  login(form: NgForm) {
    console.log('form value', form.value);

    this.apiService.login(this.creds)
      .subscribe((response) => {
        this.router.navigate(['/admin']);
      });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/recuperar-contraseña']);
  }

}

