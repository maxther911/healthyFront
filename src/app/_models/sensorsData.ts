declare module SensorsData {

  export interface Patient {
    id: any;
    email: string;
    username?: any;
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
  }

  export interface Type {
    code: number;
    description: string;
  }

  export interface Group {
    code: number;
    description: string;
  }

  export interface Measurement {
    code: string;
    description: string;
  }

  export interface Quantity {
    group: Group;
    type: Type;
    measurement: Measurement;
    value: number;
  }

  export interface DataSensors {
    patient: Patient;
    id: string;
    sensor_id: any;
    quantities: Quantity[];
    type: Type;
    date: string;
  }

}
