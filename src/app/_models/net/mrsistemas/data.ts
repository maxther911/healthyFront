import {City} from "./index";

export class Data {
  private _id: number;
  private _dni: string;
  private _name: string;
  private _lastName: string;
  private _address: string;
  private _email: string;
  private _cellphone: string;
  private _phone: string;
  private _birthDate : Date;
  private _contact : Data;
  private _birth_city : City;

  constructor() {}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get dni(): string {
    return this._dni;
  }

  set dni(value: string) {
    this._dni = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get cellphone(): string {
    return this._cellphone;
  }

  set cellphone(value: string) {
    this._cellphone = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
  }

  get contact(): Data {
    return this._contact;
  }

  set contact(value: Data) {
    this._contact = value;
  }

  get birth_city(): City {
    return this._birth_city;
  }

  set birth_city(value: City) {
    this._birth_city = value;
  }
}
