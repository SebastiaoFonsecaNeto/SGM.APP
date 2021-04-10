import { Cidadao } from './cidadao.model';
import { UUID } from 'angular2-uuid';

export class Consulta {
    id: UUID = new UUID();
    especialidade: string = "";
    descricao: string = "";
    informacoesMedicas: string = "";
    dataConsulta: Date = new Date;
    medico: string = "";
    crm:string = "";
    pacienteId: UUID = new UUID();
}
