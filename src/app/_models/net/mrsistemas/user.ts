import { Data } from './data';
export class User {
    public id: number;
    public username: string;
    public password: string;
    public enabled: boolean;
    public accountNonLocked: boolean;
    public accountNonExpired: boolean;
    public credentialsNonExpired: boolean;
    public data: Data;

    constructor(
        id: number,
        username: string,
        email: string,
        enabled: boolean,
        accountNonLocked,
        accountNonExpired: boolean,
        credentialsNonExpired: boolean,
        data: Data
    ) {
        this.id = id;
        this.username = username;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.data = data;
    }

}
