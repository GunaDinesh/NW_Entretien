import { Module } from "@nestjs/common";
import { ArticlesApiModule } from "./articles/articles.module";
import { AuthApiModule } from "./auth/auth.module";

@Module({
    imports: [ArticlesApiModule, AuthApiModule],
})
export class ApiModule {}
