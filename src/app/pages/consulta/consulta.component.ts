import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'sgm-consulta',
  styles: ['container-width'],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})

export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Medico', 'CRM', 'Especialidade', 'DataConsulta', 'Horario', 'Desmarcar'];
  dataSource = new MatTableDataSource<Consulta>();
  busy: any;
  selection = new SelectionModel<Consulta>(true, []);
  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private snackBar: MatSnackBar,
    private consultaService: ConsultaService) { }

  ngOnInit() {
    this.buscarConsultas();
  }

  checkboxLabel(row?: any): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  validarData(element:Date) {
    const currentDate: Date = new Date();
    const data = new Date(element);
    return data > currentDate;
  }

  desmarcar(consulta: Consulta) {
    console.log(consulta);
    this.busy = this.consultaService.desmarcar(consulta)
    .subscribe(_ => {
      this.snackBar.open('Consulta desmarcada com sucesso!', 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-success' });
      this.buscarConsultas();
    }, (erro) => {
      this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
    });
  }

  buscarConsultas() {
    const user = JSON.parse(localStorage.getItem('userCidadao') ?? "{}");
    this.busy = this.consultaService.getCidadao(user.cpf)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Consulta>(data.consultas);
        this.dataSource.paginator = this.paginator;
      }, (erro) => {
        this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
