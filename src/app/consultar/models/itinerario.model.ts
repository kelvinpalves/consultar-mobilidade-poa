export class Itinerario {
    constructor(
        public idLinha: string,
        public nome: string,
        public codigo: string,
        public pontos: any[]
    ) { }
}