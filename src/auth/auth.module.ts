import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseAuthGuard } from './guards/supabase-auth/supabase-auth.guard';

@Module({
  imports: [SupabaseModule],
  providers: [AuthService, SupabaseAuthGuard],
  controllers: [AuthController],
  exports: [SupabaseAuthGuard],
})
export class AuthModule {}
