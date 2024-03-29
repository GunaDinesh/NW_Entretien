import { HttpException, HttpStatus } from "@nestjs/common";
import { Comment, MutableComment } from "./comments.entity";

const canUserMutateComment= (comment: Comment, userId: number) => {
    return comment.authorId === userId;
};

export const validateUserCanMutateComment = (
    comment: Comment,
    userId: number,
) => {
    if (!canUserMutateComment(comment, userId)) {
        throw new Error("User cannot mutate comment");
    }
};

// Verifies if the comment contains any vulgarity

export const validateCommentContent = (
    comment: string
) => {
    var curseWordRegEx = /\bshit\b/i;
    if(curseWordRegEx.test(comment)) {
        throw new HttpException('Comment contains curse words !', HttpStatus.BAD_REQUEST);
    }
}
