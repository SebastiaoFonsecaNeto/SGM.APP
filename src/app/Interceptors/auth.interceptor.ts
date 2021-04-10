import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = "";
    if (request.url.includes(environment.apiCidadaoUrl)) {
      const usuario = JSON.parse(localStorage.getItem('userCidadao') ?? "{}");
      if (usuario && usuario.token) {
        token = usuario.token
      }
    } else {
      const usuario = JSON.parse(localStorage.getItem('userAuth') ?? "{}");
      if (usuario && usuario.token) {
        token = usuario.token
      }
    }
    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next.handle(request);
  }
}
