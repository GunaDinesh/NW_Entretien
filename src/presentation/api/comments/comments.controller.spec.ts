import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from '../../../domain/comments/comments.service';
import { CommentDto, CreateSubCommentDto } from './comments.dto';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { NotificationService } from '../../../domain/notifications/notifications.service';
import {
    PrismaTest
} from "../../../infrastructure/prisma/prisma.mock";
import { EmailService } from '../../../infrastructure/email/email.service';


describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService, PrismaService, NotificationService, EmailService],
    })
    .overrideProvider(PrismaService)
    .useValue(PrismaTest)
    .compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });
  describe('updateSubComment', () => {
    it('should update a subcomment', async () => {
      const createSubCommentDto: CreateSubCommentDto = {
        comment: 'Updated subcomment',
      };

      const result = await commentsController.update(1, createSubCommentDto);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(CommentDto);
    });
  });

});