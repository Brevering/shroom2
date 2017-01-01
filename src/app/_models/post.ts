export class Post {
        id: string;
        type: string;
        title: string;
        body?: string;
        videoLink?: string;
        imgLink?: string;
        audioLink?: string;
        category: string;
        author: string;
        createdAt: Date | undefined;
        updatedAt: Date | undefined;
        isDeleted: boolean;
};
