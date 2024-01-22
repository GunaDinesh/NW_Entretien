import { Test, TestingModule } from "@nestjs/testing";
import { CommentsService } from "./comments.service";
import { NotificationService } from "../notifications/notifications.service";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import {
    PrismaTest,
    PrismaServiceTest,
} from "../../infrastructure/prisma/prisma.mock";

describe("ArticlesService", () => {
    let service: CommentsService;
    let notificationService: NotificationService;
    let prismaService: PrismaServiceTest;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [InfrastructureModule],
            providers: [PrismaService, CommentsService, NotificationService],
        })
            .overrideProvider(PrismaService)
            .useValue(PrismaTest)
            .compile();
        prismaService = module.get<PrismaServiceTest>(PrismaService);
        prismaService.loadUserData();
        notificationService =
            module.get<NotificationService>(NotificationService);
        service = module.get<CommentsService>(CommentsService);
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
            "notifyPublishedComment",
            );
        await service.create({
            body: "",
            published: true,
            authorId: 1,
            comments: [],
            articleId: 1
        });
        expect(notifySpy).toHaveBeenCalled();
    });

    // it("should not notify user followers when he/she publishes a draft article", () => {
    //     const notifySpy = jest.spyOn(
    //         notificationService,
    //         "notifyPublishedArticle",
    //     );
    //     service.create({
    //         body: "",
    //         description: "",
    //         title: "A draft title",
    //         published: false,
    //         authorId: 1,
    //     });
    //     expect(notifySpy).not.toHaveBeenCalled();
    // });
});


// import { Test, TestingModule } from '@nestjs/testing';
// import { CommentsService } from './comments.service';
// import { PrismaService } from '../../infrastructure/prisma/prisma.service';
// import { NotificationService } from '../notifications/notifications.service';
// import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
// import { PrismaTest, PrismaServiceTest } from "../../infrastructure/prisma/prisma.mock";


// describe('CommentsService', () => {
//   let commentsService: CommentsService;
//   let notificationService: NotificationService;
//   let prismaService: PrismaServiceTest;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//         imports: [InfrastructureModule],
//         providers: [CommentsService, NotificationService, PrismaService],
//     })
//     .overrideProvider(PrismaService)
//     .useValue(PrismaTest)
//     .compile();
//     prismaService = module.get<PrismaServiceTest>(PrismaService);
//     prismaService.loadUserData();
//     notificationService = module.get<NotificationService>(NotificationService);
//     commentsService = module.get<CommentsService>(CommentsService);
//   });

//   afterEach(() => {
//     prismaService.cleanup();
//   });

//   it("should be defined", () => {
//     expect(commentsService).toBeDefined();
//   });
  
//   it("should notify user followers when he/she publishes a comment", async () => {
//     const notifySpy = jest.spyOn(
//         notificationService,
//         "notifyPublishedComment",
//     );
//     await commentsService.create({
//         body: "",
//         published: true,
//         authorId: 1,
//         comments: [],
//         articleId: 1
//     });
//     expect(notifySpy).toHaveBeenCalled();
// });

// //   describe('create', () => {
// //     it('should create a comment', async () => {
// //         const commentData = {
// //             authorId: 1,
// //             body: 'This is a comment',
// //             articleId: 1,
// //             published: true,
// //             comments: [], // Example of comments field
// //           };

// //       await expect(commentsService.create(commentData)).resolves.not.toThrow();
// //       expect(PrismaTest.comment.create).toHaveBeenCalledWith({ data: commentData });
// //     });
// //   });
  
// //   describe('publish', () => {
// //     it('should publish a comment', async () => {
// //       const commentId = 1;

// //       await expect(commentsService.publish(commentId)).resolves.not.toThrow();
// //       expect(PrismaService.comment.update).toHaveBeenCalledWith({
// //         where: { id: commentId },
// //         data: { published: true },
// //       });
// //       expect(notificationServiceMock.notifyPublishedComment).toHaveBeenCalled();
// //     });

// //     // Add more test cases for publish method if needed
// //   });

// });