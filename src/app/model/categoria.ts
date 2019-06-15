export class Categoria {

    nome: string;
    
    


    constructor() {
    }

    // Dados do firebase
    setDados(obj: any) {
        this.nome = obj.nome;

        
    }
}