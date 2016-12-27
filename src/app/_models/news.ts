export class News {
    id: number;
    body: string;
    title: string;
    category: {
        id: string;
        name: string;
    };
    author: {
        id: string;
        username: string;
    };

}