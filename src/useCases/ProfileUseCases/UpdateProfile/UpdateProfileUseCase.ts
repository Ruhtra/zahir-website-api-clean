import { Profile } from "../../../entities/Profile";
import { IProfileRepository } from "../../../repositories/IProfileRepository";
import { IUseCase } from "../../IUseCase";
import { UpdateProfileRequestDto } from "./UpdateProfileDto";

export class UpdateProfileUseCase
  implements IUseCase<UpdateProfileRequestDto, void>
{
  constructor(private profileRepository: IProfileRepository) {}
  async execute({
    id: idProfile,
    ...request
  }: UpdateProfileRequestDto): Promise<void> {
    const profile = Profile.create({
      name: request.name,
      movie: request.movie,
      resume: request.resume,
      informations: request.informations,
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
          active: request.promotion.active,
          description: request.promotion.description,
        },
      }),
      ...(request.telephone && {
        telephone: {
          telephone: request.telephone.telephone,
          whatsapp: request.telephone.whatsapp,
        },
      }),
      ...(request.category && {
        category: request.category.map((name) => {
          return {
            name: name,
          };
        }),
      }),
      ...(request.categoryGroup && {
        categoryGroup: request.categoryGroup.map((name) => {
          return {
            name: name,
          };
        }),
      }),
    });

    await this.profileRepository.update(idProfile, profile);
  }
}
