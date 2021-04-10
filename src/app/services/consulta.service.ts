import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Consulta } from '../models/consulta.model';

@Injectable()
export class ConsultaService {
  private url = environment.apiSaudeUrl;

  constructor(private http: HttpClient) { }

  getCidadao(cpf: string): Observable<any> {
    return this.http.get<any>(`${this.url}/v1/Consultas/Paciente/${cpf}`);
  }

  getDisponiveis(): Observable<Array<Consulta>> {
    return this.http.get<Array<Consulta>>(`${this.url}/v1/Consultas/Agendas`);
  }

  getPaciente(): Observable<any> {
    return this.http.get<any>(`${this.url}/v1/Paciente`);
  }

  marcar(consulta: Consulta, cpf: String): Observable<any> {
    return this.http.put<any>(`${this.url}/v1/Consultas/${consulta.id}/Marcar/${cpf}`, {});
  }
  
  desmarcar(consulta: Consulta): Observable<any> {
    return this.http.put<any>(`${this.url}/v1/Consultas/${consulta.id}/Desmarcar`, {});
  }
}
