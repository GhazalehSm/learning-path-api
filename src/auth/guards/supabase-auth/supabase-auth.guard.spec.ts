import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { SupabaseService } from '../../../supabase/supabase.service';

describe('SupabaseAuthGuard', () => {
  let guard: SupabaseAuthGuard;
  let mockAuthVerifyClient: any;
  let mockSupabaseService: any;

  const buildContext = (headers: Record<string, string>): ExecutionContext => {
    const request: any = { headers };
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;
  };

  beforeEach(() => {
    mockAuthVerifyClient = {
      auth: { getUser: jest.fn() },
    };
    mockSupabaseService = {
      getAuthVerifyClient: () => mockAuthVerifyClient,
    };
    guard = new SupabaseAuthGuard(mockSupabaseService as SupabaseService);
  });

  it('throws when no Authorization header is present', async () => {
    const context = buildContext({});

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('throws when the Authorization header is malformed', async () => {
    const context = buildContext({ authorization: 'NotBearer sometoken' });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('throws when the token is invalid', async () => {
    mockAuthVerifyClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'invalid token' },
    });
    const context = buildContext({ authorization: 'Bearer bad-token' });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('allows the request and attaches the user when the token is valid', async () => {
    const fakeUser = { id: 'user-1', email: 'test@example.com' };
    mockAuthVerifyClient.auth.getUser.mockResolvedValue({
      data: { user: fakeUser },
      error: null,
    });
    const context = buildContext({ authorization: 'Bearer good-token' });

    const result = await guard.canActivate(context);
    const request = context.switchToHttp().getRequest();

    expect(result).toBe(true);
    expect(request.user).toEqual(fakeUser);
  });
});
