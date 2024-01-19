import { Module } from "@nestjs/common";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { PresentationModule } from "./presentation/presentation.module";

@Module({
    imports: [PrismaModule, PresentationModule],
})
export class AppModule {}
