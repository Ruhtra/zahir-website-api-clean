import { Profile } from "./Profile";

export type TelephonesProps = {
  id: string;

  telephone: String[];
  whatsapp: String[];

  readonly profile?: Profile;
};

export class Telephones {
  private constructor(private props: TelephonesProps) {}

  public static with(props: TelephonesProps) {
    return new Telephones(props);
  }

  public get id() {
    return this.props.id;
  }
  public get telephone() {
    return this.props.telephone;
  }
  public get whatsapp() {
    return this.props.whatsapp;
  }
}
