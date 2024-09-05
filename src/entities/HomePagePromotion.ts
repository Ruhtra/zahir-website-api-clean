import { Profile } from "./Profile";

export type HomePagePromotionProps = {
  id: string;
  order: number;

  readonly profile?: Profile;
  readonly profielId?: string;
};

export type HomePagePromotionCreateProps = Omit<
  HomePagePromotionProps,
  "id" | "profile"
>;

export class HomePagePromotion {
  private constructor(private props: HomePagePromotionProps) {}

  public static with(props: HomePagePromotionProps) {
    return new HomePagePromotion(props);
  }
  public static create(props: HomePagePromotionCreateProps) {
    return new HomePagePromotion({
      id: undefined,
      order: props.order,
      profielId: props.profielId,
    });
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
  public get profileId() {
    return this.props.profielId;
  }
}
