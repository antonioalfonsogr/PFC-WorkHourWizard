import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>('http://localhost:8080/api/trabajador');
  }

  registerTrabajador(newWorker: Trabajador): Observable<Trabajador> {
    return this.http.post<Trabajador>('http://localhost:8080/api/trabajador', newWorker);
  }

  updateTrabajador(trabajador: Trabajador): Observable<Trabajador> {
    const url = `http://localhost:8080/api/trabajador/${trabajador.idTrabajador}`;
    return this.http.put<Trabajador>(url, trabajador);
  }

  getTrabajadorByEmail(email: string): Observable<Trabajador> {
    const url = `http://localhost:8080/api/trabajador/email/${email}`;
    return this.http.get<Trabajador>(url);
  }
}







