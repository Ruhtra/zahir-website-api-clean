import { Profile } from "./Profile";

export type PictureProps = {
  id: string;
  key: string;
  name: string;
  size: number;
  url: string;

  readonly profile?: Profile;
  profileID?: string;
};
export type PictureCreateProps = Omit<PictureProps, "id"> & {
  profileID: string;
};

export class Picture {
  private constructor(private props: PictureProps) {}

  public static with(props: PictureProps) {
    return new Picture(props);
  }
  public static create(props: PictureCreateProps) {
    return new Picture({
      id: undefined,
      key: props.key,
      name: props.name,
      size: props.size,
      url: props.url,
      profileID: props.profileID,
    });
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

  public get profile() {
    return this.props.profile;
  }
  public get profileID() {
    return this.props.profileID;
  }
}
