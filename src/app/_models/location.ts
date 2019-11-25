export class Location{
  private _id: number;
  private _altitude: number;
  private _latitude: number;
  private _longitude: number;


  constructor(id: number, altitude: number, latitude: number, longitude: number) {
    this._id = id;
    this._altitude = altitude;
    this._latitude = latitude;
    this._longitude = longitude;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get altitude(): number {
    return this._altitude;
  }

  set altitude(value: number) {
    this._altitude = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }
}
