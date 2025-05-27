export class User {
    id: number;
    userName?: string;
    password?: string;
}

export class CoverPhoto {
    id: number;
    idBook: number;
    url?: string;
}

export class Book {
    id: number;
    title?: string;
    description?: string;
    pageCount: number;
    excerpt?: string;
    publishDate?: string;
}

export class Author {
    id: number;
    idBook: number;
    firstName?: string;
    lastName?: string;
}

export class Activity {
    id: number;
    title: string;
    dueDate?: string;
    completed?: boolean;
}
