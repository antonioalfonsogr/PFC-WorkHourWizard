import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Trabajador } from '../../models/trabajador.model';

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss']
})
export class EditWorkerComponent implements OnInit {
  editWorkerForm: FormGroup;
  gestores: Trabajador[] = [];
  worker: Trabajador | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.editWorkerForm = this.fb.group({
      nombre: ['', ],
      apellido: ['', ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', ],
      dni: ['', Validators.required],
      telefono: ['', ],
      cargo: ['', Validators.required],
      gestor: ['']
    });
  }

  ngOnInit() {
    this.getGestores();
    this.getCurrentWorker();
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

  getCurrentWorker() {
    const email = this.authService.getEmail();
    console.log('Email obtenido:', email);
    if (email) {
      this.apiService.getTrabajadorByEmail(email).subscribe(
        (worker) => {
          this.worker = worker;
          console.log('Trabajador obtenido:', this.worker);
          if (this.worker && this.worker.gestor) {
            console.log('Intentando obtener gestor para trabajador:', this.worker);
            this.getGestorForWorker();
          } else {
            console.log('Trabajador sin gestor, llenando formulario directamente');
            this.fillForm(this.worker);
          }
        },
        (error) => {
          console.error('Error al obtener trabajador actual:', error);
        }
      );
    }
  }
  
  getGestorForWorker() {
 if (this.worker){
      this.apiService.getGestor(this.worker).subscribe(
        (gestor) => {
          console.log('Gestor obtenido:', gestor);
          if(this.worker){          
            this.worker.gestor = gestor ? gestor : null;
            this.fillForm(this.worker);}
        },
        (error) => {
          console.error('Error al obtener el gestor del trabajador:', error);
        }
      );
    } else {
      console.log('Trabajador sin gestor, llenando formulario directamente');
      if(this.worker)
      this.fillForm(this.worker);
    }
  }
  

  fillForm(worker: Trabajador) {
    this.editWorkerForm.patchValue({
      nombre: worker.nombre,
      apellido: worker.apellido,
      email: worker.email,
      password: '',
      dni: worker.dni,
      telefono: worker.telefono,
      cargo: worker.cargo,
      gestor: worker.gestor ? worker.gestor : ''
    });
}


  onSubmit() {
    if (this.editWorkerForm.valid) {
      let formValue = this.editWorkerForm.value;
      if (this.worker) {
        formValue = {...this.worker, ...formValue};

        // Comprueba si 'gestor' es una cadena vacía y, en caso afirmativo, establece a null
        if (formValue.gestor === '') {
          formValue.gestor = null;
        }

        this.apiService.updateTrabajador(formValue)
          .subscribe(
            response => {
              console.log(response);
              this.router.navigate(['']);
            },
            error => {
              console.error(error);
            }
          );
      }
    }
  }

  onCancel() {
    this.router.navigate(['']);
  }
}

