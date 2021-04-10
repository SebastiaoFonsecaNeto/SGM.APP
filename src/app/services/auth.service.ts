import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private url = environment.apiManegerUrl;

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.url}/v1/Autenticacao/Login/Cidadao?login=${usuario.login}&senha=${usuario.senha}`, '{}');
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.url}/v1/auth/refresh`, token);
  }

  usuarioEstaAutenticado(): boolean {
    const usuario = JSON.parse(localStorage.getItem('userAuth') ?? "{}");
    if (usuario && usuario.token) {
      return true;
    } else {
      return false;
    }
  }
}
