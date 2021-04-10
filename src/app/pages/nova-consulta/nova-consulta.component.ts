import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Consulta } from 'src/app/models/consulta.model';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sgm-nova-consulta',
  styles: ['container-width'],
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.scss']
})

export class NovaConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'Medico', 'CRM', 'Especialidade', 'DataConsulta', 'Horario'];
  dataSource = new MatTableDataSource<Consulta>();
  busy: any;
  dataInicial: any;
  dataFinal: any;
  especialidade: string = "";
  especialidadesDisponiveis: Array<string> = new Array<string>();
  selectedRow = new Consulta();
  selection = new SelectionModel<Consulta>(false, []);
  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private consultaService: ConsultaService) { }

  ngOnInit() {
    this.buscaEspecialidadesDisponiveis();
    this.dataSource = new MatTableDataSource<Consulta>();
    this.dataSource.paginator = this.paginator;
  }

  checkboxLabel(row?: any): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  buscaEspecialidadesDisponiveis() {
    this.busy = this.consultaService.getDisponiveis()
      .subscribe(consultas => {
        this.especialidadesDisponiveis = consultas.filter(
          (thing, i, arr) => arr.findIndex(t => t.especialidade === thing.especialidade) === i
        ).map(e => e.especialidade);
      }, (erro) => {
        this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
      });
  }

  procurarHorario() {
    if (this.dataInicial && this.dataFinal && this.especialidade) {
      this.busy = this.consultaService.getDisponiveis()
        .subscribe(consultas => {
          const consultasFiltradas = consultas.filter(c => new Date(c.dataConsulta) >= this.dataInicial &&
          new Date(c.dataConsulta) <= this.dataFinal && c.especialidade === this.especialidade);
          this.dataSource = new MatTableDataSource<Consulta>(consultasFiltradas);
          this.dataSource.paginator = this.paginator;
        }, (erro) => {
          this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
        });
    } else {
      this.snackBar.open("Filtro inválido!", 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
    }
  }
  
  marcarConsulta() {
    const user = JSON.parse(localStorage.getItem('userCidadao') ?? "{}");
    let consulta: Consulta = this.selectedRow;
    this.busy = this.consultaService.marcar(consulta, user.cpf)
      .subscribe(_ => {
          this.snackBar.open('Consulta marcada com sucesso!', 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-success' });
          this.router.navigate(['/consulta']);
      }, (erro) => {
        this.snackBar.open(erro, 'Atenção!', { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'toast-danger' });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
