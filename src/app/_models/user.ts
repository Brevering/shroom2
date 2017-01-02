export class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isDeleted: boolean;
    registeredAt: Date;
    posts: {}[];
    likes: {}[];
}
