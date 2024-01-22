import { Module } from "@nestjs/common";
import { ArticlesApiModule } from "./articles/articles.module";
import { CommentsApiModule } from "./comments/comments.module";
import { AuthApiModule } from "./auth/auth.module";

@Module({
    imports: [ArticlesApiModule, AuthApiModule, CommentsApiModule],
})
export class ApiModule {}
