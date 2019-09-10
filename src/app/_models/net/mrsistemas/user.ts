import { Usuario } from './usuario';
export class User {
    public id: number;
    public username: string;
    public email: string;
    public enabled: boolean;
    public accountNonLocked: boolean;
    public accountNonExpired: boolean;
    public credentialsNonExpired: boolean;
    public data: Usuario;



    constructor(
        id: number,
        username: string,
        email: string,
        enabled: boolean,
        accountNonLocked,
        accountNonExpired: boolean,
        credentialsNonExpired: boolean,
        data: Usuario
    ) {
        this.id = id;
        this.username = username;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.data = data;


    }

}
