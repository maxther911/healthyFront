export class Usuario {
    public id: number;
    public dni: string;
    public nombres: string;
    public apellidos: string;
    public ciudad: string;
    public direccion: string;
    public email: string;
    public movil: string;
    public pais: string;
    public telPrincipal: string;

    constructor(
        id: number,
        dni: string,
        nombres: string,
        apellidos: string,
        ciudad: string,
        direccion: string,
        email: string,
        movil: string,
        pais: string,
        telPrincipal: string
    ) {
        this.id = id;
        this.dni = dni;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.email = email;
        this.movil = movil;
        this.pais = pais;
        this.telPrincipal = telPrincipal;
    }

}
