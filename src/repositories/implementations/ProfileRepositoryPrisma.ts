import { Category } from "../../entities/Category";
import { CategoryGroup } from "../../entities/CategoryGroup";
import { Picture } from "../../entities/Picture";
import { Profile } from "../../entities/Profile";
import { prismaClient } from "../../prismaClient";
import { IProfileRepository } from "../IProfileRepository";

export class ProfileRepositoryPrisma implements IProfileRepository {
  async findById(id: string): Promise<Profile> {
    const profile = await prismaClient.profile.findUnique({
      where: {
        id: id,
      },
      include: {
        address: true,
        picture: true,
        promotion: true,
        telephone: true,
        categoryGroup: true,
        category: true,
      },
    });
    if (!profile) return null;

    return Profile.with({
      id: profile.id,
      name: profile.name,
      informations: profile.informations,
      movie: profile.movie,
      resume: profile.resume,
      createdAt: profile.createdAt,
      address: !profile.address
        ? null
        : {
            id: profile.address.id,
            cep: profile.address.cep,
            city: profile.address.city,
            complement: profile.address.complement,
            lat: profile.address.lat,
            lng: profile.address.lng,
            neighborhood: profile.address.neighborhood,
            number: profile.address.number,
            street: profile.address.street,
            uf: profile.address.uf,
          },
      picture: !profile.picture
        ? null
        : Picture.with({
            id: profile.picture.id,
            key: profile.picture.key,
            path: profile.picture.path,
            size: profile.picture.size,
            url: profile.picture.url,
          }),
      promotion: !profile.promotion
        ? null
        : {
            id: profile.promotion.id,
            active: profile.promotion.active,
            title: profile.promotion.title,
            description: profile.promotion.description,
          },
      telephone: !profile.telephone
        ? null
        : {
            id: profile.telephone.id,
            telephone: profile.telephone.telephone,
            whatsapp: profile.telephone.whatsapp,
          },
      categoryGroup: !profile.categoryGroup
        ? null
        : profile.categoryGroup.map((cp) => {
            return CategoryGroup.with({
              name: cp.name,
            });
          }),
      category: !profile.category
        ? null
        : profile.category.map((c) => {
            return Category.with({
              name: c.name,
            });
          }),
    });
  }
  async all(): Promise<Profile[]> {
    const profiles = await prismaClient.profile.findMany({
      include: {
        address: true,
        picture: true,
        promotion: true,
        telephone: true,
        categoryGroup: true,
        category: true,
      },
    });

    return profiles.map((p) => {
      return Profile.with({
        id: p.id,
        name: p.name,
        informations: p.informations,
        movie: p.movie,
        resume: p.resume,
        createdAt: p.createdAt,
        address: !p.address
          ? null
          : {
              id: p.address.id,
              cep: p.address.cep,
              city: p.address.city,
              complement: p.address.complement,
              lat: p.address.lat,
              lng: p.address.lng,
              neighborhood: p.address.neighborhood,
              number: p.address.number,
              street: p.address.street,
              uf: p.address.uf,
            },
        picture: !p.picture
          ? null
          : Picture.with({
              id: p.picture.id,
              key: p.picture.key,
              path: p.picture.path,
              size: p.picture.size,
              url: p.picture.url,
            }),
        promotion: !p.promotion
          ? null
          : {
              id: p.promotion.id,
              active: p.promotion.active,
              title: p.promotion.title,
              description: p.promotion.description,
            },
        telephone: !p.telephone
          ? null
          : {
              id: p.telephone.id,
              telephone: p.telephone.telephone,
              whatsapp: p.telephone.whatsapp,
            },
        categoryGroup: !p.categoryGroup
          ? null
          : p.categoryGroup.map((cp) => {
              return CategoryGroup.with({
                name: cp.name,
              });
            }),
        category: !p.category
          ? null
          : p.category.map((c) => {
              return Category.with({
                name: c.name,
              });
            }),
      });
    });
  }
  async recents(): Promise<Profile[]> {
    const recents = await prismaClient.profile.findMany({
      where: {
        movie: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });

    return recents.map((r) => {
      return Profile.with({
        id: r.id,
        name: r.name,
        movie: r.movie,
        createdAt: r.createdAt,
      });
    });
  }
  async save(profile: Profile): Promise<void> {
    await prismaClient.profile.create({
      data: {
        name: profile.name,
        informations: profile.informations,
        movie: profile.movie,
        resume: profile.resume,
        createdAt: profile.createdAt,
        ...(profile.address && {
          address: {
            create: {
              cep: profile.address.cep,
              city: profile.address.city,
              complement: profile.address.complement,
              lat: profile.address.lat,
              lng: profile.address.lng,
              neighborhood: profile.address.neighborhood,
              number: profile.address.number,
              street: profile.address.street,
              uf: profile.address.uf,
            },
          },
        }),
        ...(profile.picture && {
          picture: {
            create: {
              key: profile.picture.key,
              path: profile.picture.path,
              size: profile.picture.size,
              url: profile.picture.url,
            },
          },
        }),
        ...(profile.promotion && {
          promotion: {
            create: {
              title: profile.promotion.title,
              active: profile.promotion.active,
              description: profile.promotion.description,
            },
          },
        }),
        ...(profile.telephone && {
          telephone: {
            create: {
              telephone: profile.telephone.telephone,
              whatsapp: profile.telephone.whatsapp,
            },
          },
        }),
        categoryGroup: {
          connectOrCreate: profile.categoryGroup.map((cg) => {
            return {
              where: {
                name: cg.name,
              },
              create: {
                name: cg.name,
              },
            };
          }),
        },
        category: {
          connectOrCreate: profile.category.map((c) => {
            return {
              where: {
                name: c.name,
              },
              create: {
                name: c.name,
              },
            };
          }),
        },
      },
    });
  }
  async delete(id: string): Promise<void> {
    await prismaClient.profile.delete({
      where: {
        id: id,
      },
    });

    await remoedUnsuedCategory();
    await remoedUnsuedCategoryGroup();
  }
  async update(id: string, profile: Profile): Promise<void> {
    const [
      existingAddress,
      existingPicture,
      existingPromotion,
      existingTelephone,
    ] = await Promise.all([
      prismaClient.address.findUnique({
        where: { profileId: id },
      }),
      prismaClient.picture.findUnique({
        where: { profileId: id },
      }),
      prismaClient.promotion.findUnique({
        where: { profileId: id },
      }),
      prismaClient.telephone.findUnique({
        where: { profileId: id },
      }),
    ]);

    await prismaClient.profile.update({
      where: {
        id: id,
      },
      data: {
        name: profile.name,
        informations: profile.informations,
        movie: profile.movie,
        resume: profile.resume,
        telephone: !profile.telephone
          ? existingTelephone
            ? { delete: true }
            : undefined
          : {
              upsert: {
                create: {
                  telephone: profile.telephone.telephone,
                  whatsapp: profile.telephone.whatsapp,
                },
                update: {
                  telephone: profile.telephone.telephone,
                  whatsapp: profile.telephone.whatsapp,
                },
              },
            },
        promotion: !profile.promotion
          ? existingPromotion
            ? {
                delete: true,
              }
            : undefined
          : {
              upsert: {
                create: {
                  title: profile.promotion.title,
                  active: profile.promotion.active,
                  description: profile.promotion.description,
                },
                update: {
                  title: profile.promotion.title,
                  active: profile.promotion.active,
                  description: profile.promotion.description,
                },
              },
            },
        picture: !profile.picture
          ? existingPicture
            ? {
                delete: true,
              }
            : undefined
          : {
              upsert: {
                create: {
                  key: profile.picture.key,
                  path: profile.picture.path,
                  size: profile.picture.size,
                  url: profile.picture.url,
                },
                update: {
                  key: profile.picture.key,
                  path: profile.picture.path,
                  size: profile.picture.size,
                  url: profile.picture.url,
                },
              },
            },
        address: !profile.address
          ? existingAddress
            ? {
                delete: true,
              }
            : undefined
          : {
              upsert: {
                update: {
                  cep: profile.address.cep,
                  city: profile.address.city,
                  complement: profile.address.complement,
                  lat: profile.address.lat,
                  lng: profile.address.lng,
                  neighborhood: profile.address.neighborhood,
                  number: profile.address.number,
                  street: profile.address.street,
                  uf: profile.address.uf,
                },
                create: {
                  cep: profile.address.cep,
                  city: profile.address.city,
                  complement: profile.address.complement,
                  lat: profile.address.lat,
                  lng: profile.address.lng,
                  neighborhood: profile.address.neighborhood,
                  number: profile.address.number,
                  street: profile.address.street,
                  uf: profile.address.uf,
                },
              },
            },
        category: {
          set: [], // Primeiro desconecta todos os relacionamentos existentes
          connectOrCreate: profile.category.map((c) => ({
            where: { name: c.name },
            create: { name: c.name },
          })),
        },
        categoryGroup: {
          set: [], // Primeiro desconecta todos os relacionamentos existentes
          connectOrCreate: profile.categoryGroup.map((c) => ({
            where: { name: c.name },
            create: { name: c.name },
          })),
        },
      },
    });

    await remoedUnsuedCategory();
    await remoedUnsuedCategoryGroup();
  }
}

async function remoedUnsuedCategory() {
  const categoriesWithoutProfiles = await prismaClient.category.findMany({
    where: {
      profile: {
        none: {}, // Busca categorias que não têm nenhum perfil relacionado
      },
    },
    select: { id: true },
  });

  await prismaClient.category.deleteMany({
    where: {
      id: {
        in: categoriesWithoutProfiles.map((category) => category.id),
      },
    },
  });
}

async function remoedUnsuedCategoryGroup() {
  const categoriesWithoutProfiles = await prismaClient.categoryGroup.findMany({
    where: {
      profile: {
        none: {}, // Busca categorias que não têm nenhum perfil relacionado
      },
    },
    select: { id: true },
  });

  await prismaClient.categoryGroup.deleteMany({
    where: {
      id: {
        in: categoriesWithoutProfiles.map((category) => category.id),
      },
    },
  });
}
