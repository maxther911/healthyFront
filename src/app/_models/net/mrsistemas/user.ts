import { City } from './city';

export class User {
    
    private _dni: string;
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _username: string;
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    private _enabled: boolean;
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: boolean) {
        this._enabled = value;
    }
    private _accountNonLocked: boolean;
    public get accountNonLocked(): boolean {
        return this._accountNonLocked;
    }
    public set accountNonLocked(value: boolean) {
        this._accountNonLocked = value;
    }
    private _accountNonExpired: boolean;
    public get accountNonExpired(): boolean {
        return this._accountNonExpired;
    }
    public set accountNonExpired(value: boolean) {
        this._accountNonExpired = value;
    }
    private _credentialsNonExpired: boolean;
    public get credentialsNonExpired(): boolean {
        return this._credentialsNonExpired;
    }
    public set credentialsNonExpired(value: boolean) {
        this._credentialsNonExpired = value;
    }
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    private _address: string;
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    private _cellphone: string;
    public get cellphone(): string {
        return this._cellphone;
    }
    public set cellphone(value: string) {
        this._cellphone = value;
    }
    private _phone: string;
    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }
    private _birthDate: Date;
    public get birthDate(): Date {
        return this._birthDate;
    }
    public set birthDate(value: Date) {
        this._birthDate = value;
    }
    private _contact: User;
    public get contact(): User {
        return this._contact;
    }
    public set contact(value: User) {
        this._contact = value;
    }
    private _birth_city: City;
    public get birth_city(): City {
        return this._birth_city;
    }
    public set birth_city(value: City) {
        this._birth_city = value;
    }
    private _photo: string;
    public get photo(): string {
        return this._photo;
    }
    public set photo(value: string) {
        this._photo = value;
    }
    
    
    


    constructor(
        id: number,
        username: string,
        email: string,
        enabled: boolean,
        accountNonLocked,
        accountNonExpired: boolean,
        credentialsNonExpired: boolean,
        dni: string
    ) {
        this.id = id;
        this.username = username;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.dni = dni
    }

    public get dni(): string {
        return this._dni;
    }

    public set dni(value: string) {
        this._dni = value;
    }

}
