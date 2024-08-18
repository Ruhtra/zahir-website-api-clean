import { Profile } from "./Profile";

export type CategorieProps = {
  id: string;
  name: string;

  readonly profile: Profile;
};

export class Categorie {
  private constructor(private props: CategorieProps) {}

  public static with(props: CategorieProps) {
    return new Categorie(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }
}
