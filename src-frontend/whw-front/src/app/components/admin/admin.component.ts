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
  cargo: any;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    console.log('AdminComponent.onInit()');
    this.getCargo();
    this.isAdmin = this.cargo === 'ADMIN';
    console.log("El cargo es: " + this.cargo);
    if(this.isAdmin) {
      this.getWorkerList();
    }
  }

  getWorkerList() {
    this.apiService.getTrabajadores().subscribe(
      (data) => {
        this.workerList = data;
      },
      (error) => {
        console.error('Error al obtener la lista de trabajadores:', error);
      }
    );
  }

  getCargo() {
    this.cargo = this.authService.getCargo();
  }
}




