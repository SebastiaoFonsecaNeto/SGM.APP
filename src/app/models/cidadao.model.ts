export class Cidadao {
    nome: string = "";
    dataNascimento: Date = new Date;
    cpf: string = "";
    identidade: string = "";
    sexo: boolean = true;
    email: string = "";
    profissao: string = "";
    codigoCidadao: string = "";
    telefone: string = "";
    celular: string = "";
    senha: string = "";

    constructor(nome: string) {
        this.nome = nome;
    }
}
