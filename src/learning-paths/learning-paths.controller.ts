import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LearningPathsService } from './learning-paths.service';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth/supabase-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user/current-user.decorator';

@Controller('learning-paths')
@UseGuards(SupabaseAuthGuard)
export class LearningPathsController {
  constructor(private learningPathsService: LearningPathsService) {}

  @Post()
  create(
    @Body()
    dto: CreateLearningPathDto,
    @CurrentUser() user: any,
  ) {
    return this.learningPathsService.create({ ...dto, userId: user.id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningPathsService.findOne(id);
  }
}
