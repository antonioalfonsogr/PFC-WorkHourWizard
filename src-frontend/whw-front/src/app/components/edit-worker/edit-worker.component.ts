import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  location: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.editWorkerForm = this.fb.group({
      nombre: ['',],
      apellido: ['',],
      email: ['', [Validators.required, Validators.email]],
      password: ['',],
      dni: ['', Validators.required],
      telefono: ['',],
      cargo: ['', Validators.required],
      gestor: ['']
    });
  }

  ngOnInit() {
    const idTrabajador = parseInt(this.activatedRoute.snapshot.paramMap.get('idTrabajador')!, 10);
    if (!isNaN(idTrabajador)) {
      this.getWorkerById(idTrabajador);
    } else {
      this.getCurrentWorker();
    }
  
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

  getWorkerById(idTrabajador: number) {
    this.apiService.getTrabajadorById(idTrabajador).subscribe(
      (worker) => {
        this.worker = worker;
        this.getGestorForWorker();
        this.fillForm(this.worker);
      },
      (error) => {
        console.error('Error al obtener trabajador por ID:', error);
      }
    );
  }

  getCurrentWorker() {
    const email = this.authService.getEmail();
    if (email) {
      this.apiService.getTrabajadorByEmail(email).subscribe(
        (worker) => {
          this.worker = worker;
          if (this.worker) {
            this.getGestorForWorker();
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
    if (this.worker) {
      this.apiService.getGestor(this.worker).subscribe(
        (gestor) => {
          if (gestor) {
            this.worker!.gestor = gestor;
            this.fillForm(this.worker!);
          } else {
            this.fillForm(this.worker!);
          }
        },
        (error) => {
          console.error('Error al obtener el gestor del trabajador:', error);
        }
      );
    } else {
      this.fillForm(null);
    }
  }

  fillForm(worker: Trabajador | null) {
    if (worker) {
      const gestorSeleccionado = this.gestores.find(gestor => gestor.idTrabajador === worker.gestor?.idTrabajador);
      this.editWorkerForm.patchValue({
        nombre: worker.nombre,
        apellido: worker.apellido,
        email: worker.email,
        password: '',
        dni: worker.dni,
        telefono: worker.telefono,
        cargo: worker.cargo,
        gestor: gestorSeleccionado
      });
    }
  }

  onSubmit() {
    if (this.editWorkerForm.valid && this.worker) {
      let formValue = this.editWorkerForm.value;
      formValue = { ...this.worker, ...formValue };

      if (formValue.gestor === '') {
        formValue.gestor = null;
      }

      this.apiService.updateTrabajador(formValue)
        .subscribe(
          response => {
            console.log(response);
            const userCargo = this.authService.getCargo();
            switch (userCargo) {
              case 'ADMIN':
                this.router.navigate(['/admin']);
                break;
              case 'GESTOR':
                this.router.navigate(['/gestor-calendar']);
                break;
              case 'OPERARIO':
              case 'SUPERVISOR':
                this.router.navigate(['/calendar']);
                break;
              default:
                this.router.navigate(['/']);
                break;
            }
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  onCancel() {
    const userCargo = this.authService.getCargo();
    switch (userCargo) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'GESTOR':
        this.router.navigate(['/gestor-calendar']);
        break;
      case 'OPERARIO':
      case 'SUPERVISOR':
        this.router.navigate(['/calendar']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  confirmDelete() {
    const confirmationMessage = '¿Está seguro de eliminar al usuario ' + this.worker?.email + '?';

    if (window.confirm(confirmationMessage) && this.worker) {
      this.apiService.deleteTrabajador(this.worker.idTrabajador).subscribe(
        () => {
          console.log('Trabajador eliminado con éxito');
          const userCargo = this.authService.getCargo();
          switch (userCargo) {
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
            case 'GESTOR':
              this.router.navigate(['/gestor-calendar']);
              break;
            case 'OPERARIO':
            case 'SUPERVISOR':
              this.router.navigate(['/calendar']);
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
        },
        error => {
          console.error('Error al eliminar el trabajador:', error);
        }
      );
    }
  }
}

