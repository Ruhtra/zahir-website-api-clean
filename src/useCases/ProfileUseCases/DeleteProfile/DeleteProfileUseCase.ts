import { IProfileRepository } from "../../../repositories/IProfileRepository";
import { IUseCase } from "../../IUseCase";
import { DeleteProfileRequestDto } from "./DeleteProfileDto";

export class DeleteProfileUseCase
  implements IUseCase<DeleteProfileRequestDto, void>
{
  constructor(private profileRepository: IProfileRepository) {}
  async execute({ idProfile }: DeleteProfileRequestDto): Promise<void> {
    await this.profileRepository.delete(idProfile);
  }
}
