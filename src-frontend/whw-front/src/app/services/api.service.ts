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

  /**
   * Constructor del servicio ApiService.
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Maneja los errores que ocurren durante las peticiones HTTP.
   * 
   * @param {HttpErrorResponse} error - Error que ocurrió durante la petición.
   * @returns {Observable<never>}
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Se produjo un error:', error);
    return throwError(error);
  }

  /**
   * Crea una URL para hacer una petición a la API.
   * 
   * @param {string} endpoint - Endpoint al que se va a hacer la petición.
   * @param {number | string} [id] - ID opcional para incluir en la URL.
   * @returns {string} URL formada.
   */
  private getUrl(endpoint: string, id?: number | string): string {
    const url = `${this.baseUrl}/${endpoint}`;
    return id ? `${url}/${id}` : url;
  }

  /**
   * Obtiene todos los trabajadores.
   * 
   * @returns {Observable<Trabajador[]>}
   */
  getTrabajadores(): Observable<Trabajador[]> {
    const url = this.getUrl('trabajador');
    return this.http.get<Trabajador[]>(url).pipe(catchError(this.handleError));
  }

  /**
   * Registra un nuevo trabajador.
   * 
   * @param newWorker 
   * @returns {Observable<Trabajador>}
   */
  registerTrabajador(newWorker: Trabajador): Observable<Trabajador> {
    const url = this.getUrl('trabajador');
    return this.http.post<Trabajador>(url, newWorker).pipe(catchError(this.handleError));
  }

  /**
   * Actualiza un trabajador.
   * @param trabajador 
   * @returns {Observable<Trabajador>}
   */
  updateTrabajador(trabajador: Trabajador): Observable<Trabajador> {
    const url = this.getUrl('trabajador', trabajador.idTrabajador);
    return this.http.put<Trabajador>(url, trabajador).pipe(catchError(this.handleError));
  }

  /**
   * Obtiene un trabajador por su email.
   * @param email 
   * @returns {Observable<Trabajador>}
   */
  getTrabajadorByEmail(email: string): Observable<Trabajador> {
    const url = this.getUrl('trabajador/email', email);
    return this.http.get<Trabajador>(url).pipe(catchError(this.handleError));
  }

  /**
   * Obtiene un trabajador por su ID.
   * @param idTrabajador 
   * @returns {Observable<Trabajador>}
   */
  getTrabajadorById(idTrabajador: number): Observable<Trabajador> {
    const url = this.getUrl('trabajador', idTrabajador);
    return this.http.get<Trabajador>(url).pipe(catchError(this.handleError));
  }

  /**
   * Obtiene el gestor de un trabajador.
   * @param trabajador 
   * @returns {Observable<Trabajador>}
   */
  getGestor(trabajador: Trabajador): Observable<Trabajador> {
    const url = this.getUrl('trabajador', `${trabajador.idTrabajador}/gestor`);
    return this.http.get<Trabajador>(url).pipe(catchError(this.handleError));
  }

  /**
   * Inserta un rango horario a un trabajador.
   * @param idTrabajador 
   * @param rangoHorario 
   * @returns {Observable<Trabajador[]>}
   */
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

  /**
   * Obtiene los rangos horarios de un trabajador.
   * @param idTrabajador 
   * @returns {Observable<RangoHorario[]>}
   */
  obtenerRangosHorarios(idTrabajador: number): Observable<RangoHorario[]> {
    const url = this.getUrl('trabajador', `${idTrabajador}/rangohorario`);
    return this.http.get<RangoHorario[]>(url).pipe(catchError(this.handleError));
  }

  /**
   * Elimina un rango horario de un trabajador.
   * @param idTrabajador 
   * @returns {Observable<void>}
   */
  deleteTrabajador(idTrabajador: number): Observable<void> {
    const url = this.getUrl('trabajador', idTrabajador);
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  /**
   * Actualiza un rango horario de un trabajador.
   * @param idTrabajador 
   * @param idRangoHorario 
   * @param rangoHorario 
   * @returns {Observable<RangoHorario>}
   */
  updateRangoHorario(idTrabajador: number, idRangoHorario: number, rangoHorario: RangoHorario): Observable<RangoHorario> {
    const url = this.getUrl('trabajador', `${idTrabajador}/rangohorario/${idRangoHorario}`);
    return this.http.put<RangoHorario>(url, rangoHorario).pipe(catchError(this.handleError));
  }
}








