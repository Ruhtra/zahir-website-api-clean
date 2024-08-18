import { Address } from "./Address";
import { Categorie } from "./Categorie";
import { CategoryType } from "./CategorieType";
import { Picture } from "./Picture";
import { Promotion } from "./Promotion";
import { Telephones } from "./Telephones";

export type ProfileProps = {
  id: String;
  name: String;
  informations?: String;
  movie?: String;
  resume?: String;
  categoryType: CategoryType;
  readonly createdAt: Date;

  readonly categorie: Categorie[];
  readonly promotion?: Promotion;
  readonly picture?: Picture;
  readonly telephones?: Telephones;
  readonly address?: Address;
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
}
