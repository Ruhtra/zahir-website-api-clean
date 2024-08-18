import { Profile } from "./Profile";

export type HomePageProps = {
  id: string;
  order: number;

  readonly profile: Profile;
};

export class HomePage {
  private constructor(private props: HomePageProps) {}

  public static with(props: HomePageProps) {
    return new HomePage(props);
  }

  public get id() {
    return this.props.id;
  }

  public get order() {
    return this.props.order;
  }
}
