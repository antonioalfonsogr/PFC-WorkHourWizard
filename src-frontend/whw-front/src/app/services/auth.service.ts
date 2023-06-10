import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Credentials } from '../models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) {}

  login(creds: Credentials): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', creds, { observe: 'response' }).pipe(
      map(response => {
        const token = response.headers.get('Authorization')?.replace('Bearer ', '');

        if (token) {
          localStorage.setItem('token', token);
          this.authStatus.next(true);
        }

        return response.body;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error logging in:', error.message);
        this.authStatus.next(false);
        return throwError(error);
      })
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
    return this.http.put('http://localhost:8080/api/trabajador', data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error resetting password:', error.message);
        return throwError(error);
      })
    );
  }
}


