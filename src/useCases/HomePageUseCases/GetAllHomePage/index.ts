import { HomePageRepository } from "../../../repositories/implemetations/HomePageRepository";
import { GetAllHomePageController } from "./GetAllHomePageController";

const homePageRepository = new HomePageRepository()

const getAllHomePageController = new GetAllHomePageController(homePageRepository)

export {
    getAllHomePageController
}