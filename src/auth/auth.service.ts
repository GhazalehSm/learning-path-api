import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getAuthVerifyClient()
      .auth.signUp({ email, password });

    if (error) {
      throw new UnauthorizedException(`Sign up failed: ${error.message}`);
    }

    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getAuthVerifyClient()
      .auth.signInWithPassword({ email, password });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  async refresh(refreshToken: string) {
    const { data, error } = await this.supabaseService
      .getAuthVerifyClient()
      .auth.refreshSession({ refresh_token: refreshToken });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }
}
