import { Profile } from "./Profile";

export type PictureProps = {
  id: string;
  key: String;
  name: String;
  size: Number;
  url: String;

  readonly profile: Profile;
};

export class Picture {
  private constructor(private props: PictureProps) {}

  public static with(props: PictureProps) {
    return new Picture(props);
  }

  public get id() {
    return this.props.id;
  }
  public get key() {
    return this.props.key;
  }
  public get name() {
    return this.props.name;
  }
  public get size() {
    return this.props.size;
  }
  public get url() {
    return this.props.url;
  }
}
