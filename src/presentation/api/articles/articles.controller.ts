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
} from "@nestjs/common";
import { ArticlesService } from "../../../domain/articles/articles.service";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from "@nestjs/swagger";
import {
    ArticleDto,
    ArticleResponse,
    CreateArticleDto,
    CreateArticleRequest,
    UpdateArticleDto,
    UpdateArticleRequest,
} from "./article.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("articles")
@ApiTags("articles")
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiCreatedResponse({ type: ArticleDto })
    create(@Body() createArticleDto: CreateArticleDto, @Request() request) {
        const article = new CreateArticleRequest(createArticleDto).toEntity();
        return this.articlesService.create({
            ...article,
            authorId: request.user.id,
        });
    }

    @Get()
    @ApiOkResponse({ type: ArticleDto, isArray: true })
    async findAll() {
        const articles = await this.articlesService.findAll();
        return articles.map((article) =>
            new ArticleResponse(article).fromEntity(),
        );
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("/mine")
    @ApiOkResponse({ type: ArticleDto, isArray: true })
    findMine(@Request() request) {
        return this.articlesService.findMine(request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("/drafts")
    @ApiOkResponse({ type: ArticleDto, isArray: true })
    async findDrafts(@Request() request) {
        return this.articlesService.findDrafts(request.user.id);
    }

    // To ensure the above routes are not recognized as params, we put the detailed :id one after
    // Please see here for more details: https://github.com/nestjs/nest/issues/995
    @Get("/:id")
    @ApiOkResponse({ type: ArticleDto })
    async findOne(@Param("id") id: number) {
        const article = await this.articlesService.findOne(+id);
        return new ArticleResponse(article).fromEntity();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateArticleDto: UpdateArticleDto,
        @Request() request,
    ) {
        const article = new UpdateArticleRequest(updateArticleDto).toEntity();
        return this.articlesService.update(+id, article, request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async remove(@Param("id") id: string, @Request() request) {
        const deletedArticle = await this.articlesService.remove(
            +id,
            request.user,
        );
        return new ArticleResponse(deletedArticle).fromEntity();
    }
}
