import { CategorieRepository } from "../../../repositories/implemetations/CategorieRepository";
import { GetAllCategorieController } from "./GetAllCategorieController";

const categorieRepository = new CategorieRepository()

const getAllCategorieController = new GetAllCategorieController(categorieRepository)

export {
    getAllCategorieController
}

