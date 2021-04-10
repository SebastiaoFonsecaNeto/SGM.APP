import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cidadao } from 'src/app/models/cidadao.model';
import { CidadaoService } from 'src/app/services/cidadao.service';

@Component({
  selector: 'sgm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  busy: any;
  user: Usuario = new Usuario;
  cidadao: Cidadao = new Cidadao('');
  erro: string = "";
  hide: boolean = true;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    private cidadaoService: CidadaoService) { }

  ngOnInit() {
    if (this.auth.usuarioEstaAutenticado()) {
      this.router.navigate(['/home']);
    }
  }

  entrar() {
    if (this.user && this.user.login && this.user.senha) {
      this.busy = this.auth.login(this.user)
        .subscribe(user => {
          localStorage.setItem('userAuth', JSON.stringify(user));
          this.obterTokenCidadao(user.cpf)
        }, (erro) => {   
          this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
          localStorage.removeItem('userAuth');
          localStorage.clear();
        });
    }
  }

  obterTokenCidadao(cpf:string) {
    if (cpf) {
      this.busy = this.cidadaoService.getToken(cpf)
        .subscribe(user => {       
          localStorage.setItem('userCidadao', JSON.stringify(user));
          window.location.reload();
        }, (erro) => {   
          this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
          localStorage.removeItem('userCidadao');
          localStorage.clear();
        });
    }
    else {
      window.location.reload();
    }
  }

  fechar() {
    this.erro = "";
  }
}
