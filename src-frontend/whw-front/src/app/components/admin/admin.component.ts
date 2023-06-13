import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  workerList: Trabajador[] = [];
  cargo: string | null = null;
  isAdmin: boolean = false;

  /**
   * Constructor del componente AdminComponent.
   * 
   * @param apiService Servicio de la API.
   * @param authService Servicio de autenticación.
   */
  constructor(private apiService: ApiService, private authService: AuthService) { }

  /**
   * Se obtiene el cargo del usuario y, si es administrador, se obtiene la lista de trabajadores.
   * 
   */
  ngOnInit() {
    this.getCargo();
    this.isAdmin = this.cargo === 'ADMIN';
    if (this.isAdmin) {
      this.getWorkerList();
    }
  }

  /**
   * Obtiene la lista de trabajadores del servicio de la API.
   * 
   */
  getWorkerList() {
    this.apiService.getTrabajadores().subscribe(
      (data) => {
        this.workerList = data;
        this.getGestores();
      },
      (error) => {
        console.error('Error al obtener la lista de trabajadores:', error);
      }
    );
  }

  /**
   * Obtiene el gestor para cada trabajador de la lista de trabajadores.
   * 
   */
  getGestores() {
    for (let worker of this.workerList) {
      this.apiService.getGestor(worker).subscribe(
        (gestor) => {
          worker.gestor = gestor;
        },
        (error) => {
          console.error(`Error al obtener el gestor del trabajador ${worker.nombre}:`, error);
        }
      );
    }
  }

  /**
   * Obtiene el cargo del usuario autenticado.
   * 
   */
  getCargo() {
    this.cargo = this.authService.getCargo();
  }
}
