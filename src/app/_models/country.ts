import { City } from "./city";

export class Country {
  private _id: number
  private _code: string
  private _name: string
  private _cities: City[];

  constructor(id: number, code: string, name: string) {
    this._id = id;
    this._code = code;
    this._name = name;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  public get cities(): City[] {
    return this._cities;
  }
  public set cities(value: City[]) {
    this._cities = value;
  }
}
