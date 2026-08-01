import { Test, TestingModule } from '@nestjs/testing';
import { LearningPathsService } from './learning-paths.service';
import { SupabaseService } from '../supabase/supabase.service';

describe('LearningPathsService', () => {
  let service: LearningPathsService;
  let mockSupabaseClient: any;

  beforeEach(async () => {
    mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LearningPathsService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: () => mockSupabaseClient,
          },
        },
      ],
    }).compile();

    service = module.get<LearningPathsService>(LearningPathsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('returns the created learning path on success', async () => {
      const fakeRow = {
        id: 'abc-123',
        user_id: 'user-1',
        subject: 'Dutch',
        title: 'Dutch from B1',
      };
      mockSupabaseClient.single.mockResolvedValue({
        data: fakeRow,
        error: null,
      });

      const result = await service.create({
        userId: 'user-1',
        subject: 'Dutch',
        title: 'Dutch from B1',
      });

      expect(result).toEqual(fakeRow);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('learning_paths');
    });

    it('throws an error when Supabase returns an error', async () => {
      mockSupabaseClient.single.mockResolvedValue({
        data: null,
        error: { message: 'insert failed' },
      });

      await expect(
        service.create({
          userId: 'user-1',
          subject: 'Dutch',
          title: 'Dutch from B1',
        }),
      ).rejects.toThrow('Failed to create learning path: insert failed');
    });
  });
});
