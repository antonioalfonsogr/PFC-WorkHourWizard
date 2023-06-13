import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  /**
   * Constructor de EditWorkerComponent. Se inicializan servicios y se crea el formulario de edición.
   * 
   * @param {FormBuilder} fb
   * @param {Router} router
   * @param {ApiService} apiService
   * @param {AuthService} authService
   * @param {ActivatedRoute} activatedRoute
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.editWorkerForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      dni: ['', [Validators.required, this.validadorDNI]],
      telefono: ['', [Validators.required, this.validadorTelefono]],
      cargo: ['', Validators.required],
      gestor: ['']
    });
  }

  /**
   * Se obtienen los trabajadores y se llena el formulario de edición.
   * 
   */
  ngOnInit() {
    const idTrabajador = parseInt(this.activatedRoute.snapshot.paramMap.get('idTrabajador')!, 10);
    if (!isNaN(idTrabajador)) {
      this.getWorkerById(idTrabajador);
    } else {
      this.getCurrentWorker();
    }

    this.getGestores();
  }

  /**
   * Método que recupera la lista de gestores (trabajadores con cargo de gestor) de la API.
   * 
   */
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

  /**
   * Método que recupera un trabajador por su ID.
   * 
   * @param {number} idTrabajador 
   */
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

  /**
   * Método que obtiene el trabajador actual.
   * 
   */
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

  /**
   * Método que obtiene el gestor asociado a un trabajador.
   * 
   */
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

  /**
   * Método que llena el formulario con los datos de un trabajador.
   * 
   * @param {Trabajador | null} worker
   */
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

  /**
   * Método que se activa al enviar el formulario.
   * 
   */
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

  /**
   * Método que se activa al cancelar la edición.
   * 
   */
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

  /**
   * Método que se activa al confirmar la eliminación de un trabajador.
   * 
   */
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

  /**
   * Método de validación del DNI de un trabajador.
   * 
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean } | null}
   */
  validadorDNI(control: AbstractControl): { [key: string]: boolean } | null {
    const dniFormatoValido = /^[0-9]{8}[a-zA-Z]$/;
    if (!control.value.match(dniFormatoValido)) {
      return { 'dniInvalido': true };
    }
    return null;
  }

  /**
   * Método de validación del teléfono de un trabajador.
   * 
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean } | null}
   */
  validadorTelefono(control: AbstractControl): { [key: string]: boolean } | null {
    const telefonoFormatoValido = /^[679]{1}[0-9]{8}$/;
    if (!control.value.match(telefonoFormatoValido)) {
      return { 'telefonoInvalido': true };
    }
    return null;
  }

}
