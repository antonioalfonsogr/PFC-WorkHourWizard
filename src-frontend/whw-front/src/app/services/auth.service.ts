import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Credentials } from '../models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  /**
   * Crea una instancia del AuthService.
   * @param {HttpClient}
   */
  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param {Credentials} creds - Las credenciales del usuario.
   * @returns {Observable<any>}
   */
  login(creds: Credentials): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, creds, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization')?.replace('Bearer ', '');
        
        // Si se obtiene un token, lo almacenamos en el localStorage.
        if (token) {
          localStorage.setItem('token', token);
          this.authStatus.next(true);
        }
        return response.body;
      }),
      catchError(this.handleError('Error logging in'))
    );
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  /**
   * Obtiene el token de autenticación almacenado.
   * @returns {string | null}
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Comprueba si el usuario está autenticado.
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtiene el cargo del usuario a partir del token almacenado.
   * @returns {string | null}
   */
  getCargo(): string | null {
    const token = this.getToken();
    return token ? jwt_decode<{ cargo: string }>(token).cargo : null;
  }

  /**
   * Obtiene el email del usuario a partir del token almacenado.
   * @returns {string | null}
   */
  getEmail(): string | null {
    const token = this.getToken();
    return token ? jwt_decode<{ sub: string }>(token).sub : null;
  }

  /**
   * Reinicia la contraseña del usuario.
   * @param {Object} data - Objeto con el email del usuario y la nueva contraseña.
   * @returns {Observable<any>}
   */
  resetPassword(data: { email: string; newPassword: string }): Observable<any> {
    const url = `${this.baseUrl}/trabajador`;
    return this.http.put(url, data).pipe(
      catchError(this.handleError('Error resetting password'))
    );
  }

  /**
   * Maneja los errores que ocurren durante las peticiones HTTP.
   * @param {string} errorMessage - El mensaje de error personalizado.
   * @returns {Function}
   */
  private handleError(errorMessage: string) {
    return (error: HttpErrorResponse) => {
      console.error(errorMessage, error.message);
      this.authStatus.next(false);
      return throwError(error);
    };
  }
}
