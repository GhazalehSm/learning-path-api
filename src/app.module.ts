import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { LearningPathsModule } from './learning-paths/learning-paths.module';
import { AuthModule } from './auth/auth.module';
import { ClaudeModule } from './claude/claude.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    LearningPathsModule,
    AuthModule,
    ClaudeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
