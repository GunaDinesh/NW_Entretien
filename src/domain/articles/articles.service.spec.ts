import { Test, TestingModule } from "@nestjs/testing";
import { ArticlesService } from "./articles.service";
import { NotificationService } from "../notifications/notifications.service";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import {
    PrismaTest,
    PrismaServiceTest,
} from "../../infrastructure/prisma/prisma.mock";

describe("ArticlesService", () => {
    let service: ArticlesService;
    let notificationService: NotificationService;
    let prismaService: PrismaServiceTest;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [InfrastructureModule],
            providers: [PrismaService, ArticlesService, NotificationService],
        })
            .overrideProvider(PrismaService)
            .useValue(PrismaTest)
            .compile();
        prismaService = module.get<PrismaServiceTest>(PrismaService);
        prismaService.loadUserData();
        notificationService =
            module.get<NotificationService>(NotificationService);
        service = module.get<ArticlesService>(ArticlesService);
    });

    afterEach(() => {
        prismaService.cleanup();
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should notify user followers when he/she publishes an article", async () => {
        const notifySpy = jest.spyOn(
            notificationService,
            "notifyPublishedArticle",
        );
        await service.create({
            body: "",
            description: "",
            title: "A nice title",
            published: true,
            authorId: 1,
        });
        expect(notifySpy).toHaveBeenCalled();
    });

    it("should not notify user followers when he/she publishes a draft article", () => {
        const notifySpy = jest.spyOn(
            notificationService,
            "notifyPublishedArticle",
        );
        service.create({
            body: "",
            description: "",
            title: "A draft title",
            published: false,
            authorId: 1,
        });
        expect(notifySpy).not.toHaveBeenCalled();
    });
});
