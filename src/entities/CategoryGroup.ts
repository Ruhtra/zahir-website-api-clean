import { Profile } from "./Profile";

export type CategoryGroupProps = {
  id: string;
  name: string;

  readonly profile?: Profile;
};

export class CategoryGroup {
  private constructor(private props: CategoryGroupProps) {}

  public static with(props: CategoryGroupProps) {
    return new CategoryGroup(props);
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
