import { Category } from "./Category";
import { CategoryGroup } from "./CategoryGroup";
import { HomePagePromotion } from "./HomePagePromotion";

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
  picture?: {
    id: string;
    key: string;
    name: string;
    size: Number;
    url: string;
  };
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

export class Profile {
  private constructor(private props: ProfileProps) {}

  public static with(props: ProfileProps) {
    return new Profile(props);
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
