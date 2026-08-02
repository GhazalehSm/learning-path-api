import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../../supabase/supabase.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed Authorization header',
      );
    }

    const token = authHeader.replace('Bearer ', '');

    const { data, error } = await this.supabaseService
      .getAuthVerifyClient()
      .auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Attach the real, verified user to the request object,
    // so controllers can access it via a custom decorator later.
    request.user = data.user;

    return true;
  }
}
