import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      cargo: ['', Validators.required],
      gestor: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registroForm.valid) {
      this.apiService.registerTrabajador(this.registroForm.value)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/login']);
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}

