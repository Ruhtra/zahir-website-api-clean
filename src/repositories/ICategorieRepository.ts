import { Categorie } from "../entities/Categorie";

export interface ICategorieRepository {
    all: () => Promise<Categorie[]>
}