import { Injectable } from "@nestjs/common";
import { EmailService } from "../../infrastructure/email/email.service";
import { Article } from "../articles/article.entity";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";

@Injectable()
export class NotificationService {
    constructor(
        private emailService: EmailService,
        private prisma: PrismaService,
    ) {}

    notifyPublishedArticle = async (article: Article) => {
        const author = await this.prisma.user.findUnique({
            where: { id: article.authorId },
            select: {
                email: true,
                followedBy: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        if (!author.followedBy) return;

        this.emailService.sendEmail(
            `New article from ${author.email}`,
            `Check out the new article from ${author.email} at https://blog/articles/${article.id}`,
            author.followedBy.map(({ email }) => email),
        );
    };
}
