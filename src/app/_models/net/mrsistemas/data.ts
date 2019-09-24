export class Data {
    public id: number;
    public dni: string;
    public name: string;
    public lastName: string;
    public address: string;
    public email: string;
    public cellphone: string;
    public phone: string;

    constructor(
        id: number,
        dni: string,
        name: string,
        lastName: string,
        address: string,
        email: string,
        cellphone: string,
        phone: string
    ) {
        this.id = id;
        this.dni = dni;
        this.name = name;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.cellphone = cellphone;
        this.phone = phone;
    }

}
