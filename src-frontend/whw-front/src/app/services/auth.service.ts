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
  private baseUrl = 'http://back:8080/api';
  // private baseUrl = 'http://localhost:8080/api';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) {}

  login(creds: Credentials): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, creds, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization')?.replace('Bearer ', '');

        if (token) {
          localStorage.setItem('token', token);
          this.authStatus.next(true);
        }

        return response.body;
      }),
      catchError(this.handleError('Error logging in'))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCargo(): string | null {
    const token = this.getToken();
    return token ? jwt_decode<{ cargo: string }>(token).cargo : null;
  }

  getEmail(): string | null {
    const token = this.getToken();
    return token ? jwt_decode<{ sub: string }>(token).sub : null;
  }

  resetPassword(data: { email: string; newPassword: string }): Observable<any> {
    const url = `${this.baseUrl}/trabajador`;
    return this.http.put(url, data).pipe(
      catchError(this.handleError('Error resetting password'))
    );
  }

  private handleError(errorMessage: string) {
    return (error: HttpErrorResponse) => {
      console.error(errorMessage, error.message);
      this.authStatus.next(false);
      return throwError(error);
    };
  }
}
