import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    ParseIntPipe,
    HttpException,
    HttpStatus,
} from "@nestjs/common";

import { CommentsService } from "../../../domain/comments/comments.service";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from "@nestjs/swagger";

import {
    CommentDto,
    CreateCommentDto,
    UpdateCommentDto,
    CreateCommentRequest,
    UpdateCommentRequest,
    CommentResponse,
    CreateSubCommentDto,
    CreateSubCommentRequest
} from "./comments.dto";

import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("comments")
@ApiTags("comments")

export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post("/:articleId")
    @ApiCreatedResponse({ type: CommentDto })
    create(@Param("articleId", ParseIntPipe) id: number, @Body() createCommentDto: CreateCommentDto, @Request() request) {
        const comment = new CreateCommentRequest(createCommentDto).toEntity();
        return this.commentsService.create({
            ...comment,
            authorId: request.user.id,
            articleId: id,
            comments: []
        });
    }

    @Get()
    @ApiOkResponse({ type: CommentDto, isArray: true })
    async findAll() {
        const comments = await this.commentsService.findAll();
        return comments.map((article) =>
            new CommentResponse(article).fromEntity(),
        );
    }

    // Retrieve a specific comment by id
    @Get("/:id")
    @ApiOkResponse({ type: CommentDto})
    async findOne(@Param("id") id: number) {
        try{
            const comment = await this.commentsService.findOne(+id);
            return new CommentResponse(comment).fromEntity();
        }
        catch(err){
            throw new HttpException('This comment doesn\'t exist !:' + err, HttpStatus.NOT_FOUND);
        }

    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch(":id")
    updateComment(
        @Param("id") id: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Request() request,
    ) {
        try{
            const comment = new UpdateCommentRequest(updateCommentDto).toEntity();
            return this.commentsService.update(+id, comment, request.user.id);
        }
        catch(err){
            throw new HttpException('An error occured while trying to update the comment: ' + err, HttpStatus.NOT_FOUND);
        }

    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async remove(@Param("id") id: string, @Request() request) {
        try {
            const deletedComment = await this.commentsService.remove(
                +id,
                request.user.id,
            );
            return new CommentResponse(deletedComment).fromEntity();
        }
        catch(err) {
            throw new HttpException('An error occured while trying to delete the comment:' + err, HttpStatus.NOT_FOUND);
        }
        
    }

    // Add subcomment to a comment

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch("/subcomment/:commentId")
    update(
        @Param("commentId") id: number,
        @Body() createSubCommentDto: CreateSubCommentDto
    ) {
        const comment = new CreateSubCommentRequest(createSubCommentDto.comment).toEntity();
        return this.commentsService.addComment(+id, comment);
    }
}
