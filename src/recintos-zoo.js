import { recintoControllerFactory } from "./factories/recintoControllerFactory.js";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        try {
            const recinto = this.recintoController();
            const resposta = recinto.executar(animal, quantidade);
            return {
                erro: null,
                recintosViaveis: resposta
            };
        } catch (erro) {
            return {
                erro: erro.message,
                recintosViaveis: null
            };
        }
    }

    recintoController() {
        return recintoControllerFactory();
    }
}

export { RecintosZoo as RecintosZoo };
