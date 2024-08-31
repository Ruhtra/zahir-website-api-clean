import { Picture } from "../entities/Picture";

export interface IPictureRepository {
  get(profileId: string): Promise<Picture>;
  upsert(picture: Picture): Promise<void>;
  remove(id: string): Promise<void>;
}
