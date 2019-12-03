declare module Patient {

  export interface User {
    id: any;
    email: string;
    username?: any;
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    diagnostic: Diagnostic
  }

  export interface Diagnostic {
    fecha: string;
    name: String;
    diseases: Disease[];
  }

  export interface Disease {
    code: string;
    name: string;
    risk: number;
    category: Category;
    type: Type;
  }

  export interface Category {
    code: string;
    description: string;
    disseaseType: Type;

  }

  export interface Type {
    code: number;
    description: string;
  }

}
