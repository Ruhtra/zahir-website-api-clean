import { Profile } from "./Profile";

export type AddressProps = {
  id: string;
  cep: String;
  city: String;
  complement?: String;
  lat: number;
  lng: number;
  neighborhood: String;
  number: String;
  street: String;
  uf: String;

  readonly profile: Profile;
};

export class Address {
  private constructor(private props: AddressProps) {}

  public static with(props: AddressProps) {
    return new Address(props);
  }

  public get id() {
    return this.props.id;
  }
  public get cep() {
    return this.props.cep;
  }
  public get city() {
    return this.props.city;
  }
  public get complement() {
    return this.props.complement;
  }
  public get lat() {
    return this.props.lat;
  }
  public get lng() {
    return this.props.lng;
  }
  public get neighborhood() {
    return this.props.neighborhood;
  }
  public get number() {
    return this.props.number;
  }
  public get street() {
    return this.props.street;
  }
  public get uf() {
    return this.props.uf;
  }
}
