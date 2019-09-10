export class CategoryDevice {
    id: string;
    description: string;
    name: string;

    constructor(id: string,
        description: string,
        name: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    get getId() {
        return this.id;
    }

    set setId(id: string) {
        this.id = id;
    }

    get getName() {
        return this.name;
    }

    set setName(name: string) {
        this.name = name;
    }

    get getDescription() {
        return this.description;
    }

    set setDescription(description: string) {
        this.description = description;
    }

}
