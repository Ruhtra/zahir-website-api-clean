import { IBuketProvider } from "../../../providers/IBucketProvider";
import { IPictureRepository } from "../../../repositories/IPictureRepository";
import { IUseCase } from "../../IUseCase";
import { RemoveFileRequestDto } from "./RemoveFileDto";

//TO-DO: Fazer as chamadas de forma async e o tratamento devido para caso uma das duas deem erro
export class RemoveFileUseCase implements IUseCase<RemoveFileRequestDto, void> {
  constructor(
    private buketProvider: IBuketProvider,
    private pictureRepository: IPictureRepository
  ) {}
  async execute({ idProfile }: RemoveFileRequestDto): Promise<void> {
    const picture = await this.pictureRepository.get(idProfile);

    await this.buketProvider.delete(picture.path);
    await this.pictureRepository.remove(picture.id);
  }
}
