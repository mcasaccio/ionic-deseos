import { ListItem } from "./list-item.model";

export class List {
    id: number;
    title: string;
    createAt: Date;
    completedAt: Date;
    completed: boolean;
    items: ListItem[];

    constructor( title: string ) {
        this.title = title;
        this.createAt = new Date();
        this.completedAt = this.completedAt;
        this.items = [];
        this.completed = false;

        this.id = new Date().getTime();
    }
}