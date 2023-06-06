import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import jwt_decode from 'jwt-decode';
import { Trabajador, Credentials } from '../models/trabajador.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    getTrabajadores(): Observable<Trabajador[]> {
        return this.http.get<Trabajador[]>('http://localhost:8080/api/trabajadores');
    }

    login(creds: Credentials) {
        return this.http.post('http://localhost:8080/api/login', creds, { 
            observe: 'response' 
        }).pipe(map((response: HttpResponse<any>) => { 
            const body = response.body;
            const headers = response.headers;
            
            const bearedToken = headers.get('Authorization')!;
            const token = bearedToken.replace('Bearer ', '');
            
            localStorage.setItem('token', token);
            
            return body;
        }));
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getCargo(): string | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }
    
        const tokenPayload = jwt_decode<{ cargo: string }>(token);
        return tokenPayload.cargo;
    }
    
}

