export class RecintoService {

    recintosViaveis = []

    constructor(recintoRepository, animalRepository) {
        this.recintoRepository = recintoRepository;
        this.animalRepository = animalRepository;
    }

    executar(animal, quantidade) {
        if(quantidade <= 0 || isNaN(quantidade)) {
            throw new Error("Quantidade inválida");
        }

        this.verificaAnimalInvalido(animal);
        this.getRecintosDisponiveis(animal, quantidade);

        if(this.recintosViaveis.length === 0) {
            throw new Error("Não há recinto viável");
        }

        const respostaFormatada = this.recintosViaveis.map(recinto => {
            const tamanhoRestante = tamanhoRestanteDoRecinto(animal, quantidade, recinto);
            return `Recinto 1 (espaço livre: ${tamanhoRestante} total: ${recinto.tamanhoTotal}`
        })

        return respostaFormatada;
    }

    getRecintosDisponiveis(animal, quantidade) {
        const animalDados = this.animalRepository.getAnimal(animal);
        const biomasAdaptados = animalDados.bioma;
        const recintos = [];

        biomasAdaptados.forEach(bioma => {
            if(bioma === 'savana') {
                const savanas = this.recintoRepository.getRecintosPorBioma(bioma);
                savanas.forEach(savana => recintos.push(savana));
                return;
            }
            return recintos.push(this.recintoRepository.getRecintoPorBioma(bioma));
        });

        recintos.forEach(recinto => this.verificaRecintoDisponivel(animalDados, quantidade, recinto) ?? this.recintosViaveis.push(recinto));
    }

    verificaRecintoDisponivel(animal, quantidade, recinto) {
        const recintoPossuiMaisDeUmaEspecie = this.verificaSeRecintoPossuiOutraEspecie(recinto, animal);
        const tamanhoRestante = tamanhoRestanteDoRecinto(animal, quantidade, recinto);

        if(isCarnivoro) {
            if(recinto.animaisExistentes.length === 0 && tamanhoRestante < 0) {
                return true;
            }
            if(recintoPossuiMaisDeUmaEspecie) {
                return false;
            }
        }

        if(animal === 'MACACO' && recinto.animaisExistentes.length === 0) {
            return false;            
        }

        if(animal === 'HIPOPOTAMO' && recintoPossuiMaisDeUmaEspecie && recinto.bioma !== "savana e rio") {
            return false;
        }

        if(recintoPossuiMaisDeUmaEspecie && (animal.tamanho + recinto.animaisExistentes.length + 1 > recinto.tamanhoTotal)) {
            return false;
        }

        if(tamanhoRestante < 0) {
            return false;
        }

        return true;
    }

    verificaAnimalInvalido(animal) {
        return this.animalRepository.getAnimais();
    }
    
    isCarnivoro(animal) {
        return this.animalRepository.getIsCarnivoro(animal);
    }

    verificaSeRecintoPossuiOutraEspecie(recinto, animal) {
        const especies = recinto.animaisExistentes.filter(animalNoRecinto => animalNoRecinto.nome.length !== animal.length);

        if(especies.length > 0) {
            return true;
        }
        
        return false;
    }

    tamanhoRestanteDoRecinto(animal, quantidade, recinto) {
        return (animal.tamanho * quantidade) + recinto.animaisExistentes.length - recinto.tamanhoTotal;
    }
}