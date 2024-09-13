export class RecintoRepository {

    constructor(recintos) {
        this.recintos = recintos;
    }

    getRecintoPorBioma(bioma) {
        const biomaEncontrado = recintos.find(recinto => recinto.bioma.toLowerCase() === bioma.toLowerCase());

        return biomaEncontrado;
    }

    getRecintosPorBioma(bioma) {
        const biomaEncontrado = recintos.filter(recinto => recinto.bioma.toLowerCase() === bioma.toLowerCase());

        return biomaEncontrado;
    }
}