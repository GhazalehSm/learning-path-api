import { Test, TestingModule } from '@nestjs/testing';
import { LearningPathsController } from './learning-paths.controller';
import { LearningPathsService } from './learning-paths.service';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth/supabase-auth.guard';

describe('LearningPathsController', () => {
  let controller: LearningPathsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningPathsController],
      providers: [
        {
          provide: LearningPathsService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(SupabaseAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<LearningPathsController>(LearningPathsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
