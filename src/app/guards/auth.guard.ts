import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.authService.usuarioEstaAutenticado()) {
            return true;
        }
        this.snackBar.open("Usuário não autorizado, realize o login!", 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
        this.router.navigate(['/login']);
        return false;
    }
}
