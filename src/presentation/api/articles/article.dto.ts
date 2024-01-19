import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
    Article,
    MutableArticle,
} from "../../../domain/articles/article.entity";
import { RequestDto, ResponseDto } from "../dto";
import { WithOptional } from "../../../utils/types";

export class ArticleDto implements Article {
    @ApiProperty()
    id: number;

    @ApiProperty()
    authorId: number;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty()
    body: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;


}

export class ArticleResponse implements ResponseDto<Article, ArticleDto> {
    data: Article;
    constructor(data: Article) {
        this.data = data;
    }
    fromEntity = (): ArticleDto => {
        return {
            id: this.data.id,
            authorId: this.data.authorId,
            title: this.data.title,
            description: this.data.description,
            body: this.data.body,
            published: this.data.published,
            createdAt: this.data.createdAt,
            updatedAt: this.data.updatedAt,
        };
    };
}

export class CreateArticleDto
    implements WithOptional<MutableArticle, "description" | "published">
{
    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    body: string;

    @ApiProperty({ required: false, default: false })
    published?: boolean = false;


}

export class CreateArticleRequest
    implements RequestDto<MutableArticle, CreateArticleDto>
{
    data: CreateArticleDto;
    constructor(data: CreateArticleDto) {
        this.data = data;
    }
    toEntity = (): MutableArticle => {
        return {
            title: this.data.title,
            description: this.data.description ?? "",
            body: this.data.body,
            published: this.data.published ?? false,
        };
    };
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class UpdateArticleRequest
    implements RequestDto<Partial<MutableArticle>, UpdateArticleDto>
{
    data: UpdateArticleDto;
    constructor(data: UpdateArticleDto) {
        this.data = data;
    }
    toEntity = (): Partial<MutableArticle> => {
        return {
            title: this.data.title,
            description: this.data.description,
            body: this.data.body,
            published: this.data.published,
        };
    };
}
