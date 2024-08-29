import { Profile } from "./Profile";

export type CategoryProps = {
  id: string;
  name: string;

  readonly profile?: Profile;
};

export class Category {
  private constructor(private props: CategoryProps) {}

  public static with(props: Omit<CategoryProps, "id">) {
    return new Category({
      id: undefined,
      name: props.name,
      profile: props.profile,
    });
  }

  public get id() {
    return this.props.id;
  }
  public get name() {
    return this.props.name;
  }

  public get profile() {
    return this.props.profile;
  }
}
