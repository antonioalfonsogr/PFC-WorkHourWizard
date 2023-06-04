import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trabajador } from 'src/app/models/trabajador.model';
import { Cargo } from 'src/app/models/cargo.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  workerList: Trabajador[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('AdminComponent.onInit()');
    this.getWorkerList();
  }

  getWorkerList() {
    const endpoint = 'http://localhost:8080/api/trabajador'; 
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqdWFuQGV4YW1wbGUuY29tIiwiZXhwIjoxNjg4MDg1NDQ0LCJkbmkiOiIxMjM0NTY3OCJ9.SdZC6mfORlhxIv-kr20iWh1K3DZKG3X6HMUE-5ZtID0'; // Reemplaza con tu token de autenticación

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log(headers);

    this.http.get<Trabajador[]>(endpoint, { headers }).subscribe(
      (data) => {
        this.workerList = data;
      },
      (error) => {
        console.error('Error al obtener la lista de trabajadores:', error);
      }
    );
  }
}


