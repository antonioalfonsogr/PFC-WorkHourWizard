import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
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
        }).pipe(map((response: HttpResponse<any>) => { // Aquí utilizamos el operador map
            const body = response.body;
            const headers = response.headers;
            
            const bearedToken = headers.get('Authorization')!;
            const token = bearedToken.replace('Bearer ', '');
            
            localStorage.setItem('token', token);
            
            return body;
        }));
    }

    getToken(){
        return localStorage.getItem('token');
    }
}
