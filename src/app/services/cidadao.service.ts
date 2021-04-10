import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cidadao } from '../models/cidadao.model';
import { Imposto } from '../models/imposto.model';

@Injectable()
export class CidadaoService {
  private url = environment.apiCidadaoUrl;

  constructor(private http: HttpClient) { }

  getById(cpf:string): Observable<Cidadao> {
    return this.http.get<Cidadao>(`${this.url}/v1/Cidadao/${cpf}`);
  }

  get(): Observable<Array<Cidadao>> {
    return this.http.get<Array<Cidadao>>(`${this.url}/v1/Cidadao/`);
  }

  getToken(cpf:string): Observable<string> {
    return this.http.get<string>(`${this.url}/v1/Cidadao/${cpf}/Token/`);
  }

  getImpostos(cpf:string): Observable<Array<Imposto>> {
    return this.http.get<Array<Imposto>>(`${this.url}/v1/Cidadao/${cpf}/Impostos/`);
  }

  salvar(cidadao: Cidadao): Observable<Cidadao> {
      return this.http.post<Cidadao>(`${this.url}/v1/Cidadao/`, cidadao);
  }
}
