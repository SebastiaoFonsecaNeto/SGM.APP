import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Imposto } from 'src/app/models/imposto.model';
import { CidadaoService } from 'src/app/services/cidadao.service';

@Component({
  selector: 'sgm-imposto',
  templateUrl: './imposto.component.html',
  styleUrls: ['./imposto.component.scss']
})

export class ImpostoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['codigo', 'anoFiscal', 'totalImpostos', 'tipoImposto'];
  dataSource = new MatTableDataSource<Imposto>();
  busy: any;
  erro: String = "";  
  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private cidadaoService: CidadaoService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userCidadao') ?? "{}");
    this.busy = this.cidadaoService.getImpostos(user.cpf)
        .subscribe(impostos => {       
          this.dataSource = new MatTableDataSource<Imposto>(impostos);
          this.dataSource.paginator = this.paginator;
        }, (erro) => {   
          this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
        });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fechar() {
    this.erro = "";
  }
}
