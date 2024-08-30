import { Picture } from "../entities/Picture";

export interface IPictureRepository {
  upsert(picture: Picture): Promise<void>;
}
