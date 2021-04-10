import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        const usuario = JSON.parse(localStorage.getItem('userAuth') ?? "{}");
        if (usuario && usuario.token) {
          this.auth.refreshToken(usuario.token)
            .subscribe(user => {
              localStorage.setItem('userAuth', JSON.stringify(user));
              this.router.navigate(['/home']);
            }, (erro) => {
              localStorage.removeItem('userAuth');
              localStorage.clear();
              this.router.navigate(['/login']);
            });
        }
      }
      return throwError(err.error || err.statusText);
    }));
  }
}
