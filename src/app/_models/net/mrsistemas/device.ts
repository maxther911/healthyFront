import { CategoryDevice } from './index';

export class Device {
    private id: string;
    private name: string;
    private usuarioId: string;
    private state: string;
    private category: CategoryDevice;

    constructor(
        id: string,
        name: string,
        usuarioId: string,
        state: string,
        category: CategoryDevice
    ) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.usuarioId = usuarioId;
        this.category = category;
    }

    get getId(): string {
        return this.id;
    }

    set setId(id: string) {
        this.id = id;
    }

    get getName(): string {
        return this.name;
    }

    set setName(name: string) {
        this.name = name;
    }
    get getUsuarioId(): string {
        return this.usuarioId;
    }

    set setUsuarioId(usuarioId: string) {
        this.usuarioId = usuarioId;
    }

    get getState(): string {
        return this.state;
    }

    set setState(state: string) {
        this.state = state;
    }

    get getCategory(): CategoryDevice {
        return this.category;
    }

    set setCategory(category: CategoryDevice) {
        this.category = category;
    }

}
