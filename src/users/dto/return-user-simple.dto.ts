import { User } from "@prisma/client";

export class ReturnUserSimpleDto {
    email: string;
    name: string;

    constructor(user: User) {
        this.email = user.email;
        this.name = user.name;
    }

}
