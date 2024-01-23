import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { Comment, MutableComment } from "./comments.entity";
import { NotificationService } from "../notifications/notifications.service";
import { Mutable } from "../../utils/types";
import { validateUserCanMutateComment, validateCommentContent } from "./rules";

@Injectable()
export class CommentsService {
    constructor(
        private prisma: PrismaService,
        private notificationService: NotificationService
    ) {}

    create = async (comment: Mutable<Comment>) => {
        validateCommentContent(comment.body);
        try {
            const createdComment = await this.prisma.comment.create({
                data: { ...comment },
            })
            if (createdComment.published)
                this.notificationService.notifyPublishedComment(createdComment);
        }
        catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    };

    publish = (id: number) => {
        this.prisma.comment
            .update({
                where: { id },
                data: { published: true },
            })
            .then((comment: Comment) =>
                this.notificationService.notifyPublishedComment(comment),
            );
    };

    findAll = async (): Promise<Comment[]> => {
        return await this.prisma.comment.findMany({
            where: { published: true },
        });
    };

    findOne = (id: number) => {
        return this.prisma.comment.findUnique({ where: { id } });
    };

    update = async (
        id: number,
        comment: Partial<MutableComment>,
        userId: number,
    ) => {
        validateCommentContent(comment.body);
        const persistedComment = await this.prisma.comment.findUnique({
            where: { id },
        });
        validateUserCanMutateComment(persistedComment, userId);
        return this.prisma.comment.update({
            where: { id },
            data: comment,
        });
    };

    remove = async (id: number, userId: number) => {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        validateUserCanMutateComment(comment, userId);
        return this.prisma.comment.delete({ where: { id } });
    };

    // Method that adds subcomment to a comment
    addComment = async (
        id: number,
        comment: string,
    ) => {
        validateCommentContent(comment);

        const persistedComment = await this.prisma.comment.findUnique({
            where: { id },
        })

        if(!persistedComment){
            throw new HttpException('The comment doesn\'t exist !', HttpStatus.NOT_FOUND);
        }
        
        if(persistedComment){
            persistedComment.comments.push(comment);
        }
        return this.prisma.comment.update({
            where: { id },
            data: persistedComment,
        })
        .then(() =>
            this.notificationService.notifySubComment(persistedComment.authorId),
        );
       
    };
}
