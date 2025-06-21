export class Notes {
    id: number;
    title: string;
    body?: string;
    userId: number;
    createdAt: Date;

    constructor(partial: Partial<Notes>) {
        Object.assign(this, partial);
    }
}
