import { User } from "../entities/user.entity";

export class ReturnUserDto {
    id: number;
    email: string;
    name: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
    }

}
