import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
    Comment,
    MutableComment,
} from "../../../domain/comments/comments.entity";
import { RequestDto, ResponseDto } from "../dto";
import { WithOptional } from "../../../utils/types";

export class CommentDto implements Comment {
    @ApiProperty()
    id: number;

    @ApiProperty()
    authorId: number;

    @ApiProperty()
    articleId: number;

    @ApiProperty()
    body: string;

    @ApiProperty()
    comments: string[];

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class CreateCommentDto
    implements WithOptional<MutableComment, "body" | "published">
{
    @ApiProperty()
    body: string;

    @ApiProperty({ required: false, default: false })
    published?: boolean = false;

}

export class CreateSubCommentDto
    implements WithOptional<MutableComment, "body" | "published">
{
    @ApiProperty()
    comment: string;
}

export class CommentResponse implements ResponseDto<Comment, CommentDto> {
    data: Comment;
    constructor(data: Comment) {
        this.data = data;
    }
    fromEntity = (): CommentDto => {
        return {
            id: this.data.id,
            authorId: this.data.authorId,
            articleId: this.data.articleId,
            body: this.data.body,
            published: this.data.published,
            comments: this.data.comments,
            createdAt: this.data.createdAt,
            updatedAt: this.data.updatedAt,
        };
    };
}

export class CreateCommentRequest
    implements RequestDto<MutableComment, CreateCommentDto>
{
    data: CreateCommentDto;
    constructor(data: CreateCommentDto) {
        this.data = data;
    }
    toEntity = (): MutableComment => {
        return {
            body: this.data.body,
            published: this.data.published ?? false,
        };
    };
}

export class CreateSubCommentRequest 
    implements RequestDto<string, string>
{
    data: string; 
    constructor(data: string) {
        this.data = data;
    }
    toEntity = (): string => {
        return this.data
    };
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

export class UpdateCommentRequest
    implements RequestDto<Partial<MutableComment>, UpdateCommentDto>
{
    data: UpdateCommentDto;
    constructor(data: UpdateCommentDto) {
        this.data = data;
    }
    toEntity = (): Partial<MutableComment> => {
        return {
            body: this.data.body,
            published: this.data.published,
        };
    };
}