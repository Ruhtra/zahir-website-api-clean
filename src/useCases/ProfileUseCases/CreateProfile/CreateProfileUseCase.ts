import { Profile } from "../../../entities/Profile";
import { IProfileRepository } from "../../../repositories/IProfileRepository";
import { IUseCase } from "../../IUseCase";
import { CreateProfileRequestDto } from "./CreateProfileDto";

export class CreateProfileUseCase
  implements IUseCase<CreateProfileRequestDto, void>
{
  constructor(private profileRepository: IProfileRepository) {}
  async execute(request: CreateProfileRequestDto): Promise<void> {
    const profile = Profile.create({
      name: request.name,
      ...(request.address && {
        address: {
          cep: request.address.cep,
          city: request.address.city,
          lat: request.address.lat,
          lng: request.address.lng,
          neighborhood: request.address.neighborhood,
          number: request.address.number,
          street: request.address.street,
          uf: request.address.uf,
          complement: request.address.complement,
        },
      }),
      ...(request.picture && {
        picture: {
          key: request.picture.key,
          name: request.picture.name,
          size: request.picture.size,
          url: request.picture.url,
        },
      }),
      ...(request.promotion && {
        promotion: {
          title: request.promotion.title,
          description: request.promotion.description,
        },
      }),
      ...(request.telephone && {
        telephone: {
          telephone: request.telephone.telephone,
          whatsapp: request.telephone.whatsapp,
        },
      }),
      movie: request.movie,
      resume: request.resume,
      informations: request.informations,
      category: request.category.map((c) => {
        return {
          name: c.name,
        };
      }),
      categoryGroup: request.categoryGroup.map((c) => {
        return {
          name: c.name,
        };
      }),
    });

    await this.profileRepository.save(profile);
  }
}
