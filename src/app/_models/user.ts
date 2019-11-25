import { City } from "."


export class User {
    public dni: string
        public id: number
        public username: string
        public password: string
        public enabled: boolean
        public accountNonLocked: boolean
        public accountNonExpired: boolean
        public credentialsNonExpired: boolean
        public name: string
        public lastName: string
        public address: string
        public email: string
        public cellphone: string
        public phone: string
        public birthDate: Date
        public contact: User
        public birth_city: City
        public photo: string

    constructor( id: number,
        username: string,
        password: string,
        name: string,
        lastName: string,
        address: string,
        email: string,
        cellphone: string,
        phone: string,
        birthDate: Date,
        contact: User,
        birth_city: City,
        photo: string) {
            this.id = id
        this.username = username
        this.password = password
        this.name = name
        this.lastName = lastName
        this.address = address
        this.email = email
        this.cellphone = cellphone
        this.phone = phone
        this.birthDate = birthDate
        this.contact = contact
        this.birth_city = birth_city
        this.photo = photo
        }
}
