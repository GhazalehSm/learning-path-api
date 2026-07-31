import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LearningPathsService } from './learning-paths.service';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';

@Controller('learning-paths')
export class LearningPathsController {
  constructor(private learningPathsService: LearningPathsService) {}

  @Post()
  create(
    @Body()
    dto: CreateLearningPathDto,
  ) {
    return this.learningPathsService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningPathsService.findOne(id);
  }
}
