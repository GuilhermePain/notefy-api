export class User {
    id: number;
    name: string;
    email: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
