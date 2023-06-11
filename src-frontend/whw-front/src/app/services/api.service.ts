import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trabajador } from '../models/trabajador.model';
import { RangoHorario } from '../models/rangohorario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Se produjo un error:', error);
    return throwError(error);
  }

  private getUrl(endpoint: string, id?: number | string): string {
    const url = `${this.baseUrl}/${endpoint}`;
    return id ? `${url}/${id}` : url;
  }

  getTrabajadores(): Observable<Trabajador[]> {
    const url = this.getUrl('trabajador');
    return this.http.get<Trabajador[]>(url).pipe(catchError(this.handleError));
  }

  registerTrabajador(newWorker: Trabajador): Observable<Trabajador> {
    const url = this.getUrl('trabajador');
    return this.http.post<Trabajador>(url, newWorker).pipe(catchError(this.handleError));
  }

  updateTrabajador(trabajador: Trabajador): Observable<Trabajador> {
    const url = this.getUrl('trabajador', trabajador.idTrabajador);
    return this.http.put<Trabajador>(url, trabajador).pipe(catchError(this.handleError));
  }

  getTrabajadorByEmail(email: string): Observable<Trabajador> {
    const url = this.getUrl('trabajador/email', email);
    return this.http.get<Trabajador>(url).pipe(catchError(this.handleError));
  }

  getTrabajadorById(idTrabajador: number): Observable<Trabajador> {
    const url = this.getUrl('trabajador', idTrabajador);
    return this.http.get<Trabajador>(url).pipe(catchError(this.handleError));
  }

  getGestor(trabajador: Trabajador): Observable<Trabajador> {
    const url = this.getUrl('trabajador', `${trabajador.idTrabajador}/gestor`);
    return this.http.get<Trabajador>(url).pipe(catchError(this.handleError));
  }

  insertarRangoHorario(idTrabajador: number, rangoHorario: RangoHorario): Observable<RangoHorario> {
    const url = this.getUrl('trabajador', `${idTrabajador}/rangohorario`);
    const rangoHorarioToSend: RangoHorario = {
      ...rangoHorario,
      fechaHoraInicio: new Date(rangoHorario.fechaHoraInicio),
      fechaHoraFin: new Date(rangoHorario.fechaHoraFin)
    };
    console.log('Rango horario a enviar:', rangoHorarioToSend);
    return this.http.post<RangoHorario>(url, rangoHorarioToSend).pipe(catchError(this.handleError));
  }

  obtenerRangosHorarios(idTrabajador: number): Observable<RangoHorario[]> {
    const url = this.getUrl('trabajador', `${idTrabajador}/rangohorario`);
    return this.http.get<RangoHorario[]>(url).pipe(catchError(this.handleError));
  }

  deleteTrabajador(idTrabajador: number): Observable<void> {
    const url = this.getUrl('trabajador', idTrabajador);
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  updateRangoHorario(idTrabajador: number, idRangoHorario: number, rangoHorario: RangoHorario): Observable<RangoHorario> {
    const url = this.getUrl('trabajador', `${idTrabajador}/rangohorario/${idRangoHorario}`);
    return this.http.put<RangoHorario>(url, rangoHorario).pipe(catchError(this.handleError));
  }
}








