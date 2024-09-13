export class RecintoController {
    constructor (recintoService) {
        this.recintoService = recintoService;
    }

    executar(animal, quantidade) {
        const resposta = this.recintoService.executar(animal, quantidade);
        return resposta;
    }
}