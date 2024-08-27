export type GoogleUserProps = {
  id: string;
  email: string;
  name?: string;
  picture: string;
  googleId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export class GoogleUser {
  private constructor(private props: GoogleUserProps) {}

  public static with(props: GoogleUserProps) {
    return new GoogleUser(props);
  }

  public get id() {
    return this.props.id;
  }
  public get email() {
    return this.props.email;
  }
  public get name() {
    return this.props.name;
  }
  public get picture() {
    return this.props.picture;
  }
  public get googleId() {
    return this.props.googleId;
  }
  public get createdAt() {
    return this.props.createdAt;
  }
  public get updatedAt() {
    return this.props.updatedAt;
  }
}
