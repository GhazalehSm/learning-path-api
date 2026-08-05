import { Module } from '@nestjs/common';
import { LearningPathsService } from './learning-paths.service';
import { LearningPathsController } from './learning-paths.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthModule } from '../auth/auth.module';
import { ClaudeModule } from '../claude/claude.module';

@Module({
  imports: [SupabaseModule, AuthModule, ClaudeModule],
  providers: [LearningPathsService],
  controllers: [LearningPathsController],
})
export class LearningPathsModule {}
