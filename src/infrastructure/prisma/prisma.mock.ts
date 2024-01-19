import { Mutable } from "../../utils/types";
import { Article } from "../../domain/articles/article.entity";
import { getMax } from "../../utils/objects";
import { User } from "../../domain/users/user.entity";

interface ModelTest<T> {
    data: T[];
    loadData: {
        [key: string]: () => void;
    };
    create?: ({ data }: { data: Mutable<T> }) => T;
    findUnique?: ({ where: { id } }) => T;
}

export interface PrismaServiceTest {
    user: ModelTest<User>;
    article: ModelTest<Article>;
    loadUserData: () => void;
    cleanup: () => void;
}

const generatePersistanceData = <T>(data: T[]) => {
    const incrementedId = (getMax(data, "id") ?? 0) + 1;
    const now = new Date();

    return {
        id: incrementedId,
        createdAt: now,
        updatedAt: now,
    };
};

const UserModel: ModelTest<User> = {
    data: [],
    loadData: {
        common: () => {
            const user: Mutable<User> = {
                email: "user@email.com",
                password: "password",
                followedBy: [],
                following: [],
            };

            UserModel.create({ data: user });
        },
    },
    create: ({ data }) => {
        const user: User = {
            ...data,
            ...generatePersistanceData(UserModel.data),
        };
        UserModel.data.push(user);
        return user;
    },
    findUnique: ({ where: { id } }) => {
        return UserModel.data.filter((user) => user.id === id)[0];
    },
};

const ArticleModel: ModelTest<Article> = {
    data: [],
    loadData: {
        common: () => {
            const article: Mutable<Article> = {
                authorId: 1,
                title: "A first article",
                description: "Splendid description",
                body: "This is the article body",
                published: true,
            };
            ArticleModel.create({ data: article });
        },
    },
    create: ({ data }) => {
        const article: Article = {
            ...data,
            ...generatePersistanceData(ArticleModel.data),
        };
        ArticleModel.data.push(article);
        return article;
    },
};

export const PrismaTest: PrismaServiceTest = {
    user: UserModel,
    article: ArticleModel,
    loadUserData: UserModel.loadData.common,
    // TODO: Investigate why this is required.It seems Jets does not recreate the PrismaTest object for each new test run, hence not cleaning up the database.
    cleanup: () => {
        UserModel.data = [];
        ArticleModel.data = [];
    },
};
