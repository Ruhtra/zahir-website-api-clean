import { Profile } from "./Profile";

export type CategoryGroupProps = {
  id: string;
  name: string;

  readonly profile?: Profile;
};

export class CategoryGroup {
  private constructor(private props: CategoryGroupProps) {}

  public static with(props: Omit<CategoryGroupProps, "id">) {
    return new CategoryGroup({
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
