import { Mutable } from "../../utils/types";

export type Article = {
    id: number;
    authorId: number;
    title: string;
    description: string;
    body: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type MutableArticle = Mutable<Omit<Article, "authorId">>;
