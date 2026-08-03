import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SupabaseService } from '../supabase/supabase.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuthVerifyClient: any;

  beforeEach(async () => {
    mockAuthVerifyClient = {
      auth: {
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SupabaseService,
          useValue: {
            getAuthVerifyClient: () => mockAuthVerifyClient,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('returns data on success', async () => {
      const fakeData = { user: { id: 'user-1', email: 'test@example.com' } };
      mockAuthVerifyClient.auth.signUp.mockResolvedValue({
        data: fakeData,
        error: null,
      });

      const result = await service.signUp('test@example.com', 'password123');

      expect(result).toEqual(fakeData);
      expect(mockAuthVerifyClient.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('throws when Supabase returns an error', async () => {
      mockAuthVerifyClient.auth.signUp.mockResolvedValue({
        data: null,
        error: { message: 'email already registered' },
      });

      await expect(
        service.signUp('test@example.com', 'password123'),
      ).rejects.toThrow('Sign up failed: email already registered');
    });
  });

  describe('signIn', () => {
    it('returns session data on success', async () => {
      const fakeData = { session: { access_token: 'fake-token' } };
      mockAuthVerifyClient.auth.signInWithPassword.mockResolvedValue({
        data: fakeData,
        error: null,
      });

      const result = await service.signIn('test@example.com', 'password123');

      expect(result).toEqual(fakeData);
    });

    it('throws when credentials are invalid', async () => {
      mockAuthVerifyClient.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: { message: 'Invalid login credentials' },
      });

      await expect(service.signIn('test@example.com', 'wrong')).rejects.toThrow(
        'Sign in failed: Invalid login credentials',
      );
    });
  });
});
