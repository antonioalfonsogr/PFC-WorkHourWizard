import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Credentials } from '../models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) {}

  login(creds: Credentials) {
    return this.http.post('http://localhost:8080/api/login', creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const bearedToken = headers.get('Authorization')!;
      const token = bearedToken.replace('Bearer ', '');

      localStorage.setItem('token', token);
      this.authStatus.next(true);

      return body;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getCargo(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const tokenPayload = jwt_decode<{ cargo: string }>(token);
    return tokenPayload.cargo;
  }

  getEmail(): string | null {
    const token = this.getToken();
    
    if (!token) {
      return null;
    }
  
    const tokenPayload = jwt_decode<{ sub: string }>(token);
    
    return tokenPayload.sub;
  }

  resetPassword(data: { email: string, newPassword: string }): Observable<any> {
    return this.http.put('http://localhost:8080/api/trabajador', data);
  }

  
}

