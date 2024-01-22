import { Mutable } from "../../utils/types";

export type Comment = {
    id: number;
    authorId: number;
    body: string;
    articleId: number;
    published: boolean;
    comments: string[];
    createdAt: Date;
    updatedAt: Date
};

export type MutableComment = Mutable<Omit<Comment, "authorId" | "articleId" | "comments">>;
