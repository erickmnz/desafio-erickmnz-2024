export class AnimalRepository {

    constructor(animais) {
        this.animais = animais;
    }

    getAnimal(animal) {
        const animalEncontrado = this.animais.find(animalExistente => animalExistente.especie === animal);
        if(!animalEncontrado) {
            throw new Error("Animal inválido");
        }

        return animalEncontrado;
    }

    getAnimais() {
        return this.animais;
    }
}