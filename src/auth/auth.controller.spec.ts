import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signUp delegates to AuthService with correct arguments', async () => {
    mockAuthService.signUp.mockResolvedValue({ user: { id: 'user-1' } });

    await controller.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(mockAuthService.signUp).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    );
  });

  it('signIn delegates to AuthService with correct arguments', async () => {
    mockAuthService.signIn.mockResolvedValue({
      session: { access_token: 'token' },
    });

    await controller.signIn({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(mockAuthService.signIn).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    );
  });
});
