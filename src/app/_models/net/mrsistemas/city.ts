import { Country, Location } from "./index";

export class City {
  private _id: number;
  private _code: string;
  private _name: string;
  private _location: Location;

  private _country: Country;

  public get country(): Country {
    return this._country;
  }
  
  public set country(value: Country) {
    this._country = value;
  }

  public get id(): number {
    return this._id;
  }
  
  public set id(value: number) {
    this._id = value;
  }

  public get code(): string {
    return this._code;
  }
  public set code(value: string) {
    this._code = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get location(): Location {
    return this._location;
  }

  public set location(value: Location) {
    this._location = value;
  }




}
