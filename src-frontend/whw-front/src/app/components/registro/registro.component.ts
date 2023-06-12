import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Trabajador } from '../../models/trabajador.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  gestores: Trabajador[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.registroForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      dni: ['', [Validators.required, this.validadorDNI]],
      telefono: ['', [Validators.required, this.validadorTelefono]],
      cargo: ['', Validators.required],
      gestor: ['']
    });
  }

  ngOnInit() {
    this.getGestores();
  }

  getGestores() {
    this.apiService.getTrabajadores().subscribe(
      (data) => {
        this.gestores = data.filter(trabajador => trabajador.cargo === 'GESTOR');
      },
      (error) => {
        console.error('Error al obtener la lista de trabajadores:', error);
      }
    );
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formValue = this.registroForm.value;

      if (formValue.gestor === '') {
        formValue.gestor = null;
      }

      this.apiService.registerTrabajador(formValue).subscribe(
        () => {
          console.log('Registro exitoso');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar trabajador:', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

  validadorDNI(control: AbstractControl): {[key: string]: boolean} | null {
    const dniFormatoValido = /^[0-9]{8}[a-zA-Z]$/;
    if (!control.value.match(dniFormatoValido)) {
      return { 'dniInvalido': true };
    }
    return null;
  }
  
  validadorTelefono(control: AbstractControl): {[key: string]: boolean} | null {
    const telefonoFormatoValido = /^[679]{1}[0-9]{8}$/;
    if (!control.value.match(telefonoFormatoValido)) {
      return { 'telefonoInvalido': true };
    }
    return null;
  }
  
}


