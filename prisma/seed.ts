import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const firstUser = await prisma.user.upsert({
        where: { email: "toto@school.com" },
        update: {},
        create: {
            email: "toto@school.com",
            password: "head0",
        },
    });
    const firstPost = await prisma.article.upsert({
        where: { title: "Is this a good article ?" },
        update: {},
        create: {
            title: "Is this a good article ?",
            authorId: firstUser.id,
            body: "Answer in the comments",
            description: "We wonder what makes a good article",
            published: false,
        },
    });

    const secondPost = await prisma.article.upsert({
        where: { title: "Is this a good repository ?" },
        update: {},
        create: {
            title: "Is this a good repository ?",
            authorId: firstUser.id,
            body: "Our engineers have been working hard, issuing new releases with many improvements...",
            description: "Assessing what makes a good repo",
            published: true,
        },
    });

    const firstComment = await prisma.comment.upsert({
        where: { id: 1 },
        update: {},
        create: {
            authorId: 1,
            body: "The very first comment",
            published: true,
            articleId: 1
        },
    })

    console.log({ firstUser, firstPost, secondPost, firstComment });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
