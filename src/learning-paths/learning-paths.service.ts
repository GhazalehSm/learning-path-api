import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ClaudeService } from '../claude/claude.service';

interface CreateLearningPathInput {
  userId: string;
  subject: string;
  startingLevel?: string;
}

@Injectable()
export class LearningPathsService {
  constructor(
    private supabaseService: SupabaseService,
    private claudeService: ClaudeService,
  ) {}

  async create(input: CreateLearningPathInput) {
    const title = await this.claudeService.generateTitle(input.subject);

    const { data, error } = await this.supabaseService
      .getClient()
      .from('learning_paths')
      .insert({
        user_id: input.userId,
        subject: input.subject,
        title,
        starting_level: input.startingLevel,
      } as never)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create learning path: ${error.message}`);
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('learning_paths')
      .select('*, learning_path_steps(*)')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch learning path: ${error.message}`);
    }

    return data;
  }
}
