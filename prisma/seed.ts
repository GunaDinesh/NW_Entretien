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

    console.log({ firstUser, firstPost, secondPost });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
