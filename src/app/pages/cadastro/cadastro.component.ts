import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CidadaoService } from 'src/app/services/cidadao.service';
import { Cidadao } from 'src/app/models/cidadao.model';

@Component({
  selector: 'sgm-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent implements OnInit {
  busy: any;
  hide: boolean = true;
  hideConfirmar: boolean = true;
  cidadao: Cidadao = new Cidadao('');

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

  enviarCadastro() {
    this.busy = this.cidadaoService.salvar(this.cidadao)
    .subscribe(_ => {       
      this.snackBar.open('Cadastro enviado com sucesso!', 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-success' });
      this.cidadao = new Cidadao('');
      this.router.navigate(['/login']);
    }, (erro) => {   
      this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
    });
  }
}
