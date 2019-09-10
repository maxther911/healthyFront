export class Credentials {
    constructor(
        public user_name: string,
        public scope: any ,
        public active: boolean,
        public id: number,
        public exp: number,
        public authorities: any ,
        public jti: string,
        public email: string,
        public client_id: string) { }
  }
