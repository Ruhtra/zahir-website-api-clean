import { Profile } from "./Profile";

export type PromotionProps = {
  id: string;
  title: String;
  description?: String;

  readonly profile: Profile;
};

export class Promotion {
  private constructor(private props: PromotionProps) {}

  public static with(props: PromotionProps) {
    return new Promotion(props);
  }

  public get id() {
    return this.props.id;
  }

  public get title() {
    return this.props.title;
  }

  public get description() {
    return this.props.description;
  }
}
