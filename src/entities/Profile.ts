import { Category } from "./Category";
import { CategoryGroup } from "./CategoryGroup";
import { HomePagePromotion } from "./HomePagePromotion";
import { Picture } from "./Picture";

export type ProfileProps = {
  id: string;
  name: string;
  informations?: string;
  movie?: string;
  resume?: string;
  readonly createdAt: Date;

  address?: {
    id: string;
    cep: string;
    city: string;
    complement?: string;
    lat: number;
    lng: number;
    neighborhood: string;
    number: string;
    street: string;
    uf: string;
  };
  picture?: Picture;
  promotion?: {
    id: string;
    title: string;
    description?: string;
  };
  telephone?: {
    id: string;
    telephone: string[];
    whatsapp: string[];
  };
  readonly categoryGroup?: CategoryGroup[];
  readonly category?: Category[];
  readonly homePagePromotion?: HomePagePromotion;
};

export type ProfileCreateProps = Omit<
  ProfileProps,
  | "id"
  | "createdAt"
  | "address"
  | "picture"
  | "promotion"
  | "telephone"
  | "category"
  | "categoryGroup"
> & {
  address?: Omit<ProfileProps["address"], "id">;
  // picture?: Omit<Picture, "id">;
  promotion?: Omit<ProfileProps["promotion"], "id">;
  telephone?: Omit<ProfileProps["telephone"], "id">;
  category?: { name: string }[];
  categoryGroup?: { name: string }[];
};

//TODO - HOMEPROMOTION

export class Profile {
  private constructor(private props: ProfileProps) {}

  public static with(props: ProfileProps) {
    return new Profile(props);
  }
  public static create(props: ProfileCreateProps) {
    return new Profile({
      id: undefined,
      createdAt: new Date(),
      name: props.name,
      ...(props.address && {
        address: {
          id: undefined,
          cep: props.address.cep,
          city: props.address.city,
          lat: props.address.lat,
          lng: props.address.lng,
          neighborhood: props.address.neighborhood,
          number: props.address.number,
          street: props.address.street,
          uf: props.address.uf,
          complement: props.address.complement,
        },
      }),
      // ...(props.picture && {
      //   picture: {
      //     id: undefined,
      //     key: props.picture.key,
      //     name: props.picture.name,
      //     size: props.picture.size,
      //     url: props.picture.url,
      //   },
      // }),

      ...(props.promotion && {
        promotion: {
          id: undefined,
          title: props.promotion.title,
          description: props.promotion.description,
        },
      }),
      ...(props.telephone && {
        telephone: {
          id: undefined,
          telephone: props.telephone.telephone,
          whatsapp: props.telephone.whatsapp,
        },
      }),
      ...{
        category: props.category.map((c) => {
          return Category.with({
            name: c.name,
          });
        }),
      },
      ...{
        categoryGroup: props.categoryGroup.map((c) => {
          return CategoryGroup.with({
            name: c.name,
          });
        }),
      },
      homePagePromotion: props.homePagePromotion,
    });
  }

  public get id() {
    return this.props.id;
  }
  public get informations() {
    return this.props.informations;
  }
  public get movie() {
    return this.props.movie;
  }
  public get name() {
    return this.props.name;
  }
  public get resume() {
    return this.props.resume;
  }
  public get createdAt() {
    return this.props.createdAt;
  }

  public get address() {
    return this.props.address;
  }
  public get picture() {
    return this.props.picture;
  }
  public get promotion() {
    return this.props.promotion;
  }
  public get telephone() {
    return this.props.telephone;
  }
  public get categoryGroup() {
    return this.props.categoryGroup;
  }
  public get category() {
    return this.props.category;
  }
  public get homePagePromotion() {
    return this.props.homePagePromotion;
  }
}
