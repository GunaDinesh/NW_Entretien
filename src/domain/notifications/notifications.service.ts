import { Injectable } from "@nestjs/common";
import { EmailService } from "../../infrastructure/email/email.service";
import { Article } from "../articles/article.entity";
import { Comment } from "../comments/comments.entity";
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

        await this.emailService.sendEmail(
            `New article from ${author.email}`,
            `Check out the new article from ${author.email} at https://blog/articles/${article.id}`,
            '',
        );
    };

    notifyPublishedComment = async (comment: Comment) => {
        const author = await this.prisma.user.findUnique({
            where: { id: comment.authorId},
            select: {
                email: true,
            },
        });
        if(!author) return;

        const receiverArticle = await this.prisma.article.findUnique({
            where: { id: comment.articleId},
            select: {
                authorId: true,
            },
        });
        if(!receiverArticle) return;

        const receiver = await this.prisma.user.findUnique({
            where: { id: receiverArticle.authorId},
            select: {
                email: true,
            },            
        });

        if (!receiver) return;

        await this.emailService.sendEmail(
            `New comment from ${author.email}`,
            `Check out the new comment from ${author.email} at https://blog/articles/`,
            receiver.email,
        );
    }

    notifySubComment = async (authorId: number) => {
        const author = await this.prisma.user.findUnique({
            where: { id: authorId},
            select: {
                email: true,
            },
        });
        if(!author) return;
        await this.emailService.sendEmail(
            `New comment from ${author.email}`,
            `Check out the new comment from ${author.email} at https://blog/articles/`,
            author.email,
        );
    }
}
