import { Profile } from "./Profile";

export type HomePagePromotionProps = {
  id: string;
  order: number;

  readonly profile?: Profile;
};

export class HomePagePromotion {
  private constructor(private props: HomePagePromotionProps) {}

  public static with(props: HomePagePromotionProps) {
    return new HomePagePromotion(props);
  }

  public get id() {
    return this.props.id;
  }
  public get order() {
    return this.props.order;
  }

  public get profile() {
    return this.props.profile;
  }
}
