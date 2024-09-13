import { RecintoController } from "../controller/recintoController";
import { animais } from "../data/animais.js";
import { recintos } from "../data/recintos.js";
import { AnimalRepository } from "../domain/animal/animalRepositorio";
import { RecintoRepository } from "../domain/recinto/recintoRepositorio";
import { RecintoService } from "../domain/recinto/recintoService";

export function recintoControllerFactory() {
    const animalRepository = new AnimalRepository(animais);
    const recintoRepository = new RecintoRepository(recintos);
    const recintoService = new RecintoService(recintoRepository, animalRepository);
    const recintoController = new RecintoController(recintoService);
    return recintoController;
}