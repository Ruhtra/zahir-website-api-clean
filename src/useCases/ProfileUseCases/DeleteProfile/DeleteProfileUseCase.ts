import { IBuketProvider } from "../../../providers/IBucketProvider";
import { IPictureRepository } from "../../../repositories/IPictureRepository";
import { IProfileRepository } from "../../../repositories/IProfileRepository";
import { IUseCase } from "../../IUseCase";
import { DeleteProfileRequestDto } from "./DeleteProfileDto";

//TO-DO: Adicionar transaction apra tratamente de exceptions
export class DeleteProfileUseCase
  implements IUseCase<DeleteProfileRequestDto, void>
{
  constructor(
    private profileRepository: IProfileRepository,
    private pictureRepostiroy: IPictureRepository,
    private bucket: IBuketProvider
  ) {}
  async execute({ idProfile }: DeleteProfileRequestDto): Promise<void> {
    const profile = await this.profileRepository.findById(idProfile);
    if (!profile) throw new Error("NotFound");

    if (profile.picture) {
      this.pictureRepostiroy.remove(profile.picture.id);
      await this.bucket.delete(profile.picture.path);
    }

    await this.profileRepository.delete(idProfile);
  }
}
